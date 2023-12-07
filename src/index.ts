import { Plugin as VitePlugin } from 'vite';

interface PrototypeExtension {
  className: string;
  methods: { [methodName: string]: Function };
}

export function protoGlobalPlugin(extensions: PrototypeExtension[]): VitePlugin {
  const extensionScript = generateExtensionScript(extensions);

  return {
    name: "vite-plugin-proto-global",
    enforce: "pre",
    transform(code, id) {
      if (id.endsWith('.js')) {
        return {
          code: `${extensionScript}\n${code}`,
          map: null
        };
      }
    }
  };
}

function generateExtensionScript(extensions: PrototypeExtension[]): string {
  return extensions.map(extension => `
    (function() {
      const classPrototype = ${extension.className}.prototype;
      ${Object.entries(extension.methods).map(([methodName, method]) => {
    // Convert the function to a string and clean up formatting
    const methodStr = method.toString().replace(/^function\s*/, 'function ');
    return `classPrototype.${methodName} = ${methodStr};`;
  }).join('\n')}
    })();
  `).join('\n');
}
