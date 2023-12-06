import { Plugin as VitePlugin } from 'vite';

interface PrototypeExtension {
  className: string;
  methods: { [methodName: string]: Function };
}

export function protoGlobalPlugin(extensions: PrototypeExtension[]): VitePlugin {
  return {
    name: 'vite-plugin-proto-global',
    enforce: 'post',
    apply: 'build',
    transformIndexHtml(html) {
      const extensionScript = extensions.map(extension => `
        (function() {
          const classPrototype = ${extension.className}.prototype;
          ${Object.entries(extension.methods).map(([methodName, method]) => `
            classPrototype.${methodName} = ${method.toString()};
          `).join('')}
        })();
      `).join('');

      return html.replace(
          '</head>',
          `<script>${extensionScript}</script></head>`
      );
    }
  };
}

function extendPrototype(extension: PrototypeExtension) {
  // @ts-ignore
  const classPrototype = global[extension.className]?.prototype;
  if (!classPrototype) {
    console.warn(`Global class ${extension.className} not found`);
    return;
  }

  for (const methodName in extension.methods) {
    if (typeof extension.methods[methodName] === 'function') {
      classPrototype[methodName] = extension.methods[methodName];
    } else {
      console.warn(`Method ${methodName} for class ${extension.className} is not a function`);
    }
  }
}