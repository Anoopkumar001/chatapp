# 💬 Real-Time Chat App (MERN + Socket.io)

Full-stack chat application with JWT authentication and real-time messaging.

**Stack:** MongoDB, Express, React (Vite), Node.js, Socket.io, Tailwind CSS

---

## 📁 Structure

```
chat-app/
├── backend/       → Express API + Socket.io + MongoDB
└── frontend/      → React (Vite) + Tailwind CSS
```

---

## 🚀 Setup Instructions

### 1. Backend Setup

```bash
cd backend
npm install
```

Create a `.env` file (copy from `.env.example`):

```bash
cp .env.example .env
```

Edit `.env` and set your MongoDB URI (local or MongoDB Atlas):

```
PORT=5000
MONGO_URI=mongodb://127.0.0.1:27017/chatapp
JWT_SECRET=your_super_secret_jwt_key_change_this
NODE_ENV=development
CLIENT_URL=http://localhost:5173
```

> 💡 Agar local MongoDB nahi hai, to free MongoDB Atlas cluster bana lo (mongodb.com/atlas) aur uska connection string yahan daal do.

Run backend:

```bash
npm run dev
```

Backend chalega on `http://localhost:5000`

---

### 2. Frontend Setup

Open a new terminal:

```bash
cd frontend
npm install
npm run dev
```

Frontend chalega on `http://localhost:5173`

---

## ✅ Features

- JWT auth with httpOnly cookies (signup/login/logout)
- Real-time messaging via Socket.io
- Online/offline status indicators
- Persistent chat history (MongoDB)
- Responsive Tailwind UI
- Toast notifications

## 🧩 Component Breakdown (Frontend)

- `context/AuthContext.jsx` — auth state, login/signup/logout logic
- `context/SocketContext.jsx` — socket connection + online users
- `components/Sidebar.jsx` — contact list
- `components/ChatWindow.jsx` — message thread + real-time listener
- `components/MessageBubble.jsx` — individual message UI
- `components/MessageInput.jsx` — text input + send button
- `components/Navbar.jsx` — top bar with logout
- `pages/Login.jsx`, `pages/Signup.jsx`, `pages/Chat.jsx` — route pages

## 🌍 Deployment Guide

### Backend → Render / Railway

1. Push `backend/` code to a GitHub repo
2. Create new Web Service on [Render](https://render.com) (or Railway), connect the repo
3. Set **Build Command**: `npm install`, **Start Command**: `npm start`
4. Add environment variables in the dashboard:
   ```
   MONGO_URI=<your MongoDB Atlas connection string>
   JWT_SECRET=<a long random string>
   NODE_ENV=production
   CLIENT_URL=<your Netlify frontend URL, e.g. https://your-app.netlify.app>
   PORT=5000
   ```
5. Deploy — you'll get a URL like `https://your-backend.onrender.com`

> 💡 MongoDB local nahi chalega on Render — use [MongoDB Atlas](https://mongodb.com/atlas) free tier, aur uska connection string `MONGO_URI` mein daalo.

### Frontend → Netlify

1. Push `frontend/` code to GitHub (same repo, different folder, ya alag repo)
2. Netlify pe naya site banao, **Base directory**: `frontend`, **Build command**: `npm run build`, **Publish directory**: `frontend/dist`
3. Add environment variables in Netlify site settings:
   ```
   VITE_API_URL=https://your-backend.onrender.com/api
   VITE_SOCKET_URL=https://your-backend.onrender.com
   ```
4. Deploy

### ⚠️ Cross-domain checklist (important!)

Jab frontend aur backend alag domains pe hote hain (Netlify + Render), ye 3 cheezein sync honi chahiye:

| Setting | Kahan | Value |
|---|---|---|
| `CLIENT_URL` | Backend env (Render) | Netlify frontend URL |
| `VITE_API_URL` / `VITE_SOCKET_URL` | Frontend env (Netlify) | Render backend URL |
| `NODE_ENV=production` | Backend env (Render) | Cookie ko `secure:true, sameSite:"none"` banata hai — cross-domain cookie tabhi kaam karega |

Agar `NODE_ENV=production` set nahi kiya to login/signup cookie set hoga par browser usse cross-site request pe bhejega nahi, aur tumhe baar-baar "logged out" dikhega.

## 🛠️ Next Steps (Optional Enhancements)

- Image sharing in messages (Cloudinary)
- Typing indicator (`socket.emit("typing")`)
- Message read receipts
- Group chats
- Deploy backend on Render/Railway, frontend on Netlify/Vercel

---

**Note:** JWT cookie ka `secure` flag production mein `NODE_ENV=production` set karne par automatically true ho jayega (deployment ke time env variable set karna mat bhoolna).
