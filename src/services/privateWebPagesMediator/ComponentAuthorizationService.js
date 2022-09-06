import JwtTokenService from "../authorization/JwtTokenService";
import TokenType from "../../library/enumerations/TokenType";
import RoleBasedAccessControlConfig from "../../../configuration/authorization/RoleBasedAccessControl.Config";
import InputCommonInspector from '../validators/InputCommonInspector.js';


const ComponentAuthorizationService = (function(){

    let _userRolesArray = null;
    let _userInfo = null;

    const roleIsAuthorized = function(componentName){
        console.log('roleIsAuthorized-componentName', componentName);
        let componentFound = getComponentInfo(componentName);
        let allRolesFound = (InputCommonInspector.inputExist(componentFound)) ? getAllAuthorizedRoles(componentFound.roles, _userRolesArray) : [] ;
        console.log('ComponentAuthorizationService-allRolesFound', allRolesFound);
        if(allRolesFound.length>0){
            return true;
        }
        return false;
    }

    const routeIsAuthorized = function(selectedRoute){
        let routeFound = getRouteInfo(selectedRoute);
        let actualRolesFound =  (InputCommonInspector.inputExist(routeFound)) ? getAllAuthorizedRoles(routeFound.roles, _userRolesArray) : [];
        if(actualRolesFound.length>0){
            return true;
        }
        return false;
    }

    const getAllApprovedPermissions = function(componentName){
        console.log('roleIsAuthorized-componentName', componentName);
        let componentFound = getComponentInfo(componentName);
        let allRolesFound = (InputCommonInspector.inputExist(componentFound)) ? getAllAuthorizedRoles(componentFound.roles, _userRolesArray) : [] ;
        console.log('ComponentAuthorizationService-allRolesFound', allRolesFound);
        let permissionsArray = findApprovedPermissions(allRolesFound);
        return permissionsArray;
    }
    const getUserInfo = function(){
        return _userInfo;
    }

    //#REGION Private Functions
    function onInit(){
        let jwtAccessToken = JwtTokenService.getTokenFromLocalStorage(TokenType.jwtAccessToken);
        if(InputCommonInspector.inputExist(jwtAccessToken)){
            let decryptedPayload = JwtTokenService.decryptEncryptedJwtPayload(jwtAccessToken);
            let allUserRoles = decryptedPayload.userInfo.roles;
            _userRolesArray = allUserRoles;
            _userInfo = decryptedPayload.userInfo;
        }
    }

    function getComponentInfo(componentName){
        let allComponents = RoleBasedAccessControlConfig.privateComponents;
        for(let a = 0; a< allComponents.length; a++){
            if(allComponents[a].component === componentName){
                return allComponents[a];
            }
        }
        return null;
    }

    function getRouteInfo(selectedRoute){
        let allRoutes = RoleBasedAccessControlConfig.privateRoutes;
        for(let a = 0; a< allRoutes.length ; a++){
            if(allRoutes[a].route === selectedRoute){
                return allRoutes[a];
            }
        }
        return null;
    }

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
    //#ENDREGION Private Functions


    function constructor(){

        onInit();
        return{
            getUserInfo : getUserInfo,
            roleIsAuthorized : roleIsAuthorized,
            routeIsAuthorized : routeIsAuthorized,
            getAllApprovedPermissions : getAllApprovedPermissions
        }
    }

    return constructor();

}) ();

export default ComponentAuthorizationService;