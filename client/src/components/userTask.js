import React, { useEffect, useState } from 'react'
import EmojiFlagsIcon from '@mui/icons-material/EmojiFlags';
import FlagIcon from '@mui/icons-material/Flag';
import RemoveCircleOutlineIcon from '@mui/icons-material/RemoveCircleOutline';
import axios from "axios";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
const UserTask = () => {
    const [isImportant, setIsImportant] = useState(false);
    const [open, setOpen] = React.useState(true);
    const [taskList, setTaskList] = useState();
    const [userList, setUserList] = useState();
    const [toasterList, setToasterList] = useState([]);
    const [userTask, setUserTask] = useState({
        "Task": "",
        "Expiry_date": "",
        "User": "",
        "Important": false,
        "Created_on": new Date().toLocaleDateString(),
    });
    useEffect(() => {
        getUser();
        getTask();
    }, []);
    useEffect(() => {
        axios.get(`http://localhost:8080/api/getUserTask`).then(resp => {
            resp.data.data?.map(tas => {
                if (tas.Important === true) {
                    toasterList.push(tas.Task);
                    toast(tas.Task);
                }
            }
            );
        }, err => {
            console.log(err)
        })


    }, []);

    const getUser = async () => {
        await axios.get(`http://localhost:8080/api/getUser`).then(resp => {
            // console.log(resp.data.data);
            setUserList(resp.data.data)
        }, err => {
            console.log(err)
        })
    }
    const getTask = async () => {
        await axios.get(`http://localhost:8080/api/getUserTask`).then(resp => {
            // console.log(resp.data.data);
            setTaskList(resp.data.data);
        }, err => {
            console.log(err)
        })
    }
    const handleChange = (e) => {
        const { name, value } = e.target;
        let data = { ...userTask };

        data[name] = value;
        setUserTask(data);
    }
    const addTask = async () => {
        console.log(userTask);
        await axios.post(`http://localhost:8080/api/addTask`, userTask).then(resp => {
            getTask();
        }, err => {
            console.log(err)
        })

    }
    const deleteTask = async (id) => {
        console.log(userTask);
        await axios.delete(`http://localhost:8080/api/deleteTask?id=${id}`).then(resp => {
            getTask();
        }, err => {
            console.log(err)
        })

    }
    return (
        <div className='container'>
            <ToastContainer />
            <div className=''>
                <fieldset className='userList'>
                    <legend>User Task</legend>
                    <div className='d-flex justify-content-between p-3'>
                        <div><input name="Task" onChange={(e) => handleChange(e)} type='text' placeholder='Task Description'></input>

                            <div className='d-flex justify-content-between'><p>Task</p><p>0/200</p></div>
                        </div>
                        <div><input name="Expiry_date" onChange={(e) => handleChange(e)} type='date' placeholder='Task Description'></input>

                            <div className='d-flex justify-content-between'><p>Expiry Date</p></div>
                        </div>
                        <div>
                            <select name="User" onChange={(e) => handleChange(e)} className="form-select" aria-label="Default select example">
                                <option selected>Select</option>
                                {userList?.map(user =>

                                    <option key={user._id} value={user._id}>{user.name}</option>
                                )}

                            </select>

                            <div className='d-flex justify-content-between'><p>Users</p></div>
                        </div>
                        <div>
                            {userTask.Important ? <FlagIcon onClick={() => setUserTask({ ...userTask, Important: false })} /> : <EmojiFlagsIcon onClick={() => { setUserTask({ ...userTask, Important: true }) }} />}
                            <p>Important</p>
                        </div>
                        <button style={{ height: "50%" }} className='p-2' onClick={addTask}> Submit</button>
                    </div>
                    <hr className='mx-5'></hr>
                    <div className='mx-5 my-5'>
                        <table style={{ width: "100%" }} className='table table-bordered border-dark'>
                            <thead >
                                <tr className='py-5 bg-secondary text-white' style={{ paddingBottom: "5rem" }}>
                                    <th>Task</th>
                                    <th>Expiry Date</th>
                                    <th>Users</th>
                                    <th>Important</th>
                                    <th>Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                {taskList?.map(task =>
                                    <tr key={task._id}>

                                        <td>{task.Task}</td>
                                        <td>{task.Expiry_date}</td>
                                        <td><select name="User" onChange={(e) => handleChange(e)} className="form-select" aria-label="Default select example">
                                            <option selected>{userList.find(tas => tas._id === task.User).name}</option>
                                            {userList?.map(user =>

                                                <option key={user._id} value={user._id}>{user.name}</option>
                                            )}

                                        </select></td>
                                        <td>  {task.Important ? <FlagIcon /> : <EmojiFlagsIcon />}    </td>
                                        <td><RemoveCircleOutlineIcon onClick={() => deleteTask(task._id)} /></td>

                                    </tr>
                                )}


                            </tbody>
                        </table>

                    </div>
                </fieldset>

                <div></div>
                <div></div>
            </div>

        </div >

    )
}

export default UserTask;