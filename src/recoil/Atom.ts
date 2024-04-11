import { atom } from "recoil";
import { DataPoint, DataType } from "../type/types";

export const ItemsAtom = atom<DataType | null>({
  key: "ItemsAtom",
  default: null,
});

export const CategoryAtom = atom({
  key: "CategoryAtom",
  default: "category_01",
});

export const SelectRouteAtom = atom<number[]>({
  key: "SelectRouteAtom",
  default: [1],
});

export const SelectRouteData = atom<DataPoint[] | null>({
  key: "SelectRouteData",
  default: null,
});
