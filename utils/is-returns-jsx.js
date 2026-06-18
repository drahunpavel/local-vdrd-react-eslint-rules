// проверяет, является ли узел прямым JSX
const isDirectJSX = (node) =>
  node?.type === "JSXElement" || node?.type === "JSXFragment";

// return без JSX
const isDelegatedReturn = (argument) => {
  if (!argument) return true;

  if (
    argument.type === "CallExpression" ||
    argument.type === "Identifier" ||
    argument.type === "Literal" ||
    argument.type === "NullLiteral"
  ) {
    return true;
  }

  if (argument.type === "ConditionalExpression") {
    return (
      isDelegatedReturn(argument.consequent) &&
      isDelegatedReturn(argument.alternate)
    );
  }

  if (argument.type === "LogicalExpression") {
    return (
      isDelegatedReturn(argument.left) &&
      isDelegatedReturn(argument.right)
    );
  }

  return false;
};

// if (x) return helper() — с фигурными скобками и без
const getIfBranchStatements = (branch) => {
  if (!branch) return [];
  if (branch.type === "BlockStatement") return branch.body;
  return [branch];
};

// собирает все return из тела функции (switch/if/блоки)
const collectReturnStatements = (statements) => {
  const returns = [];

  if (!Array.isArray(statements)) return returns;

  for (const stmt of statements) {
    if (!stmt) continue;

    if (stmt.type === "ReturnStatement") {
      returns.push(stmt);
      continue;
    }

    if (stmt.type === "IfStatement") {
      returns.push(
        ...collectReturnStatements(getIfBranchStatements(stmt.consequent))
      );
      if (stmt.alternate) {
        returns.push(
          ...collectReturnStatements(getIfBranchStatements(stmt.alternate))
        );
      }
      continue;
    }

    if (stmt.type === "SwitchStatement") {
      for (const switchCase of stmt.cases) {
        returns.push(...collectReturnStatements(switchCase.consequent));
      }
      continue;
    }

    if (stmt.type === "BlockStatement") {
      returns.push(...collectReturnStatements(stmt.body));
    }
  }

  return returns;
};

// true - все return делегируют результат, jsx нет
const returnsOnlyDelegated = (statements) => {
  const returns = collectReturnStatements(statements);

  if (returns.length === 0) return false;

  return returns.every((stmt) => isDelegatedReturn(stmt.argument));
};

// true - есть прямой jsx return
const hasDirectJSXReturn = (statements) => {
  if (!Array.isArray(statements)) return false;

  for (const stmt of statements) {
    if (!stmt) continue;

    if (stmt.type === "ReturnStatement") {
      if (isDirectJSX(stmt.argument)) return true;
      continue;
    }

    if (stmt.type === "IfStatement") {
      if (hasDirectJSXReturn(getIfBranchStatements(stmt.consequent))) return true;
      if (
        stmt.alternate &&
        hasDirectJSXReturn(getIfBranchStatements(stmt.alternate))
      ) {
        return true;
      }
      continue;
    }

    if (stmt.type === "SwitchStatement") {
      for (const switchCase of stmt.cases) {
        if (hasDirectJSXReturn(switchCase.consequent)) return true;
      }
      continue;
    }

    if (stmt.type === "BlockStatement") {
      if (hasDirectJSXReturn(stmt.body)) return true;
    }
  }

  return false;
};

export const isReturnsJSX = (node) => {
  if (!node) return false;

  if (node.type === "JSXElement" || node.type === "JSXFragment") return true;

  if (node.type === "ArrowFunctionExpression") {
    return isReturnsJSX(node.body);
  }

  if (
    node.type === "FunctionDeclaration" ||
    node.type === "FunctionExpression" ||
    node.type === "MethodDefinition"
  ) {
    return isReturnsJSX(node.body);
  }

  if (node.type === "BlockStatement") {
    // getLabel: switch/case без JSX
    if (returnsOnlyDelegated(node.body)) return false;

    // UserProfile: return <div /> (компонент)
    return hasDirectJSXReturn(node.body);
  }

  return false;
};