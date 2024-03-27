import { atom } from "recoil";
import { DataType } from "../type/types";

export const ItemsAtom = atom<DataType>({
  key: "ItemsAtom",
  default: {
    range: 0,
    updatedAt: "",
    unit: "",
    routeList: [],
    categoryList: [],
    data: [],
  },
});

export const CategoryAtom = atom({
  key: "CategoryAtom",
  default: "category_01",
});

export const SelectRouteAtom = atom<number[]>({
  key: "SelectRouteAtom",
  default: [1],
});
