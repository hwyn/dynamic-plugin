"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.LoadConfig = void 0;
var tslib_1 = require("tslib");
var builder_1 = require("@hwy-fm/builder");
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
    LoadConfig.prototype.execute = function (_a, _b) {
        var id = _a.id, pageProps = tslib_1.__rest(_a, ["id"]);
        var props = _b.props, Model = _b.Model;
        var _c = props.loading, loading = _c === void 0 ? true : _c, others = tslib_1.__rest(props, ["loading"]);
        return tslib_1.__spreadArray(tslib_1.__spreadArray([], loading ? [{
                id: ui_element_consts_1.LOADING,
                type: ui_element_consts_1.LOADING,
                checkVisibility: {
                    action: loading_visibility_1.LoadingVisibility.actionName,
                    dependents: [
                        { type: builder_1.LOAD, fieldId: props.id || CONTAINER, nonSelf: true },
                        { type: loading_extension_1.OPEN_LOADING, fieldId: id },
                        { type: loading_extension_1.CLOSE_LOADING, fieldId: id }
                    ]
                }
            }] : [], true), [
            tslib_1.__assign({ id: CONTAINER, type: ui_element_consts_1.BUILDER, preloaded: false, BuilderModel: Model, pageProps: pageProps }, others)
        ], false);
    };
    tslib_1.__decorate([
        tslib_1.__param(0, (0, builder_1.Event)()),
        tslib_1.__param(1, (0, builder_1.ActionProps)('params')),
        tslib_1.__metadata("design:type", Function),
        tslib_1.__metadata("design:paramtypes", [Object, Object]),
        tslib_1.__metadata("design:returntype", void 0)
    ], LoadConfig.prototype, "execute", null);
    LoadConfig = tslib_1.__decorate([
        (0, builder_context_1.Action)("PAGE-BB388BFF")
    ], LoadConfig);
    return LoadConfig;
}(builder_1.BaseAction));
exports.LoadConfig = LoadConfig;
