// import React from 'react'
import { useState } from 'react'
// import { httpClient } from '../../lib/http-client'

const Sharemodel = ({ shareId, shareTo, resource }) => {
    const [person, setPerson] = useState("")
    const [actions, setActions] = useState([])

    const handleCheckbox = (e) => {
        // console.log(e.target.checked)
        setActions([...actions, e.target.value])
    }

    return (
        <div className="fixed inset-0 bg-black bg-opacity-30 backdrop-blur-sm flex justify-center items-center">
            <div className="bg-white rounded-lg w-80 p-4">
                <form onSubmit={() => shareTo({ resourceId: shareId, email: person, action: actions })}>
                    <span className='font-bold text-3xl mt-5'>Share</span>
                    <label htmlFor="person" className='mt-5 text-lg flex flex-col text-slate-700'>Share To</label>
                    <input id="person"
                        className='placeholder:italic placeholder:text-slate-400 block bg-white w-full border border-slate-500 rounded-md shadow-sm focus:outline-none hover:border-sky-600 focus:ring-sky-500 focus:ring-1 py-2 px-5 mt-2'
                        name="username"
                        type='text'
                        placeholder='Type your username'
                        onChange={(e) => setPerson(e.target.value)}
                        value={person}
                    />
                    <label className='mt-5 text-lg flex flex-col text-slate-700'>Actions</label>

                    <div className="flex">
                        <input
                            id="edit"
                            type="checkbox"
                            className="shrink-0 mt-2 border-gray-200 rounded text-blue-600 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none dark:bg-gray-800 dark:border-gray-700 dark:checked:bg-blue-500 dark:checked:border-blue-500 dark:focus:ring-offset-gray-800"
                            value="edit"
                            onChange={handleCheckbox}
                        />
                        <label htmlFor="edit" className="text-md text-slate-700 ms-3 mt-2">Edit</label>
                    </div>

                    <div className="flex">
                        <input
                            id='delete'
                            type="checkbox"
                            className="shrink-0 mt-0.5 border-gray-200 rounded text-blue-600 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none dark:bg-gray-800 dark:border-gray-700 dark:checked:bg-blue-500 dark:checked:border-blue-500 dark:focus:ring-offset-gray-800"
                            value="delete"
                            onChange={handleCheckbox}
                        />
                        <label htmlFor="delete" className="text-md text-slate-700 ms-3">Delete</label>
                    </div>
                    <div className='flex justify-center items-center'>
                        <button
                            className="bg-blue-500 hover:bg-blue-700 text-white font-bold mt-5 rounded-md py-2 px-4"
                            type='submit'
                        >share</button>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default Sharemodel;