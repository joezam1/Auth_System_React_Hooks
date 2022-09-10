const notificationService = Object.freeze({
    registrationSuccess : 'Account Registered. You can now Login.',
    errorsInForm : 'There are errors in the Form.',
    registrationFailed : 'Error: Registration Failed ',
    registrationNonProcessable : 'Registration non-processable: ',

    loginFailed : 'Error: Login Failed go to Home page and click Login Again.',
    loginNonProcessable : 'Login non-processable: ',

    logoutSuccess : 'Logout Successfull. You will be Redirected to Home',
    logoutFailed : 'Error: Logout Failed ',
    logoutUnauthorized : 'You are now Logged Out. No Valid Authentication. You will be Redirected to Home in 5 Seconds.',
    logoutForbidden : 'You are now Logged Out.No Sufficient Authorization. You will be Redirected to Home in 5 Seconds.',
    logoutNonProcessable : 'Registration non-processable: ',
    resourcesLoadedOk : 'Resources have been loaded OK.',
    errorsOnResourcesLoading : 'There are errors on resource Loading'
});

export default notificationService;