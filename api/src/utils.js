/**
 * @param {e.Request} req
 * @return {"view"|"json"}
 */
export function getRequestedFormat(req) {
  const format = req.query["format"] ?? "json";
  return ["view", "json"].includes(format) ? format : "json";
}

/**
 * @param {string|number} value
 * @param {number} defaultValue
 * @return {number}
 */
export function parseIntOrDefault(value, defaultValue = 0) {
  try {
    let v = parseInt(value);
    if (isNaN(v)) {
      return defaultValue;
    }
    return v;
  } catch (e) {
    return defaultValue;
  }
}
