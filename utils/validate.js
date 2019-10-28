/**
 * Created by PanJiaChen on 16/11/18.
 */

/**
 * @param {string} path
 * @returns {Boolean}
 */
export function isExternal(path) {
  return /^(https?:|mailto:|tel:)/.test(path);
}

/**
 * @param {string} str
 * @returns {Boolean}
 */
export function validUsername(str) {
  const valid_map = ["admin", "editor"];
  return valid_map.indexOf(str.trim()) >= 0;
}
export function isPhoneNumberValid(phone) {
  const re = /((09|03|07|08|05)+([0-9]{8})\b)/g;
  return re.test(phone);
}
export function isTaxCodeValid(tax) {
  const re = /(([0-9]{10})\b)/g;
  return re.test(tax);
}
