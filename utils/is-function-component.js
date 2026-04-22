import { isReturnsJSX } from './is-returns-jsx.js';

export const isFunctionComponent = node =>
    node && (node.type === 'ArrowFunctionExpression' || node.type === 'FunctionExpression') && isReturnsJSX(node.body);
