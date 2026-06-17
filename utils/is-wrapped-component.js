import { getWrapperName } from "./get-wrapper-name";
import { isFunctionComponent } from "./is-function-component";
import { isLazyLoader } from "./is-lazy-loader";
import { isReactWrapper } from "./is-react-wrapper";
import { isPascalCase } from "./naming-validators";

export const isWrappedComponent = node => {
    if (!isReactWrapper(node)) return false;

    const arg = node.arguments[0];
    if (!arg) return false;

    const wrapperName = getWrapperName(node);

    if (wrapperName === 'lazy') {
        return isLazyLoader(arg);
    }

    if (isFunctionComponent(arg)) return true;
    if (arg.type === 'Identifier' && isPascalCase(arg.name)) return true;

    return false;
};