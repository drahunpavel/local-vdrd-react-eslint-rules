const isCreateContextCall = node => {
  if (node?.type !== "CallExpression") return false;

  const { callee } = node;

  if (callee?.type === "Identifier") {
    return callee.name === "createContext";
  }

  if (callee?.type === "MemberExpression") {
    return (
      callee.object?.name === "React" &&
      callee.property?.name === "createContext"
    );
  }

  return false;
};

export const isContextInit = node => {
  if (!node) return false;

  if (node.type === "TSAsExpression") return isContextInit(node.expression);
  
  return isCreateContextCall(node);
};
