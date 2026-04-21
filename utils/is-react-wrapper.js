export const isReactWrapper = node => {
    if (!node) return false;

    if (node.type !== 'CallExpression') return false;

    const callee = node.callee;
    const wrapperNames = ['memo', 'forwardRef', 'observer'];

    if (callee.type === 'Identifier') {
        return wrapperNames.includes(callee.name);
    }

    if (callee.type === 'MemberExpression') {
        return wrapperNames.includes(callee.property.name);
    }

    return false;
};
