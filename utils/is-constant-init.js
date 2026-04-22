import { isStaticLiteralTree } from './is-static-literal-tree.js';

export const isConstantInit = node => {
    if (!node) return false;

    // Literal
    if (node.type === 'Literal') {
        return true;
    }

    // Object
    if (node.type === 'ObjectExpression') {
        if (node.properties.length === 0) return false;
        return isStaticLiteralTree(node);
    }

    // Array
    if (node.type === 'ArrayExpression') {
        if (node.elements.length === 0) return false;
        return isStaticLiteralTree(node);
    }

    return false;
};
