import { Plugin as VitePlugin } from 'vite';
interface PrototypeExtension {
    className: string;
    methods: {
        [methodName: string]: Function;
    };
}
export declare function protoGlobalPlugin(extensions: PrototypeExtension[]): VitePlugin;
export {};
