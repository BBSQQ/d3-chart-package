import { IStringObject } from '../interface';

export default function arrayPick(arr: IStringObject[], key: string) {
  return arr.map(i => i[key]);
}
