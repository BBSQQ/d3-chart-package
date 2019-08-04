interface IAxis {
  position: string,
  display: {
    domain: boolean,
    tickLine: boolean,
    tickText: boolean,
    guide: boolean,
  },
  linearScale: {
    min: number
  }
}


export const xAxisCfg: IAxis = {
  position: 'bottom',
  display: { domain: true, tickLine: true, tickText: true, guide: false },
  linearScale: { min: 0 }
};

export const yAxisCfg: IAxis = {
  position: 'left',
  display: { domain: false, tickLine: false, tickText: true, guide: true },
  linearScale: { min: 0 }
}

/**
 * if linear scale, axis will start default at 0
 */
