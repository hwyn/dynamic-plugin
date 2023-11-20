import { makeBuilderDecorator } from '@dynamic/builder';
import { setComponentDef } from '../forward-builder/forward-builder';
export var ComponentBuilder = makeBuilderDecorator('ComponentBuilder', setComponentDef);
