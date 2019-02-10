import freesewing from "freesewing";
import plugins from "@freesewing/plugin-bundle";
import config from "../config";
// Parts
import draftBack from "./back";
import draftSide from "./side";
import draftFront from "./front";
import draftInset from "./inset";

// Create pattern
const Bruce = freesewing.create(config, plugins);

// Attach per-part draft methods to prototype
Bruce.prototype.draftBack = part => draftBack(part);
Bruce.prototype.draftSide = part => draftSide(part);
Bruce.prototype.draftInset = part => draftInset(part);
Bruce.prototype.draftFront = part => draftFront(part);

export default Bruce;