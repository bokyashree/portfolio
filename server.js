import express from 'express';
import cors from 'cors';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';
import { connectDB } from './config/db.js';
import projectRoutes from './routes/projectRoutes.js';
import userRoutes from './routes/userRoutes.js';
import contactRoutes from './routes/contactRoutes.js'; // Import the contact routes

// ✅ Import AdminJS Modules
import AdminJS from 'adminjs';
import * as AdminJSMongoose from '@adminjs/mongoose';
import AdminJSExpress from '@adminjs/express';
import mongoose from 'mongoose';
 
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const app = express();

// ✅ AdminJS Setup (AdminJS आधी declare करणे गरजेचे आहे)
AdminJS.registerAdapter(AdminJSMongoose);

const admin = new AdminJS({
  databases: [mongoose],
  rootPath: '/admin',
});

// ✅ Simple Authentication
const adminRouter = AdminJSExpress.buildAuthenticatedRouter(admin, {
  authenticate: async (email, password) => {
    if (email === 'bokya' && password === 'Boat@123') {
      return { email: 'bokya' };
    }
    return null;
  },
  cookieName: 'adminjs',
  cookiePassword: 'supersecret',
}, null, {
  resave: false,
  saveUninitialized: true,
});

// ✅ First, register AdminJS router (Middleware नंतर लागेल)
app.use(admin.options.rootPath, adminRouter);

// ✅ Middleware (AdminJS नंतर invoke करणे गरजेचे आहे)
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Serve uploaded files
app.use('/uploads', express.static(join(__dirname, 'uploads')));

// API Routes
app.use('/api/projects', projectRoutes);
app.use('/api/users', userRoutes); // Add the user routes
app.use('/api', contactRoutes); // Add the contact routes

// Start Server
(async () => {
  try {
    await connectDB();
    const PORT = process.env.PORT || 5000;
    app.listen(PORT, () => {
      console.log(`🚀 Server running on port ${PORT}`);
      console.log(`🛠 AdminJS running at http://localhost:${PORT}/admin`);
    });
  } catch (error) {
    console.error('❌ Failed to start the server:', error);
    process.exit(1);
  }
})();
