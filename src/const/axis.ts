
interface IAxis {
  position: string,
  domain: boolean,
  tickLine: boolean,
  tickText: boolean,
  guide: boolean,
}

export const xAxis: IAxis = { position: 'bottom', domain: true, tickLine: true, tickText: true, guide: false };
export const yAxis: IAxis = { position: 'left', domain: false, tickLine: false, tickText: true, guide: true };
