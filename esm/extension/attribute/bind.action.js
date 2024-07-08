import { __decorate, __metadata, __param } from "tslib";
/* eslint-disable no-new-func */
import { ActionProps, BaseAction, META_TYPE } from '@hwy-fm/builder';
import { Inject, MethodProxy } from '@hwy-fm/di';
import { Action } from '../../builder/builder-context';
let Bind = class Bind extends BaseAction {
    parseTemplate(code) {
        return /^\$.+/ig.test(code) || /^'|".*?'|"/ig.test(code) || !isNaN(code) ? code : `meta.${code}`;
    }
    executeMethod(method) {
        const paramsArray = method.replace(/[\w]+\((.*?)\)/ig, '$1').replace(/\s?/g, '').split(',').filter((_) => _ !== '');
        const params = paramsArray.map((item) => this.parseTemplate(item));
        return `meta.${method.replace(/([^\\(]+).*/g, '$1')}(${params.join(',')});`;
    }
    execute(bindAttr) {
        const code = /(\w+)\((.*?)\)(?=\s*)/ig.test(bindAttr) ? this.executeMethod(bindAttr) : this.parseTemplate(bindAttr);
        const fn = new Function('meta', '$', '$action', `return ${code};\n`);
        return fn(this.meta, Object.assign(Object.assign({}, this.builderField), { viewModel: this.builder.viewModel }), this);
    }
};
__decorate([
    Inject(META_TYPE),
    __metadata("design:type", Object)
], Bind.prototype, "meta", void 0);
__decorate([
    Inject(MethodProxy),
    __metadata("design:type", MethodProxy)
], Bind.prototype, "mp", void 0);
__decorate([
    __param(0, ActionProps('params.bindAttr')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], Bind.prototype, "execute", null);
Bind = __decorate([
    Action('bind', { cache: true })
], Bind);
export { Bind };
