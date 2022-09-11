import React, { useEffect, useState } from "react";
import SessionConfig from '../../../configuration/authentication/SessionConfig.js';
import LocalStorageService from "../../services/localStorage/LocalStorageService";
import MonitorService from "../../services/monitoring/MonitorService.js";


//Test: DONE
export default function IdleSessionModal(){


    let _countdownValue = 100;
    const [countdownValue, setCountdown] = useState();

    useEffect(()=>{
        MonitorService.capture('idleSessionModal-useEffect-triggered-OK');
        let _intervalId = setInterval(() => {
            _countdownValue = LocalStorageService.getItemFromLocalStorage(SessionConfig.IDLE_SESSION_COUNTDOWN_VALUE);
            MonitorService.capture('useEffect-setInterval-countdownValue', _countdownValue);
            setCountdown(_countdownValue);
            if(_countdownValue <= 0){
                clearInterval(_intervalId);
                MonitorService.capture('clearInterval-DONE-_intervalId', _intervalId);
                MonitorService.capture('clearInterval-DONE-_countdownValue', _countdownValue);
            }
        }, SessionConfig.ONE_SECOND_IN_MILLISECONDS);
        MonitorService.capture('idleSessionModal-useEffect-_intervalId', _intervalId)
    }, []);

    return(<div className="idle-session-modal-section">
        <div className="modal-container">
            <div className="modal-notification-box">
                <div className="modal-notification-text">
                    You will be Auto looged out in <b>{countdownValue ? countdownValue + ' seconds.': '' }</b>
                    <br/>
                    Please generate activity in your browser to maintain your session.
                </div>
            </div>
        </div>
    </div>);
}
