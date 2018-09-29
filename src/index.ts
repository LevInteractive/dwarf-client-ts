import * as grpc from "grpc";
import * as http from "http";
import { loadSync } from "@grpc/proto-loader";

const GRPC_SERVER = process.env.DWARF_GRPC_SERVER;
const PROTO_PATH = __dirname + "./../dwarf.proto";
const dwarfProto = grpc.loadPackageDefinition(loadSync(PROTO_PATH)).pb;

if (!GRPC_SERVER) {
  console.error("You must set a GRPC server.");
  process.exit(1);
}

export interface ServerResponse {
  urls: string[];
}

export function shorten(urls: string[]) {
  return new Promise((resolve, reject) => {
    const client = new dwarfProto.Dwarf(
      GRPC_SERVER,
      grpc.credentials.createInsecure()
    );

    client.Create({ urls }, (err: Error, res: ServerResponse) => {
      if (err) {
        resolve(err);
      } else {
        reject(res);
      }
    });
  });
}
