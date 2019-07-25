import * as d3 from 'd3';

interface IMap {
  xMap: string;
  yMap: string;
}

class D3Handler {
  private svg: null | object;
  private originData: null | object;
  // private container: ;
  constructor(dom: HTMLElement) {
    this.svg = this.initSvg(dom);
    this.originData = null;
  }
  public data(data: object): void {
    this.originData = data;
  }
  public coord(coord: string, position: IMap): void {
    if (coord === 'rect') {
      this.createXAxis(position.xMap);
      // this.createYAxis();
    }
  }
  protected createXAxis(xMap: string) {
    const xAxis = (g) => g;
    // .attr("transform", `translate(0,${height - margin.bottom})`)
    // .call(d3.axisBottom(x));

    // this.svg.append('g').call(xAxis);
  }
  protected initSvg(dom: HTMLElement): object {
    const height: number = dom.clientHeight;
    const width: number = dom.clientWidth;
    return d3.select(dom).append('svg').attr("viewBox", `0 0 ${width} ${height}`);
  }
}

module.exports = D3Handler;
