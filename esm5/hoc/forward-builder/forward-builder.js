import { builderContext, FORWARD_BUILDER } from '../../builder/builder-context';
export var forwardBuilder = function (Model, props) {
    return builderContext.getFactory(FORWARD_BUILDER)(Model, props);
};
export var setComponentDef = function (Model, props) {
    return Object.defineProperty(Model, 'componentDef', { value: forwardBuilder(Model, props) });
};
export var getComponentDef = function (Model) {
    return Model.componentDef;
};
