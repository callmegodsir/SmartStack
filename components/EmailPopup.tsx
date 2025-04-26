// components/EmailPopup.jsx
import { useState } from 'react';

export default function EmailPopup({ isOpen , onClose } : any) {
  const [email, setEmail] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e : any) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError('');
    
    try {
      const response = await fetch('/api/submit-email', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email }),
      });
      
      const data = await response.json();
      
      if (!response.ok) {
        throw new Error(data.message || 'Something went wrong');
      }
      
      setIsSuccess(true);
      setEmail('');
      // Close the popup after 3 seconds on success
      setTimeout(() => {
        onClose();
        setIsSuccess(false);
      }, 3000);
    } catch (err) {
      setError(err.message);
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!isOpen) return null;

  return (
    // ... existing code ...
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
    <div className="bg-white rounded-lg p-8 max-w-md w-full relative">
      <button 
        onClick={onClose} 
        className="absolute top-4 right-4 text-gray-500 hover:text-gray-700"
      >
        ✕
      </button>
      
      <div className="text-center mb-6">
        <h2 className="text-2xl font-bold mb-2 text-black">Want to see more ?</h2>
        <p className="text-gray-600">Send us your email and we'll contact soon with an invite to be part of <b>beta-tester</b></p>
      </div>

      {isSuccess ? (
        <div className="bg-[#F97316] p-4 rounded text-center mb-4">
          <p className="text-white">Thank you, we'll contact you very soon with detailed informations !</p>
        </div>
      ) : (
        <form onSubmit={handleSubmit}>
          {error && (
            <div className="bg-red-100 p-4 rounded text-center mb-4">
              <p className="text-red-700">{error}</p>
            </div>
          )}
          
          <div className="mb-4">
            <label htmlFor="email" className="block text-gray-700 mb-2">
              Email Address
            </label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-[#F97316]"
              placeholder="your@email.com"
              required
            />
          </div>
          
          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full bg-[#F97316] text-white py-2 px-4 rounded hover:bg-orange-700 transition duration-200 disabled:bg-blue-300"
          >
            {isSubmitting ? 'Submitting...' : 'I\'m in'}
          </button>
        </form>
      )}
      </div>
    </div>
  );
}