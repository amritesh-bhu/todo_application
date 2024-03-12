import { useEffect, useState } from "react";
import Inputfield from "../component/Inputfield";
import List from "../component/List";
import { nanoid } from "nanoid";
import { httpClient } from "../lib/http-client";
import { useNavigate } from "react-router-dom"
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Sharedlist from "../component/sharedList";


const Parent = () => {
  const [lstObj, setLstObj] = useState([]);
  const [editMode, setEditMode] = useState(false);
  const [shareMode, setShare] = useState(false)
  const [sharedList, setSharedList] = useState([])



  const basepath = '/todos'

  const navigate = useNavigate()

  useEffect(() => {
    const firstEffect = async () => {
      try {
        const arrObj = await httpClient.get(basepath)
        setLstObj(arrObj.data)

        const sharedId = await httpClient.get('/rbac/sharedtodos')
        console.log(sharedId.data)
        const ids = sharedId.data?.map((id) => {
          return id.resourceId
        })
        console.log(ids)
        const sharedTodos = await httpClient.post(`${basepath}/sharedid`, { ids: ids })
        setSharedList(sharedTodos.data)
        console.log(sharedTodos.data)
        console.log("try successfully executed")
      } catch (err) {
        console.log(err)
      }
    }
    firstEffect()
  }, []);


  const insertItem = (inputData, setInputData) => {
    let obj = { value: inputData };
    console.log("post request: ", obj);
    httpClient.post(`${basepath}/newtodo`, obj).then((response) => {
      console.log(response.data);
      setLstObj(response.data);
    }).catch((err) => {
      console.error(err);
    });
    setInputData("");
  };

  const editContent = async (editedItem, setMdItem) => {
    // console.log(editedItem._id);
    console.log(editedItem);

    if (editedItem.value !== "") {
      const msg = await httpClient.get('rbac/action')
      console.log(msg.data.msg)

      if (msg.data.msg) {
        httpClient.put(`${basepath}/edittodo`, editedItem).then((response) => {
          console.log(response);
          setLstObj(response.data);
        }).catch((err) => {
          console.error(err.response.data.error)
        });
      }
    } else {
      toast.warning("Permission denied!", { position: 'top-center', autoClose: 2000 })
    }
    setMdItem("");
    setEditMode(!editMode);
  };

  const deleteItem = async (delitem) => {
    console.log(delitem)
    //const duplarr = lstObj.filter((item) => item.id != delitem.id);
    try {
      const msg = await httpClient.get('rbac/action')
      console.log(msg.data.msg)
      if (msg.data.msg) {

        const todos = await httpClient.delete(`${basepath}/${delitem._id}`)
        const sharedtodos = await httpClient.delete(`/rbac/${delitem._id}`)

        toast.success("item has been deleted!", { position: 'top-center', autoClose: 2000 })
        setLstObj(todos.data)
      }
    } catch (err) {
      console.log(err)
    }

    //setLstObj(duplarr);
  };

  const shareTo = (sharedItem) => {
    // e.preventDefault()
    console.log(sharedItem)
    if (!sharedItem.email) {
      notify("Please enter the person name you want to share to")
    } else {
      httpClient.post("/rbac/bindme", sharedItem).then((res) => {
        console.log(res.data)
      }).catch((err) => {
        console.log(err)
      })
    }
    setShare(!shareMode)
  }

  const deleteSession = async () => {
    try {
      const clearCookie = await httpClient.delete('/auth/logout')
      console.log("logged out successfully")
      toast.success("Logged out successfully!", { position: 'top-center', autoClose: 2000 })
      setTimeout(() => {
        navigate('/')
      }, 2000);
    }
    catch (err) {
      console.log(err)
    }
  }

  return (
    <div className="w-full h-screen flex justify-evenly">
      <div className="h-2/3 w-1/3 bg-white rounded-lg ml-20 mt-24 pb-2">
        {/* // <div className="bg-white w-2/5 h-2/5 justify-center rounded-lg"> */}
        <ToastContainer />
        <div className="flex justify-center iitem-center pt-2">
          <h1 className="text-2xl font-bold sm:text-xl md:text-4xl ">Create Your TODO</h1>
        </div>
        <div className="m-auto flex justify-evenly items-center md:mx-5 md:my-7">
          <Inputfield addItem={insertItem} />
        </div>
        <List
          arrObj={lstObj}
          editMode={editMode}
          setEditMode={setEditMode}
          removeItem={deleteItem}
          modifyContent={editContent}
          shareMode={shareMode}
          setShare={setShare}
          shareTo={shareTo}
        />
        <div className="flex justify-end items-end md:mx-5 md:my-7">
          <button
            className="bg-blue-500 hover:bg-gray-400 text-white font-bold py-2 px-4 rounded-full"
            onClick={deleteSession}
          >Log out</button>

        </div>
      </div>
      <div className="w-0.5 h-screen bg-gray-100"></div>
      <div className="h-2/3 w-1/3 bg-white rounded-lg ml-20 mt-24 pb-2">
        {/* // <div className="bg-white w-2/5 h-2/5 justify-center rounded-lg"> */}
        <ToastContainer />
        <div className="flex justify-center item-center pt-2 mb-10">
          <h1 className="text-2xl font-bold sm:text-xl md:text-4xl ">Shared Todo</h1>
        </div>
        {/* <div className="m-auto flex justify-evenly items-center md:mx-5 md:my-7">
          <Inputfield addItem={insertItem} />
        </div> */}
        <Sharedlist
          sharedList={sharedList}
          removeItem={deleteItem}
          modifyContent={editContent}
          editMode={editMode}
          setEditMode={setEditMode}
        />

      </div>
    </div>
  );
};

export default Parent;
