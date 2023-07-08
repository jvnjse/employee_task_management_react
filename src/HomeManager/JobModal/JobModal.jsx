import React from 'react';
import './jobmodal.css'

function JobModal(props) {
    const { closeModal, id, data } = props;
    const filteredData = data.filter(item => item.id === id);
    console.log(data)

    return (
        <div className='job-view-main' onClick={closeModal} >
            {filteredData.map(item => (
                <div className='job-view-container d-flex flex-column'>
                    <div className="job-view-title">{item.title}</div>
                    <div className="job-view-des">{item.description}</div>
                    <div className="job-view-status">{item.status}</div>
                    {item.employees && item.employees.map((employee, index) => (
                        <div key={index} className="job-view-employees">{employee}</div>
                    ))}
                    <div className="job-view-start_end d-flex">
                        <div className="job-view-start-date">{item.start_date}</div>
                        <div className="job-view-end-date">{item.end_date}</div>
                    </div>
                </div>
            ))}
        </div>
    );
}

export default JobModal;
