import { __assign, __decorate, __extends, __metadata, __param } from "tslib";
/* eslint-disable no-new-func */
import { ActionProps, BaseAction, META_TYPE } from '@dynamic/builder';
import { Inject, MethodProxy } from '@fm/di';
import { Action } from '../../builder/builder-context';
var Bind = /** @class */ (function (_super) {
    __extends(Bind, _super);
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
        return fn(this.meta, __assign(__assign({}, this.builderField), { viewModel: this.builder.viewModel }), this);
    };
    __decorate([
        Inject(META_TYPE),
        __metadata("design:type", Object)
    ], Bind.prototype, "meta", void 0);
    __decorate([
        Inject(MethodProxy),
        __metadata("design:type", MethodProxy)
    ], Bind.prototype, "mp", void 0);
    __decorate([
        __param(0, ActionProps('params.bindAttr')),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", [String]),
        __metadata("design:returntype", void 0)
    ], Bind.prototype, "execute", null);
    Bind = __decorate([
        Action('bind', { cache: true })
    ], Bind);
    return Bind;
}(BaseAction));
export { Bind };
