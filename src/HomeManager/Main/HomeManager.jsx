import React, { useState, useEffect } from 'react'
import ManNav from '../Nav/ManNav'
import './homeman.css'
import Jobs from '../Jobs/Jobs';
import Addtask from '../../AddtaskModal/Addtask';



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
                <Jobs HandleopenAddTask={HandleopenAddTask} />
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