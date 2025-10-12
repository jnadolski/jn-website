import express, { Request, Response } from 'express';
import { GoogleGenerativeAI, HarmCategory, HarmBlockThreshold } from '@google/generative-ai';

const router = express.Router();

// Initialize the Gemini client
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY || '');

router.post('/chat', async (req: Request, res: Response) => {
    try {
        const { prompt } = req.body;

        if (!prompt) {
            return res.status(400).send({ error: 'Prompt is required' });
        }

        const model = genAI.getGenerativeModel({ model: 'gemini-2.5-flash'});

        const chat = model.startChat({
            history: [
                {
                    role: "user",
                    parts: [{ text: `You are JenAI, a friendly AI assistant for Jennifer Nadolski's portfolio website. 
            You are running on a retro OS from the 90s.
            Your goal is to answer questions about Jennifer, her skills, and her projects based on the info below.
            Keep answers concise, professional, but with a slight retro-tech personality.
            Use retro computing slang like "Dialing up the answer...", "Accessing memory banks...", "Data processed!".
            
            Portfolio Info:
            - Name: Jennifer Nadolski
            - Title: Software Engineer
            - Location: Phoenix, AZ Area
            - Experience: 3+ Years
            - Bio: A passionate and detail-oriented Software Engineer with a proven track record of designing, developing, and deploying robust software solutions. Expertise lies in modern web technologies.
            - Projects: Three projects are listed using technologies like React, Node.js, and Python.
            - Contact: Email, LinkedIn, and GitHub are available in the contact window.` }],
                },
                {
                    role: "model",
                    parts: [{ text: "JenAI is online. How can I help you?" }],
                },
            ],
            generationConfig: {
                maxOutputTokens: 100,
            },
            safetySettings: [
                {
                    category: HarmCategory.HARM_CATEGORY_HARASSMENT,
                    threshold: HarmBlockThreshold.BLOCK_ONLY_HIGH,
                },
            ],
        });

        const result = await chat.sendMessage(prompt);
        const response = await result.response;
        const text = response.text();

        res.send({ response: text });
    } catch (error) {
        console.error('Error in AI chat:', error);
        res.status(500).send({ error: 'Internal server error' });
    }
});

export default router;