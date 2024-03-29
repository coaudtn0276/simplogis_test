import { useRecoilValue } from "recoil";
import { DataPoint, FilterPropsData } from "../type/types";
import { SelectRouteAtom } from "../recoil/Atom";
import React from "react";

const LowHighAverageTable: React.FC<FilterPropsData> = ({ filterData }) => {
  const routeValue = useRecoilValue(SelectRouteAtom);

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

  // 데이터 초단위 내림차순 정렬 후 2개
  const getTop2Data = (categoryData: DataPoint[]) => {
    // 데이터 배열을 복사하고, 초단위 기준으로 내림차순 정렬
    const sortedData = [...(categoryData[0]?.data ?? [])].sort((a, b) => b[0] - a[0]);
    return sortedData.slice(0, 1);
  };
  // console.log(getTop2Data(filterData));

  const getMapTop2Data = (categoryData: DataPoint) => {
    // 데이터 배열을 복사하고, 초단위 기준으로 내림차순 정렬
    const sortedData = [...(categoryData?.data ?? [])].sort((a, b) => b[0] - a[0]);
    // 상위 2개 항목만 선택하여 반환
    return sortedData.slice(0, 2);
  };

  const datesList = getTop2Data(filterData).map((el) => {
    const changeDate = () => {
      const timestamp = el[0];
      const date = new Date(timestamp);

      const year = date.getFullYear();
      const month = (date.getMonth() + 1).toString().padStart(2, "0");
      const day = date.getDate().toString().padStart(2, "0");

      // 직접 포맷팅
      const formattedDate = `${year}-${month}-${day}`;

      return formattedDate;
    };
    return changeDate();
  });

  // 현재 년도
  const now = new Date();
  const year = now.getFullYear();

  return (
    <div className="flex justify-center">
      <div className="w-full flex flex-col">
        <div className="flex h-14 items-center justify-center text-xs sm:text-xs md:text-sm lg:text-base bg-gray-600 text-white rounded-t-lg">
          <h1 className="flex-1 text-center">Route</h1>
          {datesList.map((el, idx) => {
            return (
              <div key={idx} className="flex-1 text-center">
                {el}
              </div>
            );
          })}
          <h1 className="flex-1 text-center">전월대비</h1>

          <div className="flex-col flex justify-around flex-auto w-32 h-full text-center border-l-[1px] border-white">
            <span className="flex-1 flex justify-center items-center">{year}</span>
            <div className="flex-1 flex border-t-[1px] border-white">
              <h1 className="flex-1 flex justify-center items-center">최저</h1>
              <h1 className="flex-1 flex justify-center items-center">최고</h1>
              <h1 className="flex-1 flex justify-center items-center">평균</h1>
            </div>
          </div>
          <div className="flex-col flex justify-around flex-auto w-32 h-full text-center border-l-[1px] border-white">
            <span className="flex-1 flex justify-center items-center">{year - 1}</span>
            <div className="flex-1 flex border-t-[1px] border-white">
              <h1 className="flex-1 flex justify-center items-center">최저</h1>
              <h1 className="flex-1 flex justify-center items-center">최고</h1>
              <h1 className="flex-1 flex justify-center items-center">평균</h1>
            </div>
          </div>
        </div>
        {sortedFilterData.map((item, idx) => {
          const dataTableList = getMapTop2Data(item);

          const value = Number(dataTableList[0][1].toFixed(1)).toLocaleString();

          let diff = 0;

          if (dataTableList.length > 1) {
            const newValue = dataTableList[0][1];
            const oldValue = dataTableList[1][1];
            diff = newValue - oldValue;
          }

          const currentYearData = item.data.filter(([timestamp]) => new Date(timestamp).getFullYear() === year);
          const lastYearData = item.data.filter(([timestamp]) => new Date(timestamp).getFullYear() === year - 1);

          const calculateValues = (data: [number, number][]) => {
            const values = data.map(([, value]) => value);
            if (data.length === 1) return { min: "-", max: values[0].toFixed(1), avg: "-" };
            // console.log(values);
            const min = Math.min(...values).toFixed(1);
            const max = Math.max(...values).toFixed(1);
            const avg = (values.reduce((acc, cur) => acc + cur, 0) / values.length).toFixed(1);
            return { min, max, avg };
          };

          const currentYearValues = calculateValues(currentYearData);
          const lastYearValues = calculateValues(lastYearData);
          // console.log(currentYearValues);

          return (
            <div key={idx} className={`flex py-2 items-center justify-center text-xs sm:text-xs md:text-sm lg:text-base ${changeRouteValue.includes(item.routeId) ? "bg-[#eefff7]" : idx % 2 !== 0 ? "bg-gray-100" : ""}`}>
              <h1 className="flex-1 text-center">{item.routeKor}</h1>
              <div key={idx} className="flex-1 text-center">
                {value}
              </div>
              <div className="flex-1 flex justify-center items-center">
                <h1 className={`inline-flex px-4 py-1 rounded-xl text-center ${diff > 0 ? "text-red-600 bg-red-200" : "text-blue-600 bg-blue-200 "}`}>{diff === 0 ? "-" : diff.toFixed(1)}</h1>
              </div>

              <div className="w-32 flex flex-auto">
                <div className="flex-1 text-center">{currentYearValues.min}</div>
                <div className="flex-1 text-center">{currentYearValues.max}</div>
                <div className="flex-1 text-center">{currentYearValues.avg}</div>
              </div>
              <div className="w-32 flex flex-auto">
                <div className="flex-1 text-center">{lastYearValues.min}</div>
                <div className="flex-1 text-center">{lastYearValues.max}</div>
                <div className="flex-1 text-center">{lastYearValues.avg}</div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default LowHighAverageTable;
