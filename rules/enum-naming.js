import { isUpperSnakeCase, isPascalCase } from "../utils/naming-validators.js";
import { isEnumLikeObject } from "../utils/is-enum-like-object.js";

export default {
  meta: {
    type: "suggestion",
    docs: {
      description:
        "Перечисления должны использовать имена PascalCase и ключи UPPER_SNAKE_CASE",
    },
    schema: [],
    messages: {
      enumNameNotPascal: 'Имя перечисления "{{name}}" должно быть в PascalCase',
      enumKeyNotUpperSnake:
        'Ключ перечисления "{{key}}" должен быть в UPPER_SNAKE_CASE',
    },
  },

  create(context) {
    return {
      // enum Obj { KEY = 'value' }
      TSEnumDeclaration(node) {
        const name = node.id.name;

        if (!isPascalCase(name)) {
          context.report({
            node: node.id,
            messageId: "enumNameNotPascal",
            data: { name },
          });
        }

        for (const member of node.body.members) {
          const keyName = member.id?.name ?? member.id?.value;

          if (!isUpperSnakeCase(keyName)) {
            context.report({
              node: member.id,
              messageId: "enumKeyNotUpperSnake",
              data: { key: keyName },
            });
          }
        }
      },
      // const Obj = { KEY: 'value' } as const
      VariableDeclarator(node) {
        const id = node.id;

        if (id?.type !== "Identifier") return;

        const name = id.name;
        const init = node.init;

        if (init?.type !== "TSAsExpression") return;

        const obj = init.expression;

        if (!isEnumLikeObject(obj)) return;

        if (!isPascalCase(name)) {
          context.report({
            node: node.id,
            messageId: "enumNameNotPascal",
            data: { name },
          });
        }

        for (const prop of obj.properties) {
          if (prop.type !== "Property") continue;

          const keyName = prop.key.name ?? prop.key.value;

          if (!isUpperSnakeCase(keyName)) {
            context.report({
              node: prop.key,
              messageId: "enumKeyNotUpperSnake",
              data: { key: keyName },
            });
          }
        }
      },
    };
  },
};
