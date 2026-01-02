import { useState } from "react";
import Editor from "@monaco-editor/react";
import "./App.css";

function App() {
  const [code, setCode] = useState(`
// Example function
function sum(a, b) {
  return a + b;
}
`);

  const [tests, setTests] = useState("");
  const [loading, setLoading] = useState(false);

  const generateTests = async () => {
    if (!code.trim()) return;

    setLoading(true);
    try {
      const res = await fetch("http://127.0.0.1:5000/generate-tests", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ code }),
      });

      if (!res.ok) throw new Error("Request failed");

      const data = await res.json();
      setTests(data.tests);
    } catch (err) {
      alert("Backend not responding");
    } finally {
      setLoading(false);
    }
  };

  const runTests = async () => {
    if (!tests.trim()) return;

    try {
      const res = await fetch("http://127.0.0.1:5000/run-tests", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ code, tests }),
      });

      const data = await res.json();
      alert(data.success ? "All tests passed" : data.error);
    } catch (err) {
      alert("Error running tests");
    }
  };

  return (
    <div className="app">
      <div className="header">
        <h1>AI Unit Test Generator</h1>
        <p>Paste a function and generate test cases</p>
      </div>

      <div className="main">
        <div className="panel">
          <div className="panel-title">Function Code</div>

          <div className="editor-wrapper">
            <Editor
              height="100%"
              defaultLanguage="javascript"
              theme="vs-dark"
              value={code}
              onChange={(value) => setCode(value)}
              options={{
                minimap: { enabled: false },
                fontSize: 14,
                wordWrap: "on",
              }}
            />
          </div>

          <div className="actions">
            <button onClick={generateTests} disabled={loading}>
              {loading ? "Generating..." : "Generate Tests"}
            </button>
          </div>
        </div>

        <div className="panel">
          <div className="panel-title">Generated Tests</div>

          <pre className="output">
            {tests || "// Generated tests will appear here"}
          </pre>

          <div className="actions">
            <button className="secondary" onClick={runTests}>
              Run Tests
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
