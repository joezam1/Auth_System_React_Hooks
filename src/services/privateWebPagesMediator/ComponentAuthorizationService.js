import JwtTokenService from "../authorization/JwtTokenService";
import TokenType from "../../library/enumerations/TokenType";
import ComponentAuthorizationHelper from './ComponentAuthorizationHelper.js'
import InputCommonInspector from '../validators/InputCommonInspector.js';
import MonitorService from "../monitoring/MonitorService";






const ComponentAuthorizationService = (function(){

    let _userRolesArray = null;
    let _userInfo = null;

    //Test: DONE
    const getUserInfo = function(){
        return _userInfo;
    }
    //Test: DONE
    const setUserInfo = function(userInfo){
        return _userInfo = userInfo;
    }

    //Test: DONE
    const getUserRolesArray = function(){
        return _userRolesArray;
    }
    //Test: DONE
    const setUserRolesArray = function(userRolesArray){
        return _userRolesArray = userRolesArray;
    }


    //Test: DONE
    const roleIsAuthorized = function(componentName){
        MonitorService.capture('roleIsAuthorized-componentName', componentName);
        let componentFound = ComponentAuthorizationHelper.getComponentInfo(componentName);
        let allRolesFound = (InputCommonInspector.inputExist(componentFound))
                            ? ComponentAuthorizationHelper.getAllAuthorizedRoles(componentFound.roles, _userRolesArray)
                            : [] ;
        MonitorService.capture('ComponentAuthorizationService-allRolesFound', allRolesFound);
        if(allRolesFound.length>0){
            return true;
        }
        return false;
    }

    //Test: DONE
    const routeIsAuthorized = function(selectedRoute){
        let routeFound = ComponentAuthorizationHelper.getRouteInfo(selectedRoute);
        let actualRolesFound =  (InputCommonInspector.inputExist(routeFound))
                                ? ComponentAuthorizationHelper.getAllAuthorizedRoles(routeFound.roles, _userRolesArray)
                                : [];
        if(actualRolesFound.length>0){
            return true;
        }
        return false;
    }
    //Test: DONE
    const getAllApprovedPermissions = function(componentName){
        MonitorService.capture('roleIsAuthorized-componentName', componentName);
        let componentFound = ComponentAuthorizationHelper.getComponentInfo(componentName);
        let allRolesFound = (InputCommonInspector.inputExist(componentFound))
                            ? ComponentAuthorizationHelper.getAllAuthorizedRoles(componentFound.roles, _userRolesArray)
                            : [] ;
        MonitorService.capture('ComponentAuthorizationService-allRolesFound', allRolesFound);
        let permissionsArray =ComponentAuthorizationHelper.findApprovedPermissions(allRolesFound);
        return permissionsArray;
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

    //#ENDREGION Private Functions


    function constructor(){

        onInit();
        return{
            getUserInfo : getUserInfo,
            setUserInfo : setUserInfo,
            getUserRolesArray : getUserRolesArray,
            setUserRolesArray :setUserRolesArray,
            roleIsAuthorized : roleIsAuthorized,
            routeIsAuthorized : routeIsAuthorized,
            getAllApprovedPermissions : getAllApprovedPermissions
        }
    }

    return constructor();

}) ();

export default ComponentAuthorizationService;