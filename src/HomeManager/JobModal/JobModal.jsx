import React, { useContext } from 'react';
import './jobmodal.css'
import profileimage from '../../assets/images/6522516.png'
import edit from '../../assets/images/3597088.png'
import MyContext from '../../Context/Context';


function JobModal(props) {
    const { HandleopenAddTask, handleModalClick } = useContext(MyContext);
    const { closeModal, id, data } = props;
    const filteredData = data.filter(item => item.id === id);
    console.log(data)

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
                        ><img src={edit} /></div>

                    </div>
                    <div className="job-view-status">Status: <span className={`job-view-status ${getStatusColor(item.status)}`}>{item.status}</span></div>
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
                    {item.comments && <>
                        <div className='d-flex comment-box-title'>Comments</div>
                        <div className="comment-box d-flex">
                            <div className="comment">{item.comments}</div>
                        </div>
                    </>
                    }
                </div>
            ))}
        </div>
    );
}

export default JobModal;
