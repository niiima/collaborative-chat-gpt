export const escapeForHTML = (s) =>
  s.replace(/[&<]/g, (c) => (c === "&" ? "&amp;" : "&lt;"));

export function stripHTML(text) {
  var regex = /(<([^>]+)>)/gi;
  return text.replace(regex, "");
}

export function jsEscape(str) {
  // charMap object maps each special character to its escaped form using Unicode escape sequences.
  // regular expression matches all special characters that need to be escaped,
  // including the less than and greater than signs (< and >), ampersands (&), quotes (" and '),
  // forward slashes (/), backticks (`), and Unicode line and paragraph separators (\u2028 and \u2029).
  const charMap = {
    "<": "\\u003C",
    ">": "\\u003E",
    "&": "\\u0026",
    "'": "\\u0027",
    '"': "\\u0022",
    "/": "\\u002F",
    "`": "\\u0060",
    "=": "\\u003D",
    "\u2028": "\\u2028",
    "\u2029": "\\u2029",
  };
  //calls the escapeForHTML function to escape any HTML special characters in the input string.
  str = escapeForHTML(str);
  // looks up the escaped form of each special character in the charMap object.
  return String(str).replace(/[<>&'"/`=\/\u2028\u2029]/g, function (match) {
    return charMap[match];
  });
}

export function removeHtmlBr(str) {
  // Remove <br> tags and line breaks
  let replacedStr = str.replace(/<br>/gi, "").replace(/\r?\n|\r/g, "");
  return replacedStr;
}
