import { useRecoilValue } from "recoil";
import { CategoryAtom, ItemsAtom } from "../recoil/Atom";
import { useState } from "react";
import MonthlyTable from "./MonthlyTable";
import ComparedMonthTable from "./ComparedMonthTable";
import LowHighAverageTable from "./LowHighAverageTable";

const DataTable = () => {
  const data = useRecoilValue(ItemsAtom);
  const categoryValue = useRecoilValue(CategoryAtom);

  const ReportType = {
    MONTHLY: "월단위",
    COMPAREDMONTH: "전월대비",
    LOWHIGHAVERAGE: "최저 / 최고 / 평균",
  };

  const [tableValue, setTableValue] = useState(ReportType.MONTHLY);

  //카테고리에 맞는 데이터 필터
  const filterDataCategorey = () => {
    return [...data.data].filter((items) => {
      return items.categoryId === categoryValue;
    });
  };

  const filterData = filterDataCategorey();
  // console.log(filterData);

  const handleTableValue = (value: string) => {
    setTableValue(value);
  };

  return (
    <div className="flex flex-col">
      <div className="flex flex-row-reverse">
        <button
          className={`inline-flex px-4 py-2 rounded-lg mr-2 ${tableValue === ReportType.LOWHIGHAVERAGE ? "text-white font-bold bg-[#41B882]" : "bg-gray-100"}`}
          onClick={() => {
            handleTableValue(ReportType.LOWHIGHAVERAGE);
          }}
        >
          최저 / 최고 / 평균
        </button>
        <button
          className={`inline-flex px-4 py-2 rounded-lg mr-2 ${tableValue === ReportType.COMPAREDMONTH ? "text-white font-bold bg-[#41B882]" : "bg-gray-100"}`}
          onClick={() => {
            handleTableValue(ReportType.COMPAREDMONTH);
          }}
        >
          전월대비
        </button>
        <button
          className={`inline-flex px-4 py-2 rounded-lg mr-2 ${tableValue === ReportType.MONTHLY ? "text-white font-bold bg-[#41B882]" : "bg-gray-100"}`}
          onClick={() => {
            handleTableValue(ReportType.MONTHLY);
          }}
        >
          월단위
        </button>
      </div>

      <div className="pt-4">
        {tableValue === ReportType.MONTHLY && <MonthlyTable filterData={filterData} />}
        {tableValue === ReportType.COMPAREDMONTH && <ComparedMonthTable filterData={filterData} />}
        {tableValue === ReportType.LOWHIGHAVERAGE && <LowHighAverageTable filterData={filterData} />}
      </div>
    </div>
  );
};

export default DataTable;
