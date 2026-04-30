# Persona Chatbot - SST GenAI

An interactive chatbot application that simulates conversations with different personas using AI-powered language models. Built with a React frontend and Express backend, this project demonstrates personality-driven chat interactions.

## Live URL
https://personachatbot-sst-genai.netlify.app/

## Overview

PersonaChatbot allows users to chat with multiple AI personas (Kshitij, Anshumann, and Abhimanyu), each with unique system prompts that define their personality and conversation style. The application uses OpenRouter's API for LLM capabilities.

## Features

- **Multiple Personas**: Chat with different AI personalities, each with distinct characteristics
- **Real-time Chat Interface**: Interactive chat UI built with React and Tailwind CSS
- **Backend API**: Express.js server handling chat requests and LLM integration
- **Personality System Prompts**: Customizable personality definitions for each persona
- **CORS Enabled**: Secure cross-origin communication between frontend and backend

## Project Structure

```
PersonaChatbot/
├── backend/
│   ├── server.js              # Express.js server
│   ├── package.json           # Backend dependencies
│   └── system_prompts/        # Persona system prompts
│       ├── abhimanyu.txt
│       ├── anshumann.txt
│       └── kshitij.txt
├── frontend/
│   ├── src/
│   │   ├── App.jsx            # Main React component
│   │   ├── main.jsx           # React entry point
│   │   ├── config.js          # Backend URL configuration
│   │   ├── index.css          # Global styles
│   │   └── components/
│   │       └── Chat.jsx       # Chat interface component
│   ├── index.html             # HTML template
│   ├── package.json           # Frontend dependencies
│   ├── vite.config.js         # Vite configuration
│   └── eslint.config.js       # ESLint configuration
└── README.md
```

## Tech Stack

### Frontend
- **React 19.2** - UI library
- **Vite 8.0** - Build tool and dev server
- **Tailwind CSS 4.2** - Styling framework
- **ESLint 10.2** - Code linting

### Backend
- **Express.js 5.2** - Web server framework
- **Node.js** - JavaScript runtime
- **OpenRouter API** - LLM provider
- **CORS 2.8** - Cross-origin resource sharing
- **dotenv 17.4** - Environment variable management

## Prerequisites

- Node.js (v16+)
- npm or yarn
- OpenRouter API key

## Installation

### Backend Setup

```bash
cd backend
npm install
```

### Frontend Setup

```bash
cd frontend
npm install
```

## Configuration

### Environment Variables

Create a `.env` file in the `backend` directory:

```env
PORT=3000
LLM_API_KEY=your_openrouter_api_key
FRONTEND_URL=http://localhost:5173
```

Create a `.env` file in the `frontend` directory if needed for additional frontend configurations.

## Running the Application

### Development Mode

**Backend** (in `backend/` directory):
```bash
node server.js
```
The backend will run on `http://localhost:3000`

**Frontend** (in `frontend/` directory):
```bash
npm run dev
```
The frontend will run on `http://localhost:5173`

### Production Build

**Frontend**:
```bash
npm run build
npm run preview
```

**Backend**: Deploy to your hosting service (e.g., Render, Heroku)

## API Endpoints

### POST `/chat`
Send a message to a persona.

**Request Body**:
```json
{
  "message": "Your message here",
  "personality": "Kshitij" | "Anshumann" | "Abhimanyu"
}
```

**Response**:
```json
{
  "reply": "AI-generated response"
}
```

### GET `/`
Health check endpoint that returns "Server is running"

## Personas

The application includes three distinct personas, each with their own system prompt:

1. **Kshitij** - Defined in `system_prompts/kshitij.txt`
2. **Anshumann** - Defined in `system_prompts/anshumann.txt`
3. **Abhimanyu** - Defined in `system_prompts/abhimanyu.txt`

Each persona file contains a detailed system prompt that shapes the AI's behavior and conversation style.

## Project Scripts

### Frontend
- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run lint` - Run ESLint
- `npm run preview` - Preview production build locally

### Backend
- `node server.js` - Start the server

## Deployment

- **Frontend**: Deploy to Vercel, Netlify, or any static hosting service
- **Backend**: Deploy to Render, Heroku, AWS, or any Node.js hosting platform
- **Backend URL**: Update the `BACKEND_URL` in `frontend/src/config.js` to match your deployed backend

## Error Handling

- Invalid personality selection returns a 400 error with available options
- Missing required fields (message or personality) returns a 400 error
- API errors are caught and returned with appropriate error messages

## Future Enhancements

- Conversation history and persistence
- User authentication
- Multiple language support
- Chat export functionality
- Persona creation interface
- Response customization options

## License

ISC

## Author

Ojas Maheshwari
