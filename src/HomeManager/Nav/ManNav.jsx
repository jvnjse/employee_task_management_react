import React from 'react'
import './nav.css'
import navlogo from '../../assets/images/pngtree-black-correct-icon-design-template-vector-png-image_2912232.jpg'
import logout from '../../assets/images/1828424.png'
import { useNavigate } from 'react-router-dom';



function ManNav() {

    const navigate = useNavigate();
    const HandleLogout = () => {
        localStorage.removeItem("token")
        navigate("/")

    }
    return (
        <div className='nav-main'>
            <div>
                <img src={navlogo} />
            </div>
            <div onClick={HandleLogout} className='logout'>
                <img src={logout} />
            </div>
        </div>
    )
}

export default ManNav