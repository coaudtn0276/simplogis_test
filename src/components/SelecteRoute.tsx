import { useRecoilState, useRecoilValue } from "recoil";
import { ItemsAtom, SelectRouteAtom } from "../recoil/Atom";

const SelecteRoute = () => {
  const data = useRecoilValue(ItemsAtom);
  const [selectRoute, setSelectRoute] = useRecoilState<number[]>(SelectRouteAtom);
  // console.log(selectRoute);

  const sortRouteList = [...(data.routeList || [])].sort((a, b) => {
    const numA = typeof a[0] === "number" ? a[0] : 0;
    const numB = typeof b[0] === "number" ? b[0] : 0;
    return numA - numB;
  });

  const handleAddRoute = (key: number) => {
    if (selectRoute.includes(key)) {
      setSelectRoute(selectRoute.filter((k) => k !== key));
    } else {
      if (selectRoute.length >= 4) {
        return alert("최대 4개까지 선택 가능합니다.");
      }
      setSelectRoute([...selectRoute, key]);
    }
  };

  return (
    <div>
      <div className="font-bold mb-2">루트 선택</div>
      <div className="flex">
        {sortRouteList.map((el) => {
          const isSelected = selectRoute.includes(Number(el[0]));
          return (
            <div key={el[0]} className={`inline-flex px-4 py-2  rounded-lg mr-2 ${isSelected ? "text-white bg-[#41B882]" : "bg-gray-100"}`} onClick={() => handleAddRoute(Number(el[0]))}>
              {el[1]}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default SelecteRoute;
