import { isStaticLiteralTree } from './is-static-literal-tree.js';

export const isConstantInit = init => {
    if (!init) return false;

    // Literal
    if (init.type === 'Literal') {
        return true;
    }

    // Object
    if (init.type === 'ObjectExpression') {
        if (init.properties.length === 0) return false;
        return isStaticLiteralTree(init);
    }

    // Array
    if (init.type === 'ArrayExpression') {
        if (init.elements.length === 0) return false;
        return isStaticLiteralTree(init);
    }

    return false;
};
