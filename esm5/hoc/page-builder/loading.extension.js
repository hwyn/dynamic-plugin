import { __extends } from "tslib";
import { BasicExtension } from '@dynamic/builder';
export var OPEN_LOADING = 'openLoading';
export var CLOSE_LOADING = 'closeLoading';
var LoadingExtension = /** @class */ (function (_super) {
    __extends(LoadingExtension, _super);
    function LoadingExtension() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    LoadingExtension.prototype.extension = function () {
        this.pushActionToMethod([{ type: OPEN_LOADING }, { type: CLOSE_LOADING }]);
    };
    LoadingExtension.prototype.destroy = function () {
        this.unDefineProperty(this.builder, [OPEN_LOADING, CLOSE_LOADING]);
        return _super.prototype.beforeDestroy.call(this);
    };
    return LoadingExtension;
}(BasicExtension));
export { LoadingExtension };
