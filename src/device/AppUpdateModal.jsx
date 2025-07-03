import React, { useRef, useState, useContext, useEffect } from "react";
import { motion } from "framer-motion";
import Editor from "@monaco-editor/react";
import * as monaco from "monaco-editor";
import { Play, Save, X } from "lucide-react";
import { AuthContext } from "../context/AuthContext";
import { useMicroPython } from "../codeEditor/microPythonLogic";
import { supabase } from "../configSupabase/config";

const EDGE_FUNCTION_URL = import.meta.env.VITE_SUPABASE_CREATE_APP;

const AppUpdateModal = ({ macAddress, appName, onClose, onUpdate }) => {
  const { isAuthenticated } = useContext(AuthContext);
  const editorRef = useRef(null);
  const { output, isLoading: isRunning, runCode } = useMicroPython();
  const [code, setCode] = useState("");
  const [error, setError] = useState("");
  const [isLoadingData, setIsLoadingData] = useState(true);

  useEffect(() => {
    const fetchAppData = async () => {
      try {
        if (
          !macAddress ||
          !/^[0-9A-Fa-f:]{12,17}$/.test(macAddress) ||
          !appName
        ) {
          console.error("AppUpdateModal: Invalid macAddress or appName");
          throw new Error("Invalid or missing MAC address or app name");
        }

        const {
          data: { session },
        } = await supabase.auth.getSession();
        if (!session) {
          console.error("AppUpdateModal: No session found");
          throw new Error("Unauthorized");
        }

        const cleanMac = macAddress.toLowerCase().replace(/:/g, "");
        const { data, error } = await supabase
          .from(`device_${cleanMac}`)
          .select("app_name, file_path")
          .eq("app_name", appName);

        if (error) {
          console.error("AppUpdateModal: App fetch error:", error.message);
          throw new Error(`Failed to fetch app: ${error.message}`);
        }

        if (!data || data.length === 0) {
          console.error("AppUpdateModal: No app found for appName=", appName);
          throw new Error("App not found");
        }

        if (data.length > 1) {
          console.error(
            "AppUpdateModal: Multiple apps found for appName=",
            appName,
            "data=",
            data
          );
          throw new Error("Multiple apps with the same name found");
        }

        const appData = data[0];

        const cacheBuster = new Date().getTime();
        const { data: fileData, error: fileError } = await supabase.storage
          .from("apps")
          .download(`${appData.file_path}?cb=${cacheBuster}`);

        if (fileError) {
          console.error(
            "AppUpdateModal: File download error:",
            fileError.message
          );
          throw new Error(`Failed to fetch code: ${fileError.message}`);
        }

        const codeText = await fileData.text();
        setCode(codeText);
        setIsLoadingData(false);
      } catch (err) {
        console.error("AppUpdateModal: Fetch error:", err.message);
        setError(err.message);
        setIsLoadingData(false);
      }
    };
    fetchAppData();
  }, [macAddress, appName]);

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

  const handleRunCode = () => {
    const code = editorRef.current.getValue();
    runCode(code);
  };

  const handleSave = async () => {
    const code = editorRef.current.getValue();
    if (!code) {
      setError("Code is required");
      return;
    }
    try {
      const {
        data: { session },
      } = await supabase.auth.getSession();
      if (!session) {
        console.error("AppUpdateModal: No session found");
        throw new Error("Unauthorized");
      }

      const response = await fetch(EDGE_FUNCTION_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${session.access_token}`,
        },
        body: JSON.stringify({ macAddress, appName, code, isUpdate: true }),
      });

      if (!response.ok) {
        const text = await response.text();
        try {
          const data = JSON.parse(text);
          throw new Error(data.error || "Failed to update app");
        } catch {
          throw new Error(
            `Server returned non-JSON response: ${text.slice(0, 50)}...`
          );
        }
      }
      setError("");
      if (typeof onUpdate === "function") {
        onUpdate();
      } else {
        console.error("AppUpdateModal: onUpdate is not a function", onUpdate);
        setError("Update failed: onUpdate is not a function");
      }
      onClose();
    } catch (err) {
      console.error("AppUpdateModal: Save error:", err.message);
      setError(`Update failed: ${err.message}`);
    }
  };

  if (!isAuthenticated) {
    return null; // Handled by Device.jsx
  }

  if (isLoadingData) {
    return (
      <motion.div
        className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
      >
        <div className="text-gray-100">Loading code...</div>
      </motion.div>
    );
  }

  return (
    <motion.div
      className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4 z-50"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
      onClick={onClose}
    >
      <motion.div
        className="bg-white/95 backdrop-blur-lg rounded-xl shadow-2xl max-w-3xl w-full max-h-[80vh] flex flex-col border border-blue-300"
        initial={{ scale: 0.95, y: 20 }}
        animate={{ scale: 1, y: 0 }}
        transition={{ duration: 0.3 }}
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex justify-between items-center p-4 border-b border-blue-200">
          <h2 className="text-lg font-semibold text-blue-800">
            Update App: {appName}
          </h2>
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={onClose}
            className="text-gray-600 hover:text-red-600"
            aria-label="Close"
          >
            <X size={24} />
          </motion.button>
        </div>
        <div className="p-4 flex justify-end gap-4">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={handleRunCode}
            disabled={isRunning}
            className={`flex items-center gap-2 bg-gradient-to-r from-blue-500 to-purple-600 text-white px-4 py-2 rounded-full font-medium ${
              isRunning ? "opacity-50 cursor-not-allowed" : ""
            }`}
          >
            <Play size={18} />
            {isRunning ? "Running..." : "Run"}
          </motion.button>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={handleSave}
            className="flex items-center gap-2 bg-gradient-to-r from-green-500 to-teal-600 text-white px-4 py-2 rounded-full font-medium"
          >
            <Save size={18} />
            Save
          </motion.button>
        </div>
        <div className="flex-1 overflow-y-auto p-4">
          <Editor
            height="40vh"
            language="micropython"
            theme="vs-dark"
            value={code}
            onChange={(value) => setCode(value || "")}
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
        <div className="p-4 border-t border-blue-200">
          <h3 className="text-sm font-semibold text-blue-800 mb-2">Output</h3>
          <motion.pre
            className="text-xs text-gray-800 bg-white/80 p-3 rounded-lg whitespace-pre-wrap font-mono max-h-32 overflow-y-auto"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.3 }}
            key={output}
          >
            {output || "No output yet. Run your code to see results."}
          </motion.pre>
        </div>
        {error && (
          <motion.p
            className="text-red-600 p-4 text-center text-sm"
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

export default AppUpdateModal;
