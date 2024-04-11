import "./App.css";

import { useSetRecoilState } from "recoil";
import { ItemsAtom } from "./recoil/Atom";
import { useEffect } from "react";

import testData from "../public/testData/test.json";
import Category from "./components/Category";
import SelecteRoot from "./components/SelecteRoute";
import { DataType } from "./type/types";
import DataTable from "./components/DataTable";
import DataChart from "./components/DataChart";

function App() {
  const setData = useSetRecoilState(ItemsAtom);

  useEffect(() => {
    setData(testData as DataType);
  }, [setData]);

  return (
    <div className="flex justify-center text-xs sm:text-sm md:text-base lg:text-lg">
      <div className="flex flex-col w-10/12">
        <div className="pt-4">
          <Category />
        </div>
        <div className="pt-4">
          <SelecteRoot />
        </div>

        <div className="pt-4">
          <DataChart />
        </div>

        <div className="pt-4">
          <DataTable />
        </div>
      </div>
    </div>
  );
}

export default App;
