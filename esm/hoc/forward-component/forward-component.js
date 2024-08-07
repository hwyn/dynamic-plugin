import { generateUUID, makeBuilderDecorator } from '@hwy-fm/builder';
import { setComponentDef } from '../forward-builder/forward-builder';
function forwardComponent(Model, props) {
    return setComponentDef(Model, Object.assign({ id: generateUUID(8) }, props));
}
export const ComponentBuilder = makeBuilderDecorator('ComponentBuilder', forwardComponent);
