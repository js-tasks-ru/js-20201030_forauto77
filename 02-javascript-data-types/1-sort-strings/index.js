/**
 * sortStrings - sorts array of string by two criteria "asc" or "desc"
 * @param {string[]} arr - the array of strings
 * @param {string} [param="asc"] param - the sorting type "asc" or "desc"
 * @returns {string[]}
 */
export function sortStrings(arr, param) {
    let newArr = arr.concat();
        newArr.sort(function (a, b) {
               return a.localeCompare(b, ['ru', 'en'], {caseFirst: "upper"})
        });
    if (param == "desc") {
        return newArr.reverse()
    } else if (param == "asc") {
        return newArr
    }
};

