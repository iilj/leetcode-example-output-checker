import typescript from "rollup-plugin-typescript";
import html from "rollup-plugin-html";
import scss from 'rollup-plugin-scss';
import packageJson from "./package.json";

const userScriptBanner = `
// ==UserScript==
// @name         ${packageJson.name}
// @namespace    iilj
// @version      ${packageJson.version}
// @description  ${packageJson.description}
// @author       ${packageJson.author}
// @license      ${packageJson.license}
// @supportURL   ${packageJson.bugs.url}
// @match        https://leetcode.com/contest/*/problems/*/
// @icon         https://www.google.com/s2/favicons?sz=64&domain=leetcode.com
// @grant        none
// ==/UserScript==`.trim();

export default [
    {
        input: "src/main.ts",
        output: {
            banner: userScriptBanner,
            file: "dist/dist.js"
        },
        plugins: [
            html({
                include: "**/*.html"
            }),
            scss({
                output: false
            }),
            typescript()
        ]
    }
];