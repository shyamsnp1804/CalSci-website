import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import Editor from '@monaco-editor/react';
import * as monaco from 'monaco-editor';
import { Code2, X } from 'lucide-react';
import { supabase } from '../configSupabase/config';

const AppCodePreviewModal = ({ app, onClose }) => {
  const [code, setCode] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchCode = async () => {
      try {
        setIsLoading(true);
        const cacheBuster = new Date().getTime();
        const { data: fileData, error: fileError } = await supabase.storage
          .from('apps')
          .download(`${app.file_path}?cb=${cacheBuster}`);

        if (fileError) {
          console.error('AppCodePreviewModal: File download error:', fileError.message);
          throw new Error(`Failed to fetch code: ${fileError.message}`);
        }

        const codeText = await fileData.text();
        setCode(codeText);
        setIsLoading(false);
      } catch (err) {
        console.error('AppCodePreviewModal: Fetch error:', err.message);
        setError(err.message);
        setIsLoading(false);
      }
    };

    fetchCode();
  }, [app.file_path]);

  const handleEditorDidMount = (editor, monacoInstance) => {
    monacoInstance.languages.register({ id: 'python' });
    monacoInstance.languages.setMonarchTokensProvider('python', {
      tokenizer: {
        root: [
          [/#.*$/, 'comment'],
          [/def\s+[a-zA-Z_][a-zA-Z0-9_]*\s*\(/, 'keyword'],
          [/(print|if|else|elif|for|while|def|class|import|from|try|except|return)/, 'keyword'],
          [/"(?:\\.|.)*?"/, 'string'],
          [/'(?:\\.|.)*?'/, 'string'],
          [/\d+\.?\d*/, 'number'],
        ],
      },
    });
    monacoInstance.languages.setLanguageConfiguration('python', {
      comments: { lineComment: '#' },
      brackets: [['{', '}'], ['[', ']'], ['(', ')']],
      autoClosingPairs: [
        { open: '{', close: '}' },
        { open: '[', close: ']' },
        { open: '(', close: ')' },
        { open: '"', close: '"' },
        { open: "'", close: "'" },
      ],
      surroundingPairs: [
        { open: '{', close: '}' },
        { open: '[', close: ']' },
        { open: '(', close: ')' },
        { open: '"', close: '"' },
        { open: "'", close: "'" },
      ],
    });
  };

  const containerVariants = {
    hidden: { opacity: 0, scale: 0.95 },
    visible: { opacity: 1, scale: 1, transition: { duration: 0.5, ease: 'easeOut' } },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 10 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.4 } },
  };

  return (
    <motion.div
      className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      exit={{ opacity: 0 }}
      onClick={onClose}
    >
      <motion.div
        className="bg-blue-50/95 backdrop-blur-md rounded-xl shadow-lg border border-blue-200 w-full max-w-7xl max-h-[90vh] p-8 overflow-y-auto"
        variants={itemVariants}
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6 gap-4">
          <h2 className="text-3xl font-bold text-blue-900 flex items-center gap-2">
            <Code2 className="w-8 h-8 text-blue-600" />
            Code Preview: {app.app_name}
          </h2>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={onClose}
            className="px-6 py-3 rounded-lg font-medium text-blue-900 bg-blue-100 hover:bg-blue-200 shadow-md"
          >
            Cancel
          </motion.button>
        </div>

        {isLoading ? (
          <div className="text-center text-blue-800">Loading code...</div>
        ) : error ? (
          <div className="text-center text-red-600">{error}</div>
        ) : (
          <motion.div variants={itemVariants}>
            <label className="block text-blue-900 font-medium mb-1">Python Code</label>
            <div className="bg-blue-50/95 backdrop-blur-md rounded-lg shadow-md border border-blue-200 overflow-hidden">
              <Editor
                height="60vh"
                language="python"
                theme="vs-dark"
                value={code}
                onMount={handleEditorDidMount}
                options={{
                  minimap: { enabled: false },
                  scrollBeyondLastLine: false,
                  fontSize: 15,
                  padding: { top: 16, bottom: 16 },
                  lineNumbers: 'on',
                  roundedSelection: true,
                  fontFamily: "'Fira Code', monospace",
                  readOnly: true,
                }}
              />
            </div>
          </motion.div>
        )}
      </motion.div>
    </motion.div>
  );
};

export default AppCodePreviewModal;