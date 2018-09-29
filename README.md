# gRPC client for Dwarf

Use with [dwarf](https://github.com/LevInteractive/dwarf) microservice on a node web server.
Use `DWARF_GRPC_SERVER` env var to set the gRPC server.

```typescript
import { shorten } from "dwarf-client";

async function main() {
  try {
    const shortenedUrls = await shorten(["http://google.com", "http://whatever.com"]);
    console.log(shortenedUrls); // -> { urls: ["short-link-1", "short-link-2"] }
  } catch (err) {
    console.error(err);
  }
}
```
