import { Plugin as VitePlugin } from 'vite';

interface PrototypeMethods {
    [methodName: string]: Function;
}

interface PrototypeExtension {
    className: string;
    methods: PrototypeMethods;
}

interface ProtoGlobalConfig {
    extensions: PrototypeExtension[];
}

export declare function protoGlobalPlugin(config: ProtoGlobalConfig): VitePlugin;
