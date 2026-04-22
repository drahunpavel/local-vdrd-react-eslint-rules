export const isReturnsJSX = (node) => {
  if (!node) return false;

  if (node.type === "JSXElement" || node.type === "JSXFragment") return true;

  if (node.type === "ArrowFunctionExpression") {
    return isReturnsJSX(node.body);
  }

  if (
    node.type === "FunctionDeclaration" ||
    node.type === "FunctionExpression" ||
    node.type === "ArrowFunctionExpression" ||
    node.type === "MethodDefinition"
  ) {
    return isReturnsJSX(node.body);
  }

  if (node.type === "BlockStatement") {
    return containsJSXReturn(node.body);
  }

  return false;
};

const containsJSXReturn = (statements) => {
  if (!Array.isArray(statements)) return false;

  for (const stmt of statements) {
    if (!stmt) continue;

    if (stmt.type === "ReturnStatement") {
      if (
        stmt.argument &&
        (stmt.argument.type === "JSXElement" ||
          stmt.argument.type === "JSXFragment")
      ) {
        return true;
      }
    }

    // поиск внутри if/switch
    if (stmt.type === "IfStatement") {
      if (containsJSXReturn(stmt.consequent?.body)) return true;
      if (containsJSXReturn(stmt.alternate?.body)) return true;
    }
    if (stmt.type === "SwitchStatement") {
      for (const cs of stmt.cases) {
        if (containsJSXReturn(cs.consequent)) return true;
      }
    }

    // вложенные блоки
    if (stmt.type === "BlockStatement") {
      if (containsJSXReturn(stmt.body)) return true;
    }
  }

  return false;
};
