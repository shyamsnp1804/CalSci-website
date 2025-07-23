import { useState, useEffect, useRef } from "react";

export const usePython = () => {
  const [output, setOutput] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const pyodideRef = useRef(null);
  const outputBuffer = useRef([]);

  const initPyodide = async () => {
    setIsLoading(true);
    setOutput([]);
    try {
      console.log("Attempting to load Pyodide from CDN...");
      const script = document.createElement("script");
      script.src = "https://cdn.jsdelivr.net/pyodide/v0.26.2/full/pyodide.js";
      script.type = "text/javascript";
      script.async = true;

      script.onload = async () => {
        try {
          if (!window.loadPyodide) {
            throw new Error("loadPyodide global not found");
          }

          console.log("loadPyodide found, initializing Pyodide...");
          const pyodide = await window.loadPyodide({
            indexURL: "https://cdn.jsdelivr.net/pyodide/v0.26.2/full/",
            stdout: (text) => {
              outputBuffer.current.push(text);
              setOutput([...outputBuffer.current.slice(-8)]); // Keep last 8 lines
              console.log("STDOUT:", text);
            },
            stderr: (text) => {
              outputBuffer.current.push(`STDERR: ${text}`);
              setOutput([...outputBuffer.current.slice(-8)]);
              console.log("STDERR:", text);
            },
          });

          if (!pyodide) {
            throw new Error("Pyodide initialization returned null");
          }

          // Create a clean globals dictionary for user code
          await pyodide.runPythonAsync(`
            import builtins
            builtins.input = lambda prompt="": "1"  # Hardcode input for now
          `);

          pyodideRef.current = {
            runCode: async (code) => {
              try {
                outputBuffer.current = [];
                console.log("Running Python code:", code);
                // Run user code in a fresh globals dictionary
                const globals = pyodide.toPy({});
                await pyodide.runPythonAsync(code, { globals });
                console.log("Code executed, output:", outputBuffer.current);
                return outputBuffer.current.join("\n");
              } catch (error) {
                console.error("Execution error:", error, error.stack);
                setOutput([...outputBuffer.current.slice(-8), `Error: ${error.message}`]);
                throw error;
              }
            },
          };

          setIsLoading(false);
          console.log("Pyodide initialized successfully");
        } catch (error) {
          console.error("Initialization error:", error);
          setOutput([`Error: Failed to initialize Pyodide - ${error.message}`]);
          setIsLoading(false);
        }
      };

      script.onerror = () => {
        console.error("Failed to load pyodide.js from CDN");
        setOutput(["Error: Failed to load Pyodide module"]);
        setIsLoading(false);
      };

      document.head.appendChild(script);
    } catch (error) {
      console.error("Setup error:", error);
      setOutput([`Error: ${error.message}`]);
      setIsLoading(false);
    }
  };

  const runCode = async (code) => {
    if (isLoading) {
      setOutput(["Please wait, Pyodide is still loading..."]);
      return;
    }
    if (!pyodideRef.current) {
      setOutput(["Error: Pyodide not initialized"]);
      return;
    }

    try {
      await pyodideRef.current.runCode(code);
      setOutput([...outputBuffer.current.slice(-8)]);
    } catch (error) {
      setOutput([...outputBuffer.current.slice(-8), `Error: ${error.message}`]);
    }
  };

  useEffect(() => {
    initPyodide();
    return () => {
      console.log("Cleaning up Pyodide script");
      const scripts = document.head.querySelectorAll('script[src="https://cdn.jsdelivr.net/pyodide/v0.26.2/full/pyodide.js"]');
      scripts.forEach((script) => script.remove());
    };
  }, []);

  return { output, isLoading, runCode };
};