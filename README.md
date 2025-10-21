# Bible Chat - AI-Powered Biblical Guidance App

A modern web application where users can ask questions about God, the Bible, and faith, and receive AI-powered answers with relevant Bible verses and prayer points.

## Features

- **User Authentication**: Secure sign-in/sign-up with email/password or Google authentication via Firebase
- **AI-Powered Chat**: Ask any question about God, the Bible, faith, or spiritual guidance
- **Bible Verses**: Get relevant Bible verses automatically related to your questions
- **Prayer Points**: Receive personalized prayer points based on your needs
- **ChatGPT-Style UI**: Modern, intuitive chat interface
- **Real-time Responses**: Instant answers powered by OpenAI's GPT model

## Tech Stack

### Frontend
- React 18
- Vite (Build tool)
- Tailwind CSS (Styling)
- Firebase Authentication
- React Router (Navigation)
- Axios (HTTP client)

### Backend
- Node.js
- Express
- OpenAI API (GPT-3.5-turbo)
- API.Bible (Bible verse integration)

## Prerequisites

Before running this application, you need:

1. **Node.js** (v18 or higher)
2. **Firebase Account** - for authentication
3. **OpenAI API Key** - for AI responses
4. **Bible API Key** (optional) - from [API.Bible](https://scripture.api.bible/)

## Setup Instructions

### 1. Clone the Repository

```bash
git clone <your-repo-url>
cd zion_repo
```

### 2. Firebase Setup

1. Go to [Firebase Console](https://console.firebase.google.com/)
2. Create a new project
3. Enable Authentication:
   - Click "Authentication" in the left sidebar
   - Click "Get Started"
   - Enable "Email/Password" provider
   - Enable "Google" provider (optional)
4. Get your Firebase config:
   - Click the gear icon → Project settings
   - Scroll down to "Your apps"
   - Click the web icon (</>) to create a web app
   - Copy the Firebase configuration values

### 3. OpenAI API Key

1. Go to [OpenAI Platform](https://platform.openai.com/)
2. Sign up or log in
3. Navigate to API Keys section
4. Create a new API key
5. Copy the key (you won't be able to see it again)

### 4. Bible API Key (Optional)

1. Go to [API.Bible](https://scripture.api.bible/)
2. Sign up for a free account
3. Get your API key from the dashboard
4. Note: If you skip this, the app will use sample verses

### 5. Frontend Configuration

```bash
cd frontend
npm install
```

Create a `.env` file in the `frontend` directory:

```bash
cp .env.example .env
```

Edit `.env` and add your Firebase configuration:

```env
VITE_FIREBASE_API_KEY=your_firebase_api_key
VITE_FIREBASE_AUTH_DOMAIN=your_project_id.firebaseapp.com
VITE_FIREBASE_PROJECT_ID=your_project_id
VITE_FIREBASE_STORAGE_BUCKET=your_project_id.appspot.com
VITE_FIREBASE_MESSAGING_SENDER_ID=your_messaging_sender_id
VITE_FIREBASE_APP_ID=your_app_id
```

### 6. Backend Configuration

```bash
cd ../backend
npm install
```

Create a `.env` file in the `backend` directory:

```bash
cp .env.example .env
```

Edit `.env` and add your API keys:

```env
OPENAI_API_KEY=your_openai_api_key_here
BIBLE_API_KEY=your_bible_api_key_here
PORT=5000
```

## Running the Application

### Development Mode

You need to run both frontend and backend servers:

**Terminal 1 - Backend:**
```bash
cd backend
npm run dev
```

**Terminal 2 - Frontend:**
```bash
cd frontend
npm run dev
```

The application will be available at:
- Frontend: http://localhost:3000
- Backend API: http://localhost:5000

### Production Build

**Frontend:**
```bash
cd frontend
npm run build
npm run preview
```

**Backend:**
```bash
cd backend
npm start
```

## Usage Guide

### 1. Sign Up / Sign In

- Navigate to the app URL
- Click "Sign up" if you're a new user
- Enter your name, email, and password (or use Google Sign-In)
- You'll be automatically redirected to the chat interface

### 2. Ask Questions

Type your questions in the chat input, such as:
- "What does the Bible say about love?"
- "How can I strengthen my faith?"
- "I need prayer for strength during difficult times"
- "Explain the meaning of grace"
- "Help me understand forgiveness"

### 3. Receive Answers

The AI will respond with:
- A thoughtful, biblically-based answer
- Relevant Bible verses with references
- Prayer points (when applicable)

## Project Structure

```
zion_repo/
├── frontend/
│   ├── src/
│   │   ├── components/      # Reusable components
│   │   ├── config/          # Firebase configuration
│   │   ├── pages/           # Page components (Login, SignUp, Chat)
│   │   ├── App.jsx          # Main app component with routing
│   │   ├── main.jsx         # Entry point
│   │   └── index.css        # Global styles with Tailwind
│   ├── index.html
│   ├── package.json
│   └── vite.config.js
├── backend/
│   ├── server.js            # Express server with API endpoints
│   ├── package.json
│   └── .env.example
├── .gitignore
└── README.md
```

## API Endpoints

### POST /api/chat

Send a message and receive AI response with Bible verses and prayer points.

**Request:**
```json
{
  "message": "What does the Bible say about faith?",
  "userId": "user_id_from_firebase"
}
```

**Response:**
```json
{
  "answer": "Faith is a central theme in the Bible...",
  "verses": [
    {
      "reference": "Hebrews 11:1",
      "text": "Now faith is the substance of things hoped for..."
    }
  ],
  "prayerPoints": [
    "Pray for increased faith and trust in God's promises",
    "Ask the Holy Spirit to strengthen your spiritual walk"
  ]
}
```

### GET /api/health

Health check endpoint.

**Response:**
```json
{
  "status": "ok",
  "message": "Bible Chat API is running"
}
```

## Troubleshooting

### Firebase Authentication Issues

- Verify your Firebase configuration in `.env`
- Check that authentication methods are enabled in Firebase Console
- Ensure your domain is authorized in Firebase Console

### OpenAI API Errors

- Verify your API key is correct
- Check your OpenAI account has available credits
- Ensure you're not exceeding rate limits

### Port Already in Use

If port 3000 or 5000 is already in use:
- Change the port in `vite.config.js` (frontend)
- Change PORT in `backend/.env`

## Future Enhancements

- [ ] Chat history persistence
- [ ] Favorite verses
- [ ] Daily devotionals
- [ ] Community prayer requests
- [ ] Bible reading plans
- [ ] Multi-language support
- [ ] Voice input/output
- [ ] Mobile app (React Native)

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

This project is licensed under the MIT License.

## Support

For issues or questions, please open an issue on GitHub.

## Acknowledgments

- OpenAI for GPT API
- API.Bible for Bible verse data
- Firebase for authentication
- The Christian community for inspiration

---

**Built with love and faith**
