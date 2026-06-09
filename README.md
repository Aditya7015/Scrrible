# 🎨 Sketch Arena

A Real-Time Multiplayer Drawing & Guessing Game built using **React, Node.js, Express, and Socket.IO**.

Players can join public or private rooms, draw words, guess sketches, compete with friends, and climb the leaderboard in a synchronized real-time environment.

---

## 🚀 Live Demo

### Frontend

https://scrrible.vercel.app/

### Backend

https://scrrible-buwx.onrender.com

### GitHub Repository

https://github.com/Aditya7015/Scrrible

---

# 📌 Features

### 🎮 Multiplayer Gameplay

* Real-time multiplayer rooms
* Public matchmaking
* Private room creation
* Invite friends using room codes

### 🎨 Drawing Canvas

* HTML5 Canvas based drawing
* Multiple colors
* Brush size controls
* Eraser tool
* Canvas fill tool
* Clear canvas functionality

### 💬 Live Chat

* Real-time chat communication
* Guess submission system
* Instant message synchronization

### 🧠 Word Selection

* Multiple word choices for the drawer
* Randomized word selection
* Turn-based gameplay

### ⏳ Timer System

* Countdown timer
* Automatic round completion
* Real-time timer synchronization

### 🏆 Score System

* Live score updates
* Leaderboard management
* Winner declaration

### 🌐 Room Management

* Public Rooms
* Private Rooms
* Room Code Validation
* Player Management

---

# 🏗️ System Architecture

```text
Player
   │
   ▼
React Frontend
   │
Socket.IO Client
   │
   ▼
Socket.IO Server
   │
   ▼
Game Engine
(Room Manager + Timer Manager + Score Manager)
   │
   ▼
Broadcast Updates
   │
   ▼
All Connected Players
```

---

# 🛠️ Tech Stack

## Frontend

* React.js
* Vite
* Tailwind CSS
* DaisyUI
* Socket.IO Client
* Lucide React

## Backend

* Node.js
* Express.js
* Socket.IO

## Deployment

* Vercel (Frontend)
* Render (Backend)

## Version Control

* GitHub

---

# 📂 Project Structure

## Frontend

```text
frontend/
│
├── src/
│   ├── pages/
│   │   ├── Home.jsx
│   │   ├── Lobby.jsx
│   │   └── GameRoom.jsx
│   │
│   ├── components/
│   │   ├── Canvas.jsx
│   │   ├── Toolbar.jsx
│   │   ├── Chat.jsx
│   │   ├── PlayerList.jsx
│   │   ├── ScoreBoard.jsx
│   │   ├── WordSelection.jsx
│   │   └── CreateRoomModal.jsx
│   │
│   ├── context/
│   │   └── GameContext.jsx
│   │
│   └── socket/
│       └── socket.js
│
└── package.json
```

---

## Backend

```text
backend/
│
├── server.js
│
├── socket/
│   ├── socketHandler.js
│   ├── drawingEvents.js
│   ├── chatEvents.js
│   └── gameEvents.js
│
├── rooms/
│   ├── roomManager.js
│   ├── publicRoomManager.js
│   └── privateRoomManager.js
│
├── game/
│   ├── timerManager.js
│   ├── turnManager.js
│   ├── scoreManager.js
│   └── wordManager.js
│
└── utils/
```

---

# ⚙️ Installation

## Clone Repository

```bash
git clone https://github.com/Aditya7015/Scrrible.git
```

---

## Frontend Setup

```bash
cd frontend

npm install

npm run dev
```

Frontend runs on:

```text
http://localhost:5173
```

---

## Backend Setup

```bash
cd backend

npm install

npm start
```

Backend runs on:

```text
http://localhost:5000
```

---

# 🎯 Game Flow

### Step 1

Player enters a name.

### Step 2

Player joins a public room or creates a private room.

### Step 3

Game starts when enough players join.

### Step 4

Current drawer receives word options.

### Step 5

Drawer selects a word.

### Step 6

Timer starts.

### Step 7

Drawer sketches the word.

### Step 8

Players submit guesses through chat.

### Step 9

Correct guesses earn points.

### Step 10

Next player becomes the drawer.

### Step 11

After all rounds, the winner is announced.

---

# 🔌 Socket Events

## Client → Server

```text
joinPublicRoom
createPrivateRoom
joinPrivateRoom
drawing
sendMessage
selectWord
clearCanvas
fillCanvas
```

## Server → Client

```text
roomJoined
privateRoomCreated
roomError
drawing
receiveMessage
timerUpdate
wordChoices
scoreUpdate
gameOver
```

---

# 🎨 Drawing Synchronization

Drawing data contains:

```javascript
{
  prevX,
  prevY,
  x,
  y,
  color,
  brushSize
}
```

Workflow:

```text
Mouse Move
     ↓
Canvas
     ↓
Socket Emit
     ↓
Server
     ↓
Broadcast
     ↓
All Clients
     ↓
Render Drawing
```

This ensures all users see the same drawing in real time.

---

# 🔒 Validation & Reliability

Implemented validations include:

* Empty player name validation
* Room code validation
* Server-side guess verification
* Invalid room prevention
* Controlled room access

---

# 🚀 Future Enhancements

* MongoDB Integration
* User Authentication
* Persistent Leaderboards
* Achievement System
* Drawing Replay
* Mobile Optimization
* Friend Invitations
* AI Generated Words
* Voice Chat Integration

---

# 📚 Learning Outcomes

This project demonstrates practical implementation of:

* React.js
* Context API
* Node.js
* Express.js
* Socket.IO
* WebSocket Communication
* Event Driven Architecture
* Multiplayer Synchronization
* HTML5 Canvas API
* Real-Time Systems

---

# 👨‍💻 Author

### Aditya Tiwari

📧 Email: [adityatiwari3105@gmail.com](mailto:adityatiwari3105@gmail.com)

📱 Phone: 7015872386

🔗 GitHub: https://github.com/Aditya7015/Scrrible

---

## ⭐ If you like this project, consider giving it a star on GitHub.
