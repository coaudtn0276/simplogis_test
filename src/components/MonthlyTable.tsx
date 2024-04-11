import { useRecoilValue, useSetRecoilState } from "recoil";
import { DataPoint, FilterPropsData } from "../type/types";
import { SelectRouteAtom, SelectRouteData } from "../recoil/Atom";
import React, { useEffect } from "react";

const Monthly: React.FC<FilterPropsData> = ({ filterData }) => {
  const routeValue = useRecoilValue(SelectRouteAtom);
  const setSelectRouteData = useSetRecoilState(SelectRouteData);

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
    // console.log(selectedData);

    // 선택되지 않은 루트 데이터
    const unselectedData = filterData.filter((item) => !changeRouteValue.includes(item.routeId));

    // 선택된 데이터를 먼저 배열에 넣고, 그 다음에 선택되지 않은 데이터를 추가
    return [...selectedData, ...unselectedData];
  }, [changeRouteValue, filterData]);

  // 데이터 초단위 내림차순 정렬 후 7개
  const getTop7Data = (categoryData: DataPoint[]) => {
    // 데이터 배열을 복사하고, 초단위 기준으로 내림차순 정렬
    const sortedData = [...(categoryData[0]?.data ?? [])].sort((a, b) => b[0] - a[0]);
    return sortedData.slice(0, 7);
  };
  // console.log(getTop7Data(filterData));
  // console.log("sortedFilterData", getTop7Data(sortedFilterData));

  const getMapTop7Data = (categoryData: DataPoint) => {
    // 데이터 배열을 복사하고, 초단위 기준으로 내림차순 정렬
    const sortedData = [...(categoryData?.data ?? [])].sort((a, b) => b[0] - a[0]);
    return sortedData.slice(0, 7);
  };

  const datesList = getTop7Data(sortedFilterData).map((el) => {
    const changeDate = () => {
      const timestamp = el[0];
      const date = new Date(timestamp);

      // 각각 연, 월, 일을 추출
      const year = date.getFullYear();
      const month = (date.getMonth() + 1).toString().padStart(2, "0");
      const day = date.getDate().toString().padStart(2, "0");

      const formattedDate = `${year}-${month}-${day}`;

      return formattedDate;
    };
    return changeDate();
  });

  useEffect(() => {
    const selectedData = filterData.filter((item) => changeRouteValue.includes(item.routeId));
    // console.log(selectedData);

    setSelectRouteData(selectedData);
  }, [changeRouteValue, filterData, setSelectRouteData]);

  return (
    <div className="flex justify-center">
      <div className="w-full flex flex-col">
        <div className="flex h-14 items-center justify-center text-xs sm:text-xs md:text-sm lg:text-base bg-gray-600 text-white rounded-t-lg">
          <h1 className="flex-1 text-center">Route</h1>
          {datesList.map((el, idx) => {
            // console.log("datasList", el);

            return (
              <div key={idx} className="flex-1 text-center">
                {el}
              </div>
            );
          })}
        </div>
        {sortedFilterData.map((item, idx) => {
          const dataTableList = getMapTop7Data(item);

          // console.log("dataTableList", dataTableList);
          // console.log("sortedFilterData", item.data.slice(0, 7));

          return (
            <div key={idx} className={`flex py-2 items-center justify-center text-xs sm:text-xs md:text-sm lg:text-base ${changeRouteValue.includes(item.routeId) ? "bg-[#eefff7]" : idx % 2 !== 0 ? "bg-gray-100" : ""}`}>
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
