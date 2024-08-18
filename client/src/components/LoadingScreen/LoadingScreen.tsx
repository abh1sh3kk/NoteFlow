import React from "react";
// @ts-ignore

export const DummyNote = () => {
  return (
    <div className="p-4 mx-auto w-full max-w-sm rounded-md border border-blue-300 shadow">
      <div className="flex space-x-4 animate-pulse">
        <div className="flex-1 py-1 space-y-6">
          <div className="h-2 rounded bg-slate-400"></div>
          <div className="space-y-3">
            <div className="grid grid-cols-3 gap-4">
              <div className="col-span-2 h-2 rounded bg-slate-400"></div>
              <div className="col-span-3 h-2 rounded bg-slate-400"></div>
              <div className="col-span-3 h-2 rounded bg-slate-400"></div>
              <div className="col-span-1 h-2 rounded bg-slate-400"></div>
              <div className="col-span-1 h-2 rounded bg-slate-400"></div>
              <div className="col-span-2 h-2 rounded bg-slate-400"></div>
            </div>
            <div className="h-2 rounded bg-slate-400"></div>
          </div>
        </div>
      </div>
    </div>
  );
};

type Props = {};

const LoadingScreen = (props: Props) => {
  return (
    <div className="note-container content-center grid gap-4 grid-cols-[repeat(auto-fill,minmax(296px,1fr))]">
      <DummyNote />
      <DummyNote />
      <DummyNote />
    </div>
  );
};

export default LoadingScreen;
