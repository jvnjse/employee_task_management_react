import React, { useState, createContext, useContext } from 'react'
import ManNav from '../Nav/ManNav'
import './homeman.css'
import Jobs from '../Jobs/Jobs';
import Addtask from '../../AddtaskModal/Addtask';
import MyContext from '../../Context/Context';





function HomeManager() {
    const [addtask, setAddtask] = useState(false);

    const HandleopenAddTask = () => {
        setAddtask(!addtask)
    }

    const handleModalClick = (event) => {
        event.stopPropagation();
    };



    return (
        <div className='manager-main'>
            <div className="man-container">
                <ManNav />
                <div className='addtask'>
                    <div onClick={HandleopenAddTask} className="addtask-btn">
                        + Add Task
                    </div>
                </div>
                <MyContext.Provider value={{ HandleopenAddTask, handleModalClick }}>
                    <Jobs />
                </MyContext.Provider>
            </div>
            {addtask &&
                <div onClick={HandleopenAddTask} className='add-task-container-overlay'>
                    <Addtask
                        HandleopenAddTask={HandleopenAddTask}
                        handleModalClick={handleModalClick}
                    />
                </div>
            }
        </div>
    )
}

export default HomeManager