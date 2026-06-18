const NAVIGATOR_FACTORY_PATTERN =
  /^create(?:Native)?(?:Stack|BottomTab|MaterialTopTab|Drawer|Navigator)/;

export const isNavigatorFactory = (node) => {
  if (node?.type !== "CallExpression") return false;

  const callee = node.callee;
  const name =
    callee?.type === "Identifier"
      ? callee.name
      : callee?.type === "MemberExpression"
        ? callee.property?.name
        : null;

  return Boolean(name && NAVIGATOR_FACTORY_PATTERN.test(name));
};
