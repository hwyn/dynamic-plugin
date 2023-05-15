import { __decorate, __extends, __metadata, __param } from "tslib";
import { BaseAction, CallLink, generateUUID, Visibility } from '@dynamic/builder';
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
        var _this = this;
        var callType = _a[0].type;
        callType === OPEN_LOADING ? this.count += 1 : this.count < 1 ? this.count = 0 : this.count -= 1;
        if (this.count === 0 && !this.st && typeof window !== 'undefined') {
            this.st = setTimeout(function () { return _this.builder.ready && _this.builder.detectChanges(); });
        }
        return this.count === 0 ? Visibility.none : Visibility.visible;
    };
    __decorate([
        __param(0, CallLink()),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", [Array]),
        __metadata("design:returntype", void 0)
    ], LoadingVisibility.prototype, "execute", null);
    LoadingVisibility = __decorate([
        Action("page-".concat(generateUUID(3)), { cache: true })
    ], LoadingVisibility);
    return LoadingVisibility;
}(BaseAction));
export { LoadingVisibility };
