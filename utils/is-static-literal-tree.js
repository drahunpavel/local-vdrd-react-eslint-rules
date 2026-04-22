export const isStaticLiteralTree = node => {
    if (!node) return false;

    // примитивы
    if (node.type === 'Literal') return true;

    // объекты с примитивными значениями
    if (node.type === 'ObjectExpression') {
        return node.properties.every(prop => isStaticLiteralTree(prop.value));
    }

    // все элементы массива примитивы
    if (node.type === 'ArrayExpression') {
        return node.elements.every(el => isStaticLiteralTree(el));
    }

    return false;
};
