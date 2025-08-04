import React, { useRef, useState, useContext, useEffect } from "react";
import { motion } from "framer-motion";
import Editor from "@monaco-editor/react";
import * as monaco from "monaco-editor";
import { Play, Save, Code2, Globe, Lock, X } from "lucide-react";
import { AuthContext } from "../context/AuthContext";
import { usePython } from "../codeEditorLogic/pythonLogic";
import { supabase } from "../configSupabase/config";

const EDGE_FUNCTION_URL = import.meta.env.VITE_SUPABASE_CREATE_APP;

const AppCodeEditor = ({ macAddress, onClose, onSave }) => {
  const { isAuthenticated } = useContext(AuthContext);
  const editorRef = useRef(null);
  const { output, isLoading, runCode } = usePython();
  const [appName, setAppName] = useState("");
  const [status, setStatus] = useState("private");
  const [description, setDescription] = useState("");
  const [code, setCode] = useState("print('Hello, CalSci!')");
  const [canSave, setCanSave] = useState(true);
  const [error, setError] = useState("");
  const [isSaving, setIsSaving] = useState(false);

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
      brackets: [["{", "}"], ["[", "]"], ["(", ")"]],
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
    const codeValue = editorRef.current?.getValue() || code;
    runCode(codeValue);
  };

  useEffect(() => {
    if (output.length > 0) {
      if (!output.some((line) => line.startsWith("Error"))) {
        setCanSave(true);
        setError("");
      } else {
        setCanSave(false);
        setError("Code contains errors. Please fix before saving.");
      }
    }
  }, [output]);

  const handleSave = async () => {
    if (isSaving) return;
    setIsSaving(true);
    setError("");

    try {
      if (!macAddress || !/^[0-9A-Fa-f:]{12,17}$/.test(macAddress)) {
        throw new Error("Invalid MAC address");
      }
      if (!appName.trim()) {
        throw new Error("App name is required");
      }
      if (!code.trim()) {
        throw new Error("Code cannot be empty");
      }

      const { data: { session }, error: sessionError } = await supabase.auth.getSession();
      if (sessionError || !session || !session.user) {
        console.error("AppCodeEditor: Session error:", sessionError?.message || "No session");
        throw new Error("Unauthorized: Please sign in");
      }

      const cleanMac = macAddress.toLowerCase().replace(/:/g, "");
      const response = await fetch(EDGE_FUNCTION_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${session.access_token}`,
        },
        body: JSON.stringify({
          macAddress: cleanMac,
          appName: appName.trim(),
          code: code.trim(),
          isUpdate: false,
          status,
          description: description.trim() || null,
          is_downloaded: false,
        }),
      });

      const data = await response.json();
      if (!response.ok) {
        console.error("AppCodeEditor: Save error:", data.error, { status: response.status });
        throw new Error(data.error || `Failed to save app (Status: ${response.status})`);
      }

      setAppName("");
      setStatus("private");
      setDescription("");
      setCode("print('Hello, CalSci!')");
      if (typeof onSave === "function") {
        onSave();
      } else {
        console.error("AppCodeEditor: onSave is not a function", onSave);
      }
      onClose();
    } catch (err) {
      console.error("AppCodeEditor: Save error:", err.message);
      setError(`Save failed: ${err.message}`);
    } finally {
      setIsSaving(false);
    }
  };

  if (!isAuthenticated) {
    return null;
  }

  const containerVariants = {
    hidden: { opacity: 0, scale: 0.95 },
    visible: { opacity: 1, scale: 1, transition: { duration: 0.5, ease: "easeOut" } },
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
        className="bg-blue-50/95 backdrop-blur-md rounded-xl shadow-lg border border-blue-200 w-full max-w-7xl max-h-[90vh] p-8 overflow-y-auto"
        variants={itemVariants}
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6 gap-4">
          <h2 className="text-3xl font-bold text-blue-900 flex items-center gap-2">
            <Code2 className="w-8 h-8 text-blue-600" />
            Create App for Device: {macAddress}
          </h2>
          <div className="flex gap-4">
            <motion.button
              whileHover={{ scale: isLoading ? 1 : 1.05 }}
              whileTap={{ scale: isLoading ? 1 : 0.95 }}
              onClick={handleRunCode}
              disabled={isLoading}
              className={`flex items-center gap-2 px-6 py-3 rounded-lg font-medium text-white shadow-md transition-colors ${
                isLoading ? "bg-blue-400 cursor-not-allowed" : "bg-blue-600 hover:bg-blue-700"
              }`}
            >
              <Play className="w-5 h-5" />
              {isLoading ? "Running..." : "Run Code"}
            </motion.button>
            <motion.button
              whileHover={{ scale: !canSave || isSaving ? 1 : 1.05 }}
              whileTap={{ scale: !canSave || isSaving ? 1 : 0.95 }}
              onClick={handleSave}
              disabled={!canSave || isSaving}
              className={`flex items-center gap-2 px-6 py-3 rounded-lg font-medium text-white shadow-md transition-colors ${
                !canSave || isSaving ? "bg-blue-400 cursor-not-allowed" : "bg-green-600 hover:bg-green-700"
              }`}
            >
              <Save className="w-5 h-5" />
              {isSaving ? "Saving..." : "Save App"}
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

        {error && (
          <motion.p
            variants={itemVariants}
            className="text-sm text-red-600 mb-4 text-center"
          >
            {error}
          </motion.p>
        )}

        <div className="space-y-6">
          <motion.div className="grid grid-cols-1 md:grid-cols-2 gap-4" variants={itemVariants}>
            <div>
              <label className="block text-blue-900 font-medium mb-1">App Name</label>
              <input
                type="text"
                value={appName}
                onChange={(e) => setAppName(e.target.value)}
                placeholder="Enter app name"
                className="w-full px-4 py-3 bg-blue-50 border border-blue-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600 text-blue-900 placeholder-blue-400"
                required
              />
            </div>
            <div>
              <label className="block text-blue-900 font-medium mb-1">Status</label>
              <div className="relative">
                <select
                  value={status}
                  onChange={(e) => setStatus(e.target.value)}
                  className="w-full px-4 py-3 bg-blue-50 border border-blue-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600 text-blue-900 appearance-none"
                >
                  <option value="private">Private</option>
                  <option value="public">Public</option>
                </select>
                {status === "private" ? (
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
              className="w-full px-4 py-3 bg-blue-50 border border-blue-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600 text-blue-900 placeholder-blue-400 resize-y"
              rows={3}
            />
          </motion.div>

          <motion.div variants={itemVariants}>
            <label className="block text-blue-900 font-medium mb-1">Python Code</label>
            <div className="bg-blue-50/95 backdrop-blur-md rounded-lg shadow-md border border-blue-200 overflow-hidden">
              <Editor
                height="60vh"
                language="python"
                theme="vs-dark"
                value={code}
                onChange={(value) => setCode(value || "")}
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
            </div>
          </motion.div>

          <motion.div variants={itemVariants}>
            <h3 className="text-lg font-semibold text-blue-900 mb-3 flex items-center gap-2">
              <Code2 className="w-6 h-6 text-blue-600" />
              Output
            </h3>
            <div className="bg-blue-50/95 p-4 rounded-lg border border-blue-200">
              <pre className="text-sm text-blue-800 whitespace-pre-wrap font-mono">
                {output.length > 0 ? output.join("\n") : "Run your code to see the output."}
              </pre>
            </div>
          </motion.div>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default AppCodeEditor;
