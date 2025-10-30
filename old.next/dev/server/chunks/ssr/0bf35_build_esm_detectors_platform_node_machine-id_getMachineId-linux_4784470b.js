;!function(){try { var e="undefined"!=typeof globalThis?globalThis:"undefined"!=typeof global?global:"undefined"!=typeof window?window:"undefined"!=typeof self?self:{},n=(new e.Error).stack;n&&((e._debugIds|| (e._debugIds={}))[n]="2a674ae7-8f4a-3268-60fc-464e5c6b9fc9")}catch(e){}}();
module.exports = [
"[project]/node_modules/@opentelemetry/resources/build/esm/detectors/platform/node/machine-id/getMachineId-linux.js [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

/*
 * Copyright The OpenTelemetry Authors
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      https://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */ __turbopack_context__.s([
    "getMachineId",
    ()=>getMachineId
]);
var __TURBOPACK__imported__module__$5b$externals$5d2f$fs__$5b$external$5d$__$28$fs$2c$__cjs$29$__ = __turbopack_context__.i("[externals]/fs [external] (fs, cjs)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$opentelemetry$2f$api$2f$build$2f$esm$2f$diag$2d$api$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@opentelemetry/api/build/esm/diag-api.js [app-ssr] (ecmascript)");
;
;
async function getMachineId() {
    const paths = [
        '/etc/machine-id',
        '/var/lib/dbus/machine-id'
    ];
    for (const path of paths){
        try {
            const result = await __TURBOPACK__imported__module__$5b$externals$5d2f$fs__$5b$external$5d$__$28$fs$2c$__cjs$29$__["promises"].readFile(path, {
                encoding: 'utf8'
            });
            return result.trim();
        } catch (e) {
            __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$opentelemetry$2f$api$2f$build$2f$esm$2f$diag$2d$api$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["diag"].debug(`error reading machine id: ${e}`);
        }
    }
    return undefined;
} //# sourceMappingURL=getMachineId-linux.js.map
}),
];

//# debugId=2a674ae7-8f4a-3268-60fc-464e5c6b9fc9
//# sourceMappingURL=0bf35_build_esm_detectors_platform_node_machine-id_getMachineId-linux_4784470b.js.map