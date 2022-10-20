export function require(statement, message) {
  if (!statement) {
    throw Error(`Assert failed: ${message}`);
  }
}
