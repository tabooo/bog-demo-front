export function decode(json) {
  try {
    return JSON.parse(json);
  } catch (e) {
    return null;
  }
}

export function encode(o) {
  return JSON.stringify(o);
}
