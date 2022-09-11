import React, { useEffect, useState } from "react";
import SessionConfig from '../../../configuration/authentication/SessionConfig.js';
import LocalStorageService from "../../services/localStorage/LocalStorageService.js";
import MonitorService from "../../services/monitoring/MonitorService.js";


//Test: DONE
export default function LogoutSessionModal(){
    const [countdown, setCountdown] = useState();


    useEffect(()=>{
        MonitorService.capture('LogoutSessionModal-useEffect-triggered-OK');
        let countdownValue = LocalStorageService.getItemFromLocalStorage(SessionConfig.LOGOUT_SESSION_COUNTDOWN_VALUE);
        setCountdown(countdownValue);
        let _intervalId = setInterval(() => {

            let countdownValueInsideInterval = LocalStorageService.getItemFromLocalStorage(SessionConfig.LOGOUT_SESSION_COUNTDOWN_VALUE);
            MonitorService.capture('useEffect-setInterval-countdownValue', countdownValueInsideInterval);
            setCountdown(countdownValueInsideInterval);
            if(countdownValueInsideInterval <= 0){
                clearInterval(_intervalId);
                MonitorService.capture('clearInterval-DONE-_intervalId', _intervalId);
                MonitorService.capture('clearInterval-DONE-countdownValue', countdownValueInsideInterval);
            }
        }, SessionConfig.ONE_SECOND_IN_MILLISECONDS);
        MonitorService.capture('LogoutSessionModal-useEffect-_intervalId', _intervalId)
    }, []);

    return(<div className="logout-session-modal-section">
        <div className="modal-container">
            <div className="modal-notification-box">
                <div className="modal-notification-text">
                    You will be redirected to Home in <b>{countdown ? countdown + ' seconds.': '' }</b>
                    <br/>
                </div>
            </div>
        </div>
    </div>);
}
