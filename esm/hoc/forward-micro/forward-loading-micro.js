import { BuilderModel, MOUNTED, Visibility } from '@dynamic/builder';
import { LOADING } from '../../constst/ui-element.consts';
import { forwardBuilder } from '../forward-builder/forward-builder';
import { forwardMicro } from './forward-micro';
export const forwardLoadingMicro = (microName) => {
    const microContent = `${microName}-content`;
    const config = [{
            id: `${microName}-${LOADING}`,
            type: LOADING,
            checkVisibility: {
                action: () => Visibility.none,
                dependents: { type: MOUNTED, fieldId: microContent }
            }
        }, {
            id: microContent, type: forwardMicro(microName)
        }];
    return forwardBuilder(BuilderModel, { config });
};
