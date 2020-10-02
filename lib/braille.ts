import { binary, makeByteMap } from "./bytemap.ts";

export const braille = [0x80, 0x20, 0x10, 0x08, 0x40, 0x04, 0x02, 0x01];
export const mapBraille = makeByteMap(binary, braille, 0x2800);