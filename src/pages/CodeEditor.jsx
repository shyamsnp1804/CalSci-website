import React, { useRef } from 'react';
import { motion } from 'framer-motion';
import Editor from '@monaco-editor/react';
import * as monaco from 'monaco-editor';
import { Play } from 'lucide-react';
import { useMicroPython } from '../codeEditor/microPythonLogic';

const CodeEditor = () => {
  const editorRef = useRef(null);
  const { output, isLoading, runCode } = useMicroPython();

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

  const handleRunCode = () => {
    const code = editorRef.current.getValue();
    runCode(code);
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
          className="text-3xl sm:text-4xl font-semibold text-blue-800 mb-6 text-center"
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.5 }}
        >
          MicroPython Code Editor
        </motion.h1>

        <div className="relative mb-4">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={handleRunCode}
            disabled={isLoading}
            className={`absolute top-0 right-0 flex items-center gap-2 bg-gradient-to-r from-blue-500 to-purple-600 text-white px-6 py-2 rounded-full font-medium transition-colors ${
              isLoading ? 'opacity-50 cursor-not-allowed' : 'hover:from-blue-600 hover:to-purple-700'
            }`}
          >
            <Play size={18} />
            {isLoading ? 'Running...' : 'Run Code'}
          </motion.button>
        </div>

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
      </div>
    </motion.div>
  );
};

export default CodeEditor;

