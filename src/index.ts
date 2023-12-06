import { Plugin as VitePlugin } from 'vite';

interface PrototypeExtension {
  className: string;
  methods: { [methodName: string]: Function };
}

export function protoGlobalPlugin(extensions: PrototypeExtension[]): VitePlugin {
  const extensionScript = generateExtensionScript(extensions);

  return {
    name: "vite-plugin-proto-global",
    enforce: "pre", // Changed to 'pre' to ensure early application
    transform(code, id) {
      if (id.endsWith('.js')) {
        // Inject the extension script at the start of each JavaScript file
        return {
          code: `${extensionScript}\n${code}`,
          map: null // ToDo: Check if source map is necessary
        };
      }
    }
  };
}

function generateExtensionScript(extensions: PrototypeExtension[]): string {
  return extensions.map((extension) => `
    (function() {
      const classPrototype = ${extension.className}.prototype;
      ${Object.entries(extension.methods).map(([methodName, method]) => {
    const methodStr = method.toString().replace(/^function\s*/, 'function ');
    return `classPrototype.${methodName} = ${methodStr};`;
  }).join('')}
    })();
  `).join('');
}
