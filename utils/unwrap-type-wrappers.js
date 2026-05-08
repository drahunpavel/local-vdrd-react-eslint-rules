export const unwrapTypeWrappers = node => {
    if (!node) return node;
    if (node.type === 'TSSatisfiesExpression') return unwrapTypeWrappers(node.expression);
    if (node.type === 'TSAsExpression') return unwrapTypeWrappers(node.expression);
    if (node.type === 'TSConstAssertion') return unwrapTypeWrappers(node.expression);
    return node;
};