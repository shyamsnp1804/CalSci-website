import { useEffect, useRef, useState } from "react";

export default function CodeEditor() {
  const codeRef = useRef(null);
  const [output, setOutput] = useState("Output will appear here...");
  const [mpInstance, setMpInstance] = useState(null);

  useEffect(() => {
    const loadMicropython = async () => {
      const script = document.createElement("script");
      script.type = "module";
      script.innerHTML = `
        import init from '/micropython.mjs';
        window.initMicropython = init;
      `;
      document.body.appendChild(script);

      const waitForInit = () =>
        new Promise((resolve) => {
          const check = () => {
            if (window.initMicropython) {
              resolve(window.initMicropython);
            } else {
              setTimeout(check, 50);
            }
          };
          check();
        });

      const mpModule = await waitForInit();

      const mp = await mpModule({
        print: (text) => setOutput((prev) => prev + text),
        printErr: (err) => setOutput((prev) => prev + err),
        locateFile: (path) => (path.endsWith(".wasm") ? "/micropython.wasm" : path),
      });

      mp.mp_js_init(); // Initialize MicroPython environment
      setMpInstance(mp);
    };

    loadMicropython();
  }, []);

  const runCode = () => {
    setOutput(""); // Clear previous output
    const code = codeRef.current?.value || "";

    try {
      mpInstance.mp_js_do_str(code); // Directly run Python string
    } catch (err) {
      setOutput("Error: " + err.message);
    }
  };

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <h2 className="text-2xl font-bold mb-4 text-blue-700">MicroPython Code Editor</h2>

      <textarea
        ref={codeRef}
        defaultValue={`print("Hello from MicroPython!")`}
        className="w-full h-64 p-4 border rounded font-mono text-sm resize-none"
      />

      <button
        onClick={runCode}
        disabled={!mpInstance}
        className="mt-4 bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 disabled:opacity-50"
      >
        Run Code
      </button>

      <div className="mt-4 bg-black text-green-400 p-4 rounded h-48 overflow-y-auto font-mono text-sm whitespace-pre-wrap">
        {output}
      </div>
    </div>
  );
}


