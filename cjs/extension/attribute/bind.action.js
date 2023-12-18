"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Bind = void 0;
var tslib_1 = require("tslib");
/* eslint-disable no-new-func */
var builder_1 = require("@dynamic/builder");
var di_1 = require("@fm/di");
var builder_context_1 = require("../../builder/builder-context");
var Bind = /** @class */ (function (_super) {
    tslib_1.__extends(Bind, _super);
    function Bind() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Bind.prototype.parseTemplate = function (code) {
        return /^\$.+/ig.test(code) || /^'|".*?'|"/ig.test(code) || !isNaN(code) ? code : "meta.".concat(code);
    };
    Bind.prototype.executeMethod = function (method) {
        var _this = this;
        var paramsArray = method.replace(/[\w]+\((.*?)\)/ig, '$1').replace(/\s?/g, '').split(',').filter(function (_) { return _ !== ''; });
        var params = paramsArray.map(function (item) { return _this.parseTemplate(item); });
        return "meta.".concat(method.replace(/([^\\(]+).*/g, '$1'), "(").concat(params.join(','), ");");
    };
    Bind.prototype.execute = function (bindAttr) {
        var code = /(\w+)\((.*?)\)(?=\s*)/ig.test(bindAttr) ? this.executeMethod(bindAttr) : this.parseTemplate(bindAttr);
        var fn = new Function('meta', '$', '$action', "return ".concat(code, ";\n"));
        return fn(this.meta, tslib_1.__assign(tslib_1.__assign({}, this.builderField), { viewModel: this.builder.viewModel }), this);
    };
    tslib_1.__decorate([
        (0, di_1.Inject)(builder_1.META_TYPE),
        tslib_1.__metadata("design:type", Object)
    ], Bind.prototype, "meta", void 0);
    tslib_1.__decorate([
        (0, di_1.Inject)(di_1.MethodProxy),
        tslib_1.__metadata("design:type", di_1.MethodProxy)
    ], Bind.prototype, "mp", void 0);
    tslib_1.__decorate([
        tslib_1.__param(0, (0, builder_1.ActionProps)('params.bindAttr')),
        tslib_1.__metadata("design:type", Function),
        tslib_1.__metadata("design:paramtypes", [String]),
        tslib_1.__metadata("design:returntype", void 0)
    ], Bind.prototype, "execute", null);
    Bind = tslib_1.__decorate([
        (0, builder_context_1.Action)('bind', { cache: true })
    ], Bind);
    return Bind;
}(builder_1.BaseAction));
exports.Bind = Bind;
