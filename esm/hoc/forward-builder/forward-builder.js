import { makeBuilderDecorator } from '@dynamic/builder';
import { builderContext, FORWARD_BUILDER } from '../../builder/builder-context';
export const forwardBuilder = (Model, props) => {
    return builderContext.getFactory(FORWARD_BUILDER)(Model, props);
};
export const ComponentBuilder = makeBuilderDecorator('ComponentBuilder', forwardBuilder);
