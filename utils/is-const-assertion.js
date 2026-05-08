export const isConstAssertion = node => {
    if (!node) return false;

    // const Obj = ({...} as const) satisfies SomeType
    if (node.type === 'TSSatisfiesExpression') {
        return isConstAssertion(node.expression);
    }

    // const Obj = {...} as const
    if (node.type === 'TSAsExpression') {
        const type = node.typeAnnotation;
        return (
            type?.type === 'TSTypeReference' &&
            type.typeName?.type === 'Identifier' &&
            type.typeName.name === 'const'
        );
    }

    return false;
};