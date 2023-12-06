# vite-plugin-proto-global

Extend JavaScript prototypes globally in your Vite project

## Installation

```bash
npm i vite-plugin-proto-global -D
# or
yarn add vite-plugin-proto-global -D
```
## Configuration
In your vite.config.js, configure the plugin with the prototypes you want to extend. For example:

```js
// vite.config.js
import { defineConfig } from 'vite'
import { protoGlobalPlugin } from 'vite-plugin-proto-global'

export default defineConfig({
  plugins: [
    protoGlobalPlugin([
      {
        className: 'Array',
        methods: {
          customMethod() {
            // Custom method logic
          }
        }
      },
      // Add more prototype extensions as needed
    ]),
  ],
})
```
## Usage
Once the plugin is configured, the extended prototypes can be used globally in your project. For example:

```js
// example.js
const myArray = [1, 2, 3];
myArray.customMethod(); // Use the custom method extended to Array's prototype
```
## FAQ
If you are developing another Vite plugin and want to include prototype extensions, you can use protoGlobalPlugin in your plugin's configuration:

```js
// custom-plugin.js
import { protoGlobalPlugin } from 'vite-plugin-proto-global'

export function customPlugin() {
  return {
    name: 'vite-plugin-custom',
    config: () => {
      return {
        plugins: [
          protoGlobalPlugin([
            // Your prototype extensions here
          ])
        ]
      }
    }
  }
}
```

## Support
If you have any questions or issues with the plugin, please submit an issue on the GitHub repository. Your support is appreciated, and if you find this plugin helpful, consider giving it a star. Thank you!