import {
  assertEquals,
} from "https://deno.land/std@0.68.0/testing/asserts.ts";
import { mapBraille } from './braille.ts';

Deno.test({
  name: "mapBraille",
  fn: () => {
    assertEquals(mapBraille(0x00), 0x2800);
    assertEquals(mapBraille(0x01), 0x2880);
    assertEquals(mapBraille(0x11), 0x28C0);
    assertEquals(mapBraille(0xFF), 0x28FF);
  }
});
