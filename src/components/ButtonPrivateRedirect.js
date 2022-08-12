import React from "react";
import SessionValidatorService from "../services/privateWebPagesMediator/SessionValidatorService";
import InputCommonInspector from '../services/validators/InputCommonInspector.js';
import InputTypeInspector from '../services/validators/InputTypeInspector.js';

export default function ButtonPrivateRedirect(props){

    function executePrivateRedirect(){
        let redirect = props.redirectToLocation;
        if(InputTypeInspector.isTypeString(redirect) && InputCommonInspector.stringIsValid( redirect)){
            SessionValidatorService.redirectPrivateWebpagesMediator( redirect );
        }
    }

    return(<div className='button-private-redirect-section'>
        <button type="button" onClick={()=>{ executePrivateRedirect();  }} data-testid="button-private-redirect-id"> {props.buttonText} </button>
    </div>)
}