import React, { useState, useRef, useEffect } from 'react';
import Editor from '@monaco-editor/react';
import * as monaco from 'monaco-editor';

const CodeEditor = () => {
  const [output, setOutput] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const editorRef = useRef(null);
  const micropythonRef = useRef(null);
  const outputBuffer = useRef([]);

  // Initialize MicroPython WebAssembly
  const initMicroPython = async () => {
    setIsLoading(true);
    setOutput('Loading MicroPython...');
    try {
      // Dynamically load micropython.mjs via script tag
      const script = document.createElement('script');
      script.src = '/micropython.mjs';
      script.type = 'module';
      script.async = true;

      script.onload = async () => {
        try {
          // Log Python-related global objects
          console.log('Global objects after loading micropython.mjs:', Object.keys(window).filter(key => key.toLowerCase().includes('python') || key.toLowerCase().includes('py')));
          
          // Check for loadMicroPython global
          if (!window.loadMicroPython) {
            throw new Error('loadMicroPython global not found. Available globals: ' + Object.keys(window).filter(key => key.toLowerCase().includes('python')).join(', '));
          }

          console.log('Found loadMicroPython:', window.loadMicroPython);

          // Fetch WebAssembly binary
          const wasmResponse = await fetch('/micropython.wasm');
          if (!wasmResponse.ok) {
            throw new Error(`Failed to fetch micropython.wasm: ${wasmResponse.statusText}`);
          }
          const wasmBinary = await wasmResponse.arrayBuffer();

          // Initialize MicroPython with stdout capture
          const micropython = await window.loadMicroPython({
            wasmBinary,
            stdout: (text) => {
              outputBuffer.current.push(text);
              setOutput(outputBuffer.current.join(''));
            },
          });
          console.log('MicroPython instance:', micropython);
          console.log('MicroPython methods:', Object.getOwnPropertyNames(Object.getPrototypeOf(micropython)).concat(Object.keys(micropython)));

          // Verify execution method
          const possibleExecMethods = ['runPython', 'exec', 'eval', 'runCode', 'run_script', 'execute'];
          const execMethod = possibleExecMethods.find(method => typeof micropython[method] === 'function');
          if (!execMethod) {
            throw new Error('No execution method found. Available methods: ' + Object.getOwnPropertyNames(Object.getPrototypeOf(micropython)).concat(Object.keys(micropython)).join(', '));
          }
          console.log('Using execution method:', execMethod);

          micropythonRef.current = {
            runCode: async (code) => {
              try {
                outputBuffer.current = []; // Clear previous output
                await micropython[execMethod](code);
                return outputBuffer.current.join('');
              } catch (error) {
                throw new Error(`Execution failed: ${error.message}`);
              }
            },
          };

          // Test MicroPython
          try {
            await micropythonRef.current.runCode('print("MicroPython test successful")');
            console.log('Test execution successful');
            setOutput('MicroPython initialized\nTest output: MicroPython test successful');
          } catch (testError) {
            console.warn('Test execution failed:', testError);
            setOutput(`MicroPython initialized\nTest failed: ${testError.message}`);
          }

          console.log('MicroPython initialized successfully');
          setIsLoading(false);
        } catch (error) {
          console.error('Initialization error:', error);
          setOutput(`Error: Failed to initialize MicroPython - ${error.message}`);
          setIsLoading(false);
        }
      };

      script.onerror = () => {
        console.error('Failed to load micropython.mjs');
        setOutput('Error: Failed to load MicroPython module (check /micropython.mjs in public folder)');
        setIsLoading(false);
      };

      console.log('Loading micropython.mjs...');
      document.head.appendChild(script);
    } catch (error) {
      console.error('Setup error:', error);
      setOutput(`Error: ${error.message}`);
      setIsLoading(false);
    }
  };

  // Handle editor mount
  const handleEditorDidMount = (editor, monacoInstance) => {
    editorRef.current = editor;
    // Configure Monaco for Python syntax
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
      comments: {
        lineComment: '#',
      },
      brackets: [
        ['{', '}'],
        ['[', ']'],
        ['(', ')'],
      ],
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
    // Initialize MicroPython
    initMicroPython();
  };

  // Run MicroPython code
  const runCode = async () => {
    if (isLoading) {
      setOutput('Please wait, MicroPython is still loading...');
      return;
    }
    if (!micropythonRef.current) {
      setOutput('Error: MicroPython not initialized');
      return;
    }

    const code = editorRef.current.getValue();
    try {
      outputBuffer.current = []; // Clear previous output
      await micropythonRef.current.runCode(code);
      setOutput(outputBuffer.current.join('') || 'No output');
    } catch (error) {
      console.error('Execution error:', error);
      setOutput(`Error: ${error.message}`);
    }
  };

  // Clean up script tag on component unmount
  useEffect(() => {
    return () => {
      const scripts = document.head.querySelectorAll('script[src="/micropython.mjs"]');
      scripts.forEach(script => script.remove());
    };
  }, []);

  return (
    <div style={{ height: '100vh', display: 'flex', flexDirection: 'column' }}>
      <h1>MicroPython Code Editor</h1>
      <button
        onClick={runCode}
        disabled={isLoading}
        style={{ margin: '10px', padding: '10px', width: '100px', opacity: isLoading ? 0.5 : 1 }}
      >
        {isLoading ? 'Loading...' : 'Run Code'}
      </button>
      <Editor
        height="70%"
        language="micropython"
        theme="vs-dark"
        defaultValue="# Write MicroPython code here\nprint('Hello, MicroPython!')"
        onMount={handleEditorDidMount}
        options={{
          minimap: { enabled: false },
          scrollBeyondLastLine: false,
          fontSize: 14,
        }}
      />
      <div style={{ marginTop: '10px', padding: '10px', border: '1px solid #ccc' }}>
        <h3>Output:</h3>
        <pre>{output}</pre>
      </div>
    </div>
  );
};

export default CodeEditor;

