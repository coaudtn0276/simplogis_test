import "./App.css";

import { useRecoilState } from "recoil";
import { ItemsAtom } from "./recoil/Atom";
import { useEffect } from "react";

import testData from "../public/testData/test.json";
import Category from "./components/Category";
import SelecteRoot from "./components/SelecteRoute";
import { DataType } from "./type/types";
// import { DataType } from "./type/types";

function App() {
  const [data, setData] = useRecoilState(ItemsAtom);

  useEffect(() => {
    setData(testData as DataType);
  }, [setData]);

  // 데이터 초단위 내림차순 정렬 후 6개
  function getTop6Data(categoryData) {
    // 데이터 배열을 복사하고, 초단위 기준으로 내림차순 정렬
    const sortedData = [...(categoryData?.data ?? [])].sort((a, b) => b[0] - a[0]);

    // 상위 6개 항목만 선택하여 반환
    return sortedData.slice(0, 6);
  }

  console.log(getTop6Data(data.data[5]));

  // 함수 호출 및 결과 출력
  // const top6Data = getTop6Data(data);
  // console.log(top6Data);

  // const testDate = () => {
  //   data?.data?.[0]?.data.map((el) => {
  //     const changeDate = () => {
  //       const timestamp = el[0];
  //       const date = new Date(timestamp);

  //       // 각각 연, 월, 일을 추출
  //       const year = date.getFullYear();
  //       // getMonth()는 0부터 시작하므로 1을 더해야 함
  //       const month = (date.getMonth() + 1).toString().padStart(2, "0");
  //       const day = date.getDate().toString().padStart(2, "0");

  //       // 직접 포맷팅
  //       const formattedDate = `${year}-${month}-${day}`; // '2021-09-01'

  //       return formattedDate;
  //     };
  //     console.log(changeDate());
  //   });
  // };
  // console.log(testDate());

  return (
    <div className="flex justify-center text-xs sm:text-sm md:text-base lg:text-lg">
      <div className="flex flex-col w-10/12 border-2 border-red-700 pb-4">
        <div className="pt-4">
          <Category />
        </div>
        <div className="pt-4">
          <SelecteRoot />
        </div>
      </div>
    </div>
  );
}

export default App;
