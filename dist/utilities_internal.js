import package$0 from "../package.json" assert { type: "json" };
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * @internal
 */
function generateClientString() {
    // Grab the various versions.  Note that we need to trim them
    // off as some Node.js versions insert strange characters into
    // the version identifiers (mainly newlines and such).
    /* eslint-disable-next-line @typescript-eslint/no-var-requires */
    const couchnodeVer = package$0.version.trim();
    const nodeVer = process.versions.node.trim();
    const v8Ver = process.versions.v8.trim();
    const sslVer = process.versions.openssl.trim();
    return `couchnode/${couchnodeVer} (node/${nodeVer}; v8/${v8Ver}; ssl/${sslVer})`;
}
const generateClientString$0 = void 0;
export { generateClientString };
export { generateClientString$0 as generateClientString };
export {  };
