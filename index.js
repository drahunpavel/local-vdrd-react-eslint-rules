import constantNaming from "./rules/constant-naming.js";
import enumNaming from "./rules/enum-naming.js";
import componentNaming from "./rules/component-naming.js";
import variableAndFunctionNaming from "./rules/variable-and-function-naming.js";
import metricsReport from "./reports/metrics-report.js";

const plugin = {
  rules: {
    "constant-naming": constantNaming,
    "enum-naming": enumNaming,
    "component-naming": componentNaming,
    "variable-and-function-naming": variableAndFunctionNaming,
    "metrics-report": metricsReport,
  },

  configs: {
    recommended: {
      ignores: ["**/*.test.*"],
      files: ["**/*.{ts,tsx,js,jsx}"],
      plugins: {
        "vdrd-react-eslint-rules": null,
      },
      rules: {
        "vdrd-react-eslint-rules/constant-naming": "warn",
        "vdrd-react-eslint-rules/enum-naming": "warn",
        "vdrd-react-eslint-rules/component-naming": "warn",
        "vdrd-react-eslint-rules/variable-and-function-naming": "warn",
        'vdrd-react-eslint-rules/metrics-report': 'warn',
      },
    },
  },
};

plugin.configs.recommended.plugins["vdrd-react-eslint-rules"] = plugin;

export default plugin;
