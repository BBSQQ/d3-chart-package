import { IConfig, IScale, IGeomArgs } from './interface';
import drawChart from './drawChart';

// chart.coord()
// chart.data()
// chart.scale()

// 通过所有的 geom 画出 axis return scale；
// chart.axis(['', ['']])

// chart.point({ position: '', color: '', size: '' }) xScale yScale
// chart.line().position()
// chart.render()

class D3Handler {
  public dom: HTMLElement;
  public config: IConfig;
  public sourceData: any;
  constructor(dom: HTMLElement) {
    this.dom = dom;
    this.sourceData = null;
    this.config = {
      coord: "",
      scale: ['', ''],
      geom: []
    }
  }
  public coord(coord: string) {
    this.config.coord = coord;
  }
  public data(data: any) {
    this.sourceData = data;
  }
  public scale(scaleCfg: IScale) {
    this.config.scale = scaleCfg;
  }
  public point(GeomArgs: IGeomArgs) {
    this.config.geom.push({ shape: 'point', ...GeomArgs })
  }
  public render() {
    drawChart(this.dom, this.sourceData, this.config);
  }
}

module.exports = D3Handler;
