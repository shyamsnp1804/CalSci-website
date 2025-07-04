import { useState, useEffect, useRef } from 'react';

export const useMicroPython = () => {
  const [output, setOutput] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const micropythonRef = useRef(null);
  const outputBuffer = useRef([]);

  const initMicroPython = async () => {
    setIsLoading(true);
    setOutput('');
    try {
      const script = document.createElement('script');
      script.src = '/micropython.mjs';
      script.type = 'module';
      script.async = true;

      script.onload = async () => {
        try {
          if (!window.loadMicroPython) {
            throw new Error('loadMicroPython global not found. Available globals: ' + Object.keys(window).filter(key => key.toLowerCase().includes('python')).join(', '));
          }

          const wasmResponse = await fetch('/micropython.wasm');
          if (!wasmResponse.ok) {
            throw new Error(`Failed to fetch micropython.wasm: ${wasmResponse.statusText}`);
          }
          const wasmBinary = await wasmResponse.arrayBuffer();

          const micropython = await window.loadMicroPython({
            wasmBinary,
            stdout: (text) => {
              outputBuffer.current.push(text);
              setOutput(outputBuffer.current.join(''));
            },
          });

          const possibleExecMethods = ['runPython', 'exec', 'eval', 'runCode', 'run_script', 'execute'];
          const execMethod = possibleExecMethods.find(method => typeof micropython[method] === 'function');
          if (!execMethod) {
            throw new Error('No execution method found. Available methods: ' + Object.getOwnPropertyNames(Object.getPrototypeOf(micropython)).concat(Object.keys(micropython)).join(', '));
          }

          micropythonRef.current = {
            runCode: async (code) => {
              try {
                outputBuffer.current = [];
                await micropython[execMethod](code);
                return outputBuffer.current.join('');
              } catch (error) {
                throw new Error(`Execution failed: ${error.message}`);
              }
            },
          };

          try {
            await micropythonRef.current.runCode('print("MicroPython test successful")');
            setOutput('');
          } catch (testError) {
            console.warn('Test execution failed:', testError);
            setOutput(`MicroPython initialized\nTest failed: ${testError.message}`);
          }

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

      document.head.appendChild(script);
    } catch (error) {
      console.error('Setup error:', error);
      setOutput(`Error: ${error.message}`);
      setIsLoading(false);
    }
  };

  const runCode = async (code) => {
    if (isLoading) {
      setOutput('Please wait, MicroPython is still loading...');
      return;
    }
    if (!micropythonRef.current) {
      setOutput('Error: MicroPython not initialized');
      return;
    }

    try {
      outputBuffer.current = [];
      await micropythonRef.current.runCode(code);
      setOutput(outputBuffer.current.join('') || 'No output');
    } catch (error) {
      console.error('Execution error:', error);
      setOutput(`Error: ${error.message}`);
    }
  };

  useEffect(() => {
    initMicroPython();
    return () => {
      const scripts = document.head.querySelectorAll('script[src="/micropython.mjs"]');
      scripts.forEach(script => script.remove());
    };
  }, []);

  return { output, isLoading, runCode };
};