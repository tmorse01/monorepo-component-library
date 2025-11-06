import { useState } from "react";

// DEMONSTRATION: Subpath Imports (Recommended)
// Only imports Button component - Table component is NOT bundled
// import { Button } from "@myorg/ui/button";

// HEAVY COMPONENT DEMO: Adding Chart component adds ~200KB to bundle!
import { Chart } from "@myorg/ui/chart";

// Only imports date utilities - string/number/validation utils are NOT bundled
import { formatDate, getRelativeTime } from "@myorg/utils/date";

// ALTERNATIVE: Barrel Imports (Also works with tree-shaking)
// Uncomment below to test barrel imports instead
import { Button } from "@myorg/ui";
// import { formatDate, getRelativeTime } from '@myorg/utils';

function App() {
  const [count, setCount] = useState(0);
  const currentDate = new Date();

  return (
    <div style={{ padding: "40px", maxWidth: "800px", margin: "0 auto" }}>
      <h1 style={{ color: "#333", marginBottom: "10px" }}>
        🎯 Tree-Shaking Demo
      </h1>
      <p style={{ color: "#666", fontSize: "14px", marginBottom: "30px" }}>
        Monorepo Component Library with Sustainable Export Practices
      </p>

      <div
        style={{
          backgroundColor: "white",
          padding: "30px",
          borderRadius: "8px",
          boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
          marginBottom: "30px",
        }}
      >
        <h2 style={{ marginTop: 0, color: "#007bff" }}>
          ✅ What's Included in Bundle
        </h2>
        <ul style={{ lineHeight: "1.8" }}>
          <li>
            <strong>Button component</strong> (~1KB) - Imported via{" "}
            <code>@myorg/ui/button</code>
          </li>
          <li>
            <strong>Chart component + Chart.js</strong> (~200KB) - Imported via{" "}
            <code>@myorg/ui/chart</code> ⚠️
          </li>
          <li>
            <strong>Date utilities</strong> (~7KB) - Imported via{" "}
            <code>@myorg/utils/date</code>
          </li>
          <li>React and ReactDOM (vendor libraries)</li>
        </ul>

        <h2 style={{ color: "#dc3545", marginTop: "30px" }}>
          ❌ What's NOT in Bundle
        </h2>
        <ul style={{ lineHeight: "1.8" }}>
          <li>
            <strong>Table component</strong> (~6KB) - Not imported, not bundled!
          </li>
          <li>
            <strong>Input component</strong> - Not imported, not bundled!
          </li>
          <li>
            <strong>Card component</strong> - Not imported, not bundled!
          </li>
          <li>
            <strong>String utilities</strong> - Not imported, not bundled!
          </li>
          <li>
            <strong>Number utilities</strong> - Not imported, not bundled!
          </li>
          <li>
            <strong>Validation utilities</strong> - Not imported, not bundled!
          </li>
        </ul>
      </div>

      <div
        style={{
          backgroundColor: "white",
          padding: "30px",
          borderRadius: "8px",
          boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
          marginBottom: "30px",
        }}
      >
        <h2 style={{ marginTop: 0 }}>Interactive Demo</h2>

        <div style={{ marginBottom: "20px" }}>
          <p style={{ marginBottom: "10px" }}>
            <strong>Using Button Component:</strong>
          </p>
          <Button onClick={() => setCount(count + 1)}>
            Clicked {count} times
          </Button>
          <span style={{ marginLeft: "10px" }}>
            <Button onClick={() => setCount(0)} variant="secondary">
              Reset
            </Button>
          </span>
        </div>

        <div style={{ marginBottom: "20px" }}>
          <p style={{ marginBottom: "10px" }}>
            <strong>Using Date Utilities:</strong>
          </p>
          <div
            style={{
              backgroundColor: "#f8f9fa",
              padding: "15px",
              borderRadius: "4px",
              fontSize: "14px",
            }}
          >
            <div>
              <strong>Current Date:</strong>{" "}
              {formatDate(currentDate, "MMMM D, YYYY")}
            </div>
            <div style={{ marginTop: "8px" }}>
              <strong>Relative:</strong>{" "}
              {getRelativeTime(new Date(Date.now() - 3600000))} (1 hour ago)
            </div>
          </div>
        </div>

        <div style={{ marginBottom: "20px" }}>
          <p style={{ marginBottom: "10px" }}>
            <strong>Using Chart Component (Chart.js ~200KB):</strong>
          </p>
          <div style={{ height: "300px" }}>
            <Chart
              type="line"
              data={{
                labels: ["Without Chart", "With Chart"],
                datasets: [
                  {
                    label: "Bundle Size (KB)",
                    data: [23, 193],
                    borderColor: "#dc3545",
                    backgroundColor: "rgba(220, 53, 69, 0.1)",
                  },
                ],
              }}
            />
          </div>
          <p style={{ fontSize: "14px", color: "#dc3545", marginTop: "10px" }}>
            ⚠️ Notice: This Chart component adds ~170KB to your bundle! Remove
            the import to see the difference.
          </p>
        </div>
      </div>

      <div
        style={{
          backgroundColor: "#fff3cd",
          border: "1px solid #ffc107",
          padding: "20px",
          borderRadius: "8px",
          marginBottom: "30px",
        }}
      >
        <h3 style={{ marginTop: 0, color: "#856404" }}>
          📊 How to Verify Tree-Shaking
        </h3>
        <ol style={{ lineHeight: "1.8", marginBottom: 0 }}>
          <li>
            Run <code>pnpm build</code> to build this app
          </li>
          <li>
            Check <code>app/dist/stats.html</code> for bundle visualization
          </li>
          <li>
            Look for Table/Input/Card components - they should NOT appear!
          </li>
          <li>Look for unused utils - they should NOT appear!</li>
          <li>Compare file sizes with/without different imports</li>
        </ol>
      </div>

      <div
        style={{
          backgroundColor: "white",
          padding: "30px",
          borderRadius: "8px",
          boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
        }}
      >
        <h3 style={{ marginTop: 0 }}>Import Patterns Used</h3>

        <div style={{ marginBottom: "20px" }}>
          <h4 style={{ color: "#28a745" }}>✅ Subpath Imports (Current)</h4>
          <pre
            style={{
              backgroundColor: "#f8f9fa",
              padding: "15px",
              borderRadius: "4px",
              overflow: "auto",
              fontSize: "13px",
            }}
          >
            {`import { Button } from '@myorg/ui/button';
import { formatDate, getRelativeTime } from '@myorg/utils/date';`}
          </pre>
          <p style={{ fontSize: "14px", color: "#666" }}>
            Most reliable - only loads specific files. Faster builds, guaranteed
            tree-shaking.
          </p>
        </div>

        <div>
          <h4 style={{ color: "#17a2b8" }}>✅ Barrel Imports (Alternative)</h4>
          <pre
            style={{
              backgroundColor: "#f8f9fa",
              padding: "15px",
              borderRadius: "4px",
              overflow: "auto",
              fontSize: "13px",
            }}
          >
            {`import { Button } from '@myorg/ui';
import { formatDate, getRelativeTime } from '@myorg/utils';`}
          </pre>
          <p style={{ fontSize: "14px", color: "#666" }}>
            Works too! Modern bundlers tree-shake correctly with ESM +
            sideEffects: false. All files are parsed though (slower builds).
          </p>
        </div>
      </div>
    </div>
  );
}

export default App;
