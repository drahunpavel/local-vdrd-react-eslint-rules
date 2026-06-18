import { isUpperSnakeCase } from '../utils/naming-validators.js';
import { isCamelCase } from '../utils/naming-validators.js';
import { isEnumLikeObject } from '../utils/is-enum-like-object.js';
import { isFunctionComponent } from '../utils/is-function-component.js';
import { isPascalCase } from '../utils/naming-validators.js';
import { metrics } from '../reports/metrics.js';
import { unwrapTypeWrappers } from '../utils/unwrap-type-wrappers.js';
import { isWrappedComponent } from '../utils/is-wrapped-component.js';
import { isComponentAlias } from '../utils/is-component-alias.js';

export default {
    meta: {
        type: 'suggestion',
        docs: {
            description:
                'Переменные и функции должны использовать camelCase. Правило запускается последним в цепочке правил',
        },
        messages: {
            notCamelCase: 'Переменная или функция "{{name}}" должна использовать camelCase',
        },
        schema: [],
    },

    create(context) {
        return {
            VariableDeclarator(node) {
                const id = node.id;
                if (id?.type !== 'Identifier') return;

                const name = id.name;
                const init = node.init;

                if (!init) return;

                // React-компонент: const Label = () => <div />
                if (isFunctionComponent(init)) return;
                // React-компонент обернутый memo, forwardRef, lazy и тд
                if (isWrappedComponent(init)) return;

                // компонент-алиас/ реэкспорт компонента-алиаса
                if (isComponentAlias(init)) return;

                // исключение констант
                if (isUpperSnakeCase(name)) return;

                const realInit = unwrapTypeWrappers(init);
                // исключение enum
                if (isEnumLikeObject(realInit)) return;

                // исключение объектов и массивов
                if (realInit?.type === 'ObjectExpression') return;
                if (realInit?.type === 'ArrayExpression') return;

                metrics.variableAndFunctionNaming.checked++;

                if (!isCamelCase(name)) {
                    metrics.variableAndFunctionNaming.errors++;

                    context.report({
                        node: node.id,
                        messageId: 'notCamelCase',
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

                metrics.variableAndFunctionNaming.checked++;

                if (!isCamelCase(name)) {
                    metrics.variableAndFunctionNaming.errors++;

                    context.report({
                        node: id,
                        messageId: 'notCamelCase',
                        data: { name },
                    });
                }
            },
        };
    },
};
