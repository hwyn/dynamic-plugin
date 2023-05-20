"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.LoadConfig = void 0;
var tslib_1 = require("tslib");
var builder_1 = require("@dynamic/builder");
var builder_context_1 = require("../../builder/builder-context");
var LoadConfig = /** @class */ (function (_super) {
    tslib_1.__extends(LoadConfig, _super);
    function LoadConfig() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    LoadConfig.prototype.execute = function (_a, source) {
        var grid = _a.grid, jsonField = _a.jsonField;
        if (source === void 0) { source = []; }
        var _b = jsonField.dataSource, _c = _b === void 0 ? {} : _b, _d = _c.metadata, metadata = _d === void 0 ? {} : _d;
        return {
            grid: grid,
            fields: source.map(function (s, index) { return (tslib_1.__assign(tslib_1.__assign({}, jsonField), { metadata: { targetIndex: index }, dataSource: { metadata: metadata, action: function () { return s; } }, id: "".concat(jsonField.id, "-").concat(s.id || s.key || index) })); })
        };
    };
    tslib_1.__decorate([
        tslib_1.__param(0, (0, builder_1.ActionProps)('params')),
        tslib_1.__param(1, (0, builder_1.Event)('source')),
        tslib_1.__metadata("design:type", Function),
        tslib_1.__metadata("design:paramtypes", [Object, Array]),
        tslib_1.__metadata("design:returntype", void 0)
    ], LoadConfig.prototype, "execute", null);
    LoadConfig = tslib_1.__decorate([
        (0, builder_context_1.Action)("list-".concat((0, builder_1.generateUUID)(3)))
    ], LoadConfig);
    return LoadConfig;
}(builder_1.BaseAction));
exports.LoadConfig = LoadConfig;
