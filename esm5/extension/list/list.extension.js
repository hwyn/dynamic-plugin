import { __assign, __decorate, __extends, __rest } from "tslib";
import { BasicExtension, BuilderModel } from '@dynamic/builder';
import { isEmpty } from 'lodash';
import { Extension } from '../../builder/builder-context';
import { forwardBuilder } from '../../hoc/forward-builder/forward-builder';
import { LoadConfig } from './load-config';
var ListExtension = /** @class */ (function (_super) {
    __extends(ListExtension, _super);
    function ListExtension() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.jsonGrid = _this.json.grid;
        return _this;
    }
    ListExtension.prototype.extension = function () {
        this.eachFields(this.jsonFields.filter(function (_a) {
            var listMetadata = _a.listMetadata;
            return !isEmpty(listMetadata);
        }), this.proxyField.bind(this));
    };
    ListExtension.prototype.proxyField = function (_a) {
        var _b;
        var jsonField = _a[0], builderField = _a[1];
        var _c = this.cloneDeepPlain(jsonField), _d = _c.listMetadata, listMetadata = _d === void 0 ? {} : _d, otherJsonField = __rest(_c, ["listMetadata"]);
        var listLayout = listMetadata.listLayout, justify = listMetadata.justify, alignItems = listMetadata.alignItems, _e = listMetadata.spacing, spacing = _e === void 0 ? (_b = this.jsonGrid) === null || _b === void 0 ? void 0 : _b.spacing : _e;
        var params = { grid: { spacing: spacing, justify: justify, alignItems: alignItems }, jsonField: __assign(__assign({}, otherJsonField), { layout: listLayout }) };
        var configAction = { name: LoadConfig.actionName, params: params };
        builderField.element = forwardBuilder(BuilderModel, { configAction: configAction });
        if (this.isBuildField(jsonField)) {
            this.builderAttr.forEach(function (key) { return delete builderField.field[key]; });
        }
    };
    ListExtension = __decorate([
        Extension()
    ], ListExtension);
    return ListExtension;
}(BasicExtension));
export { ListExtension };
