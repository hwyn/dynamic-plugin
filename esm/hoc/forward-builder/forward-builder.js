import { builderContext, FORWARD_BUILDER } from '../../builder/builder-context';
import { BuilderDef } from './builder-def';
export const forwardBuilder = (Model, props) => {
    var _a;
    return ((_a = builderContext.getFactory(FORWARD_BUILDER)) !== null && _a !== void 0 ? _a : BuilderDef.create)(Model, props);
};
export const setComponentDef = (Model, props) => {
    return Object.defineProperty(Model, 'componentDef', { value: forwardBuilder(Model, props) });
};
export const getComponentDef = (Model) => {
    return Model.componentDef;
};
