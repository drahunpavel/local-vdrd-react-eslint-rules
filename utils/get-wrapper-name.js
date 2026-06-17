export const getWrapperName = node => {
    if (!node || node.type !== "CallExpression") return null;
  
    const callee = node.callee;
  
    if (callee.type === "Identifier") {
      return callee.name;
    }
  
    if (callee.type === "MemberExpression") {
      return callee.property?.name ?? null;
    }
  
    return null;
  };
  