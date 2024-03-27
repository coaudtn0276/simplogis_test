import { useRecoilState, useRecoilValue } from "recoil";
import { CategoryAtom, ItemsAtom } from "../recoil/Atom";

const Category: React.FC = () => {
  const data = useRecoilValue(ItemsAtom);
  const [selecteCategory, setSelecteCategory] = useRecoilState(CategoryAtom);
  console.log(selecteCategory);

  const handleSelecteCategory = (key: number) => {
    setSelecteCategory(key);
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
