import React, { useRef, useState, useContext, useEffect } from "react";
import { motion } from "framer-motion";
import Editor from "@monaco-editor/react";
import * as monaco from "monaco-editor";
import { Play, Save } from "lucide-react";
import { AuthContext } from "../context/AuthContext";
import { useMicroPython } from "../codeEditor/microPythonLogic";
import { supabase } from "../configSupabase/config";
import Display from "../display/Display";

const EDGE_FUNCTION_URL = import.meta.env.VITE_SUPABASE_CREATE_APP;

const AppCodeEditor = ({ macAddress, onClose, onSave }) => {
  const { isAuthenticated } = useContext(AuthContext);
  const editorRef = useRef(null);
  const { output, isLoading, runCode } = useMicroPython();
  const [appName, setAppName] = useState("");
  const [canSave, setCanSave] = useState(false);
  const [error, setError] = useState("");
  const [displayText, setDisplayText] = useState("");

  // Monaco Editor setup
  const handleEditorDidMount = (editor, monacoInstance) => {
    editorRef.current = editor;
    monacoInstance.languages.register({ id: "micropython" });
    monacoInstance.languages.setMonarchTokensProvider("micropython", {
      tokenizer: {
        root: [
          [/#.*$/, "comment"],
          [/def\s+[a-zA-Z_][a-zA-Z0-9_]*\s*\(/, "keyword"],
          [/(print|if|else|for|while|def|class|import|from)/, "keyword"],
          [/"(?:\\.|.)*?"/, "string"],
          [/'(?:\\.|.)*?'/, "string"],
          [/\d+/, "number"],
        ],
      },
    });
    monacoInstance.languages.setLanguageConfiguration("micropython", {
      comments: { lineComment: "#" },
      brackets: [
        ["{", "}"],
        ["[", "]"],
        ["(", ")"],
      ],
      autoClosingPairs: [
        { open: "{", close: "}" },
        { open: "[", close: "]" },
        { open: "(", close: ")" },
        { open: '"', close: '"' },
        { open: "'", close: "'" },
      ],
      surroundingPairs: [
        { open: "{", close: "}" },
        { open: "[", close: "]" },
        { open: "(", close: ")" },
        { open: '"', close: '"' },
        { open: "'", close: "'" },
      ],
    });
  };

  // Run code
  const handleRunCode = () => {
    const code = editorRef.current.getValue();
    runCode(code);
  };

  // Update display and save state based on output
  useEffect(() => {
    if (output) {
      setDisplayText(output);
      if (!output.includes("Error")) {
        setCanSave(true);
        setError("");
      } else {
        setCanSave(false);
        setError("Code execution failed");
      }
    }
  }, [output]);

  // Save app
  const handleSave = async () => {
    const code = editorRef.current.getValue();
    if (!appName || !code) {
      setError("App name and code are required");
      return;
    }
    try {
      const {
        data: { session },
      } = await supabase.auth.getSession();
      if (!session) {
        setError("Unauthorized. Please sign in again.");
        return;
      }
      const response = await fetch(EDGE_FUNCTION_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${session.access_token}`,
        },
        body: JSON.stringify({ macAddress, appName, code }),
      });

      const data = await response.json();
      if (!response.ok) {
        throw new Error(
          data.error || `Failed to save app (Status: ${response.status})`
        );
      }

      setError("");
      setAppName("");
      onSave();
      onClose();
    } catch (err) {
      setError(`Save failed: ${err.message}`);
    }
  };

  if (!isAuthenticated) {
    return null; // Handled by Device.jsx
  }

  return (
    <motion.div
      className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onClick={onClose}
    >
      <motion.div
        className="bg-white/90 rounded-xl shadow-xl p-6 w-full max-w-6xl border border-blue-200"
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.3 }}
        onClick={(e) => e.stopPropagation()}
      >
        <h2 className="text-xl font-semibold text-blue-800 mb-4">
          Create App for Device: {macAddress}
        </h2>
        <div className="flex justify-end gap-4 mb-4 items-center">
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
              isLoading
                ? "opacity-50 cursor-not-allowed"
                : "hover:from-blue-600 hover:to-purple-700"
            }`}
          >
            <Play size={18} />
            {isLoading ? "Running..." : "Run Code"}
          </motion.button>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={handleSave}
            disabled={!canSave}
            className={`flex items-center gap-2 bg-gradient-to-r from-green-500 to-teal-600 text-white px-6 py-2 rounded-full font-medium transition-colors ${
              !canSave
                ? "opacity-50 cursor-not-allowed"
                : "hover:from-green-600 hover:to-teal-700"
            }`}
          >
            <Save size={18} />
            Save App
          </motion.button>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={onClose}
            className="bg-gray-300 text-gray-800 px-6 py-2 rounded-full font-medium hover:bg-gray-400"
          >
            Cancel
          </motion.button>
        </div>
        <div className="flex flex-row gap-4">
          <div className="flex-1 flex flex-col">
            <div className="bg-white/90 rounded-lg shadow-inner overflow-hidden border border-blue-200 mb-4">
              <Editor
                height="50vh"
                language="micropython"
                theme="vs-dark"
                defaultValue="print('Hello, MicroPython!')"
                onMount={handleEditorDidMount}
                options={{
                  minimap: { enabled: false },
                  scrollBeyondLastLine: false,
                  fontSize: 14,
                  padding: { top: 16, bottom: 16 },
                  lineNumbers: "on",
                  roundedSelection: true,
                }}
              />
            </div>
            <div className="bg-gradient-to-br from-sky-200 to-purple-300 rounded-lg shadow-inner p-4 border border-purple-200">
              <h3 className="text-lg font-semibold text-blue-800 mb-2">
                Output
              </h3>
              <motion.pre
                className="text-sm text-gray-800 bg-white/80 p-4 rounded-lg whitespace-pre-wrap font-mono"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.3 }}
                key={output}
              >
                {output || "No output yet. Run your code to see results."}
              </motion.pre>
            </div>
          </div>
          <div className="flex-1 flex justify-center">
            <Display text={displayText} />
          </div>
        </div>
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
      </motion.div>
    </motion.div>
  );
};

export default AppCodeEditor;
