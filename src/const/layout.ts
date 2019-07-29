interface IMargin {
  top: number, right: number, bottom: number, left: number
}

export const enum LEGEND_POSITION {
  TOP = 'top',
  RIGHT = 'right',
  BOTTOM = 'bottom',
  LEFT = 'left',
}

export const margin: IMargin = { top: 30, right: 30, bottom: 30, left: 30 };
export const legendPosition: string = LEGEND_POSITION.BOTTOM;
