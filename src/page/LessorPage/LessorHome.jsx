import { ArrowDown, ArrowUp } from "lucide-react";
import React from "react";
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

import { CircleDollarSign } from "lucide-react";

export default function LessorHome() {
  return (
    <div className="p-3 ">
      <div className="p-5 bg-white shadow-md  space-y-4 flex justify-between items-center">
        <div className="space-y-4">
          <div className="font-extrabold text-3xl">Your total revenue: </div>
          <div className="text-2xl font-bold bg-gradient-to-r from-red-500 to-yellow-500 text-transparent bg-clip-text">
            $ 100.000.000
          </div>
        </div>
        <CircleDollarSign className="text-gray-400" size={80}/>
      </div>

      <div className="flex mt-3 justify-between">
        <div className="space-y-6 p-8 bg-white flex flex-col justify-center rounded-3xl shadow-lg border border-gray-200 w-80">
          <label className="font-bold text-center">Number of orders</label>
          <div className="flex justify-center items-center">
            <div>
              <div className="flex items-center justify-center gap-3">
                <span className="text-2xl font-bold text-black">22</span>
                <div className="flex items-center gap-1">
                  <div className="p-[6px] rounded-3xl bg-green-100 flex items-center justify-center font-semibold text-green-600 text-sm">
                    <ArrowUp size={14} className="" />
                  </div>
                  <span className="font-semibold text-green-600">15%</span>
                </div>
              </div>
              <div className="text-slate-400">compared to last week</div>
            </div>
          </div>
        </div>
        <div className="space-y-6 p-8 bg-white flex flex-col justify-center rounded-3xl shadow-lg border border-gray-200 w-80">
          <label className="font-bold text-center">Successfully orders</label>
          <div className="flex justify-center items-center">
            <div>
              <div className="flex items-center justify-center gap-3">
                <span className="text-2xl font-bold text-black">82</span>
                <div className="flex items-center gap-1">
                  <div className="p-[6px] rounded-3xl bg-green-100 flex items-center justify-center font-semibold text-green-600 text-sm">
                    <ArrowUp size={14} className="" />
                  </div>
                  <span className="font-semibold text-green-600">15%</span>
                </div>
              </div>
              <div className="text-slate-400">compared to last week</div>
            </div>
          </div>
        </div>
        <div className="space-y-6 p-8 bg-white flex flex-col justify-center rounded-3xl shadow-lg border border-gray-200 w-80">
          <label className="font-bold text-center">Products on rent</label>
          <div className="flex justify-center items-center">
            <div>
              <div className="flex items-center justify-center gap-3">
                <span className="text-2xl font-bold text-black">12</span>
                <div className="flex items-center gap-1">
                  <div className="p-[6px] rounded-3xl bg-red-100 flex items-center justify-center font-semibold text-red-600 text-sm">
                    <ArrowDown size={14} className="" />
                  </div>
                  <span className="font-semibold text-red-600">15%</span>
                </div>
              </div>
              <div className="text-slate-400">compared to last week</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
