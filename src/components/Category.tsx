import { useRecoilState, useRecoilValue, useSetRecoilState } from "recoil";
import { CategoryAtom, ItemsAtom, SelectRouteAtom } from "../recoil/Atom";
import { useState } from "react";

const Category: React.FC = () => {
  const data = useRecoilValue(ItemsAtom);
  const [selecteCategory, setSelecteCategory] = useState(2);
  const [changeCategory, setChangeCategory] = useRecoilState(CategoryAtom);
  const routeValeu = useSetRecoilState(SelectRouteAtom);
  // console.log(changeCategory);

  const changeCategorey = (key: number) => {
    switch (key) {
      case 2:
        return "category_01";
      case 1:
        return "category_02";
    }
  };

  const handleSelecteCategory = (key: number) => {
    setSelecteCategory(key);
    routeValeu([1]);
    const changeKey = changeCategorey(key);
    // console.log(changeKey);
    setChangeCategory(String(changeKey));
  };

  return (
    <div>
      {data.categoryList?.map(([key, items]) => {
        if (typeof items === "string") {
          const category = items.split("=")[1];
          const isSelected = key === selecteCategory;
          return (
            <button key={key} className={`inline-flex px-10 py-2 border-b-2  ${isSelected ? "font-bold text-[#41B882] border-b-2 border-[#41B882]" : "border-black"}`} onClick={() => handleSelecteCategory(Number(key))}>
              {category}
            </button>
          );
        }
      })}
    </div>
  );
};

export default Category;
