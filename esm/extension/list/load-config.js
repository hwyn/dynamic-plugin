import { __decorate, __metadata, __param } from "tslib";
import { ActionProps, BaseAction, Event, generateUUID } from '@hwy-fm/builder';
import { Action } from '../../builder/builder-context';
let LoadConfig = class LoadConfig extends BaseAction {
    execute({ grid, jsonField }, source = []) {
        const { dataSource: { metadata = {} } = {} } = jsonField;
        return {
            grid,
            fields: source.map((s, index) => (Object.assign(Object.assign({}, jsonField), { metadata: { targetIndex: index }, dataSource: { metadata, action: () => s }, id: `${jsonField.id}-${s.id || s.key || index}` })))
        };
    }
};
__decorate([
    __param(0, ActionProps('params')),
    __param(1, Event('source')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Array]),
    __metadata("design:returntype", void 0)
], LoadConfig.prototype, "execute", null);
LoadConfig = __decorate([
    Action(`list-${generateUUID(3)}`)
], LoadConfig);
export { LoadConfig };
