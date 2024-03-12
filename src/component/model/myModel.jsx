import { useState } from "react";

const Mymodel = ({lst, modifyContent}) => {
    const [mdItem, setMdItem] = useState("")

    return (
        <div className="fixed inset-0 bg-black bg-opacity-30 backdrop-blur-sm flex justify-center items-center">
            <div className="bg-white rounded-lg w-80 p-4">
                <div className="flex justify-center pt-2">
                    <span className="italic font-bold flex justify-center items-center">Do you really want to change the text ?</span>
                </div>
                <div className="flex juname is requiredstify-evenly pt-3">
                    <input
                        className="placeholder:italic placeholder:text-slate-400 block bg-white w-full border border-slate-300 rounded-md py-2 pl-9 pr-3 shadow-sm focus:outline-none focus:border-sky-500 focus:ring-sky-500 focus:ring-1 sm:text-sm"
                        type="text"
                        placeholder="modify your text"
                        value={mdItem}
                        onChange={(e) => setMdItem(e.target.value)}
                    />
                </div>
                <div className="flex justify-center pt-3">
                    <button
                        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full"
                        onClick={() =>
                            modifyContent({ ...lst, value: mdItem,action:'edit'},setMdItem)
                        }
                        type="submit"
                    >
                        Done
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Mymodel;