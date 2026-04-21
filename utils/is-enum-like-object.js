export const isEnumLikeObject = init => {
    if (init?.type !== 'ObjectExpression') return false;

    if (init.properties.length === 0) return false;

    // все values - примитивы
    return init.properties.every(prop => {
        if (prop.type !== 'Property') return false;

        const value = prop.value;

        if (value.type === 'Literal') return true;
        if (value.type === 'TemplateLiteral' && value.expressions.length === 0) {
            return true;
        }

        return false;
    });
};
