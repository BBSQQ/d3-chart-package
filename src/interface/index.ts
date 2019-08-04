export interface IGeomArgs {
  position: string[],
  color?: string,
  size?: string
}

interface IGeom extends IGeomArgs {
  shape: string
}

// TODO: 可扩展为支持定义 linearScale.min 
export interface IScale {
  [0]: string;  // x axis field
  [1]: string | string[] // y axis field(s), maybe multi fields for y axis
}

export interface IConfig {
  coord: string,
  scale: IScale
  geom: IGeom[],
}

export interface IStringObject {
  [index: string]: any
}