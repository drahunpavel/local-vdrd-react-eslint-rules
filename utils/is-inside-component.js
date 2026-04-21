import { isReturnsJSX } from './is-returns-jsx.js';

export const isInsideComponent = node => {
    let parent = node.parent;

    while (parent) {
        if (
            (parent.type === 'FunctionDeclaration' ||
                parent.type === 'FunctionExpression' ||
                parent.type === 'ArrowFunctionExpression') &&
            isReturnsJSX(parent.body)
        ) {
            return true;
        }

        // поднимаемся вверх по дереву AST
        // return true - элемент находится внутри компонента
        parent = parent.parent;
    }

    return false;
};
