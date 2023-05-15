"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.forwardLoadingMicro = void 0;
var builder_1 = require("@dynamic/builder");
var ui_element_consts_1 = require("../../constst/ui-element.consts");
var forward_builder_1 = require("../forward-builder/forward-builder");
var forward_micro_1 = require("./forward-micro");
var forwardLoadingMicro = function (microName) {
    var microContent = "".concat(microName, "-content");
    var config = [{
            id: "".concat(microName, "-").concat(ui_element_consts_1.LOADING),
            type: ui_element_consts_1.LOADING,
            checkVisibility: {
                action: function () { return builder_1.Visibility.none; },
                dependents: { type: builder_1.MOUNTED, fieldId: microContent }
            }
        }, {
            id: microContent, type: (0, forward_micro_1.forwardMicro)(microName)
        }];
    return (0, forward_builder_1.forwardBuilder)(builder_1.BuilderModel, { config: config });
};
exports.forwardLoadingMicro = forwardLoadingMicro;
