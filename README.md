# gRPC client for Dwarf

Use with [dwarf](https://github.com/LevInteractive/dwarf).

```typescript
import { shorten } from "dwarf-client";

async function main() {
  try {
    const shortenedUrls = await shorten(["http://google.com", "http://whatever.com"]);
    console.log(shortenedUrls); // <-- ["shortened-link-1", "shortened-link-1"]
  } catch (err) {
    console.error(err);
  }
}
```
