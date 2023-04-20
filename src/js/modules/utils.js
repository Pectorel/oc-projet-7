/**
 * Truncate a string
 *
 * @param str
 * @param n
 * @returns {string|*}
 */
function truncate(str, n) {
  return (str.length > n) ? str.slice(0, n - 1) + '...' : str;
}

function placeCarret($elem) {
  $elem.focus();
  if (typeof window.getSelection != "undefined"
    && typeof document.createRange != "undefined") {
    let range = document.createRange();
    range.selectNodeContents($elem);
    range.collapse(false);
    let sel = window.getSelection();
    sel.removeAllRanges();
    sel.addRange(range);
  } else if (typeof document.body.createTextRange != "undefined") {
    let textRange = document.body.createTextRange();
    textRange.moveToElementText($elem);
    textRange.collapse(false);
    textRange.select();
  }
}

export {truncate, placeCarret};