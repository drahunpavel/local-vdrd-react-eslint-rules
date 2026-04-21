export const isReturnsJSX = init => {
    if (!init) return false;

    if (init.type === 'JSXElement' || init.type === 'JSXFragment') return true;

    if (init.type === 'BlockStatement') {
        return containsJSXReturn(init.body);
    }

    return false;
};

const containsJSXReturn = statements => {
    for (const stmt of statements) {
        if (stmt.type === 'ReturnStatement') {
            if (stmt.argument && (stmt.argument.type === 'JSXElement' || stmt.argument.type === 'JSXFragment')) {
                return true;
            }
        }

        // поиск внутри if/switch и тд
        if (stmt.consequent && containsJSXReturn(stmt.consequent.body || [])) return true;
        if (stmt.alternate && containsJSXReturn(stmt.alternate.body || [])) return true;
    }

    return false;
};
