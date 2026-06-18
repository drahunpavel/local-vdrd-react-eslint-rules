import { isPascalCase } from "./naming-validators.js";

/**
    Проверяет, является ли узел компонентом-алиасом (реэкспорт компонента)
 */
export const isComponentAlias = (node) => {
  // const DsLabeled = Labeled
  if (isPascalCaseIdentifier(node)) return true;

  // const DsLabeled = condition ? Labeled : Label
  if (node?.type === "ConditionalExpression") {
    return (
      isPascalCaseIdentifier(node.consequent) &&
      isPascalCaseIdentifier(node.alternate)
    );
  }

  // const SbPopupIcon = Object.assign(SbPopupIconComponent, { Item: MenuItem })
  if (isObjectAssignCall(node)) {
    return isPascalCaseIdentifier(node.arguments[0]);
  }

  return false;
};

const isPascalCaseIdentifier = (node) =>
  node?.type === "Identifier" && isPascalCase(node.name);

const isObjectAssignCall = (node) => {
  if (node?.type !== "CallExpression") return false;

  const { callee } = node;

  return (
    callee?.type === "MemberExpression" &&
    callee.object?.name === "Object" &&
    callee.property?.name === "assign"
  );
};
