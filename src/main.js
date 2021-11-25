import "./global.scss";
import HMR from "@roxi/routify/hmr";
import App from "./App.svelte";

import { registerSW } from 'virtual:pwa-register'

const updateSW = registerSW({
  onOfflineReady() {},
})

const app = HMR(App, { target: document.body }, "routify-app");

export default app;
