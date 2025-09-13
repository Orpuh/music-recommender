# Music Artist Recommender

An AI-powered web application that recommends new music artists based on your preferences. The app uses OpenAI's GPT-4 to generate personalized recommendations based on genre, era, and artist type.

## Features

- Input up to 5 artists you like
- Get AI-generated recommendations with detailed information
- Modern, responsive UI with a clean design
- Real-time recommendations using OpenAI's GPT-4

## Prerequisites

- Node.js (v14 or higher)
- npm (v6 or higher)
- OpenAI API key

## Setup

1. Clone the repository:
```bash
git clone <repository-url>
cd music-recommender
```

2. Install backend dependencies:
```bash
npm install
```

3. Install frontend dependencies:
```bash
cd client
npm install
cd ..
```

4. Create a `.env` file in the root directory with the following content:
```
PORT=5000
OPENAI_API_KEY=your_openai_api_key_here (can find here https://aistudio.google.com/app/apikey)
```

5. Start the development servers:

In one terminal:
```bash
npm run dev
```

In another terminal:
```bash
npm run client
```

The application will be available at `http://localhost:3000`

## Example images

<img width="1914" height="1025" alt="Screenshot 2025-09-13 172630" src="https://github.com/user-attachments/assets/deb3a2b5-97de-42ad-8931-fd83d877df94" />

<img width="1916" height="1029" alt="Screenshot 2025-09-13 172709" src="https://github.com/user-attachments/assets/6bf738df-93ac-4554-b2b3-a10c804f7093" />
