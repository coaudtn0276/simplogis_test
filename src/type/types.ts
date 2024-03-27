export type DataPoint = {
  route: string;
  routeId: number;
  routeKor: string;
  category: string;
  categoryId: string;
  categoryKor: string;
  data: number[][];
};

export type DataType = {
  range: number;
  updatedAt: string;
  unit: string;
  routeList: (number | string)[][];
  categoryList: (number | string)[][];
  data: DataPoint[];
};

export type CategoryType = {
  filterCategory: (number | string)[][];
};
