const isDynamicImport = (node) => {
  if (!node) return false;

  // () => import('module')
  if (node.type === "ImportExpression") return true;

  // import() как CallExpression
  if (node.type === "CallExpression" && node.callee.type === "Import") {
    return true;
  }

  // import('x').then().catch()
  if (
    node.type === "CallExpression" &&
    node.callee.type === "MemberExpression"
  ) {
    return isDynamicImport(node.callee.object);
  }

  return false;
};

export const isLazyLoader = (node) => {
  if (!node) return false;

  if (
    node.type === "ArrowFunctionExpression" ||
    node.type === "FunctionExpression"
  ) {
    // () => import('x')
    if (node.expression) {
      return isDynamicImport(node.body);
    }

    // () => { return import('x') }
    if (node.body.type === "BlockStatement") {
      for (const stmt of node.body.body) {
        if (stmt.type === "ReturnStatement") {
          return isDynamicImport(stmt.argument);
        }
      }
    }
  }

  return false;
};
