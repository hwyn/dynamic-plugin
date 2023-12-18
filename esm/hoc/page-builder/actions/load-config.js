import { __decorate, __metadata, __param, __rest } from "tslib";
import { ActionProps, BaseAction, Event, LOAD } from '@dynamic/builder';
import { Action } from '../../../builder/builder-context';
import { BUILDER, LOADING } from '../../../constst/ui-element.consts';
import { CLOSE_LOADING, OPEN_LOADING } from '../loading.extension';
import { LoadingVisibility } from './loading-visibility';
const CONTAINER = 'container';
let LoadConfig = class LoadConfig extends BaseAction {
    execute(_a, _b) {
        var { id } = _a, pageProps = __rest(_a, ["id"]);
        var props = _b.props, Model = _b.Model;
        const { loading = true } = props, others = __rest(props, ["loading"]);
        return [
            ...loading ? [{
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
                }] : [],
            Object.assign({ id: CONTAINER, type: BUILDER, preloaded: false, BuilderModel: Model, pageProps: pageProps }, others)
        ];
    }
};
__decorate([
    __param(0, Event()),
    __param(1, ActionProps('params')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", void 0)
], LoadConfig.prototype, "execute", null);
LoadConfig = __decorate([
    Action(`PAGE-BB388BFF`)
], LoadConfig);
export { LoadConfig };
