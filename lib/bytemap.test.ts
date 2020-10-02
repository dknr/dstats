import {
  assertEquals,
} from "https://deno.land/std@0.68.0/testing/asserts.ts";
import { makeByteMap, binary } from "./bytemap.ts";

Deno.test({
  name: "byteMap round trip",
  fn: () => {
    const map = makeByteMap(binary, binary);
    assertEquals(map(0x00), 0x00);
    assertEquals(map(0xFF), 0xFF);
  },
});
