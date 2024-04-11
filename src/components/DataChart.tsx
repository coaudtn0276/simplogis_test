import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend } from "chart.js";
import { Line } from "react-chartjs-2";
import { useRecoilValue } from "recoil";
import { ItemsAtom, SelectRouteData } from "../recoil/Atom";
import { DataPoint } from "../type/types";
import { useState } from "react";

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

const DataChart = () => {
  const selectRouteData = useRecoilValue(SelectRouteData);
  const itemsAtom = useRecoilValue(ItemsAtom);

  const buttonValue = [
    { label: "3M", value: 3 },
    { label: "6M", value: 6 },
    { label: "1Y", value: 12 },
    { label: "ALL", value: selectRouteData ? selectRouteData[0]?.data.length : 0 },
  ];
  const [chartXValue, setChartXValue] = useState(12);
  const [selectedButton, setSelectedButton] = useState("1Y");
  // console.log(chartXValue, selectedButton);

  const getTop7Data = (categoryData: DataPoint[]) => {
    // 데이터 배열을 복사하고, 초단위 기준으로 내림차순 정렬
    const sortedData = [...(categoryData[0]?.data ?? [])].sort((a, b) => b[0] - a[0]);

    // 2번째 인자 숫자는 버튼을 눌렀을때의 들어가는 데이터 갯수 변화 값.
    return sortedData.slice(0, chartXValue);
  };
  // console.log(selectRouteData ? getTop7Data(selectRouteData) : []);

  const datesList = selectRouteData
    ? getTop7Data(selectRouteData).map((el) => {
        const changeDate = () => {
          const timestamp = el[0];
          const date = new Date(timestamp);

          const year = date.getFullYear();
          const month = (date.getMonth() + 1).toString().padStart(2, "0");

          const formattedDate = `${year}-${month}`;

          return formattedDate;
        };
        return changeDate();
      })
    : [];
  // console.log(datesList);

  const colors = ["#902fff", "#ff9124", "#33b1ff", "#ff3370"];

  const labels = datesList;
  const dataset = selectRouteData
    ? selectRouteData?.map((item, index) => ({
        label: item.routeKor,
        data: [...item.data].sort((a, b) => b[0] - a[0]).map((dataPoint) => dataPoint[1]),
        borderColor: colors[index % colors.length],
        backgroundColor: colors[index % colors.length],
      }))
    : [];

  const data = {
    labels,
    datasets: dataset,
  };

  const options = {
    plugins: {
      legend: {
        display: true,
        position: "bottom" as const,
      },
    },
    layout: {
      padding: {
        top: 20,
        right: 20,
        bottom: 20,
        left: 20,
      },
    },
  };

  const handleDateButtonClick = (label: string, value: number) => {
    setSelectedButton(label);
    setChartXValue(value);
  };

  return (
    <div className="w-full border-[1px] border-gray-300 rounded-lg">
      <div className="flex justify-between items-center px-5 pt-2">
        <div className="flex">
          <div className="flex flex-col mr-4">
            업데이트 날짜
            <span className="font-bold text-[#41B882]">{itemsAtom?.updatedAt}</span>
          </div>
          <div className="flex flex-col">
            단위
            <span className="font-bold text-[#41B882]">{itemsAtom?.unit}</span>
          </div>
        </div>
        <div className="flex flex-row text-xs sm:text-xs md:text-sm lg:text-base">
          {buttonValue.map((buttonValue) => {
            return (
              <button
                key={buttonValue.label}
                className={`inline-flex justify-center items-center px-3 py-1 rounded-lg mr-2 ${selectedButton === buttonValue.label ? "text-white font-bold bg-[#41B882]" : "bg-gray-100"}`}
                onClick={() => {
                  handleDateButtonClick(buttonValue.label, buttonValue.value);
                }}
              >
                {buttonValue.label}
              </button>
            );
          })}
        </div>
      </div>
      <Line data={data} options={options} />
    </div>
  );
};

export default DataChart;
