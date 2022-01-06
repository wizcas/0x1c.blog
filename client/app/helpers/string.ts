/* eslint-disable no-bitwise */
export function hashString(value: string) {
  let hash = 0;
  if (value) {
    for (let i = 0; i < value.length; i++) {
      const chr = value.charCodeAt(i);
      hash = (hash << 5) - hash + chr;
      hash |= 0; // Convert to 32bit integer
    }
  }
  return hash;
}
