import { isReturnsJSX } from './is-returns-jsx.js';

export const isFunctionComponent = init =>
    init && (init.type === 'ArrowFunctionExpression' || init.type === 'FunctionExpression') && isReturnsJSX(init.body);
