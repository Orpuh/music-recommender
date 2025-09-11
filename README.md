# Music Artist Recommender

An AI-powered web application that recommends new music artists based on your favorite artists. The app uses OpenAI's GPT-4 to generate personalized recommendations based on genre, era, and artist type.

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
OPENAI_API_KEY=your_openai_api_key_here
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

## Usage

1. Enter up to 5 artists you like, separated by commas
2. Click "Get Recommendations"
3. View the AI-generated recommendations with details about each artist

## Tech Stack

- Frontend: React.js
- Backend: Node.js with Express
- AI: OpenAI GPT-4
- Styling: CSS3 with modern features

## Future Improvements

- Add artist images using Spotify API
- Implement user accounts to save favorite recommendations
- Add audio previews for recommended artists
- Include more detailed artist information
- Add filters for genre, era, and popularity 