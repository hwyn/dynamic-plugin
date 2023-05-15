import { builderContext, FORWARD_MICRO } from '../../builder/builder-context';
export var forwardMicro = function (microName) { return builderContext.getFactory(FORWARD_MICRO)(microName); };
