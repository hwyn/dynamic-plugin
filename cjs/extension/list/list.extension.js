"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ListExtension = void 0;
var tslib_1 = require("tslib");
var builder_1 = require("@dynamic/builder");
var lodash_1 = require("lodash");
var builder_context_1 = require("../../builder/builder-context");
var forward_builder_1 = require("../../hoc/forward-builder/forward-builder");
var load_config_1 = require("./load-config");
var ListExtension = /** @class */ (function (_super) {
    tslib_1.__extends(ListExtension, _super);
    function ListExtension() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.jsonGrid = _this.json.grid;
        _this.proxyFields = [];
        return _this;
    }
    ListExtension.prototype.beforeExtension = function () {
        this.proxyFields = this.mapFields(this.jsonFields.filter(function (_a) {
            var listMetadata = _a.listMetadata;
            return !(0, lodash_1.isEmpty)(listMetadata);
        }), this.cloneField.bind(this));
    };
    ListExtension.prototype.extension = function () {
        this.eachFields(this.proxyFields, this.proxyField.bind(this));
    };
    ListExtension.prototype.cloneField = function (_a) {
        var _this = this;
        var _jsonField = _a[0], builderField = _a[1];
        var jsonField = this.cloneDeepPlain(_jsonField);
        this.pushCalculators(_jsonField, {
            action: this.bindCalculatorAction(function (_a) {
                var actionEvent = _a.actionEvent;
                return _this.resetElement(jsonField, builderField, actionEvent);
            }),
            dependents: { fieldId: _jsonField.id, type: builder_1.DATA_SOURCE }
        });
        return jsonField;
    };
    ListExtension.prototype.proxyField = function (_a) {
        var _b;
        var jsonField = _a[0], builderField = _a[1];
        var _c = jsonField.listMetadata, listMetadata = _c === void 0 ? {} : _c, otherJsonField = tslib_1.__rest(jsonField, ["listMetadata"]);
        var listLayout = listMetadata.listLayout, justify = listMetadata.justify, alignItems = listMetadata.alignItems, _d = listMetadata.spacing, spacing = _d === void 0 ? (_b = this.jsonGrid) === null || _b === void 0 ? void 0 : _b.spacing : _d;
        var params = { grid: { spacing: spacing, justify: justify, alignItems: alignItems }, jsonField: tslib_1.__assign(tslib_1.__assign({}, otherJsonField), { layout: listLayout }) };
        var configAction = { name: load_config_1.LoadConfig.actionName, params: params };
        builderField.element = (0, forward_builder_1.forwardBuilder)(builder_1.BuilderModel, { configAction: configAction });
        if (this.isBuildField(jsonField)) {
            this.builderAttr.forEach(function (key) { return delete builderField.field[key]; });
        }
    };
    ListExtension.prototype.resetElement = function (cloneJsonField, builderField, dataSource) {
        cloneJsonField.dataSource.source = dataSource;
        this.proxyField([cloneJsonField, builderField]);
    };
    ListExtension = tslib_1.__decorate([
        (0, builder_context_1.Extension)()
    ], ListExtension);
    return ListExtension;
}(builder_1.BasicExtension));
exports.ListExtension = ListExtension;
