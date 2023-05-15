import { makeBuilderDecorator } from '@dynamic/builder';
import { builderContext, FORWARD_BUILDER } from '../../builder/builder-context';
export var forwardBuilder = function (Model, props) {
    return builderContext.getFactory(FORWARD_BUILDER)(Model, props);
};
export var ComponentBuilder = makeBuilderDecorator('ComponentBuilder', forwardBuilder);
