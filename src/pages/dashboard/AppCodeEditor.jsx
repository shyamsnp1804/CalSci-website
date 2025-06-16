import React, { useRef, useState, useContext } from 'react';
import { motion } from 'framer-motion';
import { Navigate, useParams, useNavigate } from 'react-router-dom';
import Editor from '@monaco-editor/react';
import * as monaco from 'monaco-editor';
import { Play, Save } from 'lucide-react';
import { AuthContext } from '../../context/AuthContext';
import { useMicroPython } from '../../codeEditor/microPythonLogic';
import { supabase } from '../../configSupabase/config';

const EDGE_FUNCTION_URL = 'https://czxnvqwbwszzfgecpkbi.supabase.co/functions/v1/create-app';

const AppCodeEditor = () => {
  const { isAuthenticated, loading } = useContext(AuthContext);
  const { macAddress } = useParams();
  const navigate = useNavigate();
  const editorRef = useRef(null);
  const { output, isLoading, runCode } = useMicroPython();
  const [appName, setAppName] = useState('');
  const [canSave, setCanSave] = useState(false);
  const [error, setError] = useState('');

  // Redirect if not authenticated
  if (loading) return <div className="min-h-screen flex items-center justify-center text-gray-700">Loading...</div>;
  if (!isAuthenticated) return <Navigate to="/signin" replace />;

  // Monaco Editor setup
  const handleEditorDidMount = (editor, monacoInstance) => {
    editorRef.current = editor;
    monacoInstance.languages.register({ id: 'micropython' });
    monacoInstance.languages.setMonarchTokensProvider('micropython', {
      tokenizer: {
        root: [
          [/#.*$/, 'comment'],
          [/def\s+[a-zA-Z_][a-zA-Z0-9_]*\s*\(/, 'keyword'],
          [/(print|if|else|for|while|def|class|import|from)/, 'keyword'],
          [/"(?:\\.|.)*?"/, 'string'],
          [/'(?:\\.|.)*?'/, 'string'],
          [/\d+/, 'number'],
        ],
      },
    });
    monacoInstance.languages.setLanguageConfiguration('micropython', {
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

  // Run code
  const handleRunCode = () => {
    const code = editorRef.current.getValue();
    runCode(code);
    setTimeout(() => {
      if (!output.includes('Error')) {
        setCanSave(true);
        setError('');
      } else {
        setCanSave(false);
        setError('Code execution failed');
      }
    }, 100);
  };

  // Save app
  const handleSave = async () => {
    const code = editorRef.current.getValue();
    if (!appName || !code) {
      setError('App name and code are required');
      return;
    }
    try {
      const { data: { session } } = await supabase.auth.getSession();
      if (!session) throw new Error('Unauthorized');

      const response = await fetch(EDGE_FUNCTION_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${session.access_token}`,
        },
        body: JSON.stringify({ macAddress, appName, code }),
      });

      const data = await response.json();
      if (!response.ok) throw new Error(data.error || 'Failed to save app');

      setError('');
      navigate(`/dashboard?macAddress=${macAddress}`);
    } catch (err) {
      setError(`Save failed: ${err.message}`);
    }
  };

  return (
    <motion.div
      className="min-h-screen bg-gradient-to-br from-sky-100 to-purple-200 flex flex-col pt-16"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.6 }}
    >
      <div className="flex-grow max-w-5xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-8">
        <motion.h1
          className="text-2xl sm:text-3xl font-semibold text-blue-800 mb-4 text-center"
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.5 }}
        >
          Create App for Device: {macAddress}
        </motion.h1>

        <motion.div
          className="flex justify-end gap-4 mb-4 items-center"
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.5 }}
        >
          <input
            type="text"
            value={appName}
            onChange={(e) => setAppName(e.target.value)}
            placeholder="Enter app name"
            className="p-3 rounded-lg border border-blue-300 focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white text-gray-800 w-64"
          />
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={handleRunCode}
            disabled={isLoading}
            className={`flex items-center gap-2 bg-gradient-to-r from-blue-500 to-purple-600 text-white px-6 py-2 rounded-full font-medium transition-colors ${
              isLoading ? 'opacity-50 cursor-not-allowed' : 'hover:from-blue-600 hover:to-purple-700'
            }`}
          >
            <Play size={18} />
            {isLoading ? 'Running...' : 'Run Code'}
          </motion.button>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={handleSave}
            disabled={!canSave}
            className={`flex items-center gap-2 bg-gradient-to-r from-green-500 to-teal-600 text-white px-6 py-2 rounded-full font-medium transition-colors ${
              !canSave ? 'opacity-50 cursor-not-allowed' : 'hover:from-green-600 hover:to-teal-700'
            }`}
          >
            <Save size={18} />
            Save App
          </motion.button>
        </motion.div>

        <motion.div
          className="bg-white/90 backdrop-blur-lg rounded-xl shadow-xl overflow-hidden border border-blue-200 mb-8"
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.4, duration: 0.5 }}
        >
          <Editor
            height="60vh"
            language="micropython"
            theme="vs-dark"
            defaultValue="# Write MicroPython code here\nprint('Hello, MicroPython!')"
            onMount={handleEditorDidMount}
            options={{
              minimap: { enabled: false },
              scrollBeyondLastLine: false,
              fontSize: 14,
              padding: { top: 16, bottom: 16 },
              lineNumbers: 'on',
              roundedSelection: true,
            }}
          />
        </motion.div>

        <motion.div
          className="bg-gradient-to-br from-sky-200 to-purple-300 rounded-xl shadow-xl p-6 border border-purple-200"
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.6, duration: 0.5 }}
        >
          <h3 className="text-lg font-semibold text-blue-800 mb-3">Output</h3>
          <motion.pre
            className="text-sm text-gray-800 bg-white/80 p-4 rounded-lg whitespace-pre-wrap font-mono"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.3 }}
            key={output}
          >
            {output || 'No output yet. Run your code to see results.'}
          </motion.pre>
        </motion.div>

        {error && (
          <motion.p
            className="text-red-600 mt-2 text-sm text-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.3 }}
          >
            {error}
          </motion.p>
        )}
      </div>
    </motion.div>
  );
};

export default AppCodeEditor;