import ComponentAuthorizationHelper from "../src/services/privateWebPagesMediator/ComponentAuthorizationHelper.js";
import ComponentConfig from '../configuration/components/ComponentConfig.js';
import RouteConfig from '../configuration/routes/RouteConfig.js';
import UserRole from '../src/library/enumerations/UserRole.js';
import RolePermission from "../src/library/stringLiterals/RolePermission.js";

describe('File: ComponentAuthorizationHelper.js', function(){
    describe('Function: getComponentInfo', function(){

        test('CAN get Component info', function(){
            //Arrange
            let componentName =  ComponentConfig._SilverOffers.type.name;
            //Act
            let result = ComponentAuthorizationHelper.getComponentInfo(componentName);
            //Assert
            expect(result).not.toEqual(null);
        });
    });

    describe('Function: getComponentInfo', function(){

        test('CAN get Component info', function(){
            //Arrange
            let routeName = RouteConfig.privateCustomerSilverOffersPath ;
            //Act
            let result = ComponentAuthorizationHelper.getRouteInfo (routeName);
            //Assert
            expect(result).not.toEqual(null);
        });
    });


    describe('Function: getAllAuthorizedRoles', function(){
        test('CAN getAllAuthorizedRoles', function(){

            //Arrange
            let roles =[
                {
                    name:UserRole.BaseCustomer,
                    approvedPermissions:[ RolePermission.READ]
                },
                {
                    name: UserRole.SilverCustomer,
                    approvedPermissions:[RolePermission.READ ]
                },
                {
                    name: UserRole.GoldCustomer,
                    approvedPermissions:[RolePermission.READ ]
                },
                {
                    name: UserRole.PremiumCustomer,
                    approvedPermissions:[RolePermission.READ ]
                }
            ]
            let userRolesArray = [UserRole.SilverCustomer]
            //Act
            let result = ComponentAuthorizationHelper.getAllAuthorizedRoles(roles, userRolesArray);
            //Assert
            expect(result.length).toEqual(1);
        });
    });

    describe('Function: findApprovedPermissions', function(){
        test('CAN find Approved Permissions', function(){
            //Arrange
            let allUserRolesArray = [
                {
                    name: UserRole.SilverCustomer,
                    approvedPermissions:[RolePermission.READ , RolePermission.WRITE]
                },
                {
                    name: UserRole.GoldCustomer,
                    approvedPermissions:[RolePermission.READ, RolePermission.WRITE, RolePermission.CREATE, RolePermission.EDIT ]
                },
            ]
            //Act
            let result =  ComponentAuthorizationHelper.findApprovedPermissions(allUserRolesArray);
            //Assert
            expect(result.length).toEqual(4);
        });
    });

});
