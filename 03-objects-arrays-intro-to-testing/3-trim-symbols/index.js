/**
 * trimSymbols - removes consecutive identical symbols if they quantity bigger that size
 * @param {string} string - the initial string
 * @param {number} size - the allowed size of consecutive identical symbols
 * @returns {string} - the new string without extra symbols according passed size
 */
export function trimSymbols(string, size) {
    const arr = string.split('');
    const newArr = [];
    let initial = 1;
    if (!size && size !== 0) { size = Infinity };
    for (let i = 0; i < arr.length; i++){
        if (arr[i - 1] === arr[i]) {
            initial++;         
        } else { initial = 1 };
        if (initial <= size) { newArr.push(arr[i]) }
    }
    const newString = newArr.join('');
    return newString
};
