import { Byte } from "./byte.ts";

export const binary = [0x01, 0x02, 0x04, 0x08, 0x10, 0x20, 0x40, 0x80];

export const makeByteMap = (srcBits: Byte[], dstBits: Byte[], base?: number) => (i: number) => srcBits.reduce((sum, srcBit, idx) => {
  const hasSrcBit = i & srcBit;
  const dstBit = dstBits[idx];
  return sum + (hasSrcBit ? dstBit : 0);
}, base || 0);
