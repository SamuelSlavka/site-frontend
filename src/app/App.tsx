import React from "react";
import "./App.scss";

function App() {
  return (
    <div className="app">
      <div className="text-white block">
        <h1 className="text-center text-3xl font-bold my-2">Hayoou</h1>
        <div className="my-4 text-center flex w-100 flex-wrap justify-center">
          <div className="item-element p-2 m-2 bg-slate-500 hover:shadow-sm hover:bg-slate-600 hover:shadow-slate-800 rounded transition-all ease-in duration-200">
            01
          </div>
          <div className="item-element p-2 m-2 bg-slate-500 hover:shadow-sm hover:bg-slate-600 hover:shadow-slate-800 rounded transition-all ease-in duration-200">
            02
          </div>
          <div className="item-element p-2 m-2 bg-slate-500 hover:shadow-sm hover:bg-slate-600 hover:shadow-slate-800 rounded transition-all ease-in duration-200">
            03
          </div>
          <div className="item-element p-2 m-2 bg-slate-500 hover:shadow-sm hover:bg-slate-600 hover:shadow-slate-800 rounded transition-all ease-in duration-200">
            04
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
