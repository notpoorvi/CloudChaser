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
Respond **only** in a valid JSON array format, nothing else. 
Example: ["step1", "step2", ..., "step10"]`;

    try {
        const result = await model.generateContent(prompt);
        let responseText = await result.response.text();

        let cleanedResponse = responseText.trim();
        cleanedResponse = cleanedResponse.replace(/```json|```/g, "").trim(); // Remove markdown JSON formatting
        cleanedResponse = cleanedResponse.replace(/'/g, '"');

        console.log("Gemini Response:", cleanedResponse);

        try {
            const steps = JSON.parse(cleanedResponse);

            if (Array.isArray(steps)) {
                res.json({ steps });
            } else {
                res.status(400).json({ error: 'Invalid JSON format from Gemini.' });
            }
        } catch (parseError) {
            console.error('JSON Parsing Error:', parseError, 'Response:', cleanedResponse);
            res.status(400).json({ error: 'Error parsing Gemini response. Check logs for details.' });
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
