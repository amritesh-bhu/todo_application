import React from 'react'
import { useState } from 'react'
import Mymodel from "./model/myModel";

const Sharedlist = ({sharedList,removeItem,modifyContent,editMode,setEditMode}) => {
    const [editIdx,setEditIdx] = useState(-1)    
    return (
        <div className="h-2/3 overflow-y-auto">
            {sharedList.length ? (sharedList.map((lst) => {
                return (
                    <div className="flex mx-3 my-2 p-2 border-2 md:mxy-4 sm:mxy-5 border-gray-200 rounded-lg" key={lst._id}>
                        <div className="basis-1/2 p-4 font-bold">
                            <span className="italic">{lst.value}</span>
                        </div>
                        <div className="flex flex-row basis-1/2 place-content-end gap-2">
                            <button
                                className="bg-gray-300 hover:bg-gray-400 text-gray-500 font-bold py-2 px-4 rounded-full"
                              onClick={()=> removeItem({...lst,action:'delete'})}
                            >Del</button>
                            <button
                                className="bg-gray-300 hover:bg-gray-400 text-gray-500 font-bold py-2 px-4 rounded-full"
                              onClick={() => {
                                setEditMode(!editMode)
                                setEditIdx(lst._id)
                              }}
                            >
                                Edit
                            </button>
                        </div>
                          
              {editMode && lst._id === editIdx && (
                <Mymodel lst={lst} modifyContent={modifyContent} />
              )}
                    </div>
                );
            })) : <div className="flex justify-center items-center font-bold text-gray-600">
                <span>Nothing to show</span>
            </div>
            }
        </div>
    )
}

export default Sharedlist