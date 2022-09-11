import React, { useEffect, useState } from "react";
import SessionConfig from '../../../configuration/authentication/SessionConfig.js';
import LocalStorageService from "../../services/localStorage/LocalStorageService.js";

//Test: DONE
export default function LogoutSessionModal(){
    const [countdown, setCountdown] = useState();


    useEffect(()=>{
        console.log('LogoutSessionModal-useEffect-triggered-OK');
        let countdownValue = LocalStorageService.getItemFromLocalStorage(SessionConfig.LOGOUT_SESSION_COUNTDOWN_VALUE);
        setCountdown(countdownValue);
        let _intervalId = setInterval(() => {

            let countdownValueInsideInterval = LocalStorageService.getItemFromLocalStorage(SessionConfig.LOGOUT_SESSION_COUNTDOWN_VALUE);
            console.log('useEffect-setInterval-countdownValue', countdownValueInsideInterval);
            setCountdown(countdownValueInsideInterval);
            if(countdownValueInsideInterval <= 0){
                clearInterval(_intervalId);
                console.log('clearInterval-DONE-_intervalId', _intervalId);
                console.log('clearInterval-DONE-countdownValue', countdownValueInsideInterval);
            }
        }, SessionConfig.ONE_SECOND_IN_MILLISECONDS);
        console.log('LogoutSessionModal-useEffect-_intervalId', _intervalId)
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
