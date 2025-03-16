const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const { GoogleGenerativeAI } = require('@google/generative-ai');
require('dotenv').config();

const app = express();

app.use(cors());
app.use(bodyParser.json());

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
const model = genAI.getGenerativeModel({ model: 'gemini-2.0-flash' });

app.post('/api/generate-steps', async (req, res) => {
    const { dream } = req.body;

    const prompt = `Generate up to 10 steps to help achieve this goal: "${dream}". 
Respond only with a valid JSON array of strings. 
Example: ["step1", "step2", ..., "step10"]`;

    try {
        const result = await model.generateContent(prompt);
        const responseText = await result.response.text();
        console.log("Raw Gemini Response:", responseText);

        // Clean the response text
        let cleanedResponse = responseText.trim();

        // Remove markdown code blocks if present
        cleanedResponse = cleanedResponse.replace(/```(json)?\s*|\s*```/g, "").trim();

        // Replace single quotes with double quotes for valid JSON
        cleanedResponse = cleanedResponse.replace(/'/g, '"');

        // Try to find a valid JSON array within the response
        let jsonMatch = cleanedResponse.match(/\[.*\]/s);
        if (jsonMatch) {
            cleanedResponse = jsonMatch[0];
        }

        console.log("Cleaned Response:", cleanedResponse);

        try {
            // Parse the JSON
            const steps = JSON.parse(cleanedResponse);

            if (Array.isArray(steps)) {
                // Validate each step is a string
                const validSteps = steps.filter(step => typeof step === 'string');

                if (validSteps.length > 0) {
                    return res.json({ steps: validSteps });
                } else {
                    return res.status(400).json({
                        error: 'Invalid steps format from Gemini.',
                        rawResponse: responseText
                    });
                }
            } else {
                return res.status(400).json({
                    error: 'Response is not an array.',
                    rawResponse: responseText
                });
            }
        } catch (parseError) {
            console.error('JSON Parsing Error:', parseError);
            console.error('Response text that caused error:', cleanedResponse);

            // Fallback: try to extract steps manually if JSON parsing fails
            try {
                // Look for patterns like numbered lists or bullet points
                const lines = responseText.split('\n')
                    .map(line => line.trim())
                    .filter(line => line.match(/^\d+[\.\)]\s+.+/) || line.match(/^[-\*]\s+.+/))
                    .map(line => line.replace(/^\d+[\.\)]\s+|^[-\*]\s+/, '').trim());

                if (lines.length > 0) {
                    return res.json({ steps: lines });
                } else {
                    return res.status(400).json({
                        error: 'Could not parse response as JSON or extract steps.',
                        rawResponse: responseText
                    });
                }
            } catch (fallbackError) {
                return res.status(400).json({
                    error: 'Failed to parse Gemini response.',
                    rawResponse: responseText
                });
            }
        }
    } catch (error) {
        console.error('Gemini API Error:', error);
        res.status(500).json({ error: 'Server error while generating roadmap.' });
    }
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
    console.log(`Backend server running on port ${PORT}`);
});