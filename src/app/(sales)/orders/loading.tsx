import React from "react";

const skeletonRows = Array.from({ length: 6 });

export default function LoadingOrders() {
  return (
    <div className="bg-gray-100 min-h-screen p-6 md:p-10 md:px-16 animate-pulse">
      <div className="mb-6">
        <div className="mb-6">
          <div className="h-4 w-20 bg-gray-200 rounded mb-3" />
          <div className="h-8 w-48 bg-gray-200 rounded" />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mb-5">
          {Array.from({ length: 3 }).map((_, index) => (
            <div
              key={index}
              className="bg-white rounded-xl p-4 border border-gray-100"
            >
              <div className="h-3 w-24 bg-gray-200 rounded mb-3" />
              <div className="h-7 w-16 bg-gray-200 rounded mb-2" />
              <div className="h-3 w-20 bg-gray-200 rounded" />
            </div>
          ))}
        </div>

        <div className="bg-white rounded-xl border border-gray-100 p-5 mb-4">
          <div className="h-3 w-20 bg-gray-200 rounded mb-3" />
          <div className="h-10 w-full bg-gray-100 rounded-lg" />
        </div>

        <div className="bg-white rounded-xl border border-gray-100 overflow-hidden">
          <div className="px-4 py-3 border-b border-gray-100">
            <div className="h-3 w-40 bg-gray-200 rounded" />
          </div>
          <div className="p-4 space-y-3">
            {skeletonRows.map((_, index) => (
              <div key={index} className="h-11 w-full bg-gray-100 rounded-lg" />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
