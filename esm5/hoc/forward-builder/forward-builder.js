import { builderContext, FORWARD_BUILDER } from '../../builder/builder-context';
import { BuilderDef } from './builder-def';
export var forwardBuilder = function (Model, props) {
    var _a;
    return ((_a = builderContext.getFactory(FORWARD_BUILDER)) !== null && _a !== void 0 ? _a : BuilderDef.create)(Model, props);
};
export var setComponentDef = function (Model, props) {
    return Object.defineProperty(Model, 'componentDef', { value: forwardBuilder(Model, props) });
};
export var getComponentDef = function (Model) {
    return Model.componentDef;
};
