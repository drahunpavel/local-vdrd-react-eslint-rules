const WRAPPER_NAMES = ['memo', 'forwardRef', 'observer', 'lazy'];

export const isReactWrapper = node => {
    if (!node) return false;

    if (node.type !== 'CallExpression') return false;

    const callee = node.callee;


    if (callee.type === 'Identifier') {
        return WRAPPER_NAMES.includes(callee.name);
    }

    if (callee.type === 'MemberExpression') {
        return WRAPPER_NAMES.includes(callee.property.name);
    }

    return false;
};
