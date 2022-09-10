import ComponentAuthorizationService from "../src/services/privateWebPagesMediator/ComponentAuthorizationService";
import ComponentAuthorizationHelper from '../src/services/privateWebPagesMediator/ComponentAuthorizationHelper.js';
import UserRole from '../src/library/enumerations/UserRole.js';
import ComponentConfig from '../configuration/components/ComponentConfig.js';
import RolePermission from '../src/library/stringLiterals/RolePermission.js';
import routeConfiguration from "../configuration/routes/RouteConfig";
import RouteConfig from '../configuration/routes/RouteConfig.js';


jest.mock('../src/services/privateWebPagesMediator/ComponentAuthorizationHelper.js');


describe('File: ComponentAuthorizationService', function(){

    beforeEach(()=>{
        jest.resetAllMocks();
    } );
    afterAll(()=>{
        jest.resetAllMocks();
    });


    describe('Function: getUserInfo',function(){
        test('CAN get User Info', function(){

            //Arrange
            let user={
                name:'Tom'
            }
            ComponentAuthorizationService.setUserInfo(user);
            //Act
            let userInfo = ComponentAuthorizationService.getUserInfo();
            //Assert
            expect(userInfo.name).toEqual(user.name);
        })
    } );



    describe('Function: setUserInfo',function(){
        test('CAN set User Info', function(){

            //Arrange
            let user={
                name:'Tom'
            }
            ComponentAuthorizationService.setUserInfo(user);
            //Act
            let userInfo = ComponentAuthorizationService.getUserInfo();
            //Assert
            expect(userInfo.name).toEqual(user.name);
        })
    } );



    describe('Function: getUserRolesArray',function(){
        test('CAN get UserRoles Array', function(){

            //Arrange
            let _userRolesInfo=[UserRole.BaseCustomer, UserRole.GoldCustomer]

            ComponentAuthorizationService.setUserRolesArray(_userRolesInfo);
            //Act
            let userRolesTest = ComponentAuthorizationService.getUserRolesArray();
            //Assert
            expect(userRolesTest.length).toEqual(2);
        })
    } );



    describe('Function: setUserRolesArray',function(){
        test('CAN set UserRoles Array', function(){

            //Arrange
            let _userRolesInfo=[UserRole.BaseCustomer, UserRole.GoldCustomer, UserRole.PremiumCustomer]


            //Act
            ComponentAuthorizationService.setUserRolesArray(_userRolesInfo);
            let userRolesTest = ComponentAuthorizationService.getUserRolesArray();
            //Assert
            expect(userRolesTest.length).toEqual(3);
        })
    } );



    describe('Function: roleIsAuthorized', function(){
        test('CAN identify if a role is authorized for a Component', function(){
            //Arrange
            let mockRolesFound = [UserRole.BaseCustomer, UserRole.GoldCustomer]
            ComponentAuthorizationHelper.getAllAuthorizedRoles = jest.fn().mockReturnValue(mockRolesFound);
            let mockComponent = {
                roles:[UserRole.BaseCustomer],
                approvedPermissions:[ RolePermission.READ]
            }
            ComponentAuthorizationHelper.getComponentInfo = jest.fn().mockReturnValue(mockComponent);
            let componentName =ComponentConfig._CustomerDashboard.type.name;
            //Act
            let result = ComponentAuthorizationService.roleIsAuthorized(componentName);
            //Assert
            expect(result).toBe(true);
        })
    });

    describe('Function: routeIsAuthorized', function(){
        test('CAN identify when a Route is Authorized For a Role', function(){
            //Arrange
            let route = routeConfiguration.privateCustomerGoldOffersPath

            let mockRouteResult =   {
                route: RouteConfig.privateCustomerGoldOffersPath,
                roles:[
                    {
                        name:UserRole.GoldCustomer,
                        approvedPermissions:[RolePermission.READ, RolePermission.WRITE]
                    }
                ]
            };
            ComponentAuthorizationHelper.getRouteInfo = jest.fn().mockReturnValue(mockRouteResult);
            let authorizedRoles = [UserRole.GoldCustomer]
            ComponentAuthorizationHelper.getAllAuthorizedRoles = jest.fn().mockReturnValue(authorizedRoles) ;
            //Act
            let result = ComponentAuthorizationService.routeIsAuthorized (route);
            //Assert
            expect( ComponentAuthorizationHelper.getRouteInfo ).toHaveBeenCalledTimes(1);
            expect( ComponentAuthorizationHelper.getAllAuthorizedRoles ).toHaveBeenCalledTimes(1);

        })
    });

    describe('Function: getAllApprovedPermissions', function(){
        test('CAN get All Approved Permissions For a Role', function(){
            //Arrange
            let mockComponent = {
                roles:[UserRole.BaseCustomer],
                approvedPermissions:[ RolePermission.READ]
            }
            ComponentAuthorizationHelper.getComponentInfo = jest.fn().mockReturnValue(mockComponent);
            ComponentAuthorizationHelper.getAllAuthorizedRoles = jest.fn();
            ComponentAuthorizationHelper.findApprovedPermissions = jest.fn();

            let componentName =ComponentConfig._CustomerDashboard.type.name;
            //Act
            let result = ComponentAuthorizationService.getAllApprovedPermissions(componentName);
            //Assert
            expect( ComponentAuthorizationHelper.getComponentInfo ).toHaveBeenCalledTimes(1);
            expect( ComponentAuthorizationHelper.getAllAuthorizedRoles ).toHaveBeenCalledTimes(1);
            expect( ComponentAuthorizationHelper.findApprovedPermissions ).toHaveBeenCalledTimes(1);

        })
    });
});
