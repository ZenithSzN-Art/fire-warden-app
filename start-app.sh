#!/bin/bash

echo "🚀 Starting Fire Warden Application..."
echo "=================================="

# Start backend test server in background
echo "📡 Starting backend test server on port 8080..."
cd backend
node server-test.js &
BACKEND_PID=$!

# Wait a moment for backend to start
sleep 2

# Start frontend
echo "🌐 Starting frontend on port 5173..."
cd ../frontend
npm run dev &
FRONTEND_PID=$!

echo ""
echo "✅ Application started successfully!"
echo "📱 Frontend: http://localhost:5173"
echo "🔌 Backend API: http://localhost:8080/api"
echo ""
echo "Press Ctrl+C to stop both services"

# Wait for user to stop
wait $FRONTEND_PID $BACKEND_PID 