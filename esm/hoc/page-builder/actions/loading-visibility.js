import { __decorate, __metadata, __param } from "tslib";
import { BaseAction, CallLink, generateUUID, Visibility } from '@dynamic/builder';
import { Action } from '../../../builder/builder-context';
import { OPEN_LOADING } from '../loading.extension';
let LoadingVisibility = class LoadingVisibility extends BaseAction {
    constructor() {
        super(...arguments);
        this.count = 1;
        this.st = null;
    }
    execute([{ type: callType }]) {
        callType === OPEN_LOADING ? this.count += 1 : this.count < 1 ? this.count = 0 : this.count -= 1;
        if (this.count === 0 && !this.st && typeof window !== 'undefined') {
            this.st = setTimeout(() => this.builder.ready && this.builder.detectChanges());
        }
        return this.count === 0 ? Visibility.none : Visibility.visible;
    }
};
__decorate([
    __param(0, CallLink()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Array]),
    __metadata("design:returntype", void 0)
], LoadingVisibility.prototype, "execute", null);
LoadingVisibility = __decorate([
    Action(`page-${generateUUID(3)}`, { cache: true })
], LoadingVisibility);
export { LoadingVisibility };