import { builderContext, FORWARD_BUILDER } from '../../builder/builder-context';
export const forwardBuilder = (Model, props) => {
    return builderContext.getFactory(FORWARD_BUILDER)(Model, props);
};
export const setComponentDef = (Model, props) => {
    return Object.defineProperty(Model, 'componentDef', { value: forwardBuilder(Model, props) });
};
export const getComponentDef = (Model) => {
    return Model.componentDef;
};
