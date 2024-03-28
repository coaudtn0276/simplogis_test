import { useRecoilValue } from "recoil";
import { DataPoint, FilterPropsData } from "../type/types";
import { SelectRouteAtom } from "../recoil/Atom";
import React from "react";

const Monthly: React.FC<FilterPropsData> = ({ filterData }) => {
  const routeValue = useRecoilValue(SelectRouteAtom);
  console.log(routeValue);

  // routeValue에서 선택된 고유 값을 routeId의 값으로 변경
  const changeRouteValue = routeValue.map((id) => {
    switch (id) {
      case 1:
        return 455;
      case 2:
        return 456;
      case 3:
        return 457;
      case 4:
        return 458;
      case 5:
        return 459;
      case 6:
        return 500;
      default:
        return id;
    }
  });

  const sortedFilterData = React.useMemo(() => {
    // 선택된 루트 데이터
    const selectedData = filterData.filter((item) => changeRouteValue.includes(item.routeId));
    console.log(selectedData);
    // 선택되지 않은 루트 데이터
    const unselectedData = filterData.filter((item) => !changeRouteValue.includes(item.routeId));

    // 선택된 데이터를 먼저 배열에 넣고, 그 다음에 선택되지 않은 데이터를 추가
    return [...selectedData, ...unselectedData];
  }, [changeRouteValue, filterData]);

  console.log(sortedFilterData);

  // 데이터 초단위 내림차순 정렬 후 6개
  const getTop7Data = (categoryData: DataPoint[]) => {
    // 데이터 배열을 복사하고, 초단위 기준으로 내림차순 정렬
    const sortedData = [...(categoryData[0]?.data ?? [])].sort((a, b) => b[0] - a[0]);
    // 상위 6개 항목만 선택하여 반환
    return sortedData.slice(0, 7);
  };
  // console.log(getTop7Data(filterData));

  const getMapTop7Data = (categoryData: DataPoint) => {
    // 데이터 배열을 복사하고, 초단위 기준으로 내림차순 정렬
    const sortedData = [...(categoryData?.data ?? [])].sort((a, b) => b[0] - a[0]);
    // 상위 6개 항목만 선택하여 반환
    return sortedData.slice(0, 7);
  };

  const datesList = getTop7Data(filterData).map((el) => {
    const changeDate = () => {
      const timestamp = el[0];
      const date = new Date(timestamp);

      // 각각 연, 월, 일을 추출
      const year = date.getFullYear();
      // getMonth()는 0부터 시작하므로 1을 더해야 함
      const month = (date.getMonth() + 1).toString().padStart(2, "0");
      const day = date.getDate().toString().padStart(2, "0");

      // 직접 포맷팅
      const formattedDate = `${year}-${month}-${day}`;

      return formattedDate;
    };
    return changeDate();
  });

  return (
    <div className="flex justify-center">
      <div className="w-full flex flex-col">
        <div className="flex py-2 items-center justify-center text-xs sm:text-xs md:text-sm lg:text-base bg-gray-600 text-white rounded-t-lg">
          <h1 className="flex-1 text-center">Route</h1>
          {datesList.map((el, idx) => {
            return (
              <div key={idx} className="flex-1 text-center">
                {el}
              </div>
            );
          })}
        </div>
        {sortedFilterData.map((item, idx) => {
          const dataTableList = getMapTop7Data(item);
          return (
            <div key={idx} className={`flex py-2 items-center justify-center text-xs sm:text-xs md:text-sm lg:text-base ${changeRouteValue.includes(item.routeId) && "bg-[#eefff7]"} ${idx % 2 !== 0 ? "bg-gray-100" : ""}`}>
              <h1 className="flex-1 text-center">{item.routeKor}</h1>
              {dataTableList.map((el, idx) => {
                const value = Number(el[1].toFixed(1)).toLocaleString();
                return (
                  <div key={idx} className="flex-1 text-center py-1">
                    {value}
                  </div>
                );
              })}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Monthly;