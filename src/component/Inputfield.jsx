import { useState } from "react";

// eslint-disable-next-line react/prop-types
const Inputfield = ({ addItem }) => {
  const [inputData, setInputData] = useState("");

  return (
    <>
      <label>
        <input
          className="placeholder:italic placeholder:text-slate-400 block bg-white w-full border border-slate-300 rounded-md py-2 pl-9 pr-3 shadow-sm focus:outline-none focus:border-sky-500 focus:ring-sky-500 focus:ring-1 sm:text-sm mr-2 md:mr-4"
          type="text"
          placeholder="Enter your todo"
          value={inputData}
          onChange={(e) => setInputData(e.target.value)}
        ></input>
      </label>  
      <button
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2  ml-2 md:ml-4 rounded-full md:py-4 md:px-6 "
        onClick={() => addItem(inputData, setInputData)}>
        Add todo
      </button>
    </>
  );
};

export default Inputfield;
