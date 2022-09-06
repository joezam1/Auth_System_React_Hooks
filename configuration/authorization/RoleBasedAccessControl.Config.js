import UserRole from '../../src/library/enumerations/UserRole.js';
import RolePermission from '../../src/library/stringLiterals/RolePermission';
import RouteConfig from '../routes/RouteConfig.js';
import ComponentConfig from '../components/ComponentConfig.js';

const RoleBasedAccessControlConfig = (function(){

    const privateRoutes = [

        {
            route: RouteConfig.privateCustomerDashboardPath,
            roles:[
                {
                    name:UserRole.BaseCustomer,
                    approvedPermissions:[RolePermission.READ]
                },
                {
                    name:UserRole.SilverCustomer,
                    approvedPermissions:[RolePermission.READ]
                },
                {
                    name:UserRole.GoldCustomer,
                    approvedPermissions:[RolePermission.READ]
                },
                {
                    name:UserRole.PremiumCustomer,
                    approvedPermissions:[RolePermission.READ]
                }
            ]
        },
        {
            route:RouteConfig.privateCustomerOrdersPath,
            roles:[
                {
                    name:UserRole.BaseCustomer,
                    approvedPermissions:[RolePermission.READ]
                },
                {
                    name:UserRole.SilverCustomer,
                    approvedPermissions:[RolePermission.READ]
                },
                {
                    name:UserRole.GoldCustomer,
                    approvedPermissions:[RolePermission.READ]
                },
                {
                    name:UserRole.PremiumCustomer,
                    approvedPermissions:[RolePermission.READ]
                }
            ]
        },
        {
            route:RouteConfig.privateCustomerSilverOffersPath,
            roles:[
                {
                    name:UserRole.SilverCustomer,
                    approvedPermissions:[RolePermission.READ]
                }
            ]
        },
        {
            route:RouteConfig.privateCustomerGoldOffersPath,
            roles:[
                {
                    name:UserRole.GoldCustomer,
                    approvedPermissions:[RolePermission.READ, RolePermission.WRITE]
                }
            ]
        },
        {
            route:RouteConfig.privateCustomerPremiumOffersPath,
            roles:[
                {
                    name:UserRole.PremiumCustomer,
                    approvedPermissions:[RolePermission.READ, RolePermission.WRITE]
                }
            ]
        },
        {
            route:RouteConfig.privateCustomerPremiumClubMemberPath,
            roles:[
                {
                    name:UserRole.PremiumCustomer,
                    approvedPermissions:[RolePermission.READ, RolePermission.WRITE]
                }
            ]
        }
    ]

    const privateComponents = [
        {
            component: ComponentConfig._CustomerDashboard.type.name,
            roles:[
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
        },
        {
            component : ComponentConfig._CustomerOrders.type.name,
            roles:[
                {
                    name: UserRole.BaseCustomer,
                    approvedPermissions:[RolePermission.READ ]
                },
                {
                    name: UserRole.SilverCustomer,
                    approvedPermissions:[RolePermission.READ, RolePermission.WRITE ]
                },
                {
                    name: UserRole.GoldCustomer,
                    approvedPermissions:[RolePermission.READ , RolePermission.CREATE, RolePermission.EDIT, RolePermission.DELETE]
                },
                {
                    name: UserRole.PremiumCustomer,
                    approvedPermissions:[RolePermission.READ, RolePermission.WRITE, RolePermission.CREATE, RolePermission.EDIT, RolePermission.DELETE ]
                }
            ]
        },
        {
            component:ComponentConfig._SilverOffers.type.name,
            roles:[
                {
                    name:UserRole.SilverCustomer,
                    approvedPermissions:[RolePermission.READ, RolePermission.WRITE]
                }
            ]
        },
        {
            component:ComponentConfig._GoldOffers.type.name,
            roles:[
                {
                    name:UserRole.GoldCustomer,
                    approvedPermissions:[RolePermission.READ, RolePermission.WRITE]
                }
            ]
        },
        {
            component:ComponentConfig._PremiumOffers.type.name,
            roles:[
                {
                    name:UserRole.PremiumCustomer,
                    approvedPermissions:[RolePermission.READ, RolePermission.WRITE]
                }
            ]
        },
        {
            component:ComponentConfig._PremiumClubMember.type.name,
            roles:[
                {
                    name:UserRole.PremiumCustomer,
                    approvedPermissions:[RolePermission.READ, RolePermission.WRITE]
                }
            ]
        },
        {
            component:ComponentConfig._LinkButtonPrivateRedirect.type.name,
            roles:[
                {
                    name: UserRole.BaseCustomer,
                    approvedPermissions:[RolePermission.READ ]
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
                },
                {
                    name:UserRole.Editor ,
                    approvedPermissions:[RolePermission.READ, RolePermission.WRITE, RolePermission.EDIT]
                },
                {
                    name:UserRole.Moderator ,
                    approvedPermissions:[RolePermission.READ, RolePermission.WRITE]
                },
                {
                    name:UserRole.Advertiser ,
                    approvedPermissions:[RolePermission.READ, RolePermission.WRITE]
                },
                {
                    name:UserRole.TechnicalAnalyst ,
                    approvedPermissions:[RolePermission.READ, RolePermission.WRITE]
                },
                {
                    name:UserRole.CommercialAnalyst ,
                    approvedPermissions:[RolePermission.READ, RolePermission.WRITE]
                },
                {
                    name:UserRole.Admin,
                    approvedPermissions:[ RolePermission.READ, RolePermission.WRITE, RolePermission.EDIT, RolePermission.DELETE ]
                }
            ]
        }

    ]

    return {
        privateRoutes : privateRoutes,
        privateComponents : privateComponents
    }
})();


export default RoleBasedAccessControlConfig;