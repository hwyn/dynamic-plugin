import { __decorate, __metadata, __param } from "tslib";
/* eslint-disable max-classes-per-file */
import { ActionProps, BaseAction, Event, generateUUID, LOAD } from '@dynamic/builder';
import { Action } from '../../../builder/builder-context';
import { BUILDER, LOADING } from '../../../constst/ui-element.consts';
import { CLOSE_LOADING, OPEN_LOADING } from '../loading.extension';
import { LoadingVisibility } from './loading-visibility';
const CONTAINER = 'container';
let LoadConfig = class LoadConfig extends BaseAction {
    execute(id, { props, Model }) {
        return [{
                id: LOADING,
                type: LOADING,
                checkVisibility: {
                    action: LoadingVisibility.actionName,
                    dependents: [
                        { type: LOAD, fieldId: props.id || CONTAINER },
                        { type: OPEN_LOADING, fieldId: id },
                        { type: CLOSE_LOADING, fieldId: id }
                    ]
                }
            }, Object.assign({ id: CONTAINER, type: BUILDER, preloaded: false, BuilderModel: Model, dataSource: ({ actionEvent }) => actionEvent }, props)];
    }
};
__decorate([
    __param(0, Event('id')),
    __param(1, ActionProps('params')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", void 0)
], LoadConfig.prototype, "execute", null);
LoadConfig = __decorate([
    Action(`page-${generateUUID(3)}`)
], LoadConfig);
export { LoadConfig };
