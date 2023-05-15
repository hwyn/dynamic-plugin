import { builderContext, FORWARD_MICRO } from '../../builder/builder-context';
export const forwardMicro = (microName) => builderContext.getFactory(FORWARD_MICRO)(microName);
