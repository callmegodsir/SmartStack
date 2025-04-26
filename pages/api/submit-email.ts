// pages/api/submit-email.ts
import { NextApiRequest, NextApiResponse } from 'next';
import fs from 'fs';
import path from 'path';

interface EmailRequestBody {
  email: string;
}

interface EmailEntry {
  email: string;
  timestamp: string;
}

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

    // File path for storing emails
    const filePath = path.join(process.cwd(), 'emails.json');
    
    // Read existing emails or create new array
    let emails: EmailEntry[] = [];
    try {
      if (fs.existsSync(filePath)) {
        const fileData = fs.readFileSync(filePath, 'utf8');
        emails = JSON.parse(fileData);
      }
    } catch (error) {
      console.error('Error reading email file:', error);
      // Continue with empty array if file doesn't exist or is invalid
    }
    
    // Add new email
    emails.push({
      email,
      timestamp: new Date().toISOString()
    });
    
    // Write back to file
    fs.writeFileSync(filePath, JSON.stringify(emails, null, 2));

    return res.status(200).json({ message: 'Email successfully submitted' });
  } catch (error: any) {
    console.error('Error submitting email:', error);
    return res.status(500).json({ message: 'Failed to submit email' });
  }
}