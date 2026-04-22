import { metrics } from "./metrics.js";

export default {
  meta: {
    type: "suggestion",
    docs: {
      description: "Выводит метрики всех правил после завершения анализа",
    },
    schema: [],
  },

  create() {
    return {
      "Program:exit"() {
        const totalChecked =
          metrics.constantNaming.checked +
          metrics.enumNaming.checked +
          metrics.componentNaming.checked +
          metrics.variableAndFunctionNaming.checked;

        const totalErrors =
          metrics.constantNaming.errors +
          metrics.enumNaming.errors +
          metrics.componentNaming.errors +
          metrics.variableAndFunctionNaming.errors;

        const cleanPercent =
          totalChecked === 0 ? 100 : 100 - (totalErrors / totalChecked) * 100;

        console.log("\n=== Custom Metrics ===");
        console.log(
          JSON.stringify(
            {
              metrics,
              totalChecked,
              totalErrors,
              cleanPercent: Number(cleanPercent.toFixed(2)),
            },
            null,
            2,
          ),
        );
        console.log("=============================\n");
      },
    };
  },
};
