import { select } from 'd3';

function createSvg(dom: HTMLElement) {
  const [width, height]: [number, number] = [dom.clientWidth, dom.clientHeight]
  return select(dom)
    .append('svg')
    .attr('width', width)
    .attr('height', height);
}

export default createSvg;
