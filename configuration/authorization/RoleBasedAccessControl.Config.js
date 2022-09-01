import UserRole from '../../src/library/enumerations/UserRole.js';
import RolePermission from '../../src/library/stringLiterals/RolePermission';
import RouteConfig from '../routes/RouteConfig.js';

import CustomerDashboard from "../webPages/private/CustomerDashboard";
import CustomerOrders from "../../src/webPages/private/CustomerOrders";
import LinkButtonPrivateRedirect from "../../src/components/LinkButtonPrivateRedirect";





const RoleBasedAccessControlConfig = (function(){

    let _customerDashboardComponent = null;
    let _customerOrdersComponent = null;
    let _linkButtonPrivateRedirect = null;

    const privateRoutes = [
        {
            route: RouteConfig.storeOrders,
            roles:[
                {
                    name: UserRole.Editor,
                    actions:[ RolePermission.READ, RolePermission.WRITE ]
                },
                {
                    name: UserRole.Admin,
                    actions:[ RolePermission.READ, RolePermission.WRITE, RolePermission.DELETE ]
                }
            ]
        },
        {
            route: RouteConfig.storeInvoices,
            roles:[
                {
                    name:UserRole.Editor ,
                    actions:[RolePermission.READ, RolePermission.WRITE]
                },
                {
                    name:UserRole.Admin,
                    actions:[ RolePermission.READ, RolePermission.WRITE, RolePermission.DELETE ]
                }
            ]
        },
        {
            route:RouteConfig.storeProducts,
            roles:[
                {
                    name:UserRole.CommercialAnalyst ,
                    actions:[RolePermission.READ , RolePermission.WRITE]
                },
                {
                    name:UserRole.Admin,
                    actions:[ RolePermission.READ, RolePermission.WRITE, RolePermission.DELETE ]
                }
            ]
        },
        {
            route:RouteConfig.storeAdvertising,
            roles:[
                {
                    name:UserRole.Advertiser ,
                    actions:[RolePermission.READ, RolePermission.WRITE]
                },
                {
                    name:UserRole.Admin,
                    actions:[ RolePermission.READ, RolePermission.WRITE, RolePermission.DELETE ]
                }
            ]
        },
        {
            route:RouteConfig.privateCustomerDashboard,
            roles:[
                {
                    name:UserRole.BaseCustomer,
                    actions:[RolePermission.READ]
                },
                {
                    name:UserRole.SilverCustomer,
                    actions:[RolePermission.READ]
                },
                {
                    name:UserRole.GoldCustomer,
                    actions:[RolePermission.READ]
                },
                {
                    name:UserRole.PremiumCustomer,
                    actions:[RolePermission.READ]
                }
            ]
        },
        {
            route:RouteConfig.privateCustomerOrders,
            roles:[
                {
                    name:UserRole.BaseCustomer,
                    actions:[RolePermission.READ]
                },
                {
                    name:UserRole.SilverCustomer,
                    actions:[RolePermission.READ]
                },
                {
                    name:UserRole.GoldCustomer,
                    actions:[RolePermission.READ]
                },
                {
                    name:UserRole.PremiumCustomer,
                    actions:[RolePermission.READ]
                }
            ]
        },
        {
            route:RouteConfig.privateCustomerSilverOffers,
            roles:[
                {
                    name:UserRole.SilverCustomer,
                    actions:[RolePermission.READ]
                }
            ]
        },
        {
            route:RouteConfig.privateCustomerGoldOffers,
            roles:[
                {
                    name:UserRole.GoldCustomer,
                    actions:[RolePermission.READ]
                }
            ]
        },
        {
            route:RouteConfig.privateCustomerPremiumOffers,
            roles:[
                {
                    name:UserRole.PremiumCustomer,
                    actions:[RolePermission.READ]
                }
            ]
        },
        {
            route:RouteConfig.privateCustomerPremiumClubMember,
            roles:[
                {
                    name:UserRole.PremiumCustomer,
                    actions:[RolePermission.READ]
                }
            ]
        },
        {
            route:RouteConfig.privateCustomerNewsletter,
            roles:[
                {
                    name:UserRole.BaseCustomer,
                    actions:[RolePermission.READ]
                },
                {
                    name:UserRole.SilverCustomer,
                    actions:[RolePermission.READ]
                }
            ]
        },
        {
            route:RouteConfig.privateCustomerManagerOrders,
            roles:[
                {
                    name:UserRole.GoldCustomer,
                    actions:[RolePermission.READ]
                },
                {
                    name:UserRole.PremiumCustomer,
                    actions:[RolePermission.READ]
                }
            ]
        },
        {
            route:RouteConfig.privateCustomerContactSuppliers,
            roles:[
                {
                    name:UserRole.PremiumCustomer,
                    actions:[RolePermission.READ]
                }
            ]
        }









    ];

    const privateComponents = [
        {
            component: _customerDashboardComponent.type.name,
            roles:[
                {
                    name: UserRole.BaseCustomer,
                    actions:[RolePermission.READ ]
                },
                {
                    name: UserRole.SilverCustomer,
                    actions:[RolePermission.READ ]
                },
                {
                    name: UserRole.GoldCustomer,
                    actions:[RolePermission.READ ]
                },
                {
                    name: UserRole.PremiumCustomer,
                    actions:[RolePermission.READ ]
                }
            ]
        },
        {
            component : _customerOrdersComponent.type.name,
            roles:[
                {
                    name: UserRole.BaseCustomer,
                    actions:[RolePermission.READ ]
                },
                {
                    name: UserRole.SilverCustomer,
                    actions:[RolePermission.READ ]
                },
                {
                    name: UserRole.GoldCustomer,
                    actions:[RolePermission.READ ]
                },
                {
                    name: UserRole.PremiumCustomer,
                    actions:[RolePermission.READ ]
                }
            ]
        },
        {
            component:_linkButtonPrivateRedirect.type.name,
            roles:[
                {
                    name: UserRole.BaseCustomer,
                    actions:[RolePermission.READ ]
                },
                {
                    name: UserRole.SilverCustomer,
                    actions:[RolePermission.READ ]
                },
                {
                    name: UserRole.GoldCustomer,
                    actions:[RolePermission.READ ]
                },
                {
                    name: UserRole.PremiumCustomer,
                    actions:[RolePermission.READ ]
                },
                {
                    name:UserRole.Editor ,
                    actions:[RolePermission.READ, RolePermission.WRITE]
                },
                {
                    name:UserRole.Moderator ,
                    actions:[RolePermission.READ, RolePermission.WRITE]
                },
                {
                    name:UserRole.Advertiser ,
                    actions:[RolePermission.READ, RolePermission.WRITE]
                },
                ,
                {
                    name:UserRole.TechnicalAnalyst ,
                    actions:[RolePermission.READ, RolePermission.WRITE]
                },
                ,
                {
                    name:UserRole.CommercialAnalyst ,
                    actions:[RolePermission.READ, RolePermission.WRITE]
                },
                {
                    name:UserRole.Admin,
                    actions:[ RolePermission.READ, RolePermission.WRITE, RolePermission.DELETE ]
                }
            ]
        }
    ];



    //#REGION Private Functions
    function onInit(){
        _customerDashboardComponent = <CustomerDashboard/>;
        _customerOrdersComponent = <CustomerOrders/>;
        _linkButtonPrivateRedirect = <LinkButtonPrivateRedirect/>
    }
    //#ENDREGION Private Functions
})();


export default RoleBasedAccessControlConfig;