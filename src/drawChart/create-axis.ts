import { IScale } from '../interface';
import { xAxisCfg, yAxisCfg } from "../const/axis";
import arrayPick from '../utils/array-pick';

function createAxis(svg: object, data: any, scale: IScale) {
  const xAxisData = arrayPick(data, scale[0]);
  // console.log(xAxisData);
  // const [xScale, yScale] = getScale(data, svg);
  // console.log(xScale)
  // scaleLinear().domain([]).range([])
}

export default createAxis;
