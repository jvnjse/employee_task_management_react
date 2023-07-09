import React, { useState, createContext, useContext } from 'react'
import ManNav from '../../HomeManager/Nav/ManNav'
import EJobs from '../JobsEmployee/EJobs'
import './employee.css'
import MyContext from '../../Context/Context';


function Employee() {
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
                <MyContext.Provider value={{ HandleopenAddTask, handleModalClick }}>
                    <EJobs />
                </MyContext.Provider>
            </div>
        </div>
    )
}

export default Employee