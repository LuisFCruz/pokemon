import { defineConfig, globalIgnores } from "eslint/config";
import nextVitals from "eslint-config-next/core-web-vitals";
import nextTs from "eslint-config-next/typescript";
import boundaries from "eslint-plugin-boundaries";
import tanstackQuery from "@tanstack/eslint-plugin-query";

const eslintConfig = defineConfig([
  ...nextVitals,
  ...nextTs,
  ...tanstackQuery.configs["flat/recommended"],
  globalIgnores([".next/**", "out/**", "build/**", "next-env.d.ts"]),
  {
    plugins: {
      boundaries,
    },
    settings: {
      "boundaries/include": ["client/**/*"],
      "boundaries/elements": [
        {
          type: "shared",
          pattern: "client/shared/*",
        },
        {
          type: "entities",
          pattern: "client/entities/*",
        },
        {
          type: "features",
          pattern: "client/features/*",
        },
        {
          type: "widgets",
          pattern: "client/widgets/*",
        },
        {
          type: "_pages",
          pattern: "client/_pages/*",
        },
        {
          type: "_app",
          pattern: "client/_app/*",
        },
      ],
    },
    rules: {
      "no-console": ["warn", { allow: ["warn", "error"] }],
      "@typescript-eslint/no-explicit-any": "error",
      "@typescript-eslint/no-unused-vars": [
        "error",
        {
          argsIgnorePattern: "^_",
          varsIgnorePattern: "^_",
          caughtErrorsIgnorePattern: "^_",
        },
      ],
      "boundaries/dependencies": [
        "error",
        {
          default: "disallow",
          policies: [
            {
              from: { element: { type: "shared" } },
              allow: [{ to: { element: { type: "shared" } } }],
            },
            {
              from: { element: { type: "entities" } },
              allow: [
                { to: { element: { type: "shared" } } },
                { to: { element: { type: "entities" } } },
              ],
            },
            {
              from: { element: { type: "features" } },
              allow: [
                { to: { element: { type: "shared" } } },
                { to: { element: { type: "entities" } } },
                { to: { element: { type: "features" } } },
              ],
            },
            {
              from: { element: { type: "widgets" } },
              allow: [
                { to: { element: { type: "shared" } } },
                { to: { element: { type: "entities" } } },
                { to: { element: { type: "features" } } },
                { to: { element: { type: "widgets" } } },
              ],
            },
            {
              from: { element: { type: "_pages" } },
              allow: [
                { to: { element: { type: "shared" } } },
                { to: { element: { type: "entities" } } },
                { to: { element: { type: "features" } } },
                { to: { element: { type: "widgets" } } },
                { to: { element: { type: "_pages" } } },
              ],
            },
            {
              from: { element: { type: "_app" } },
              allow: [
                { to: { element: { type: "shared" } } },
                { to: { element: { type: "entities" } } },
                { to: { element: { type: "features" } } },
                { to: { element: { type: "widgets" } } },
                { to: { element: { type: "_pages" } } },
                { to: { element: { type: "_app" } } },
              ],
            },
          ],
        },
      ],
    },
  },
]);

export default eslintConfig;
