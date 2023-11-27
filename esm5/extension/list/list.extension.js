import { __assign, __decorate, __extends, __rest } from "tslib";
import { BasicExtension, BuilderModel, DATA_SOURCE } from '@dynamic/builder';
import { isEmpty } from 'lodash';
import { Extension } from '../../builder/builder-context';
import { forwardBuilder } from '../../hoc/forward-builder/forward-builder';
import { LoadConfig } from './load-config';
var ListExtension = /** @class */ (function (_super) {
    __extends(ListExtension, _super);
    function ListExtension() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.jsonGrid = _this.json.grid;
        _this.proxyFields = _this.initProxyFields();
        return _this;
    }
    ListExtension.prototype.initProxyFields = function () {
        return this.mapFields(this.jsonFields.filter(function (_a) {
            var listMetadata = _a.listMetadata;
            return !isEmpty(listMetadata);
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
            dependents: { fieldId: _jsonField.id, type: DATA_SOURCE }
        });
        return jsonField;
    };
    ListExtension.prototype.proxyField = function (_a) {
        var _b;
        var jsonField = _a[0], builderField = _a[1];
        var _c = jsonField.listMetadata, listMetadata = _c === void 0 ? {} : _c, otherJsonField = __rest(jsonField, ["listMetadata"]);
        var listLayout = listMetadata.listLayout, justify = listMetadata.justify, alignItems = listMetadata.alignItems, _d = listMetadata.spacing, spacing = _d === void 0 ? (_b = this.jsonGrid) === null || _b === void 0 ? void 0 : _b.spacing : _d;
        var params = { grid: { spacing: spacing, justify: justify, alignItems: alignItems }, jsonField: __assign(__assign({}, otherJsonField), { layout: listLayout }) };
        var configAction = { name: LoadConfig.actionName, params: params };
        builderField.element = forwardBuilder(BuilderModel, { configAction: configAction });
        if (this.isBuildField(jsonField)) {
            this.builderAttr.forEach(function (key) { return delete builderField.field[key]; });
        }
    };
    ListExtension.prototype.resetElement = function (cloneJsonField, builderField, dataSource) {
        cloneJsonField.dataSource.source = dataSource;
        this.proxyField([cloneJsonField, builderField]);
    };
    ListExtension = __decorate([
        Extension()
    ], ListExtension);
    return ListExtension;
}(BasicExtension));
export { ListExtension };
