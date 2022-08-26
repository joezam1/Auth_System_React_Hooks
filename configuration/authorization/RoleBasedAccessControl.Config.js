import UserRole from '../../src/library/enumerations/UserRole.js';
import AuthorizationAction from '../../src/library/stringLiterals/AuthorizationAction.js';
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
                    actions:[ AuthorizationAction.READ, AuthorizationAction.WRITE ]
                },
                {
                    name: UserRole.Admin,
                    actions:[ AuthorizationAction.READ, AuthorizationAction.WRITE, AuthorizationAction.DELETE ]
                }
            ]
        },
        {
            route: RouteConfig.storeInvoices,
            roles:[
                {
                    name:UserRole.Editor ,
                    actions:[AuthorizationAction.READ, AuthorizationAction.WRITE]
                },
                {
                    name:UserRole.Admin,
                    actions:[ AuthorizationAction.READ, AuthorizationAction.WRITE, AuthorizationAction.DELETE ]
                }
            ]
        },
        {
            route:RouteConfig.storeProducts,
            roles:[
                {
                    name:UserRole.CommercialAnalyst ,
                    actions:[AuthorizationAction.READ , AuthorizationAction.WRITE]
                },
                {
                    name:UserRole.Admin,
                    actions:[ AuthorizationAction.READ, AuthorizationAction.WRITE, AuthorizationAction.DELETE ]
                }
            ]
        },
        {
            route:RouteConfig.storeAdvertising,
            roles:[
                {
                    name:UserRole.Advertiser ,
                    actions:[AuthorizationAction.READ, AuthorizationAction.WRITE]
                },
                {
                    name:UserRole.Admin,
                    actions:[ AuthorizationAction.READ, AuthorizationAction.WRITE, AuthorizationAction.DELETE ]
                }
            ]
        },
        {
            route:RouteConfig.privateCustomerDashboard,
            roles:[
                {
                    name:UserRole.BaseCustomer,
                    actions:[AuthorizationAction.READ]
                },
                {
                    name:UserRole.SilverCustomer,
                    actions:[AuthorizationAction.READ]
                },
                {
                    name:UserRole.GoldCustomer,
                    actions:[AuthorizationAction.READ]
                },
                {
                    name:UserRole.PremiumCustomer,
                    actions:[AuthorizationAction.READ]
                }
            ]
        },
        {
            route:RouteConfig.privateCustomerOrders,
            roles:[
                {
                    name:UserRole.BaseCustomer,
                    actions:[AuthorizationAction.READ]
                },
                {
                    name:UserRole.SilverCustomer,
                    actions:[AuthorizationAction.READ]
                },
                {
                    name:UserRole.GoldCustomer,
                    actions:[AuthorizationAction.READ]
                },
                {
                    name:UserRole.PremiumCustomer,
                    actions:[AuthorizationAction.READ]
                }
            ]
        },
        {
            route:RouteConfig.privateCustomerSilverOffers,
            roles:[
                {
                    name:UserRole.SilverCustomer,
                    actions:[AuthorizationAction.READ]
                }
            ]
        },
        {
            route:RouteConfig.privateCustomerGoldOffers,
            roles:[
                {
                    name:UserRole.GoldCustomer,
                    actions:[AuthorizationAction.READ]
                }
            ]
        },
        {
            route:RouteConfig.privateCustomerPremiumOffers,
            roles:[
                {
                    name:UserRole.PremiumCustomer,
                    actions:[AuthorizationAction.READ]
                }
            ]
        },
        {
            route:RouteConfig.privateCustomerPremiumClubMember,
            roles:[
                {
                    name:UserRole.PremiumCustomer,
                    actions:[AuthorizationAction.READ]
                }
            ]
        },
        {
            route:RouteConfig.privateCustomerNewsletter,
            roles:[
                {
                    name:UserRole.BaseCustomer,
                    actions:[AuthorizationAction.READ]
                },
                {
                    name:UserRole.SilverCustomer,
                    actions:[AuthorizationAction.READ]
                }
            ]
        },
        {
            route:RouteConfig.privateCustomerManagerOrders,
            roles:[
                {
                    name:UserRole.GoldCustomer,
                    actions:[AuthorizationAction.READ]
                },
                {
                    name:UserRole.PremiumCustomer,
                    actions:[AuthorizationAction.READ]
                }
            ]
        },
        {
            route:RouteConfig.privateCustomerContactSuppliers,
            roles:[
                {
                    name:UserRole.PremiumCustomer,
                    actions:[AuthorizationAction.READ]
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
                    actions:[AuthorizationAction.READ ]
                },
                {
                    name: UserRole.SilverCustomer,
                    actions:[AuthorizationAction.READ ]
                },
                {
                    name: UserRole.GoldCustomer,
                    actions:[AuthorizationAction.READ ]
                },
                {
                    name: UserRole.PremiumCustomer,
                    actions:[AuthorizationAction.READ ]
                }
            ]
        },
        {
            component : _customerOrdersComponent.type.name,
            roles:[
                {
                    name: UserRole.BaseCustomer,
                    actions:[AuthorizationAction.READ ]
                },
                {
                    name: UserRole.SilverCustomer,
                    actions:[AuthorizationAction.READ ]
                },
                {
                    name: UserRole.GoldCustomer,
                    actions:[AuthorizationAction.READ ]
                },
                {
                    name: UserRole.PremiumCustomer,
                    actions:[AuthorizationAction.READ ]
                }
            ]
        },
        {
            component:_linkButtonPrivateRedirect.type.name,
            roles:[
                {
                    name: UserRole.BaseCustomer,
                    actions:[AuthorizationAction.READ ]
                },
                {
                    name: UserRole.SilverCustomer,
                    actions:[AuthorizationAction.READ ]
                },
                {
                    name: UserRole.GoldCustomer,
                    actions:[AuthorizationAction.READ ]
                },
                {
                    name: UserRole.PremiumCustomer,
                    actions:[AuthorizationAction.READ ]
                },
                {
                    name:UserRole.Editor ,
                    actions:[AuthorizationAction.READ, AuthorizationAction.WRITE]
                },
                {
                    name:UserRole.Moderator ,
                    actions:[AuthorizationAction.READ, AuthorizationAction.WRITE]
                },
                {
                    name:UserRole.Advertiser ,
                    actions:[AuthorizationAction.READ, AuthorizationAction.WRITE]
                },
                ,
                {
                    name:UserRole.TechnicalAnalyst ,
                    actions:[AuthorizationAction.READ, AuthorizationAction.WRITE]
                },
                ,
                {
                    name:UserRole.CommercialAnalyst ,
                    actions:[AuthorizationAction.READ, AuthorizationAction.WRITE]
                },
                {
                    name:UserRole.Admin,
                    actions:[ AuthorizationAction.READ, AuthorizationAction.WRITE, AuthorizationAction.DELETE ]
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