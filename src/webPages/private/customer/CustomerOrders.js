import React, { useEffect, useState } from 'react';
import RouteConfig from '../../../../configuration/routes/RouteConfig.js';
import LinkButtonPrivateRedirect from '../../../components/LinkButtonPrivateRedirect.js';
import ComponentAuthorizationService from '../../../services/privateWebPagesMediator/ComponentAuthorizationService.js';
import RolePermission from '../../../library/stringLiterals/RolePermission.js';
import UserRole from '../../../library/enumerations/UserRole.js';
import Helpers from '../../../library/common/Helpers.js';
import InputCommonInspector from '../../../services/validators/InputCommonInspector.js';


//Test: DONE
export default function CustomerOrders() {
    const [username, setUsername]= useState('');
    const [customerType, setCustomerType] = useState('');
    const [authorization, setAuthorization] = useState('hide');
    const [canRead, setStateRead] = useState('hide');
    const [canWrite, setStateWrite]= useState('hide');
    const [canCreate, setStateCreate] = useState('hide');
    const [canEdit, setStateEdit] = useState('hide')
    const [canDelete, setStateDelete] = useState('hide');
    const [canReadWrite, setReadWrite]= useState('hide');
    const [canWriteCreate, setWriteCreate]= useState('hide');
    const [canReadWriteCreate, setReadWriteCreate]= useState('hide');

    useEffect(()=>{
        let userInfo = ComponentAuthorizationService.getUserInfo();
        console.log('userInfo:', userInfo);
        if(InputCommonInspector.inputExist(userInfo)){
            setUsername(userInfo.username);
            setCustomerType( UserRole[userInfo.roles[0]] );
        }

        let roleIsAuthorized = ComponentAuthorizationService.roleIsAuthorized(CustomerOrders.name);
        console.log('LinkButtonPrivateRedirect-useEffect-roleIsAuthorized', roleIsAuthorized);
        if(roleIsAuthorized){ setAuthorization('block') ; }
        let allPermissions = ComponentAuthorizationService.getAllApprovedPermissions(CustomerOrders.name)
        console.log('CustomerOrders-allPermissions', allPermissions);
        if(InputCommonInspector.inputExist(allPermissions)){
            resolveApprovedPermissions(allPermissions);
        }

    }, []);

    function resolveApprovedPermissions(permissionsArray){
        let readWriteLatest = 'hide';
        let readWriteCreateLatest = 'hide';
        let writeCreateLatest = 'hide';
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
            if( permissionsArray[a] === RolePermission.WRITE || permissionsArray[a] === RolePermission.CREATE){
                writeCreateLatest = permissionsArray[a];
            }
        }
        setReadWrite(readWriteLatest);
        setReadWriteCreate(readWriteCreateLatest);
        setWriteCreate(writeCreateLatest);
    }


    return (<div className={'customer-orders-section webpage ' + authorization}>
    <div className='outerLayout'>
        <div className='header-container'>
            <div className='header-title'>
                <span>  Hi <strong> {username}</strong></span>
            </div>
            <div className='header-title'>
                <span> Status: <strong> {Helpers.formatStringFirstLetterCapital(customerType) } </strong> </span>
            </div>
        </div>
        <div className={'container ' + canRead}>
            <h2>Customer Orders Section.</h2>
            <div className='top-navigation-bar'>
                <h3>Go To</h3>
                <LinkButtonPrivateRedirect redirectToLocation={RouteConfig.privateCustomerDashboardPath} buttonText=" Customer Dashboard " />
            </div>
        </div>


        <div className={'container ' + canWriteCreate }>
            <button type="button" id="button3" name="add" className= { "btnCreate "+ canCreate}> Add New Order </button>

            <button type="button" id="button5" name="edit" className={ "btnWrite " + canWrite}> Write in Calendar</button>
        </div>

        <div className="table-container">
            <div className='table'>
                <div className='tableHeading'>
                    <div className='row'>
                        <div className='tableHead'>
                            Selector
                        </div>
                        <div className='tableHead'>
                            Date Order
                        </div>
                        <div className='tableHead'>
                            Order Number
                        </div>
                        <div className='tableHead'>
                            Total Amount
                        </div>
                        <div className='tableHead'>
                            Status
                        </div>
                        <div className='tableHead'>
                            Actions
                        </div>
                    </div>
                </div>

                <div className='tableBody'>
                    <div className='row'>
                        <div className='tableData'>
                        <input type="checkbox" id="check" name="selector" value=""/>
                        </div>
                        <div className='tableData'>
                           <span>2022-06-03 08:14:35</span>
                        </div>
                        <div className='tableData'>
                            <span>#885-638147-111</span>
                        </div>
                        <div className='tableData'>
                            <span> US$ 88,345.80</span>
                        </div>
                        <div className='tableData'>
                            <span>Unprocessed</span>
                        </div>
                        <div className='tableData'>
                            <button type="button" id="button5" name="edit" className={ "btnWrite " + canWrite}> NOTES</button>

                            <button type="button" id="button1" name="edit" className={ "btonEdit "+ canEdit} >EDIT</button>

                            <button type="button" id="button2" name="delete" className={"btnDelete " + canDelete}>DELETE</button>
                        </div>
                    </div>
                    <div className='row'>
                        <div className='tableData'>
                        <input type="checkbox" id="check" name="selector" value=""/>
                        </div>
                        <div className='tableData'>
                           <span>2022-05-23 04:13:33</span>
                        </div>
                        <div className='tableData'>
                            <span>#771-683447-997</span>
                        </div>
                        <div className='tableData'>
                            <span> US$ 23,341.22</span>
                        </div>
                        <div className='tableData'>
                            <span>Unprocessed</span>
                        </div>
                        <div className='tableData'>
                            <button type="button" id="button5" name="edit" className={ "btnWrite " + canWrite}> NOTES</button>

                            <button type="button" id="button1" name="edit" className={ "btonEdit "+ canEdit} >EDIT</button>

                            <button type="button" id="button2" name="delete" className={"btnDelete " + canDelete}>DELETE</button>
                        </div>
                    </div>
                    <div className='row'>
                        <div className='tableData'>
                        <input type="checkbox" id="check" name="selector" value=""/>
                        </div>
                        <div className='tableData'>
                           <span>2022-04-03 08:23:45</span>
                        </div>
                        <div className='tableData'>
                            <span>#890-632547-052</span>
                        </div>
                        <div className='tableData'>
                            <span> US$ 45,635.80</span>
                        </div>
                        <div className='tableData'>
                            <span>In Transit</span>
                        </div>
                        <div className='tableData'>
                            <button type="button" id="button5" name="edit" className={ "btnWrite " + canWrite}> NOTES</button>
                        </div>
                    </div>
                    <div className='row'>
                        <div className='tableData'>
                        <input type="checkbox" id="check" name="selector" value=""/>
                        </div>
                        <div className='tableData'>
                           <span>2022-04-03 08:23:45</span>
                        </div>
                        <div className='tableData'>
                            <span>#844-350014-244</span>
                        </div>
                        <div className='tableData'>
                            <span> US$ 121,655.80</span>
                        </div>
                        <div className='tableData'>
                            <span>In Transit</span>
                        </div>
                        <div className='tableData'>
                            <button type="button" id="button5" name="edit" className={ "btnWrite " + canWrite}> NOTES</button>
                        </div>
                    </div>


                    <div className='row'>
                        <div className='tableData'>
                        <input type="checkbox" id="check" name="selector" value=""/>
                        </div>
                        <div className='tableData'>
                           <span>2022-04-03 08:23:45</span>
                        </div>
                        <div className='tableData'>
                            <span>#222-878497-992</span>
                        </div>
                        <div className='tableData'>
                            <span> US$ 32,687.80</span>
                        </div>
                        <div className='tableData'>
                            <span>Completed</span>
                        </div>
                        <div className='tableData'>

                        </div>
                    </div>
                </div>
            </div>
        </div>

        <div className= {'container ' + canRead}>
             <span>Page 1 </span>
        </div>
    </div>
</div>)
}