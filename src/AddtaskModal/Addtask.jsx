import React, { useState, useEffect } from 'react'
import axios from 'axios';
import './addtask.css'

function Addtask(props) {
    const { HandleopenAddTask, handleModalClick, title } = props;
    const token = localStorage.getItem('token');
    const [employeebox, setEmployeeBox] = useState(false);
    const [data, setData] = useState([]);
    console.log("title", title)
    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get('http://127.0.0.1:8000/api/users/',
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
    const HandleopenEmployee = () => {
        setEmployeeBox(!employeebox)
    }

    const [formData, setFormData] = useState({
        title: '',
        description: '',
        employees: [],
        start_date: '',
        end_date: '',
    });
    const handleChange = (event) => {
        const { name, value } = event.target;
        setFormData((prevFormData) => ({
            ...prevFormData,
            [name]: value
        }));
    };


    const SubmitTask = async (event) => {
        event.preventDefault();
        try {
            const response = await axios.post('http://127.0.0.1:8000/api/jobs/',
                formData,
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                        'Content-Type': 'application/json'
                    }
                });
            console.log(response.data);
            HandleopenAddTask()
            window.location.reload()
        } catch (error) {
            console.error(error); // Handle the error
            console.log(error)
        }
    };

    const handleEmployeeClick = (value) => {
        setFormData((prevFormData) => ({
            ...prevFormData,
            employees: [...prevFormData.employees, value]
        }));
    };
    return (
        <div>
            <div onClick={HandleopenAddTask} className='add-task-container-overlay'>
                <div onClick={handleModalClick} className="add-task-container">
                    <div className="addtask-title">
                        Add Task
                    </div>
                    <div className="input-container">
                        <input
                            className='form-control m-2 title-input'
                            placeholder='Title'
                            type='text'
                            name='title'
                            value={formData.title}
                            onChange={handleChange}
                        />
                        <input
                            className='form-control m-2 title-input'
                            placeholder='Description'
                            type='text'
                            name='description'
                            value={formData.description}
                            onChange={handleChange}
                        />
                        <div className="employee-box">
                            <textarea
                                className='form-control m-2 title-input employee-input'
                                placeholder='Add Employees'
                                type='text'
                                name='employees'
                                disabled
                                value={formData.employees.join(', ')}
                                onChange={handleChange}
                            />
                            <div onClick={HandleopenEmployee} className='add-employee-btn'>+</div>
                            {employeebox && (
                                <>
                                    <div className='employee-modal-box'>
                                        <ul>
                                            {data.map((user) => (
                                                <li
                                                    onClick={() => handleEmployeeClick(user.username)}
                                                    key={user.id}
                                                    style={{
                                                        display: formData.employees.includes(user.username) ? 'none' : 'block'
                                                    }}
                                                >
                                                    {user.username}
                                                </li>
                                            ))}
                                        </ul>
                                    </div>
                                </>
                            )}
                        </div>
                        <div className='d-flex'>
                            <input
                                className='form-control m-2 title-input'
                                placeholder='title'
                                type='date'
                                name='start_date'
                                value={formData.start_date}
                                onChange={handleChange}
                            />
                            <input
                                className='form-control m-2 title-input'
                                placeholder='title'
                                type='date'
                                name='end_date'
                                value={formData.end_date}
                                onChange={handleChange}
                            />
                        </div>
                        <input
                            className='form-control m-2 title-input'
                            placeholder='Comments'
                            type='text'
                            name='comments'
                            value={formData.comments}
                            onChange={handleChange}
                        />
                        <div onClick={SubmitTask} className='addtask-submit-btn'>Submit Task</div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Addtask