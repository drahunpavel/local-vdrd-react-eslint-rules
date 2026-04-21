export const isClassComponent = node => {
    const superClass = node.superClass;
    if (!superClass) return null;

    const isReactComponent =
        (superClass.type === 'MemberExpression' &&
            superClass.object.name === 'React' &&
            (superClass.property.name === 'Component' || superClass.property.name === 'PureComponent')) ||
        (superClass.type === 'Identifier' && (superClass.name === 'Component' || superClass.name === 'PureComponent'));

    if (!isReactComponent) return null;

    const renderMethod = node.body.body.find(m => m.type === 'MethodDefinition' && m.key.name === 'render');

    if (renderMethod) return renderMethod;

    return null;
};
