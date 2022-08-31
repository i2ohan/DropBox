import React, { useState } from 'react'
import { recv } from './reciever';
// import './reciever';
import './Style.css';
import { useNavigate } from 'react-router-dom';


const RecieverClient = () => {
    const nav = useNavigate();
    const [random ,setrandom ] = useState(false);
    const Tm = () =>{
        recv();
        setrandom(true);
    }
  return (<>
        <div class="app">
        <div class="screen join-screen active">
            <div class="form">
                <h2>Share files securely</h2>
                <div class="form-input">
                    <label htmlFor="join-id">JOIN ID</label>
                    <input type="text" id="join-id"/>
                </div>
                <div class="form-input">
                    <button id ="reciever-start-con-btn" onClick = {recv}>Connect</button>
                    {
                        random === true?nav('/file'):null
                    }
                </div>
            </div>
        </div>
        
        <div class="screen fs-screen ">
            
            <div class="files-list">
    
            <div class="title">Shared files:</div>
   
            </div>
        </div>
    </div>
</>
  )
}

export default RecieverClient


