import React, { useEffect, useState } from 'react';
import RouteConfig from '../../../../configuration/routes/RouteConfig.js';
import LinkButtonPrivateRedirect from '../../../components/LinkButtonPrivateRedirect.js';
import ComponentAuthorizationService from '../../../services/privateWebPagesMediator/ComponentAuthorizationService.js';
import RolePermission from '../../../library/stringLiterals/RolePermission.js';



//Test: DONE
export default function CustomerOrders() {
    const [authorization, setAuthorization] = useState('hide');
    const [canRead, setStateRead] = useState('hide');
    const [canWrite, setStateWrite]= useState('hide');
    const [canCreate, setStateCreate] = useState('hide');
    const [canEdit, setStateEdit] = useState('hide')
    const [canDelete, setStateDelete] = useState('hide');
    //const [canEditDelete, setStateEditDelete] = useState('hide');
    const [canReadWrite, setReadWrite]= useState('hide');
    const [canReadWriteCreate, setReadWriteCreate]= useState('hide');

    useEffect(()=>{

        let roleIsAuthorized = ComponentAuthorizationService.roleIsAuthorized(CustomerOrders.name);
        console.log('LinkButtonPrivateRedirect-useEffect-roleIsAuthorized', roleIsAuthorized);
        if(roleIsAuthorized){ setAuthorization('block') ; }
        let allPermissions = ComponentAuthorizationService.getAllApprovedPermissions(CustomerOrders.name)
        console.log('CustomerOrders-allPermissions', allPermissions);
        resolveApprovedPermissions(allPermissions);

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

    return (<div className={'customer-orders-section ' + authorization}>

        <span>This is the customer Orders Section.</span>
        <br />
        <h3>Go To</h3>

        <LinkButtonPrivateRedirect redirectToLocation={RouteConfig.privateCustomerDashboardPath} buttonText=" Customer Dashboard " />
        <br />
        <br />

        <div className={ canRead} >
            Can READ
        </div>
        <div className={ canReadWrite} >
            Can READ/WRITE
        </div>

        <div className={ canReadWriteCreate} >
            Can READ/WRITE/CREATE
        </div>

        <div className={ canWrite} >
            Can WRITE
        </div>


        <div className={ canCreate} >
            Can CREATE
        </div>

        <div className={ canEdit} >
            Can EDIT
        </div>

        <div className={ canDelete} >
            Can DELETE
        </div>

        <div className='container'>
            <button type="button" id="button3" name="add" className= { "btnCreate "+ canCreate}> Add New Order </button>

            <button type="button" id="button5" name="edit" className={ "btnWrite " + canWrite}> Write Notes</button>
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
                           <span>2022-04-03 08:23:45</span>
                        </div>
                        <div className='tableData'>
                            <span>#695-632547-052</span>
                        </div>
                        <div className='tableData'>
                            <span> US$ 45,635.80</span>
                        </div>
                        <div className='tableData'>
                            <span>Unprocessed</span>
                        </div>
                        <div className='tableData'>
                            <button type="button" id="button1" name="edit" className={ canEdit} >EDIT</button>
                            <span className={ canEdit}> | </span>
                            <button type="button" id="button2" name="delete" className={canDelete} >DELETE</button>
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
                            <span>#695-632547-052</span>
                        </div>
                        <div className='tableData'>
                            <span> US$ 45,635.80</span>
                        </div>
                        <div className='tableData'>
                            <span>Unprocessed</span>
                        </div>
                        <div className='tableData'>
                            <button type="button" id="button1" name="edit" className={ canEdit}>EDIT</button>
                            <span className={ canEdit}> | </span>
                            <button type="button" id="button2" name="delete" className={canDelete} >DELETE</button>
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
                            <span>#695-632547-052</span>
                        </div>
                        <div className='tableData'>
                            <span> US$ 45,635.80</span>
                        </div>
                        <div className='tableData'>
                            <span>Unprocessed</span>
                        </div>
                        <div className='tableData'>
                            <button type="button" id="button1" name="edit" className={ canEdit} >EDIT</button>
                            <span className={ canEdit}> | </span>
                            <button type="button" id="button2" name="delete" className={canDelete}>DELETE</button>
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
                            <span>#695-333547-052</span>
                        </div>
                        <div className='tableData'>
                            <span> US$ 121,655.80</span>
                        </div>
                        <div className='tableData'>
                            <span>Unprocessed</span>
                        </div>
                        <div className='tableData'>
                            <button type="button" id="button1" name="edit" className={ canEdit}>EDIT</button>
                            <span className={ canEdit}> | </span>
                            <button type="button" id="button2" name="delete" className={canDelete}>DELETE</button>
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
                            <span>#695-535497-992</span>
                        </div>
                        <div className='tableData'>
                            <span> US$ 32,687.80</span>
                        </div>
                        <div className='tableData'>
                            <span>Completed</span>
                        </div>
                        <div className='tableData'>
                            <button type="button" id="button1" name="edit" className={ canEdit}>EDIT</button>
                            <span className={ canEdit}> | </span>
                            <button type="button" id="button2" name="delete" className={canDelete} >DELETE</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>)
}