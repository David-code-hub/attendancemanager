import { NuxtModule } from '@nuxt/schema';

type ComponentName = 'Field' | 'Form' | 'ErrorMessage' | 'FieldArray';
type TypedSchemaPackage = 'yup' | 'zod' | 'valibot' | 'none';
interface VeeValidateNuxtOptions {
    autoImports?: boolean;
    componentNames?: Partial<Record<ComponentName, string>>;
    typedSchemaPackage?: TypedSchemaPackage;
}
declare const _default: NuxtModule<VeeValidateNuxtOptions>;

declare module '@nuxt/schema' {
    interface NuxtConfig {
        'vee-validate'?: VeeValidateNuxtOptions;
    }
    interface NuxtOptions {
        'vee-validate'?: VeeValidateNuxtOptions;
    }
}

export { type VeeValidateNuxtOptions, _default as default };
