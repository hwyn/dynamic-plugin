import { __assign, __decorate, __extends, __metadata, __param } from "tslib";
import { ActionProps, BaseAction, Event, generateUUID } from '@dynamic/builder';
import { Action } from '../../builder/builder-context';
var LoadConfig = /** @class */ (function (_super) {
    __extends(LoadConfig, _super);
    function LoadConfig() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    LoadConfig.prototype.execute = function (_a, source) {
        var grid = _a.grid, jsonField = _a.jsonField;
        if (source === void 0) { source = []; }
        var _b = jsonField.dataSource, _c = _b === void 0 ? {} : _b, _d = _c.metadata, metadata = _d === void 0 ? {} : _d;
        return {
            grid: grid,
            fields: source.map(function (s, index) { return (__assign(__assign({}, jsonField), { metadata: { targetIndex: index }, dataSource: { metadata: metadata, action: function () { return s; } }, id: "".concat(jsonField.id, "-").concat(s.id || s.key || index) })); })
        };
    };
    __decorate([
        __param(0, ActionProps('params')),
        __param(1, Event('source')),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", [Object, Array]),
        __metadata("design:returntype", void 0)
    ], LoadConfig.prototype, "execute", null);
    LoadConfig = __decorate([
        Action("list-".concat(generateUUID(3)))
    ], LoadConfig);
    return LoadConfig;
}(BaseAction));
export { LoadConfig };
