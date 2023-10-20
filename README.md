# ChromaLights-UI

This is the interactive UI for chromalights (https://github.com/danuo/chromalights).

## Features

- Optimized for mobile devices.
- Written in [Quasar](https://quasar.dev/)/[Vue3.js](https://vuejs.org/) (Composition API).
- Global state management via Pinia [Pinia](https://pinia.vuejs.org/).
- Uses REST Api from [ChromaLights](https://github.com/danuo/chromalights).
- UI get's instantaneous updates through [SSE (Server-sent events)](https://developer.mozilla.org/en-US/docs/Web/API/Server-sent_events).

## Installation for development

To use with ChromaLights, the ChromaLights-UI does not have to be installed manually. The most recent static built is already included in ChromaLights. For development, ChromaLights-UI can be run as follows:

### Start the app in development mode (hot-code reloading, error reporting, etc.)

Install dependencies

```bash
npm install
```

To run this ui in dev mode, run the following

```bash
quasar dev
```

Run ChromaLight in no-ui mode:

```bash
python ./main.py --no-webui
```

## Build the app for production

Manual building of this ui is not necessary. After pushing commits to master, the ui will be built by Github Actions. The updated ui built can then be included into chromalights via Github Submodules (see Readme of Chromalights, https://github.com/danuo/chromalights). To create a manual build anyway, run

```bash
quasar build
```
