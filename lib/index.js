"use strict";
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const grpc = __importStar(require("grpc"));
const proto_loader_1 = require("@grpc/proto-loader");
const GRPC_SERVER = process.env.DWARF_GRPC_SERVER;
const PROTO_PATH = __dirname + "./../dwarf.proto";
let dwarfProto;
if (!GRPC_SERVER) {
    console.error("You must set a GRPC server.");
    process.exit(1);
}
function grpcObj() {
    if (dwarfProto) {
        return dwarfProto;
    }
    dwarfProto = grpc.loadPackageDefinition(proto_loader_1.loadSync(PROTO_PATH)).pb;
    return dwarfProto;
}
exports.grpcObj = grpcObj;
function shorten(urls) {
    return new Promise((resolve, reject) => {
        const Proto = grpcObj();
        const client = new Proto.Dwarf(GRPC_SERVER, grpc.credentials.createInsecure());
        client.Create({ urls }, (err, res) => {
            if (err) {
                reject(err);
            }
            else {
                resolve(res);
            }
        });
    });
}
exports.shorten = shorten;
//# sourceMappingURL=index.js.map