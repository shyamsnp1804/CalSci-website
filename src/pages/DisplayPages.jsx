import React, { useState } from 'react';
import { motion } from 'framer-motion';
import Display from '../display/Display';

const DisplayPage = () => {
  const [text, setText] = useState('Hello World');

  const handleInputChange = (e) => {
    setText(e.target.value);
  };

  return (
    <motion.div
      className="min-h-screen bg-gradient-to-br from-blue-100 to-purple-100 pt-16 flex items-center justify-center"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <div className="flex flex-col items-center">
        <Display text={text} />
        <input
          type="text"
          value={text}
          onChange={handleInputChange}
          placeholder="Type text to display"
          maxLength={21 * 8}
          className="w-64 px-3 py-2 text-sm text-blue-800 bg-white border border-blue-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
        />
      </div>
    </motion.div>
  );
};

export default DisplayPage;