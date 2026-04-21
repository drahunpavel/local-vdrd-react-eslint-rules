export const isStaticLiteralTree = init => {
    if (!init) return false;

    // примитивы
    if (init.type === 'Literal') return true;

    // объекты с примитивными значениями
    if (init.type === 'ObjectExpression') {
        return init.properties.every(prop => isStaticLiteralTree(prop.value));
    }

    // все элементы массива примитивы
    if (init.type === 'ArrayExpression') {
        return init.elements.every(el => isStaticLiteralTree(el));
    }

    return false;
};
