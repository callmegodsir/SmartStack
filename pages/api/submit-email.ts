// pages/api/submit-email.ts
import { NextApiRequest, NextApiResponse } from 'next';
import mongoose from 'mongoose';

interface EmailRequestBody {
  email: string;
}

const emailSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true,
  },
  timestamp: {
    type: Date,
    default: Date.now,
  },
});

// Use mongoose.models to check if the model is already defined or define a new one
const Email = mongoose.models.Email || mongoose.model('Email', emailSchema);

// Connect to MongoDB with improved error handling
const connectDB = async () => {
  if (mongoose.connections[0].readyState) {
    return; // Use existing connection
  }
  
  try {
    // Log the connection string (partially masked) for debugging
    const mongoUri = process.env.MONGODB_URI || '';
    const maskedUri = mongoUri.replace(/(mongodb(\+srv)?:\/\/[^:]+:)([^@]+)(@.+)/, '$1******$4');
    console.log('Attempting to connect to MongoDB:', maskedUri);
    
    await mongoose.connect(process.env.MONGODB_URI as string);
    console.log('MongoDB connected successfully');
  } catch (error) {
    console.error('MongoDB connection error:', error);
    throw new Error('Failed to connect to MongoDB');
  }
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  try {
    const { email } = req.body as EmailRequestBody;
    
    // Basic validation
    if (!email || !email.includes('@')) {
      return res.status(400).json({ message: 'Valid email is required' });
    }

    // Connect to the database
    try {
      await connectDB();
    } catch (dbError) {
      console.error('Database connection failed:', dbError);
      return res.status(500).json({ message: 'Database connection failed. Please try again later.' });
    }

    // Check if email already exists
    try {
      const existingEmail = await Email.findOne({ email });
      if (existingEmail) {
        return res.status(409).json({ message: 'Email already registered' });
      }

      // Create new email entry
      const newEmail = new Email({
        email,
        timestamp: new Date(),
      });
      
      await newEmail.save();

      return res.status(200).json({ message: 'Email successfully submitted' });
    } catch (dbOperationError) {
      console.error('Database operation error:', dbOperationError);
      return res.status(500).json({ message: 'Failed to process email submission' });
    }
  } catch (error: any) {
    console.error('Error submitting email:', error);
    return res.status(500).json({ message: 'Failed to submit email' });
  }
}