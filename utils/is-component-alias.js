import { isPascalCase } from "./naming-validators.js";

/**
    Проверяет, является ли узел компонентом-алиасом (реэкспорт компонента)
 */
export const isComponentAlias = node => {
    // const DsLabeled = Labeled
    if (isPascalCaseIdentifier(node)) return true;

    // const DsLabeled = condition ? Labeled : Label
    if (node?.type === 'ConditionalExpression') {
        return (
            isPascalCaseIdentifier(node.consequent) &&
            isPascalCaseIdentifier(node.alternate)
        );
    }
    return false;
};

const isPascalCaseIdentifier = node =>
    node?.type === 'Identifier' && isPascalCase(node.name);