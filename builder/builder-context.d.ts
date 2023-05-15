import { BaseConvert, BasicExtension, BuilderContext } from '@dynamic/builder';
import { InjectorToken, Type } from '@fm/di';
export declare const VALIDATOR: InjectorToken;
export declare const FORWARD_MICRO: InjectorToken;
export declare const FORWARD_BUILDER: InjectorToken;
export declare const CONTROL_INTERCEPT: InjectorToken;
export declare const builderPackage: (baseName: string, parent?: BuilderContext) => {
    builderContext: BuilderContext;
    forwardUiElement: (name: string, Element: any) => any;
    forwardHocComponent: (token: InjectorToken, hot: any) => any;
    ControlIntercept: <T = any>(this: unknown, ...args: any[]) => (cls: Type<T>) => any;
    Convert: <T_1 extends Type<BaseConvert>>(this: unknown, ...args: any[]) => (cls: Type<BaseConvert>) => any;
    Action: (this: unknown, ...args: any[]) => (cls: Type<unknown>) => any;
    Validator: <T_2 = any>(this: unknown, ...args: any[]) => (cls: Type<T_2>) => any;
    Extension: <T_3 extends Type<BasicExtension>>(this: unknown, ...args: any[]) => (cls: Type<BasicExtension>) => any;
};
export declare const builderContext: BuilderContext, forwardUiElement: (name: string, Element: any) => any, forwardHocComponent: (token: InjectorToken, hot: any) => any, Validator: <T = any>(this: unknown, ...args: any[]) => (cls: Type<T>) => any, ControlIntercept: <T = any>(this: unknown, ...args: any[]) => (cls: Type<T>) => any, Convert: <T extends Type<BaseConvert>>(this: unknown, ...args: any[]) => (cls: Type<BaseConvert>) => any, Action: (this: unknown, ...args: any[]) => (cls: Type<unknown>) => any, Extension: <T extends Type<BasicExtension>>(this: unknown, ...args: any[]) => (cls: Type<BasicExtension>) => any;
