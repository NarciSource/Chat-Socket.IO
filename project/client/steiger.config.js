import { defineConfig } from "steiger";
import fsd from "@feature-sliced/steiger-plugin";

export default defineConfig([
  ...fsd.configs.recommended,
  {
    rules: {
      "fsd/no-layer-public-api": "off",
      "fsd/no-public-api-sidestep": "off",
      "fsd/public-api": "off",
      "fsd/insignificant-slice": "off",
    },
  },
  {
    files: ["src/shared/store/**"],
    rules: {
      "fsd/forbidden-imports": "off",
    },
  },
]);
