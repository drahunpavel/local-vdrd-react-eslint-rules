export const unwrapConstAssertion = node => {
    if (!node) return node;

    if (node.type === 'TSSatisfiesExpression') return unwrapConstAssertion(node.expression);

    if (node.type === 'TSAsExpression') return node.expression;
    if (node.type === 'TSConstAssertion') return node.expression;

    return node;
};