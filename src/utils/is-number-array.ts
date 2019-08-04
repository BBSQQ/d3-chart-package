import { isNumber } from "lodash";

function isNumberArray(arr: any[]): boolean {
  return arr.every(i => {
    if (i === '') {
      return false;
    }
    i = Number(i);
    if (isNaN(i)) {
      return false;
    }
    return isNumber(i);
  });
}

export default isNumberArray;