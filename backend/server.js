require('dotenv').config();

const express = require('express');
const cors = require('cors');
const fs = require('fs');

const app = express();

// Middleware
app.use(cors(process.env.FRONTEND_URL));
app.use(express.json());

// Config
const PORT = process.env.PORT || 3000;
const LLM_API_KEY = process.env.LLM_API_KEY;

// Load system prompts once at startup
const SYSTEM_PROMPTS = {
    Kshitij: fs.readFileSync('./system_prompts/kshitij.txt', 'utf-8'),
    Anshumann: fs.readFileSync('./system_prompts/anshumann.txt', 'utf-8'),
    Abhimanyu: fs.readFileSync('./system_prompts/abhimanyu.txt', 'utf-8'),
};

// Basic GET route
app.get('/', (req, res) => {
    res.send('Server is running');
});

// POST route
app.post('/chat', async (req, res) => {
    try {
        const { message, personality } = req.body;

        if (!message || !personality) {
            return res.status(400).json({
                error: 'Both message and personality are required'
            });
        }

        if (!SYSTEM_PROMPTS[personality]) {
            return res.status(400).json({
                error: 'Invalid personality. Use one of: Kshitij, Anshumann, Abhimanyu'
            });
        }

        const systemPrompt = SYSTEM_PROMPTS[personality];

        const response = await fetch('https://openrouter.ai/api/v1/chat/completions', {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${LLM_API_KEY}`,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                model: 'openai/gpt-4o-mini',
                messages: [
                    { role: 'system', content: systemPrompt },
                    { role: 'user', content: message }
                ]
            })
        });

        const data = await response.json();

        const reply =
            data?.choices?.[0]?.message?.content || 'No response from model';

        res.json({ reply });

    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Something went wrong' });
    }
});

// Start server
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});