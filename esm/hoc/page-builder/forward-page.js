import { __rest } from "tslib";
import { generateUUID, makeBuilderDecorator } from '@hwy-fm/builder';
import { Injector, setInjectableDef } from '@hwy-fm/di';
import { forwardBuilder } from '../forward-builder/forward-builder';
import { LoadConfig } from './actions/load-config';
import { LoadingExtension } from './loading.extension';
import { PageBuilder as PageBuilderModel } from './page.builder';
export function forwardPage(Model, _a) {
    var { pageClassName } = _a, props = __rest(_a, ["pageClassName"]);
    const factory = (injector) => new PageBuilderModel(injector);
    const provider = { provide: factory, providedIn: 'any', useFactory: factory, deps: [Injector] };
    const Component = forwardBuilder(setInjectableDef(factory, provider), {
        id: generateUUID(8),
        extension: [LoadingExtension],
        className: ['page-container', pageClassName].join(' '),
        configAction: { name: LoadConfig.actionName, params: { props, Model } }
    });
    return Object.defineProperty(Model, 'componentDef', { value: Component, writable: false });
}
export const PageBuilder = makeBuilderDecorator('PageBuilder', forwardPage);
