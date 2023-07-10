import React, { useContext, useState } from 'react';
import './ejobmodal.css'
import profileimage from '../../assets/images/6522516.png'
import Dropdown from 'react-dropdown';
import axios from 'axios';
import MyContext from '../../Context/Context';


function JobModal(props) {
    const { HandleopenAddTask, handleModalClick } = useContext(MyContext);
    const { closeModal, id, data } = props;
    const token = localStorage.getItem('token');
    const filteredData = data.filter(item => item.id === id);
    const [selectedOption, setSelectedOption] = useState(null);
    const [comment, setComment] = useState('');
    // console.log(data)

    const showButton = selectedOption || comment;

    const SubmitTask = async (event) => {
        event.preventDefault();
        try {
            let postData = {
                status: selectedOption,
                comments: comment,
            };

            if (selectedOption === "DONE") {
                const submissionDate = getCurrentDate(); // Get the current date
                postData = {
                    ...postData,
                    submission_date: submissionDate, // Add submission_date to the postData object
                };
            }

            const response = await axios.put(
                `http://127.0.0.1:8000/api/jobs/${id}/status/`,
                postData,
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                        'Content-Type': 'application/json',
                    },
                }
            );

            console.log(response.data);
            closeModal();
            window.location.reload();
        } catch (error) {
            console.error(error);
            console.log(error);
        }
    };

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
        const timeDiff = finalDate.getTime() - currentDate.getTime();
        const remainingDays = Math.floor(timeDiff / (1000 * 3600 * 24));
        return remainingDays;
    };
    return (
        <div className='job-view-main' onClick={closeModal} >
            {filteredData.map(item => (
                <div onClick={handleModalClick} className='job-view-container d-flex flex-column'>
                    <div className="title-container d-flex justify-content-between">
                        <div className="job-view-title">{item.title}</div>
                        {calculateRemainingDays(item.end_date) > 0 &&
                            <div className="job-view-des">Remaining Days: {calculateRemainingDays(item.end_date)}</div>}
                    </div>
                    <div className="des-icon-container d-flex justify-content-between">
                        <div className="job-view-des">{item.description}</div>
                        <div
                            className="job-edit-icon"
                        // onClick={HandleopenAddTask}
                        ></div>

                    </div>
                    <div className="job-view-status">Status: <span className={`job-view-status ${getStatusColor(item.status)}`}>{item.status}</span>
                        <select
                            value={selectedOption}
                            onChange={(event) => setSelectedOption(event.target.value)}
                        >
                            <option value="">Change Status</option>
                            <option value="STARTED_WORKING">STARTED_WORKING</option>
                            <option value="CHECKING">CHECKING</option>
                            <option value="IN_PROGRESS">IN_PROGRESS</option>
                            <option value="NOT_STARTED">NOT_STARTED</option>
                            <option value="DONE">DONE</option>
                        </select>

                    </div>
                    <div className="d-flex job-view-employee-container">
                        <div className="employees-working">
                            Employees Working:
                        </div>
                        <div className="employees-map-container">
                            {item.employees && item.employees.map((employee, index) => (
                                <div key={index} className="job-view-employees"><img src={profileimage} /> {employee}</div>
                            ))}
                        </div>
                    </div>
                    <div className="job-view-start_end d-flex">
                        <div className="job-view-start-date"><span>Start Date:</span>{item.start_date}</div>
                        <div className="job-view-end-date"><span>End Date:</span>{item.end_date}</div>
                    </div>
                    {/* <div className="done-date">
                        {item.submission_date}
                    </div> */}

                    <div className='d-flex comment-box-title'>Comments</div>
                    <div className="comment-box d-flex">
                        <textarea
                            className='form-control'
                            type='text'
                            defaultValue={item.comments}
                            // value={comment}
                            onChange={(event) => setComment(event.target.value)}
                        />
                    </div>
                    {showButton && (
                        <button onClick={SubmitTask}>Submit</button>
                    )}
                </div>
            ))}
        </div>
    );
}

export default JobModal;
