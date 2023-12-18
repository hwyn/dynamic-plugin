import { __assign } from "tslib";
import { generateUUID, makeBuilderDecorator } from '@dynamic/builder';
import { setComponentDef } from '../forward-builder/forward-builder';
function forwardComponent(Model, props) {
    return setComponentDef(Model, __assign({ id: generateUUID(8) }, props));
}
export var ComponentBuilder = makeBuilderDecorator('ComponentBuilder', forwardComponent);
