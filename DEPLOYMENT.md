# Vishnu Event Booking - Deployment

## Local development

### Backend
```bash
cd backend
npm install
node index.js
```

### Frontend
Create `frontend/.env` from `.env.example`, then:
```bash
cd frontend
npm install
npm start
```

The frontend uses `REACT_APP_API_URL` and defaults to `http://localhost:3001`.

## Production architecture

- Frontend: Vercel
- Backend: Render/Railway (traditional Express server)
- Database: MongoDB Atlas

### Vercel frontend
Set Root Directory to `frontend`, build command to `npm run build`, and output directory to `build`.
Set `REACT_APP_API_URL` to your deployed backend URL, for example `https://your-api.onrender.com`.

### Backend hosting
Set Root Directory to `backend`, build command `npm install`, start command `npm start`.
Set `MONGO_URI` to your MongoDB Atlas URI and `FRONTEND_URL` to your Vercel URL.

Do not commit production secrets.
