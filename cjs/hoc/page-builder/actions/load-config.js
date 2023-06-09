"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.LoadConfig = void 0;
var tslib_1 = require("tslib");
/* eslint-disable max-classes-per-file */
var builder_1 = require("@dynamic/builder");
var builder_context_1 = require("../../../builder/builder-context");
var ui_element_consts_1 = require("../../../constst/ui-element.consts");
var loading_extension_1 = require("../loading.extension");
var loading_visibility_1 = require("./loading-visibility");
var CONTAINER = 'container';
var LoadConfig = /** @class */ (function (_super) {
    tslib_1.__extends(LoadConfig, _super);
    function LoadConfig() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    LoadConfig.prototype.execute = function (id, _a) {
        var props = _a.props, Model = _a.Model;
        return [{
                id: ui_element_consts_1.LOADING,
                type: ui_element_consts_1.LOADING,
                checkVisibility: {
                    action: loading_visibility_1.LoadingVisibility.actionName,
                    dependents: [
                        { type: builder_1.LOAD, fieldId: props.id || CONTAINER },
                        { type: loading_extension_1.OPEN_LOADING, fieldId: id },
                        { type: loading_extension_1.CLOSE_LOADING, fieldId: id }
                    ]
                }
            }, tslib_1.__assign({ id: CONTAINER, type: ui_element_consts_1.BUILDER, preloaded: false, BuilderModel: Model, dataSource: function (_a) {
                    var actionEvent = _a.actionEvent;
                    return actionEvent;
                } }, props)];
    };
    tslib_1.__decorate([
        tslib_1.__param(0, (0, builder_1.Event)('id')),
        tslib_1.__param(1, (0, builder_1.ActionProps)('params')),
        tslib_1.__metadata("design:type", Function),
        tslib_1.__metadata("design:paramtypes", [String, Object]),
        tslib_1.__metadata("design:returntype", void 0)
    ], LoadConfig.prototype, "execute", null);
    LoadConfig = tslib_1.__decorate([
        (0, builder_context_1.Action)("page-".concat((0, builder_1.generateUUID)(3)))
    ], LoadConfig);
    return LoadConfig;
}(builder_1.BaseAction));
exports.LoadConfig = LoadConfig;
