import React, { useRef, useState, useContext, useEffect } from 'react';
import { motion } from 'framer-motion';
import Editor from '@monaco-editor/react';
import * as monaco from 'monaco-editor';
import { Play, Save, Code2, Globe, Lock } from 'lucide-react';
import { AuthContext } from '../context/AuthContext';
import { usePython } from '../codeEditorLogic/pythonLogic';
import { supabase } from '../configSupabase/config';

const EDGE_FUNCTION_URL = import.meta.env.VITE_SUPABASE_CREATE_APP;

const AppUpdateModal = ({ macAddress, appName, onClose, onUpdate }) => {
  const { isAuthenticated } = useContext(AuthContext);
  const editorRef = useRef(null);
  const { output, isLoading: isRunning, runCode } = usePython();
  const [code, setCode] = useState('');
  const [status, setStatus] = useState('private');
  const [description, setDescription] = useState('');
  const [error, setError] = useState('');
  const [isLoadingData, setIsLoadingData] = useState(true);
  const [canSave, setCanSave] = useState(true);

  useEffect(() => {
    const fetchAppData = async () => {
      try {
        if (!macAddress || !/^[0-9A-Fa-f:]{12,17}$/.test(macAddress) || !appName) {
          console.error('AppUpdateModal: Invalid macAddress or appName');
          throw new Error('Invalid or missing MAC address or app name');
        }

        const { data: { session } } = await supabase.auth.getSession();
        if (!session) {
          console.error('AppUpdateModal: No session found');
          throw new Error('Unauthorized');
        }

        const cleanMac = macAddress.toLowerCase().replace(/:/g, '');
        const { data, error } = await supabase
          .from(`device_${cleanMac}`)
          .select('app_name, file_path, status, description')
          .eq('app_name', appName);

        if (error) {
          console.error('AppUpdateModal: App fetch error:', error.message);
          throw new Error(`Failed to fetch app: ${error.message}`);
        }

        if (!data || data.length === 0) {
          console.error('AppUpdateModal: No app found for appName=', appName);
          throw new Error('App not found');
        }

        if (data.length > 1) {
          console.error('AppUpdateModal: Multiple apps found for appName=', appName, 'data=', data);
          throw new Error('Multiple apps with the same name found');
        }

        const appData = data[0];
        setStatus(appData.status || 'private');
        setDescription(appData.description || '');
        const cacheBuster = new Date().getTime();
        const { data: fileData, error: fileError } = await supabase.storage
          .from('apps')
          .download(`${appData.file_path}?cb=${cacheBuster}`);

        if (fileError) {
          console.error('AppUpdateModal: File download error:', fileError.message);
          throw new Error(`Failed to fetch code: ${fileError.message}`);
        }

        const codeText = await fileData.text();
        setCode(codeText);
        setIsLoadingData(false);
      } catch (err) {
        console.error('AppUpdateModal: Fetch error:', err.message);
        setError(err.message);
        setIsLoadingData(false);
      }
    };
    fetchAppData();
  }, [macAddress, appName]);

  const handleEditorDidMount = (editor, monacoInstance) => {
    editorRef.current = editor;
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

  const handleRunCode = () => {
    const code = editorRef.current.getValue();
    runCode(code);
  };

  useEffect(() => {
    if (output.length > 0) {
      if (!output.some(line => line.startsWith('Error'))) {
        setCanSave(true);
        setError('');
      } else {
        setCanSave(false);
        setError('Code execution failed');
      }
    }
  }, [output]);

  const handleSave = async () => {
    const code = editorRef.current.getValue();
    if (!code) {
      setError('Code is required');
      return;
    }
    try {
      const { data: { session } } = await supabase.auth.getSession();
      if (!session) {
        console.error('AppUpdateModal: No session found');
        throw new Error('Unauthorized');
      }

      const response = await fetch(EDGE_FUNCTION_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${session.access_token}`,
        },
        body: JSON.stringify({ macAddress, appName, code, isUpdate: true, status, description: description.trim() || null }),
      });

      if (!response.ok) {
        const text = await response.text();
        try {
          const data = JSON.parse(text);
          throw new Error(data.error || 'Failed to update app');
        } catch {
          throw new Error(`Server returned non-JSON response: ${text.slice(0, 50)}...`);
        }
      }
      setError('');
      if (typeof onUpdate === 'function') {
        onUpdate();
      } else {
        console.error('AppUpdateModal: onUpdate is not a function', onUpdate);
        setError('Update failed: onUpdate is not a function');
      }
      onClose();
    } catch (err) {
      console.error('AppUpdateModal: Save error:', err.message);
      setError(`Update failed: ${err.message}`);
    }
  };

  if (!isAuthenticated) {
    return null; // Handled by Device.jsx
  }

  if (isLoadingData) {
    return (
      <motion.div
        className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
      >
        <div className="text-gray-100">Loading code...</div>
      </motion.div>
    );
  }

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
        className="bg-white/95 backdrop-blur-md rounded-xl shadow-lg border border-blue-100 w-full max-w-7xl max-h-[90vh] p-8 overflow-y-auto"
        variants={itemVariants}
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6 gap-4">
          <h2 className="text-3xl font-bold text-blue-900 flex items-center gap-2">
            <Code2 className="w-8 h-8 text-blue-600" />
            Update App: {appName}
          </h2>
          <div className="flex gap-4">
            <motion.button
              whileHover={{ scale: isRunning ? 1 : 1.05 }}
              whileTap={{ scale: isRunning ? 1 : 0.95 }}
              onClick={handleRunCode}
              disabled={isRunning}
              className={`flex items-center gap-2 px-6 py-3 rounded-lg font-medium text-white shadow-md transition-colors ${
                isRunning ? 'bg-blue-400 cursor-not-allowed' : 'bg-blue-600 hover:bg-blue-700'
              }`}
            >
              <Play className="w-5 h-5" />
              {isRunning ? 'Running...' : 'Run Code'}
            </motion.button>
            <motion.button
              whileHover={{ scale: !canSave ? 1 : 1.05 }}
              whileTap={{ scale: !canSave ? 1 : 0.95 }}
              onClick={handleSave}
              disabled={!canSave}
              className={`flex items-center gap-2 px-6 py-3 rounded-lg font-medium text-white shadow-md transition-colors ${
                !canSave ? 'bg-blue-400 cursor-not-allowed' : 'bg-green-600 hover:bg-green-700'
              }`}
            >
              <Save className="w-5 h-5" />
              Save App
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={onClose}
              className="px-6 py-3 rounded-lg font-medium text-blue-900 bg-blue-100 hover:bg-blue-200 shadow-md"
            >
              Cancel
            </motion.button>
          </div>
        </div>

        <div className="space-y-6">
          <motion.div className="grid grid-cols-1 md:grid-cols-2 gap-4" variants={itemVariants}>
            <div>
              <label className="block text-blue-900 font-medium mb-1">App Name</label>
              <input
                type="text"
                value={appName}
                disabled
                className="w-full px-4 py-3 bg-blue-50 border border-blue-300 rounded-lg text-blue-900 opacity-50 cursor-not-allowed"
              />
            </div>
            <div>
              <label className="block text-blue-900 font-medium mb-1">Status</label>
              <div className="relative">
                <select
                  value={status}
                  onChange={(e) => setStatus(e.target.value)}
                  className="w-full px-4 py-3 bg-blue-50 border border-blue-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-blue-900 appearance-none"
                >
                  <option value="private">Private</option>
                  <option value="public">Public</option>
                </select>
                {status === 'private' ? (
                  <Lock className="absolute top-3 right-3 text-blue-400 h-5 w-5" />
                ) : (
                  <Globe className="absolute top-3 right-3 text-blue-400 h-5 w-5" />
                )}
              </div>
            </div>
          </motion.div>

          <motion.div variants={itemVariants}>
            <label className="block text-blue-900 font-medium mb-1">Description</label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Describe your app (optional)"
              className="w-full px-4 py-3 bg-blue-50 border border-blue-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-blue-900 placeholder-blue-400 resize-y"
              rows={3}
            />
          </motion.div>

          <motion.div variants={itemVariants}>
            <label className="block text-blue-900 font-medium mb-1">Python Code</label>
            <div className="bg-white/95 backdrop-blur-md rounded-lg shadow-md border border-blue-100 overflow-hidden">
              <Editor
                height="60vh"
                language="python"
                theme="vs-dark"
                value={code}
                onChange={(value) => setCode(value || '')}
                onMount={handleEditorDidMount}
                options={{
                  minimap: { enabled: false },
                  scrollBeyondLastLine: false,
                  fontSize: 15,
                  padding: { top: 16, bottom: 16 },
                  lineNumbers: 'on',
                  roundedSelection: true,
                  fontFamily: "'Fira Code', monospace",
                }}
              />
            </div>
          </motion.div>

          <motion.div variants={itemVariants}>
            <h3 className="text-lg font-semibold text-blue-900 mb-3 flex items-center gap-2">
              <Code2 className="w-6 h-6 text-blue-600" />
              Output
            </h3>
            <div className="bg-blue-50 p-4 rounded-lg border border-blue-200">
              <pre className="text-sm text-blue-800 whitespace-pre-wrap font-mono">
                {output.length > 0 ? output.join('\n') : 'Run your code to see the output.'}
              </pre>
            </div>
          </motion.div>
        </div>

        {error && (
          <motion.p
            variants={itemVariants}
            className="text-sm text-red-600 mt-4 text-center"
          >
            {error}
          </motion.p>
        )}
      </motion.div>
    </motion.div>
  );
};

export default AppUpdateModal;
