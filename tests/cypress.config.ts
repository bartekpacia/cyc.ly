import { defineConfig } from "cypress";
import { cypressBrowserPermissionsPlugin } from "cypress-browser-permissions";

export default defineConfig({
  e2e: {
    setupNodeEvents(on, config) {
      config = cypressBrowserPermissionsPlugin(on, config);
      require("cypress-localstorage-commands/plugin")(on, config);

      return config;
    },
    env: {
      browserPermissions: {
        geolocation: "allow",
      },
    },
  },
});
