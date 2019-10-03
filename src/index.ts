import * as grpc from "grpc";
import * as http from "http";
import { loadSync } from "@grpc/proto-loader";

const GRPC_SERVER = process.env.DWARF_GRPC_SERVER;
const PROTO_PATH = __dirname + "./../dwarf.proto";
let dwarfProto: grpc.GrpcObject;

if (!GRPC_SERVER) {
  console.warn("You must set a GRPC server. Dwarf will not work.");
}

export interface ServerResponse {
  urls: string[];
}

export function grpcObj(): grpc.GrpcObject {
  if (dwarfProto) {
    return dwarfProto;
  }

  dwarfProto = grpc.loadPackageDefinition(loadSync(PROTO_PATH)).pb;

  return dwarfProto;
}

export function shorten(urls: string[]) {
  return new Promise((resolve, reject) => {
    const Proto = grpcObj();
    const client = new Proto.Dwarf(
      GRPC_SERVER,
      grpc.credentials.createInsecure()
    );

    client.Create({ urls }, (err: Error, res: ServerResponse) => {
      if (err) {
        reject(err);
      } else {
        resolve(res);
      }
    });
  });
}
