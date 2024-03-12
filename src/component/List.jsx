import { useState } from "react";
import Mymodel from "./model/myModel";
import Sharemodel from "./model/shareModel";
/* eslint-disable react/prop-types */
const List = ({ arrObj, removeItem, modifyContent, editMode, setEditMode,shareMode, setShare ,shareTo}) => {
  // const [mdItem, setMdItem] = useState("");
  const [editIdx, setEditIdx] = useState(-1);
  const [shareId,setShareId] = useState(-1);
  // const []

  return (
    <div className="h-2/3 overflow-y-auto">
      {arrObj.length ? (arrObj.map((lst) => {
        return (
          <div className="flex mx-3 my-2 p-2 border-2 md:mxy-4 sm:mxy-5 border-gray-200 rounded-lg" key={lst._id}>
            <div className="basis-1/2 p-4 font-bold">
              <span className="italic">{lst.value}</span>
            </div>
            <div className="flex flex-row basis-1/2 place-content-end gap-2">
              <button
                className="bg-gray-300 hover:bg-gray-400 text-gray-500 font-bold py-2 px-4 rounded-full"
                onClick={() => removeItem(lst)}>Del</button>
              <button
                className="bg-gray-300 hover:bg-gray-400 text-gray-500 font-bold py-2 px-4 rounded-full"
                onClick={() => {
                  setEditMode(!editMode);
                  setEditIdx(lst._id);
                }}
              >
                Edit
              </button>
              <button
                className="bg-gray-300 hover:bg-gray-400 text-gray-500 font-bold py-2 px-4 rounded-full"
                onClick={() => {
                  setShare(!shareMode)
                  setShareId(lst._id)
                }
                }
              >share</button>
            </div>

            {editMode && lst._id === editIdx && (
              <Mymodel lst={lst} modifyContent={modifyContent} />
            )}
            {
              shareMode && lst._id === shareId && (
                <Sharemodel shareId={shareId} shareTo={shareTo} resource={lst.value}/>
              )
            }
          </div>
        );
      })) : <div className="flex justify-center items-center font-bold text-gray-600">
        <span>Nothing to show</span>
      </div>
      }
    </div>
  );
};

export default List;
