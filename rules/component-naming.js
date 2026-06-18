import { isReturnsJSX } from "../utils/is-returns-jsx.js";
import { isPascalCase } from "../utils/naming-validators.js";
import { isInsideComponent } from "../utils/is-inside-component.js";
import { isClassComponent } from "../utils/is-class-component.js";
import { isFunctionComponent } from "../utils/is-function-component.js";
import { metrics } from "../reports/metrics.js";
import { isWrappedComponent } from "../utils/is-wrapped-component.js";
import { isComponentAlias } from "../utils/is-component-alias.js";
import { isNavigatorFactory } from "../utils/is-navigator-factory.js";

export default {
  meta: {
    type: "suggestion",
    docs: {
      description: "Компоненты должны использовать PascalCase",
    },
    schema: [],
    messages: {
      notPascal: 'Компонент "{{name}}" должен использовать PascalCase',
    },
  },
  create(context) {
    const enforcePascalCaseNaming = (nodeId, name) => {
      if (!isPascalCase(name)) {
        metrics.componentNaming.errors++;
        context.report({
          node: nodeId,
          messageId: "notPascal",
          data: { name },
        });
      }
    };

    return {
      // function Component
      FunctionDeclaration(node) {
        if (!node.id) return;

        const name = node.id.name;

        if (isInsideComponent(node)) return;

        if (!isReturnsJSX(node.body)) return;

        metrics.componentNaming.checked++;

        enforcePascalCaseNaming(node.id, name);
      },
      // const Component
      VariableDeclarator(node) {
        if (!node.id || node.id.type !== "Identifier") return;

        const name = node.id.name;
        const init = node.init;

        if (!init) return;

        if (isInsideComponent(node)) return;

        // const Label = () => <div />
        if (isFunctionComponent(init)) {
          metrics.componentNaming.checked++;

          enforcePascalCaseNaming(node.id, name);
          return;
        }

        // компонент обернутый memo, forwardRef, lazy и тд
        if (isWrappedComponent(init)) {
          enforcePascalCaseNaming(node.id, name);

          return;
        }

        // реэкспорт компонента-алиаса: export const DsLabeled = Labeled
        if (isComponentAlias(init)) {
          metrics.componentNaming.checked++;

          enforcePascalCaseNaming(node.id, name);
          return;
        }
        // navigator factory
        if (isNavigatorFactory(init)) {
          metrics.componentNaming.checked++;

          enforcePascalCaseNaming(node.id, name);
          return;
        }
      },
      ClassDeclaration(node) {
        const name = node.id?.name;
        if (!name) return;

        const renderMethod = isClassComponent(node);

        if (!renderMethod) return;

        if (!isReturnsJSX(renderMethod.value.body)) return;

        metrics.componentNaming.checked++;

        enforcePascalCaseNaming(node.id, name);
      },
    };
  },
};
