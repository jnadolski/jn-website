import express from 'express';
import * as admin from 'firebase-admin';
import cors from 'cors';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken
import { Buffer } from 'buffer'; // Import Buffer

// Initialize Firebase Admin SDK
try {
  let firebaseConfig;
  const serviceAccountJson = process.env.GOOGLE_APPLICATION_CREDENTIALS_JSON;

  if (serviceAccountJson) {
    // Decode the base64 string and parse it as JSON
    firebaseConfig = JSON.parse(Buffer.from(serviceAccountJson, 'base64').toString('utf8'));
    admin.initializeApp({
      credential: admin.credential.cert(firebaseConfig),
      databaseURL: 'https://jennyos.firebaseio.com'
    });
  } else {
    // Fallback to applicationDefault if env var is not set (e.g., local development)
    admin.initializeApp({
      credential: admin.credential.applicationDefault(),
      databaseURL: 'https://jennyos.firebaseio.com'
    });
  }
  console.log('Firebase Admin SDK initialized successfully.');
} catch (error) {
  console.error('Error initializing Firebase Admin SDK:', error);
  process.exit(1);
}


const db = admin.firestore();

const app = express();
const port = process.env.PORT || 3001;

// Middleware to parse JSON bodies
app.use(express.json());

// Middleware for CORS
app.use(cors({
  origin: process.env.CORS_ORIGIN || 'http://localhost:3000'
}));

app.get('/', (req, res) => {
  res.send('Hello from the jennyOS backend!');
});

// --- Setup Endpoint (for one-time use) ---
app.post('/api/setup', async (req, res) => {
  const { password } = req.body;

  if (!password) {
    return res.status(400).json({ message: 'Password is required' });
  }

  try {
    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(password, saltRounds);

    const userRef = db.collection('users').doc('admin');
    await userRef.set({
      hashedPassword,
      username: 'admin'
    });

    res.status(200).json({ message: 'Admin user setup complete.' });
  } catch (error) {
    console.error('Error during setup:', error);
    res.status(500).json({ message: 'Error during setup.' });
  }
});

// IMPORTANT: In a real application, this secret should be stored in an environment variable.
const JWT_SECRET = 'your-super-secret-key-that-should-be-long-and-random';

// --- Login Endpoint ---
app.post('/api/login', async (req, res) => {
  const { password } = req.body;

  if (!password) {
    return res.status(400).json({ message: 'Password is required' });
  }

  try {
    const userRef = db.collection('users').doc('admin');
    const doc = await userRef.get();

    if (!doc.exists) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    const userData = doc.data();
    if (!userData) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    const isPasswordCorrect = await bcrypt.compare(password, userData.hashedPassword);

    if (!isPasswordCorrect) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    // Password is correct, generate a JWT
    const token = jwt.sign({ userId: doc.id, username: userData.username }, JWT_SECRET, {
      expiresIn: '1h', // Token expires in 1 hour
    });

    res.status(200).json({ message: 'Login successful', token });

  } catch (error) {
    console.error('Error during login:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

// --- Setup Projects Endpoint (for one-time use) ---
app.post('/api/setup-projects', async (req, res) => {
  try {
    const projects = [
      { title: 'Project Alpha', description: 'A description for Project Alpha.', url: '#', technologies: ['React', 'Node.js', 'Firestore'] },
      { title: 'Project Beta', description: 'A description for Project Beta.', url: '#', technologies: ['TypeScript', 'Express'] },
      { title: 'Project Gamma', description: 'A description for Project Gamma.', url: '#', technologies: ['HTML', 'CSS', 'JavaScript'] },
    ];

    const projectsCollection = db.collection('projects');
    const batch = db.batch();

    projects.forEach(project => {
      const docRef = projectsCollection.doc(); // Automatically generate unique ID
      batch.set(docRef, project);
    });

    await batch.commit();
    res.status(200).json({ message: 'Projects seeded successfully.' });
  } catch (error) {
    console.error('Error seeding projects:', error);
    res.status(500).json({ message: 'Error seeding projects.' });
  }
});

// --- Get Projects Endpoint ---
app.get('/api/projects', async (req, res) => {
  try {
    const projectsCollection = db.collection('projects');
    const snapshot = await projectsCollection.get();
    const projects = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    res.status(200).json(projects);
  } catch (error) {
    console.error('Error fetching projects:', error);
    res.status(500).json({ message: 'Error fetching projects.' });
  }
});

// --- Setup Gallery Endpoint (for one-time use) ---
app.post('/api/setup-gallery', async (req, res) => {
  try {
    const images = [
      { imageUrl: 'https://picsum.photos/seed/picsum1/800/600', caption: 'Sample Image 1' },
      { imageUrl: 'https://picsum.photos/seed/picsum2/800/600', caption: 'Sample Image 2' },
      { imageUrl: 'https://picsum.photos/seed/picsum3/800/600', caption: 'Sample Image 3' },
      { imageUrl: 'https://picsum.photos/seed/picsum4/800/600', caption: 'Sample Image 4' },
      { imageUrl: 'https://picsum.photos/seed/picsum5/800/600', caption: 'Sample Image 5' },
      { imageUrl: 'https://picsum.photos/seed/picsum6/800/600', caption: 'Sample Image 6' },
    ];

    const galleryCollection = db.collection('gallery');
    const batch = db.batch();

    images.forEach(image => {
      const docRef = galleryCollection.doc();
      batch.set(docRef, image);
    });

    await batch.commit();
    res.status(200).json({ message: 'Gallery seeded successfully.' });
  } catch (error) {
    console.error('Error seeding gallery:', error);
    res.status(500).json({ message: 'Error seeding gallery.' });
  }
});

// --- Get Gallery Endpoint ---
app.get('/api/gallery', async (req, res) => {
  try {
    const galleryCollection = db.collection('gallery');
    const snapshot = await galleryCollection.get();
    const images = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    res.status(200).json(images);
  } catch (error) {
    console.error('Error fetching gallery images:', error);
    res.status(500).json({ message: 'Error fetching gallery images.' });
  }
});

// --- Update Projects Endpoint (for one-time use) ---
app.post('/api/update-projects', async (req, res) => {
  try {
    const projectsCollection = db.collection('projects');

    // 1. Delete all existing projects
    const existingProjects = await projectsCollection.get();
    const batch = db.batch();
    existingProjects.docs.forEach(doc => {
      batch.delete(doc.ref);
    });

    // 2. Add the new project
    const newProject = {
      title: 'AI-Powered File Organizer',
      description: 'An AI-powered file organizer with a PyQt6 GUI, built with Gemini API, and cross-platform support for macOS and Windows. It intelligently categorizes files and folders based on their name and content.',
      url: 'https://github.com/jnadolski/ai-file-organizer',
      technologies: ['Python', 'PyQt6', 'Gemini API', 'macOS', 'Windows', 'AI', 'cross-platform', 'GitHub Actions', 'py2app']
    };
    const newDocRef = projectsCollection.doc();
    batch.set(newDocRef, newProject);

    // 3. Commit the batch
    await batch.commit();

    res.status(200).json({ message: 'Projects updated successfully.' });
  } catch (error) {
    console.error('Error updating projects:', error);
    res.status(500).json({ message: 'Error updating projects.' });
  }
});


app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});