import React , { useEffect , useState} from "react";
import SessionAuthenticationService from "../services/privateWebPagesMediator/SessionAuthenticationService";
import InputCommonInspector from '../services/validators/InputCommonInspector.js';
import InputTypeInspector from '../services/validators/InputTypeInspector.js';
import ComponentAuthorizationService from "../services/privateWebPagesMediator/ComponentAuthorizationService";
import MonitorService from "../services/monitoring/MonitorService";


//Test: DONE
export default function LinkButtonPrivateRedirect(props){
    const [authorization, setAuthorization] = useState('hide');

    useEffect(()=>{
        let roleIsAuthorized = ComponentAuthorizationService.roleIsAuthorized(LinkButtonPrivateRedirect.name);
        MonitorService.capture('LinkButtonPrivateRedirect-useEffect-roleIsAuthorized', roleIsAuthorized);
        let routeIsAuthorized = ComponentAuthorizationService.routeIsAuthorized(props.redirectToLocation);
        MonitorService.capture('LinkButtonPrivateRedirect-useEffect-routeIsAuthorized', routeIsAuthorized);
        if(roleIsAuthorized && routeIsAuthorized){
            setAuthorization('block')
        }
    },[])


    function executePrivateRedirect(){
        let redirect = props.redirectToLocation;
        if(InputTypeInspector.isTypeString(redirect) && InputCommonInspector.stringIsValid( redirect)){
            SessionAuthenticationService.redirectPrivateWebpagesMediator( redirect );
        }
    }

    return(<div className={"button-private-redirect-section " + authorization}>
        <button type="button" className="btnRedirect" onClick={()=>{ executePrivateRedirect();  }} data-testid="button-private-redirect-id"> {props.buttonText} </button>
    </div>)
}