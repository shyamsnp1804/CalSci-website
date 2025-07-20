import React, { useRef } from "react";
import { motion } from "framer-motion";
import Editor from "@monaco-editor/react";
import * as monaco from "monaco-editor";
import { Play } from "lucide-react";
import { usePython } from "../codeEditorLogic/pythonLogic";

const CodeEditor = () => {
  const editorRef = useRef(null);
  const { output, isLoading, runCode } = usePython();

  const handleEditorDidMount = (editor, monacoInstance) => {
    editorRef.current = editor;
    monacoInstance.languages.register({ id: "python" });
    monacoInstance.languages.setMonarchTokensProvider("python", {
      tokenizer: {
        root: [
          [/#.*$/, "comment"],
          [/def\s+[a-zA-Z_][a-zA-Z0-9_]*\s*\(/, "keyword"],
          [/(print|if|else|elif|for|while|def|class|import|from|try|except|return)/, "keyword"],
          [/"(?:\\.|.)*?"/, "string"],
          [/'(?:\\.|.)*?'/, "string"],
          [/\d+\.?\d*/, "number"],
        ],
      },
    });
    monacoInstance.languages.setLanguageConfiguration("python", {
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
          Python Code Editor
        </motion.h1>

        <motion.div
          className="flex justify-end mb-4"
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.5 }}
        >
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
        </motion.div>

        <motion.div
          className="bg-white/90 backdrop-blur-lg rounded-xl shadow-xl overflow-hidden border border-blue-200 mb-8"
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.4, duration: 0.5 }}
        >
          <Editor
            height="60vh"
            language="python"
            theme="vs-dark"
            defaultValue="print('Hello, Python!')"
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
            key={output.join("\n")}
          >
            {output.length > 0 ? output.join("\n") : "No output yet. Run your code to see results."}
          </motion.pre>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default CodeEditor;
