"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.LoadingExtension = exports.CLOSE_LOADING = exports.OPEN_LOADING = void 0;
var tslib_1 = require("tslib");
var builder_1 = require("@hwy-fm/builder");
exports.OPEN_LOADING = 'openLoading';
exports.CLOSE_LOADING = 'closeLoading';
var LoadingExtension = /** @class */ (function (_super) {
    tslib_1.__extends(LoadingExtension, _super);
    function LoadingExtension() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    LoadingExtension.prototype.extension = function () {
        this.pushActionToMethod([{ type: exports.OPEN_LOADING }, { type: exports.CLOSE_LOADING }]);
    };
    LoadingExtension.prototype.destroy = function () {
        this.unDefineProperty(this.builder, [exports.OPEN_LOADING, exports.CLOSE_LOADING]);
        return _super.prototype.beforeDestroy.call(this);
    };
    return LoadingExtension;
}(builder_1.BasicExtension));
exports.LoadingExtension = LoadingExtension;
