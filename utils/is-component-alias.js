import { isPascalCase } from "./naming-validators.js";

/**
    Проверяет, является ли узел компонентом-алиасом (реэкспорт компонента)
 */
export const isComponentAlias = node =>
    node?.type === 'Identifier' && isPascalCase(node.name);