import { BuilderContext } from '@dynamic/builder';
import { InjectorToken, Type } from '@fm/di';
export declare const VALIDATOR: InjectorToken;
export declare const FORWARD_MICRO: InjectorToken;
export declare const FORWARD_BUILDER: InjectorToken;
export declare const CONTROL_INTERCEPT: InjectorToken;
export declare const builderPackage: (baseName: string, parent?: BuilderContext) => {
    builderContext: BuilderContext;
    forwardUiElement: (name: string, Element: any) => any;
    forwardHocComponent: (token: InjectorToken, hot: any) => any;
    UIElement: (name: string) => <T>(Type: Type<T>) => any;
    ControlIntercept: (...args: any[]) => <TFunction extends (new (...args: any[]) => any) & Type<any>>(target: TFunction) => TFunction;
    Convert: (...args: any[]) => <TFunction extends (new (...args: any[]) => any) & Type<any>>(target: TFunction) => TFunction;
    Action: (...args: any[]) => <TFunction extends (new (...args: any[]) => any) & Type<any>>(target: TFunction) => TFunction;
    Validator: (...args: any[]) => <TFunction extends (new (...args: any[]) => any) & Type<any>>(target: TFunction) => TFunction;
    Extension: (...args: any[]) => <TFunction extends (new (...args: any[]) => any) & Type<any>>(target: TFunction) => TFunction;
};
export declare const builderContext: BuilderContext, forwardUiElement: (name: string, Element: any) => any, forwardHocComponent: (token: InjectorToken, hot: any) => any, UIElement: (name: string) => <T>(Type: Type<T>) => any, Validator: (...args: any[]) => <TFunction extends (new (...args: any[]) => any) & Type<any>>(target: TFunction) => TFunction, ControlIntercept: (...args: any[]) => <TFunction extends (new (...args: any[]) => any) & Type<any>>(target: TFunction) => TFunction, Convert: (...args: any[]) => <TFunction extends (new (...args: any[]) => any) & Type<any>>(target: TFunction) => TFunction, Action: (...args: any[]) => <TFunction extends (new (...args: any[]) => any) & Type<any>>(target: TFunction) => TFunction, Extension: (...args: any[]) => <TFunction extends (new (...args: any[]) => any) & Type<any>>(target: TFunction) => TFunction;
