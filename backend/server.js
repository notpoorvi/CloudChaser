const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const { GoogleGenerativeAI } = require('@google/generative-ai');
require('dotenv').config();

const app = express();
console.log('API KEY == ', process.env.GEMINI_API_KEY)

app.use(cors());
app.use(bodyParser.json());

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
const model = genAI.getGenerativeModel({ model: 'gemini-2.0-flash' });


app.post('/api/generate-steps', async (req, res) => {
    const { dream } = req.body;

    const prompt = `Please generate no more than 10 steps to help the user achieve the following goal: ${dream}. Each step should be clear and actionable. Produce the result in an array format such as ['step1', 'step2', ...] with the length of the array being 10 at most. Don't apply any text formatting to any of the strings such as ** or anything extra. Start your response with the list, don't add any extra text in the response besides the list of steps.`;

    try {
        const result = await model.generateContent(prompt);
        const responseText = await result.response.text();

        try {
            let cleanedResponse = responseText.replace(/```json\n|\n```/g, "").trim();

            if (cleanedResponse.includes("'")) {
                cleanedResponse = cleanedResponse.replace(/'/g, '"');
            }
            console.log(cleanedResponse);
            const steps = JSON.parse(cleanedResponse);

            if (steps && Array.isArray(steps)) {
                res.json({ steps: JSON.stringify(steps) });
            } else {
                res.status(400).json({ error: 'Failed to generate steps.' });
            }
        } catch (parseError) {
            console.error('Error parsing the response:', parseError);
            res.status(400).json({ error: 'Error parsing the response from Gemini.' });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Server error while generating roadmap.' });
    }
});


const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
    console.log(`Backend server running on port ${PORT}`);
});
