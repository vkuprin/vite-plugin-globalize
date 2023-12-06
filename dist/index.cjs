'use strict';

function protoGlobalPlugin(extensions) {
  return {
    name: "vite-plugin-proto-global",
    enforce: "post",
    apply: "build",
    transformIndexHtml() {
      extensions.forEach(extendPrototype);
    }
  };
}
function extendPrototype(extension) {
  const classPrototype = global[extension.className]?.prototype;
  if (!classPrototype) {
    console.warn(`Global class ${extension.className} not found`);
    return;
  }
  for (const methodName in extension.methods) {
    if (typeof extension.methods[methodName] === "function") {
      classPrototype[methodName] = extension.methods[methodName];
    } else {
      console.warn(`Method ${methodName} for class ${extension.className} is not a function`);
    }
  }
}

exports.protoGlobalPlugin = protoGlobalPlugin;
