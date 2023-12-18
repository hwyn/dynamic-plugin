import { __decorate, __extends, __metadata, __param } from "tslib";
import { BaseAction, CallLink, Visibility } from '@dynamic/builder';
import { Action } from '../../../builder/builder-context';
import { OPEN_LOADING } from '../loading.extension';
var LoadingVisibility = /** @class */ (function (_super) {
    __extends(LoadingVisibility, _super);
    function LoadingVisibility() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.count = 1;
        _this.st = null;
        return _this;
    }
    LoadingVisibility.prototype.execute = function (_a) {
        var callType = _a[0].type;
        callType === OPEN_LOADING ? this.count += 1 : this.count < 1 ? this.count = 0 : this.count -= 1;
        var isNone = this.count === 0;
        if (isNone && typeof window !== 'undefined') {
            this.asyncExec();
        }
        return isNone ? Visibility.none : Visibility.visible;
    };
    LoadingVisibility.prototype.asyncExec = function () {
        var _this = this;
        this.st && clearInterval(this.st);
        this.st = setTimeout(function () {
            _this.builder.ready && _this.builder.detectChanges();
            _this.st = null;
        }, 1);
    };
    __decorate([
        __param(0, CallLink()),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", [Array]),
        __metadata("design:returntype", void 0)
    ], LoadingVisibility.prototype, "execute", null);
    LoadingVisibility = __decorate([
        Action("PAGE-EFB814E9", { cache: true })
    ], LoadingVisibility);
    return LoadingVisibility;
}(BaseAction));
export { LoadingVisibility };
