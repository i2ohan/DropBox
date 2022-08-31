import React from 'react';
import { code } from './code';

import './Style.css';

const Index = () => {
    return (<>

        <div className="app">
       
            <div className="screen join-screen active">
                <div className="form">
                    <h2>Share files securely</h2>
                    <div className="form-input">
                        <button id="sender-start-con-btn" onClick= {code}>Create room</button>

                    </div>
                    <div className="form-input" id="join-id">

                    </div>
                </div>
            </div>

            <div className="screen fs-screen ">
                <div className="file-input">
                    <label htmlFor="file-input">
                        Click here to select file for sharing
                    </label>
                    <input type="file" id="file-input" />
                </div>
                <div className="files-list">

                    <div className="title">Shared files:</div>
                    
                </div>
            </div>
        </div>

    </>
    )
}

export default Index;




{/* <script type="text/javascript" src="socket.io/socket.io.js"></script>
    <script type="text/javascript" src="code.js"></script> */}
