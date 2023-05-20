"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.LoadingVisibility = void 0;
var tslib_1 = require("tslib");
var builder_1 = require("@dynamic/builder");
var builder_context_1 = require("../../../builder/builder-context");
var loading_extension_1 = require("../loading.extension");
var LoadingVisibility = /** @class */ (function (_super) {
    tslib_1.__extends(LoadingVisibility, _super);
    function LoadingVisibility() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.count = 1;
        _this.st = null;
        return _this;
    }
    LoadingVisibility.prototype.execute = function (_a) {
        var callType = _a[0].type;
        callType === loading_extension_1.OPEN_LOADING ? this.count += 1 : this.count < 1 ? this.count = 0 : this.count -= 1;
        var isNone = this.count === 0;
        if (isNone && typeof window !== 'undefined') {
            this.asyncExec();
        }
        return isNone ? builder_1.Visibility.none : builder_1.Visibility.visible;
    };
    LoadingVisibility.prototype.asyncExec = function () {
        var _this = this;
        this.st && clearInterval(this.st);
        this.st = setTimeout(function () {
            _this.builder.ready && _this.builder.detectChanges();
            _this.st = null;
        });
    };
    tslib_1.__decorate([
        tslib_1.__param(0, (0, builder_1.CallLink)()),
        tslib_1.__metadata("design:type", Function),
        tslib_1.__metadata("design:paramtypes", [Array]),
        tslib_1.__metadata("design:returntype", void 0)
    ], LoadingVisibility.prototype, "execute", null);
    LoadingVisibility = tslib_1.__decorate([
        (0, builder_context_1.Action)("page-".concat((0, builder_1.generateUUID)(3)), { cache: true })
    ], LoadingVisibility);
    return LoadingVisibility;
}(builder_1.BaseAction));
exports.LoadingVisibility = LoadingVisibility;
