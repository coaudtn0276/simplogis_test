import { atom } from "recoil";
import { DataType } from "../type/types";

export const ItemsAtom = atom<DataType>({
  key: "ItemsAtom",
  default: <DataType>{},
});

export const CategoryAtom = atom({
  key: "CategoryAtom",
  default: 2,
});

export const SelectRouteAtom = atom<number[]>({
  key: "SelectRouteAtom",
  default: [1],
});
