import { isUpperSnakeCase, hasStart$Prefix } from "../utils/naming-validators.js";
import { isConstantInit } from "../utils/is-constant-init.js";
import { metrics } from "../reports/metrics.js";
import { isConstAssertion } from "../utils/is-const-assertion.js";

export default {
  meta: {
    type: "suggestion",
    docs: {
      description: "Константы должны использовать UPPER_SNAKE_CASE",
    },
    schema: [],
    messages: {
      notUpperSnake:
        'Константа "{{name}}" должна быть названа в UPPER_SNAKE_CASE',
    },
  },

  create(context) {
    return {
      VariableDeclaration(node) {
        if (node.kind !== "const") return;

        for (const declarator of node.declarations) {
          const id = declarator.id;
          const name = id?.name;
          const init = declarator.init;

          if (!name) continue;

          // исключение $ перед константой\переменной
          if (hasStart$Prefix(name)) continue;
          
          metrics.constantNaming.checked++;

          // исключение type annotation "as const"
          if (isConstAssertion(init)) continue;

          // проверка, что все value статические
          if (!isConstantInit(init)) continue;

          if (!isUpperSnakeCase(name)) {
            metrics.constantNaming.errors++;

            context.report({
              node: declarator.id,
              messageId: "notUpperSnake",
              data: { name },
            });
          }
        }
      },
    };
  },
};
