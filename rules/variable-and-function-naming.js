import { isUpperSnakeCase } from "../utils/naming-validators.js";
import { isCamelCase } from "../utils/naming-validators.js";
import { isEnumLikeObject } from "../utils/is-enum-like-object.js";
import { isFunctionComponent } from "../utils/is-function-component.js";
import { isReactWrapper } from "../utils/is-react-wrapper.js";
import { isPascalCase } from "../utils/naming-validators.js";

export default {
  meta: {
    type: "suggestion",
    docs: {
      description:
        "Переменные и функции должны использовать camelCase. Правило запускается последним в цепочке правил",
    },
    messages: {
      notCamelCase:
        'Переменная или функция "{{name}}" должна использовать camelCase',
    },
    schema: [],
  },

  create(context) {
    return {
      VariableDeclarator(node) {
        const id = node.id;
        if (id?.type !== "Identifier") return;

        const name = id.name;
        const init = node.init;

        if (!init) return;

        // исключение компонентов
        if (isFunctionComponent(init)) return;
        if (isReactWrapper(init)) {
          const inner = init.arguments[0];

          if (!inner) return;

          if (isFunctionComponent(inner)) {
            return;
          }
          if (inner.type === "Identifier" && isPascalCase(inner.name)) {
            return;
          }
        }

        // исключение констант
        if (isUpperSnakeCase(name)) return;

        const realInit =
          init?.type === "TSAsExpression" ? init.expression : init;
        // исключение enum
        if (isEnumLikeObject(realInit)) return;

        // исключение объектов и массивов
        if (realInit?.type === "ObjectExpression") return;
        if (realInit?.type === "ArrayExpression") return;

        if (!isCamelCase(name)) {
          context.report({
            node: node.id,
            messageId: "notCamelCase",
            data: { name },
          });
        }
      },
      FunctionDeclaration(node) {
        const id = node.id;
        if (!id) return;

        const name = id.name;

        // исключение компонентов
        if (isFunctionComponent(node)) return;

        // исключение PascalCase (компоненты)
        if (isPascalCase(name)) return;

        // исключение UPPER_SNAKE_CASE
        if (isUpperSnakeCase(name)) return;

        if (!isCamelCase(name)) {
          context.report({
            node: id,
            messageId: "notCamelCase",
            data: { name },
          });
        }
      },
    };
  },
};
