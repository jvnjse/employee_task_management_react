import React, { useEffect, useState, useContext } from 'react'
import './ejobs.css'
import axios from 'axios';
import EJobModal from '../../HomeEmployee/JobModal/EJobModal';




function Jobs() {
    const token = localStorage.getItem('token');
    const [data, setData] = useState([]);
    const [selectedItem, setSelectedItem] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [filteredData, setFilteredData] = useState([]);
    const [selectedStatus, setSelectedStatus] = useState('');


    const handleJobCardClick = (item) => {
        setSelectedItem(item);
        setIsModalOpen(true);
    };

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get('http://127.0.0.1:8000/api/assigned-jobs/',
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


    const closeModal = () => {
        setIsModalOpen(false);
    };

    useEffect(() => {
        if (selectedStatus) {
            const filteredJobs = data.filter(item => item.status === selectedStatus);
            setFilteredData(filteredJobs);
        } else {
            setFilteredData(data);
        }
    }, [selectedStatus, data]);


    const handleStatusChange = (event) => {
        setSelectedStatus(event.target.value);
    };
    return (
        <div className='ejobs-main'>
            <div className="filter-container">
                <select id="status-filter" value={selectedStatus} onChange={handleStatusChange}>
                    <option value="">All</option>
                    <option value="STARTED_WORKING">STARTED_WORKING</option>
                    <option value="DONE">DONE</option>
                    <option value="CHECKING">CHECKING</option>
                    <option value="IN_PROGRESS">IN_PROGRESS</option>
                    <option value="NOT_STARTED">NOT_STARTED</option>
                </select>
            </div>
            {filteredData.map((item) => (<>
                <div key={item.id} className="ejob-card" onClick={() => handleJobCardClick(item)}>
                    <div className="ejob-title">{item.title}</div>
                    <div className="ejob-description">{item.description}</div>
                    <div className="date-box d-flex">
                        <div className="end-date"> Final date: {item.end_date}</div>
                    </div>
                    <div className={`ejob-status ${getStatusColor(item.status)}`}>{item.status}</div>
                    {/* {item.submission_date && calculateRemainingDays(item.end_date, item.submission_date) > 0 &&
                        <div className="date-notification">Delay Days:{calculateRemainingDays(item.end_date, item.submission_date)}</div>} */}
                </div>
            </>
            ))}
            {isModalOpen && selectedItem && (
                <EJobModal closeModal={closeModal} id={selectedItem.id} data={data} />
            )}
        </div>
    )
}

export default Jobs