export type RouteListEntry = [number, string];
export type CategoryListEntry = [number, string];
export type DataPointEntry = [number, number];

export type DataPoint = {
  route: string;
  routeId: number;
  routeKor: string;
  category: string;
  categoryId: string;
  categoryKor: string;
  data: DataPointEntry[];
};

export type DataType = {
  range: number;
  updatedAt: string;
  unit: string;
  routeList: RouteListEntry[];
  categoryList: CategoryListEntry[];
  data: DataPoint[];
};

export type CategoryType = {
  filterCategory: CategoryListEntry[];
};
