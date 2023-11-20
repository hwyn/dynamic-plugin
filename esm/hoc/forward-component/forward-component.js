import { makeBuilderDecorator } from '@dynamic/builder';
import { setComponentDef } from '../forward-builder/forward-builder';
export const ComponentBuilder = makeBuilderDecorator('ComponentBuilder', setComponentDef);
