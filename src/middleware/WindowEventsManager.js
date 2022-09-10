import IntervalIdName from '../library/enumerations/IntervalIdName.js';
import LocalStorageService from '../services/localStorage/LocalStorageService.js';
import InputCommonInspector from '../services/validators/InputCommonInspector.js';
import SessionUpdateInspector from './SessionUpdateInspector.js';
import IdleSessionInspector from './IdleSessionInspector.js';

const WindowEventManager = (function () {

    //Test: DONE
    const resolveWindowNavigationEvent = function () {
        console.log('FILE: WindowEventManager.js');
        console.log('Inserted in File: App.js ');

        if (window.performance) {
            console.info("window.performance supported: OK");
            const entriesNavigation = ((window.performance.getEntriesByType) !== undefined ) ? window.performance.getEntriesByType("navigation"): [];

            if (entriesNavigation.length>0 && entriesNavigation[0].entryType === 'navigation') {
                console.log('navigation-EVENT-LOADED');
                resolveAllMiddlewareWindowIntervalsTracked();
            }

        } else {
            console.info("window.performance is not supported");
        }
    }

    return Object.freeze({
        resolveWindowNavigationEvent : resolveWindowNavigationEvent
    });
})();

export default WindowEventManager;

function resolveAllMiddlewareWindowIntervalsTracked(){
    console.log('resolveAllMiddlewareWindowIntervalsTracked-STARTED');

    resolveUpdateExpiringSessionInterval();
    //resolveIdleBrowserTimeoutInterval();
    console.log('resolveAllMiddlewareWindowIntervalsTracked-END');
}

function resolveUpdateExpiringSessionInterval(){
    console.log('resolveUpdateExpiringSessionInterval-STARTED');

    let intervalIdName = IntervalIdName[IntervalIdName.sessionUpdateIntervalId];
    let updateIntervalId = LocalStorageService.getItemFromLocalStorage ( intervalIdName );
    if(InputCommonInspector.inputExist( updateIntervalId ) || InputCommonInspector.stringIsValid(updateIntervalId) ){

        clearInterval(updateIntervalId);
        LocalStorageService.removeItemFromLocalStorage(intervalIdName);
        SessionUpdateInspector.resolveUpdateExpiringSession();
    }
    console.log('resolveUpdateExpiringSessionInterval-END');
}




function resolveIdleBrowserTimeoutInterval(){
    console.log('resolveIdleBrowserTimeoutInterval-STARTED');
    let storageName = IntervalIdName[IntervalIdName.idleBrowserIntervalId];
    let idleIntervalId = LocalStorageService.getItemFromLocalStorage(storageName);
    if(InputCommonInspector.inputExist( idleIntervalId ) || InputCommonInspector.stringIsValid(idleIntervalId) ){

        clearInterval(idleIntervalId);
        LocalStorageService.removeItemFromLocalStorage(storageName);
        IdleSessionInspector.scanIdleBrowserTime();
    }
    console.log('resolveIdleBrowserTimeoutInterval-END');
}