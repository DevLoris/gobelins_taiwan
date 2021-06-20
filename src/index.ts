import "./index.less";
import ReactDOM from "react-dom";
import * as React from "react";
import GlobalConfig from "data/GlobalConfig";
import { Router } from "lib/router/Router";
import { EnvUtils } from "lib/utils/EnvUtils";
import App from "./components/app/App";
import { routes } from "./routes";
import {Provider} from "react-redux";
import {store} from "./store/store";
import * as Sentry from "@sentry/react";
import { Integrations } from "@sentry/tracing";
import './lib/i18n';

const fileName = "index";
const debug = require("debug")(`front:${fileName}`);

(function initApp() {
  /**
   * Init global config
   */
  GlobalConfig.inject({
    version: require("../package.json").version,
    baseUrl: process.env.APP_BASE,
    routerBaseUrl: process.env.APP_BASE,
  });

  /**
   * Add env classes
   */
  EnvUtils.addClasses();

  /**
   * Init Router
   */
  Router.init(GlobalConfig.routerBaseUrl, routes);
  debug("Router.routes", Router.routes);

  /**
   * Sentry
   */

  Sentry.init({
    dsn: "https://31a1a78f98b948f987f803882b6d79f1@o865874.ingest.sentry.io/5822862",
    integrations: [
        new Integrations.BrowserTracing(),
    ],
    tracesSampleRate: 1.0,
  });

  /**
   * Init React App
   */
  ReactDOM.render(
    React.createElement(Provider, {store: store}, React.createElement(App, {}, null)),
    document.getElementById("AppContainer")
  );

  /mobile/i.test(navigator.userAgent) && !location.hash && setTimeout(function() {
    window.scrollTo(0, 1);
  }, 1000);
})();
