import { __decorate, __metadata, __param } from "tslib";
import { BaseAction, CallLink, Visibility } from '@hwy-fm/builder';
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
        const isNone = this.count === 0;
        if (isNone && typeof window !== 'undefined') {
            this.asyncExec();
        }
        return isNone ? Visibility.none : Visibility.visible;
    }
    asyncExec() {
        this.st && clearInterval(this.st);
        this.st = setTimeout(() => {
            this.builder.ready && this.builder.detectChanges();
            this.st = null;
        }, 1);
    }
};
__decorate([
    __param(0, CallLink()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Array]),
    __metadata("design:returntype", void 0)
], LoadingVisibility.prototype, "execute", null);
LoadingVisibility = __decorate([
    Action(`PAGE-EFB814E9`, { cache: true })
], LoadingVisibility);
export { LoadingVisibility };
