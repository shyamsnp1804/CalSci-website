import React, { useRef, useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import Editor from '@monaco-editor/react';
import { Play, RefreshCw } from 'lucide-react';
import { useMicroPython } from '../codeEditor/microPythonLogic';

const CodeEditor = () => {
  const editorRef = useRef(null);
  const canvasRef = useRef(null);
  const { output, isLoading: isRunning, runCode } = useMicroPython();
  const [code, setCode] = useState(`
from st7565 import ST7565
display = ST7565()
display.init()
# Write your calculation logic here
result = 10 + 20
display.text(str(result), 0, 0)
display.show()
  `);
  const [error, setError] = useState('');

  // ST7565 Simulator
  const ST7565Simulator = {
    buffer: new Array(128 * 64).fill(0),
    initialized: false,
    ctx: null,

    init() {
      console.log('ST7565Simulator: Initializing display');
      this.initialized = true;
      this.buffer.fill(0);
      if (this.ctx) {
        this.ctx.fillStyle = 'black';
        this.ctx.fillRect(0, 0, 128, 64);
        // Use 6x8 bitmap font to mimic ST7565
        this.ctx.font = '6px monospace';
        this.ctx.fillStyle = '#e6f3e6'; // Light green-white for ST7565
        this.ctx.imageSmoothingEnabled = false; // Sharp pixels
      }
    },

    text(string, x, y) {
      if (!this.initialized) {
        throw new Error('Display not initialized. Call display.init() first.');
      }
      if (x < 0 || x > 127 || y < 0 || y > 63) {
        throw new Error('Coordinates out of bounds (0-127, 0-63)');
      }
      console.log(`ST7565Simulator: Drawing text "${string}" at (${x}, ${y})`);
      if (this.ctx) {
        this.ctx.fillText(string, x, y + 6); // Adjust for 6x8 font baseline
      }
    },

    pixel(x, y, state) {
      if (!this.initialized) {
        throw new Error('Display not initialized. Call display.init() first.');
      }
      if (x < 0 || x > 127 || y < 0 || y > 63) {
        throw new Error('Coordinates out of bounds (0-127, 0-63)');
      }
      this.buffer[y * 128 + x] = state ? 1 : 0;
      console.log(`ST7565Simulator: Setting pixel (${x}, ${y}) to ${state}`);
      if (this.ctx) {
        this.ctx.fillStyle = state ? '#e6f3e6' : 'black';
        this.ctx.fillRect(x, y, 1, 1);
      }
    },

    show() {
      console.log('ST7565Simulator: Showing display');
      // Buffer rendered in real-time for simplicity
    },

    fill(value) {
      if (!this.initialized) {
        throw new Error('Display not initialized. Call display.init() first.');
      }
      this.buffer.fill(value ? 1 : 0);
      console.log(`ST7565Simulator: Filling display with ${value}`);
      if (this.ctx) {
        this.ctx.fillStyle = value ? '#e6f3e6' : 'black';
        this.ctx.fillRect(0, 0, 128, 64);
      }
    },
  };

  useEffect(() => {
    // Initialize canvas
    const canvas = canvasRef.current;
    if (canvas) {
      ST7565Simulator.ctx = canvas.getContext('2d');
      ST7565Simulator.ctx.imageSmoothingEnabled = false; // Ensure sharp pixels
      ST7565Simulator.init();
    }
  }, []);

  const handleEditorDidMount = (editor, monaco) => {
    editorRef.current = editor;
    monaco.languages.register({ id: 'micropython' });
    monaco.languages.setMonarchTokensProvider('micropython', {
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
    monaco.languages.setLanguageConfiguration('micropython', {
      comments: { lineComment: '#' },
      brackets: [['{', '}'], ['[', ']'], ['(', ')']],
      autoClosingPairs: [
        { open: '{', close: '}' },
        { open: '[', close: ']' },
        { open: '(', close: ')' },
        { open: '"', close: '"' },
        { open: "'", close: "'" },
      ],
    });
    console.log('CodeEditor: Monaco Editor mounted');
  };

  const handleRunCode = async () => {
    setError('');
    const userCode = editorRef.current.getValue();
    console.log('CodeEditor: Running code');
    try {
      const fullCode = `
${userCode}
      `;
      await runCode(fullCode, { st7565: ST7565Simulator });
      console.log('CodeEditor: Code executed successfully');
    } catch (err) {
      console.error('CodeEditor: Run error:', err.message);
      setError(err.message);
    }
  };

  const handleClearDisplay = () => {
    console.log('CodeEditor: Clearing display');
    ST7565Simulator.init();
    setError('');
  };

  return (
    <motion.div
      className="min-h-screen bg-gradient-to-br from-blue-100 to-purple-100 pt-16"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <motion.h1
          className="text-2xl sm:text-3xl font-semibold text-blue-800 mb-6 text-center"
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          Code Editor with ST7565 Simulator
        </motion.h1>
        <div className="bg-white/95 backdrop-blur-lg rounded-xl shadow-lg p-6 border border-blue-200">
          <div className="flex justify-end gap-4 mb-4">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={handleRunCode}
              disabled={isRunning}
              className={`flex items-center gap-2 bg-gradient-to-r from-blue-500 to-purple-600 text-white px-4 py-2 rounded-full font-medium ${
                isRunning ? 'opacity-50 cursor-not-allowed' : ''
              }`}
            >
              <Play size={18} />
              {isRunning ? 'Running...' : 'Run'}
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={handleClearDisplay}
              className="flex items-center gap-2 bg-gradient-to-r from-gray-500 to-gray-600 text-white px-4 py-2 rounded-full font-medium"
            >
              <RefreshCw size={18} />
              Clear Display
            </motion.button>
          </div>
          <Editor
            height="40vh"
            language="micropython"
            theme="vs-dark"
            value={code}
            onChange={(value) => setCode(value || '')}
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
          <div className="mt-4">
            <h3 className="text-sm font-semibold text-blue-800 mb-2">ST7565 Display (128x64)</h3>
            <div className="bg-gray-800 p-2 rounded-lg shadow-inner border border-blue-200 inline-block">
              <canvas
                ref={canvasRef}
                width="128"
                height="64"
                style={{ width: '226.8px', height: '113.4px' }}
                className="bg-black"
              ></canvas>
            </div>
          </div>
          <div className="mt-4">
            <h3 className="text-sm font-semibold text-blue-800 mb-2">Output</h3>
            <motion.pre
              className="text-xs text-gray-800 bg-white/80 p-3 rounded-lg whitespace-pre-wrap font-mono max-h-32 overflow-y-auto"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.3 }}
              key={output}
            >
              {output || 'No output yet. Run your code to see results.'}
            </motion.pre>
          </div>
          {error && (
            <motion.p
              className="text-red-600 mt-4 text-center text-sm"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.3 }}
            >
              {error}
            </motion.p>
          )}
        </div>
      </div>
    </motion.div>
  );
};

export default CodeEditor;

