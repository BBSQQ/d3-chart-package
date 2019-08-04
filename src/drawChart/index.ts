import { Selection } from 'd3';
import { IConfig } from '../interface';

import createSvg from "./create-svg";
import createAxis from "./create-axis";
import getScale from './get-scale';

function drawChart(dom: HTMLElement, sourceData: any, config: IConfig) {
  const svg: Selection<SVGSVGElement, unknown, null, undefined> = createSvg(dom);
  if (config.coord === 'rect') {
    // const [xScale, yScale] = 
    // getScale(svg, sourceData, config.scale);
    // createAxis(svg, sourceData, config.scale);
  }
}

export default drawChart;
