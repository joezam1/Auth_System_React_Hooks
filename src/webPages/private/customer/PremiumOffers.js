import React, {useEffect, useState} from "react";
import LinkButtonPrivateRedirect from "../../../components/LinkButtonPrivateRedirect";
import RouteConfig from '../../../../configuration/routes/RouteConfig.js';
import ComponentAuthorizationService from "../../../services/privateWebPagesMediator/ComponentAuthorizationService";
import UserRole from "../../../library/enumerations/UserRole";
import RolePermission from "../../../library/stringLiterals/RolePermission";
import Helpers from '../../../library/common/Helpers.js';
import InputCommonInspector from '../../../services/validators/InputCommonInspector.js';
import MonitorService from "../../../services/monitoring/MonitorService";

//Test: DONE
export default function PremiumOffers(){
    const [username, setUsername]= useState('');
    const [customerType, setCustomerType] = useState('');
    const [authorization, setAuthorization] = useState('hide');
    const [canRead, setStateRead] = useState('hide');
    const [canWrite, setStateWrite]= useState('hide');
    const [canCreate, setStateCreate] = useState('hide');
    const [canEdit, setStateEdit] = useState('hide')
    const [canDelete, setStateDelete] = useState('hide');
    const [canReadWrite, setReadWrite]= useState('hide');
    const [canReadWriteCreate, setReadWriteCreate]= useState('hide');


    useEffect(()=>{
        let userInfo = ComponentAuthorizationService.getUserInfo();
        MonitorService.capture('userInfo:', userInfo);
        if(InputCommonInspector.inputExist(userInfo)){
            setUsername(userInfo.username);
            setCustomerType( UserRole[userInfo.roles[0]] );
        }

        let roleIsAuthorized = ComponentAuthorizationService.roleIsAuthorized(PremiumOffers.name);
        MonitorService.capture('LinkButtonPrivateRedirect-useEffect-roleIsAuthorized', roleIsAuthorized);
        if(roleIsAuthorized){ setAuthorization('block') ; }
        let allPermissions = ComponentAuthorizationService.getAllApprovedPermissions(PremiumOffers.name)
        MonitorService.capture('CustomerOrders-allPermissions', allPermissions);
        if(InputCommonInspector.inputExist( allPermissions )){
            resolveApprovedPermissions(allPermissions);
        }

    }, []);



    function resolveApprovedPermissions(permissionsArray){
        let readWriteLatest = '';
        let readWriteCreateLatest = '';
        for( let a = 0; a < permissionsArray.length; a++ ){
            if(permissionsArray[a] === RolePermission.READ){ setStateRead(permissionsArray[a]); }
            if(permissionsArray[a] === RolePermission.WRITE){ setStateWrite(permissionsArray[a]); }
            if(permissionsArray[a] === RolePermission.CREATE){ setStateCreate(permissionsArray[a]); }
            if(permissionsArray[a] === RolePermission.EDIT){ setStateEdit(permissionsArray[a]); }
            if(permissionsArray[a] === RolePermission.DELETE){ setStateDelete(permissionsArray[a]); }

            if(permissionsArray[a] === RolePermission.READ || permissionsArray[a] === RolePermission.WRITE){
                readWriteLatest = permissionsArray[a];
            }
            if(permissionsArray[a] === RolePermission.READ || permissionsArray[a] === RolePermission.WRITE || permissionsArray[a] === RolePermission.CREATE){
                readWriteCreateLatest = permissionsArray[a];
            }
        }
        setReadWrite(readWriteLatest);
        setReadWriteCreate(readWriteCreateLatest);
    }

    return(
    <div className={ "customer-silver-offers-section webpage " + authorization}>
         <div className='outerLayout'>
            <div className='header-container'>
                <div className='header-title'>
                    <span>  Hi <strong> {username}</strong></span>
                </div>
                <div className='header-title'>
                    <span> Status: <strong> {Helpers.formatStringFirstLetterCapital(customerType) } </strong> </span>
                </div>
            </div>

            <div className='container'>
                <h2>PREMIUM OFFERS Section.</h2>
                <div className='topNavigationBar'>
                    <h3>Go To</h3>
                    <LinkButtonPrivateRedirect redirectToLocation={RouteConfig.privateCustomerDashboardPath} buttonText=" Customer Dashboard " />
                </div>
            </div>
            <div className="flex-container">
                <div className="product">item1</div>
                <div className="product">item2</div>
                <div className="product">item3</div>
                <div className="product">item4</div>
                <div className="product">item5</div>
                <div className="product">item6</div>
            </div>

            <div className= {'container ' + canRead}>
                <span>Page 1 </span>
            </div>
        </div>
    </div>)
}