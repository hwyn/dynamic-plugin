import { __assign, __decorate, __metadata } from "tslib";
import { FACTORY_BUILDER, generateUUID } from '@dynamic/builder';
import { Injectable, Injector } from '@fm/di';
import { omitBy } from 'lodash';
import { builderContext, CONTROL_INTERCEPT } from '../builder/builder-context';
import { PLUGIN_GET_CONFIG } from '../token';
var DynamicManage = /** @class */ (function () {
    function DynamicManage(injector) {
        this.injector = injector;
        this.builderCache = new Map();
        builderContext.forwardFormControl(this.formControl);
        builderContext.forwardGetJsonConfig(injector.get(PLUGIN_GET_CONFIG));
        builderContext.registryInjector(this.injector);
    }
    DynamicManage.prototype.formControl = function (value, options, _injector) {
        return _injector.get(CONTROL_INTERCEPT).create(value, options);
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
        var isNotEvent = ['onCheckVisibility'];
        var isExists = ['source', 'control', 'visibility'];
        var events = omitBy(builderField.events, function (_item, key) { return isNotEvent.includes(key); });
        var propsExists = omitBy(builderField, function (item, key) { return !isExists.includes(key) && typeof item !== 'undefined'; });
        return __assign(__assign(__assign({ id: id, injector: injector, builderuuid: builderuuid, instance: instance }, propsExists), { events: events }), field);
    };
    DynamicManage.prototype.getBuilderUUID = function () {
        return Object.create({ uuid: generateUUID(1) });
    };
    DynamicManage.prototype.addFieldUUID = function (uuid) {
        var builder = this.getBuilder(uuid);
        if (builder.$$cache.destroyed)
            return;
        var ld = builder.listenerDetect.subscribe(function () {
            builder.$$cache.fields.forEach(function (field) { return field.builderuuid = uuid; });
            ld.unsubscribe();
        });
        if (builder.ready)
            builder.detectChanges();
    };
    DynamicManage.prototype.factory = function (uuid, props) {
        var model = this.getBuilder(uuid);
        if (!model) {
            var builder = this.builderCache.get(props.builderuuid);
            model = this.injector.get(FACTORY_BUILDER)(__assign({ builder: builder }, props));
            this.builderCache.set(uuid, model);
            this.addFieldUUID(uuid);
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
