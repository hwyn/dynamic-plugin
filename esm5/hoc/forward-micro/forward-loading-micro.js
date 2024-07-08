import { BuilderModel, MOUNTED, Visibility } from '@hwy-fm/builder';
import { LOADING } from '../../constst/ui-element.consts';
import { forwardBuilder } from '../forward-builder/forward-builder';
import { forwardMicro } from './forward-micro';
export var forwardLoadingMicro = function (microName) {
    var microContent = "".concat(microName, "-content");
    var config = [{
            id: "".concat(microName, "-").concat(LOADING),
            type: LOADING,
            checkVisibility: {
                action: function () { return Visibility.none; },
                dependents: { type: MOUNTED, fieldId: microContent }
            }
        }, {
            id: microContent, type: forwardMicro(microName)
        }];
    return forwardBuilder(BuilderModel, { config: config });
};
