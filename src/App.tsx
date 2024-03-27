import "./App.css";

import { useRecoilState } from "recoil";
import { ItemsAtom } from "./recoil/Atom";
import { useEffect } from "react";

import testData from "../public/testData/test.json";
import Category from "./components/Category";
import SelecteRoot from "./components/SelecteRoute";
// import { DataType } from "./type/types";

function App() {
  const [data, setData] = useRecoilState(ItemsAtom);

  useEffect(() => {
    setData(testData);
  }, [setData]);

  console.log(data);

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
