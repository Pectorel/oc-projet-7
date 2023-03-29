/**
 * Truncate a string
 *
 * @param str
 * @param n
 * @returns {string|*}
 */
function truncate(str, n){
    return (str.length > n) ? str.slice(0, n-1) + '...' : str;
}

export {truncate};