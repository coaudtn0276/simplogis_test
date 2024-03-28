import { useRecoilState, useRecoilValue } from "recoil";
import { ItemsAtom, SelectRouteAtom } from "../recoil/Atom";

const SelecteRoute = () => {
  const data = useRecoilValue(ItemsAtom);
  const [selectRoute, setSelectRoute] = useRecoilState<number[]>(SelectRouteAtom);
  // console.log(selectRoute);

  const sortRouteList = [...(data.routeList || [])].sort((a, b) => {
    return a[0] - b[0];
  });

  const handleAddRoute = (item: number) => {
    if (selectRoute.includes(item)) {
      setSelectRoute(selectRoute.filter((k) => k !== item));
    } else {
      if (selectRoute.length >= 4) {
        return alert("최대 4개까지 선택 가능합니다.");
      }

      setSelectRoute([...selectRoute, item].sort((a, b) => a - b));
    }
  };

  return (
    <div>
      <div className="font-bold mb-2">루트 선택</div>
      <div className="flex">
        {sortRouteList.map((el) => {
          const isSelected = selectRoute.includes(Number(el[0]));
          return (
            <button key={el[0]} className={`inline-flex px-4 py-2  rounded-lg mr-2 ${isSelected ? "text-white font-bold bg-[#41B882]" : "bg-gray-100"}`} onClick={() => handleAddRoute(Number(el[0]))}>
              {el[1]}
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default SelecteRoute;
