import { __assign, __decorate, __extends, __metadata, __param, __rest, __spreadArray } from "tslib";
import { ActionProps, BaseAction, Event, LOAD } from '@hwy-fm/builder';
import { Action } from '../../../builder/builder-context';
import { BUILDER, LOADING } from '../../../constst/ui-element.consts';
import { CLOSE_LOADING, OPEN_LOADING } from '../loading.extension';
import { LoadingVisibility } from './loading-visibility';
var CONTAINER = 'container';
var LoadConfig = /** @class */ (function (_super) {
    __extends(LoadConfig, _super);
    function LoadConfig() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    LoadConfig.prototype.execute = function (_a, _b) {
        var id = _a.id, pageProps = __rest(_a, ["id"]);
        var props = _b.props, Model = _b.Model;
        var _c = props.loading, loading = _c === void 0 ? true : _c, others = __rest(props, ["loading"]);
        return __spreadArray(__spreadArray([], loading ? [{
                id: LOADING,
                type: LOADING,
                checkVisibility: {
                    action: LoadingVisibility.actionName,
                    dependents: [
                        { type: LOAD, fieldId: props.id || CONTAINER, nonSelf: true },
                        { type: OPEN_LOADING, fieldId: id },
                        { type: CLOSE_LOADING, fieldId: id }
                    ]
                }
            }] : [], true), [
            __assign({ id: CONTAINER, type: BUILDER, preloaded: false, BuilderModel: Model, pageProps: pageProps }, others)
        ], false);
    };
    __decorate([
        __param(0, Event()),
        __param(1, ActionProps('params')),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", [Object, Object]),
        __metadata("design:returntype", void 0)
    ], LoadConfig.prototype, "execute", null);
    LoadConfig = __decorate([
        Action("PAGE-BB388BFF")
    ], LoadConfig);
    return LoadConfig;
}(BaseAction));
export { LoadConfig };
