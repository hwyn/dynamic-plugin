import { __assign, __decorate, __metadata } from "tslib";
import { JsonConfigService } from '@fm/csr';
import { Injectable, Injector } from '@fm/di';
import { FACTORY_BUILDER, generateUUID } from '@dynamic/builder';
import { builderContext, CONTROL_INTERCEPT } from '../builder/builder-context';
var DynamicManage = /** @class */ (function () {
    function DynamicManage(injector) {
        this.injector = injector;
        this.builderCache = new Map();
        builderContext.forwardFormControl(this.formControl);
        builderContext.forwardGetJsonConfig(this.getJsonConfig);
        builderContext.registryInjector(this.injector);
    }
    DynamicManage.prototype.formControl = function (value, options, _injector) {
        return _injector.get(CONTROL_INTERCEPT).create(value, options);
    };
    DynamicManage.prototype.getJsonConfig = function (url, _injector) {
        return _injector.get(JsonConfigService).getJsonConfig(url);
    };
    DynamicManage.prototype.getForceUpdate = function (detectChanges) {
        var detectChangesSt;
        return function () {
            detectChangesSt && clearTimeout(detectChangesSt);
            detectChangesSt = setTimeout(function () { return (detectChanges(generateUUID(2)), detectChangesSt = null); });
        };
    };
    DynamicManage.prototype.getElementProps = function (builderField) {
        var id = builderField.id, builderuuid = builderField.builderuuid, instance = builderField.instance, _a = builderField.field, field = _a === void 0 ? {} : _a;
        var injector = this.getBuilder(builderuuid).injector;
        var propsExists = ['source', 'control', 'events', 'visibility'].reduce(function (exists, key) {
            var _a;
            var value = builderField[key];
            return Object.assign(exists, typeof value !== 'undefined' ? (_a = {}, _a[key] = value, _a) : {});
        }, {});
        return __assign(__assign({ id: id, injector: injector, builderuuid: builderuuid, instance: instance }, propsExists), field);
    };
    DynamicManage.prototype.getBuilderUUID = function () {
        return Object.create({ uuid: generateUUID(1) });
    };
    DynamicManage.prototype.factory = function (uuid, props) {
        var model = this.getBuilder(uuid);
        if (!model) {
            var builder = this.builderCache.get(props.builderuuid);
            model = this.injector.get(FACTORY_BUILDER)(__assign({ builder: builder }, props));
            this.builderCache.set(uuid, model);
        }
        if (model.ready && !model.$$cache.destroyed) {
            model.$$cache.fields.forEach(function (field) { return field.builderuuid = uuid; });
        }
        return model;
    };
    DynamicManage.prototype.getBuilder = function (uuid) {
        return this.builderCache.get(uuid);
    };
    DynamicManage.prototype.deleteBuilder = function (uuid) {
        this.getBuilder(uuid).onDestroy();
        this.builderCache.delete(uuid);
    };
    DynamicManage = __decorate([
        Injectable(),
        __metadata("design:paramtypes", [Injector])
    ], DynamicManage);
    return DynamicManage;
}());
export { DynamicManage };
