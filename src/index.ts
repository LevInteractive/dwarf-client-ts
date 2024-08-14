import {GrpcObject, ServiceClientConstructor, ProtobufTypeDefinition, loadPackageDefinition, credentials, ServiceError} from "@grpc/grpc-js";
import { loadSync } from "@grpc/proto-loader";

const GRPC_SERVER = process.env.DWARF_GRPC_SERVER;
const PROTO_PATH = __dirname + "./../dwarf.proto";
let dwarfProto: GrpcObject | ServiceClientConstructor | ProtobufTypeDefinition;

if (!GRPC_SERVER) {
  console.warn("You must set a GRPC server. Dwarf will not work.");
}

export interface ServerResponse {
  urls: string[];
}
function grpcObj(): GrpcObject | ServiceClientConstructor | ProtobufTypeDefinition {
  if (dwarfProto) {
    return dwarfProto;
  }

  dwarfProto = loadPackageDefinition(loadSync(PROTO_PATH)).pb;

  return dwarfProto;
}

export function shorten(urls: string[]) {
  return new Promise((resolve, reject) => {
    const Proto = grpcObj();
    const client = new (Proto as any).Dwarf(
      GRPC_SERVER,
      credentials.createInsecure()
    );

    client.Create({ urls }, (err: ServiceError | null, res: ServerResponse) => {
      if (err) {
        reject(err);
      } else {
        resolve(res);
      }
    });
  });
}
