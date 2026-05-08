import { isReturnsJSX } from '../utils/is-returns-jsx.js';
import { isPascalCase } from '../utils/naming-validators.js';
import { isReactWrapper } from '../utils/is-react-wrapper.js';
import { isInsideComponent } from '../utils/is-inside-component.js';
import { isClassComponent } from '../utils/is-class-component.js';
import { isFunctionComponent } from '../utils/is-function-component.js';
import { metrics } from '../reports/metrics.js';

export default {
    meta: {
        type: 'suggestion',
        docs: {
            description: 'Компоненты должны использовать PascalCase',
        },
        schema: [],
        messages: {
            notPascal: 'Компонент "{{name}}" должен использовать PascalCase',
        },
    },
    create(context) {
        return {
            // function Component
            FunctionDeclaration(node) {
                if (!node.id) return;

                const name = node.id.name;

                if (isInsideComponent(node)) return;

                if (!isReturnsJSX(node.body)) return;

                metrics.componentNaming.checked++;

                if (!isPascalCase(name)) {
                    metrics.componentNaming.errors++;

                    context.report({
                        node: node.id,
                        messageId: 'notPascal',
                        data: { name },
                    });
                }
            },
            // const Component
            VariableDeclarator(node) {
                if (!node.id || node.id.type !== 'Identifier') return;

                const name = node.id.name;
                const init = node.init;

                if (!init) return;

                if (isInsideComponent(node)) return;

                if (isFunctionComponent(init)) {
                    metrics.componentNaming.checked++;

                    if (!isPascalCase(name)) {
                        metrics.componentNaming.errors++;

                        context.report({
                            node: node.id,
                            messageId: 'notPascal',
                            data: { name },
                        });
                    }
                    return;
                }

                if (isReactWrapper(init)) {
                    const arg = init.arguments[0];
                    if (!arg) return;

                    if (isFunctionComponent(arg)) {
                        metrics.componentNaming.checked++;

                        if (!isPascalCase(name)) {
                            metrics.componentNaming.errors++;

                            context.report({
                                node: node.id,
                                messageId: 'notPascal',
                                data: { name },
                            });
                        }
                    }
                }
            },
            ClassDeclaration(node) {
                const name = node.id?.name;
                if (!name) return;

                const renderMethod = isClassComponent(node);

                if (!renderMethod) return;

                if (!isReturnsJSX(renderMethod.value.body)) return;

                metrics.componentNaming.checked++;

                if (!isPascalCase(name)) {
                    metrics.componentNaming.errors++;

                    context.report({
                        node: node.id,
                        messageId: 'notPascal',
                        data: { name },
                    });
                }
            },
        };
    },
};
