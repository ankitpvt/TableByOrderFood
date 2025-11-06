// require('dotenv').config();
// const express = require('express');
// const mongoose = require('mongoose');
// const bodyParser = require('body-parser');
// const cors = require('cors');
// const http = require('http');
// const { Server } = require('socket.io');

// const menuRoutes = require('./routes/menuRoutes');
// const orderRoutes = require('./routes/orderRoutes');
// const tableRoutes = require('./routes/tableRoutes');


// const app = express();
// const server = http.createServer(app);

// // ✅ Middleware
// app.use(bodyParser.json());

// // ✅ Allow your React frontend to talk to backend
// app.use(cors({
//   origin: 'http://localhost:5173', // your Vite React frontend
//   methods: ['GET', 'POST', 'PUT', 'DELETE'],
//   credentials: true
// }));

// // ✅ Socket.io setup
// const io = new Server(server, {
//   cors: {
//     origin: 'http://localhost:5173',
//     methods: ['GET', 'POST']
//   }
// });

// app.use((req, res, next) => {
//   req.io = io;
//   next();
// });

// io.on('connection', (socket) => {
//   console.log('✅ A user connected:', socket.id);
//   socket.on('disconnect', () => {
//     console.log('❌ User disconnected:', socket.id);
//   });
// });

// // ✅ MongoDB connection
// //mongodb://localhost:27017/mydb1
// mongoose.connect(process.env.MONGO_URI, {
//   useNewUrlParser: true,
//   useUnifiedTopology: true,
// })
//   .then(() => console.log("✅ MongoDB connected"))
//   .catch(err => console.error("❌ MongoDB Connection Error:", err));

// // ✅ API routes
// app.use('/api/menu', menuRoutes);
// app.use('/api/orders', orderRoutes);
// app.use('/api/tables', tableRoutes);


// // ✅ Default route just for testing
// app.get('/', (req, res) => {
//   res.send("Backend server is running fine!");
// });

// const PORT = 4000;
// server.listen(PORT, () => console.log(`🚀 Backend running at http://localhost:${PORT}`));



require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
const http = require('http');
const { Server } = require('socket.io');

const menuRoutes = require('./routes/menuRoutes');
const orderRoutes = require('./routes/orderRoutes');
const tableRoutes = require('./routes/tableRoutes');

const app = express();
const server = http.createServer(app);

// ✅ Middleware
app.use(bodyParser.json());

// ✅ Allow your React frontend (on Render) to connect
app.use(cors({
  origin: process.env.FRONTEND_URL, // we'll set this later in Render
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  credentials: true
}));

// ✅ Socket.io setup
const io = new Server(server, {
  cors: {
    origin: process.env.FRONTEND_URL,
    methods: ['GET', 'POST']
  }
});

app.use((req, res, next) => {
  req.io = io;
  next();
});

io.on('connection', (socket) => {
  console.log('✅ A user connected:', socket.id);
  socket.on('disconnect', () => {
    console.log('❌ User disconnected:', socket.id);
  });
});

// ✅ MongoDB connection
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
  .then(() => console.log("✅ MongoDB connected"))
  .catch(err => console.error("❌ MongoDB Connection Error:", err));

// ✅ API routes
app.use('/api/menu', menuRoutes);
app.use('/api/orders', orderRoutes);
app.use('/api/tables', tableRoutes);

// ✅ Default route
app.get('/', (req, res) => {
  res.send("Backend server is running fine!");
});

const PORT = process.env.PORT || 4000;
server.listen(PORT, () => console.log(`🚀 Backend running at port ${PORT}`));
