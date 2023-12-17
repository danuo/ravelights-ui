# RaveLights-UI

This is the interactive UI for RaveLights (https://github.com/danuo/ravelights).

## Features

- Optimized for mobile devices.
- Written in [Quasar](https://quasar.dev/)/[Vue3.js](https://vuejs.org/) (Composition API).
- Global state management via Pinia [Pinia](https://pinia.vuejs.org/).
- Uses REST Api from [RaveLights](https://github.com/danuo/ravelights).
- UI get's instantaneous updates through [SSE (Server-sent events)](https://developer.mozilla.org/en-US/docs/Web/API/Server-sent_events).

## Installation for development

To use with RaveLights, the RaveLights-UI does not have to be installed manually. The most recent static built is already included in RaveLights. For development, RaveLights-UI can be run as follows:

### Start the app in development mode (hot-code reloading, error reporting, etc.)

Install dependencies

```bash
npm install
```

To run this ui in dev mode, run the following

```bash
quasar dev
```

Run RaveLights in no-ui mode:

```bash
python ./main.py --no-webui
```

## Build the app for production

Manual building of this ui is not necessary. After pushing commits to master, the ui will be built by Github Actions. The updated ui built can then be included into ravelights via Github Submodules (see Readme of RaveLights, https://github.com/danuo/ravelights). To create a manual build anyway, run

```bash
quasar build
```
