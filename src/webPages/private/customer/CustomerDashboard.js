import React , {useEffect, useState} from 'react';
import { Link } from 'react-router-dom';
import RouteConfig from '../../../../configuration/routes/RouteConfig.js'
import LinkButtonPrivateRedirect from '../../../components/LinkButtonPrivateRedirect.js'
import ComponentAuthorizationService from "../../../services/privateWebPagesMediator/ComponentAuthorizationService";
import UserRole from "../../../library/enumerations/UserRole";
import RolePermission from "../../../library/stringLiterals/RolePermission";
import Helpers from '../../../library/common/Helpers.js';
import InputCommonInspector from '../../../services/validators/InputCommonInspector.js';




//Test: DONE
export default function CustomerDashboard(){

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
        console.log('userInfo:', userInfo);
        if(InputCommonInspector.inputExist(userInfo)){
            setUsername(userInfo.username);
            setCustomerType( UserRole[userInfo.roles[0]] );
        }
        let roleIsAuthorized = ComponentAuthorizationService.roleIsAuthorized(CustomerDashboard.name);
        console.log('LinkButtonPrivateRedirect-useEffect-roleIsAuthorized', roleIsAuthorized);
        if(roleIsAuthorized){ setAuthorization('block') ; }
        let allPermissions = ComponentAuthorizationService.getAllApprovedPermissions(CustomerDashboard.name)
        console.log('CustomerOrders-allPermissions', allPermissions);
        if(InputCommonInspector.inputExist(allPermissions)){
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
        <div className={"section-Customer-dashboard webpage "+ authorization}>

            <div className='outerLayout'>
            <div className='header-container'>
                <div className='header-title'>
                    <span>  Hi <strong> {username}</strong></span>
                </div>
                <div className='header-title'>
                    <span> Status: <strong> {Helpers.formatStringFirstLetterCapital(customerType) } </strong> </span>
                    <span className='floatRight'>  <Link to={RouteConfig.authLogoutPath}>Logout</Link></span>
                </div>
            </div>

            <div className= {'container ' + canRead} >
                <h2>Customer Dashboard</h2>
                <div className='topNavigationBar'>
                    <h3>Go To</h3>
                    <div className=''>
                        <ul className=''>
                            <li className='inlineBlock'>  <LinkButtonPrivateRedirect redirectToLocation={RouteConfig.privateCustomerOrdersPath} buttonText=" Go to Orders " /></li>
                            <li className='inlineBlock'>  <LinkButtonPrivateRedirect redirectToLocation={RouteConfig.privateCustomerSilverOffersPath} buttonText=" Go to Silver  Offers " /></li>
                            <li className='inlineBlock'>  <LinkButtonPrivateRedirect redirectToLocation={RouteConfig.privateCustomerGoldOffersPath} buttonText=" Go to Gold  Offers " /></li>
                            <li className='inlineBlock'>  <LinkButtonPrivateRedirect redirectToLocation={RouteConfig.privateCustomerPremiumOffersPath} buttonText=" Go to Premium  Offers " /></li>
                            <li className='inlineBlock'>  <LinkButtonPrivateRedirect redirectToLocation={RouteConfig.privateCustomerPremiumClubMemberPath} buttonText=" Go to Premium Club Member " /></li>

                        </ul>
                    </div>
                </div>
            </div>
        </div>
    </div>
    )
}