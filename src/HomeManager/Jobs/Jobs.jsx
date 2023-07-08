import React, { useEffect, useState } from 'react'
import './jobs.css'
import axios from 'axios';
import Addtask from '../../AddtaskModal/Addtask';
import JobModal from '../JobModal/JobModal';



function Jobs() {
    const token = localStorage.getItem('token');
    const [data, setData] = useState([]);
    const [selectedItem, setSelectedItem] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);


    const handleJobCardClick = (item) => {
        setSelectedItem(item);
        setIsModalOpen(true);
    };



    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get('http://127.0.0.1:8000/api/jobs/',
                    {
                        headers: {
                            Authorization: `Bearer ${token}`,
                            'Content-Type': 'application/json'
                        }
                    });
                setData(response.data);
                console.log(response.data)
            } catch (error) {
                console.error(error);
            }
        };

        fetchData();
    }, []);


    const getStatusColor = (status) => {
        switch (status) {
            case 'STARTED_WORKING':
                return 'started-working-color';
            case 'DONE':
                return 'done-color';
            case 'CHECKING':
                return 'checking-color';
            case 'IN_PROGRESS':
                return 'in-progress-color';
            case 'NOT_STARTED':
                return 'not-started-color';
            default:
                return '';
        }
    };
    const getCurrentDate = () => {
        const today = new Date();
        const year = String(today.getFullYear());
        const month = String(today.getMonth() + 1).padStart(2, '0');
        const day = String(today.getDate()).padStart(2, '0');
        return `${year}-${month}-${day}`;
    };

    const calculateRemainingDays = (endDate) => {
        const currentDate = new Date(getCurrentDate());
        const finalDate = new Date(endDate);
        const timeDiff = currentDate.getTime() - finalDate.getTime();
        const remainingDays = Math.floor(timeDiff / (1000 * 3600 * 24));
        return remainingDays;
    };

    const [addtask, setAddtask] = useState(false);

    const HandleopenAddTask = () => {
        setAddtask(!addtask)
    }

    const handleModalClick = (event) => {
        event.stopPropagation();
    };
    const closeModal = () => {
        setIsModalOpen(false);
    };

    return (
        <div className='jobs-main'>
            {data.map((item) => (
                <>
                    <div key={item.id} className="job-card" onClick={() => handleJobCardClick(item)}>
                        <div className="job-title">{item.title}</div>
                        <div className="job-description">{item.description}</div>
                        <div className="date-box d-flex">
                            {/* <div className="start-date">{item.start_date}</div> */}
                            <div className="end-date"> Final date: {item.end_date}</div>
                        </div>
                        <div className={`job-status ${getStatusColor(item.status)}`}>{item.status}</div>
                        {/* <div className="end-da">Final date:{item.end_date}</div> */}
                        {calculateRemainingDays(item.end_date) > 0 &&
                            <div className="date-notification">{calculateRemainingDays(item.end_date)}</div>}
                    </div>
                    {/* {addtask &&
                        <div onClick={HandleopenAddTask} className='add-task-container-overlay'>
                            <Addtask
                                HandleopenAddTask={HandleopenAddTask}
                                handleModalClick={handleModalClick}
                                title={item.title}
                            />
                        </div>
                    } */}
                </>
            ))}
            {isModalOpen && selectedItem && (
                <JobModal closeModal={closeModal} id={selectedItem.id} data={data} />
            )}
        </div>
    )
}

export default Jobs