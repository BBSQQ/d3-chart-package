import { scaleLinear, scaleBand, scaleOrdinal, Selection } from 'd3';

import isNumberArray from '../utils/is-number-array';

import { xAxisCfg, yAxisCfg } from "../const/axis";
import { margin } from "../const/layout";
import arrayPick from '../utils/array-pick';
import { IScale } from '../interface';

export const enum Scale {
  Linear = 'Linear',
  Ordinal = 'Ordinal',
}

// TODO: 之后可以通过数据推荐响应的坐标轴
// data -> scale type
// range -> 
function getScale(svg: Selection<SVGSVGElement, unknown, null, undefined>, data: string[] | number[], scale: IScale[]) {
  // const xAxisData = arrayPick(data, scale[0]);
  console.log(svg.attr('width'), svg.attr('height'))
  // if (isNumberArray(data)) {
  //   return scaleLinear().domain([0, Math.max()]).range();
  // }
  // return
}

export default getScale;
