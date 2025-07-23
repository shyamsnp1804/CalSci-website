import React, { useRef } from "react";
import { motion } from "framer-motion";
import Editor from "@monaco-editor/react";
import * as monaco from "monaco-editor";
import { Play, Code2 } from "lucide-react";
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

  const containerVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.7, ease: "easeOut", staggerChildren: 0.2 },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 15 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
  };

  return (
    <div className="min-h-screen w-full bg-gradient-to-b from-blue-50 to-blue-200 text-blue-900 pt-20 pb-12 px-4 sm:px-6 lg:px-8">
      <motion.div
        className="max-w-6xl mx-auto space-y-8"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {/* Header */}
        <motion.div className="text-center" variants={itemVariants}>
          <h1 className="text-3xl md:text-4xl font-bold text-blue-900 flex items-center justify-center gap-2">
            <Code2 className="w-8 h-8 text-blue-600" />
            CalSci Python Code Editor
          </h1>
          <p className="mt-2 text-lg md:text-xl text-blue-700 max-w-3xl mx-auto">
            Build and test IoT apps for CalSci devices with our powerful Python editor.
          </p>
        </motion.div>

        {/* Run Button */}
        <motion.div
          className="flex justify-end"
          variants={itemVariants}
        >
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={handleRunCode}
            disabled={isLoading}
            className={`flex items-center gap-2 bg-blue-600 text-white px-6 py-3 rounded-lg font-medium shadow-md transition-colors ${
              isLoading ? "opacity-50 cursor-not-allowed" : "hover:bg-blue-700"
            }`}
          >
            <Play className="w-5 h-5" />
            {isLoading ? "Running..." : "Run Code"}
          </motion.button>
        </motion.div>

        {/* Editor */}
        <motion.div
          className="bg-white/95 backdrop-blur-md rounded-xl shadow-lg border border-blue-100 overflow-hidden"
          variants={itemVariants}
        >
          <Editor
            height="60vh"
            language="python"
            theme="vs-dark"
            defaultValue="print('Hello, CalSci!')"
            onMount={handleEditorDidMount}
            options={{
              minimap: { enabled: false },
              scrollBeyondLastLine: false,
              fontSize: 15,
              padding: { top: 16, bottom: 16 },
              lineNumbers: "on",
              roundedSelection: true,
              fontFamily: "'Fira Code', monospace",
            }}
          />
        </motion.div>

        {/* Output Section */}
        <motion.div
          className="bg-white/95 backdrop-blur-md rounded-xl shadow-lg border border-blue-100 p-6"
          variants={itemVariants}
        >
          <h3 className="text-lg font-semibold text-blue-900 mb-3 flex items-center gap-2">
            <Code2 className="w-6 h-6 text-blue-600" />
            Output
          </h3>
          <motion.pre
            className="text-sm text-blue-800 bg-blue-50 p-4 rounded-lg whitespace-pre-wrap font-mono"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.3 }}
            key={output.join("\n")}
          >
            {output.length > 0 ? output.join("\n") : "Run your code to see the output."}
          </motion.pre>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default CodeEditor;
