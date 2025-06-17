import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Network } from 'lucide-react';
import { supabase } from '../../configSupabase/config';

const EDGE_FUNCTION_URL = import.meta.env.VITE_SUPABASE_CREATE_TABLE;

const MacAddressForm = ({ onSubmit }) => {
  const [macAddress, setMacAddress] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!macAddress) {
      setError('MAC address is required.');
      return;
    }

    try {
      const { data: { session } } = await supabase.auth.getSession();
      if (!session) {
        setError('Unauthorized. Please sign in again.');
        return;
      }

      // console.log('Submitting MAC:', macAddress, 'to:', EDGE_FUNCTION_URL);

      const response = await fetch(EDGE_FUNCTION_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${session.access_token}`,
        },
        body: JSON.stringify({ macAddress }),
      });

      const data = await response.json();
      // console.log('Response:', data, 'Status:', response.status);

      if (!response.ok) {
        throw new Error(data.error || `Failed to submit MAC address (Status: ${response.status})`);
      }

      setError('');
      onSubmit(macAddress, data.message);
      setMacAddress('');
    } catch (err) {
      console.error('Fetch error:', err);
      setError(err.message);
    }
  };

  return (
    <motion.div
      className="bg-white/90 backdrop-blur-lg rounded-xl shadow-xl p-6 w-full max-w-md border border-blue-200"
      initial={{ y: 20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ delay: 0.4, duration: 0.5 }}
    >
      <h2 className="text-2xl font-semibold text-blue-800 mb-4 flex items-center gap-2">
        <Network size={24} /> Add MAC Address
      </h2>
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <input
          type="text"
          value={macAddress}
          onChange={(e) => setMacAddress(e.target.value)}
          placeholder="e.g., 00AABBCCDDEE"
          className="p-3 rounded-lg border border-blue-300 focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white text-gray-800"
        />
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          type="submit"
          className="bg-gradient-to-r from-blue-500 to-purple-600 text-white px-6 py-2 rounded-full font-medium hover:from-blue-600 hover:to-purple-700 transition-colors"
        >
          Submit
        </motion.button>
      </form>
      {error && (
        <motion.p
          className="text-red-600 mt-2 text-sm"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.3 }}
        >
          {error}
        </motion.p>
      )}
    </motion.div>
  );
};

export default MacAddressForm;
