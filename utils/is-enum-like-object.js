export const isEnumLikeObject = node => {
    if (node?.type !== 'ObjectExpression') return false;

    if (node.properties.length === 0) return false;

    // все values - примитивы
    return node.properties.every(prop => {
        if (prop.type !== 'Property') return false;

        const value = prop.value;

        if (value.type === 'Literal') return true;
        if (value.type === 'TemplateLiteral' && value.expressions.length === 0) {
            return true;
        }

        return false;
    });
};
