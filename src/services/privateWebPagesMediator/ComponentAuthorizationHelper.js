import InputCommonInspector from '../validators/InputCommonInspector.js';
import RoleBasedAccessControlConfig from '../../../configuration/authorization/RoleBasedAccessControl.Config.js';

//Test: DONE
function getComponentInfo(componentName){
    let allComponents = RoleBasedAccessControlConfig.privateComponents;
    for(let a = 0; a< allComponents.length; a++){
        if(allComponents[a].component === componentName){
            return allComponents[a];
        }
    }
    return null;
}
//Test: DONE
function getRouteInfo(selectedRoute){
    let allRoutes = RoleBasedAccessControlConfig.privateRoutes;
    for(let a = 0; a< allRoutes.length ; a++){
        if(allRoutes[a].route === selectedRoute){
            return allRoutes[a];
        }
    }
    return null;
}
//Test: DONE
function getAllAuthorizedRoles(roles, allUserRolesArray){
    let authorizedRoles = [];
    if(!InputCommonInspector.inputExist(allUserRolesArray) || allUserRolesArray.length ===0 ){
        return authorizedRoles;
    }
    for(let a = 0; a < allUserRolesArray.length; a++){
        for(let b = 0; b < roles.length; b++){
            if(allUserRolesArray[a] === roles[b].name){
                authorizedRoles.push(roles[b])
            }
        }
    }
    return authorizedRoles;
}
//Test: DONE
function findApprovedPermissions(allUserRolesArray){

    let allPermissions = [];
    for(let a= 0; a< allUserRolesArray.length ; a++){
        let permissions = allUserRolesArray[a].approvedPermissions;
        for(let b = 0; b< permissions.length; b++){
            let found = allPermissions.find((permission)=>{
                return permission === permissions[b];
            });
            if(!InputCommonInspector.inputExist(found)){
                allPermissions.push(permissions[b]);
            }
        }
    }
    return allPermissions;
}

const service = Object.freeze({
    getComponentInfo : getComponentInfo,
    getRouteInfo : getRouteInfo,
    getAllAuthorizedRoles : getAllAuthorizedRoles,
    findApprovedPermissions : findApprovedPermissions
});

export default service;