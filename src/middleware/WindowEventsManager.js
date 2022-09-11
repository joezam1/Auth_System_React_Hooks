import IntervalIdName from '../library/enumerations/IntervalIdName.js';
import LocalStorageService from '../services/localStorage/LocalStorageService.js';
import InputCommonInspector from '../services/validators/InputCommonInspector.js';
import SessionUpdateInspector from './SessionUpdateInspector.js';
import IdleSessionInspector from './IdleSessionInspector.js';
import MonitorService from '../services/monitoring/MonitorService.js';



const WindowEventManager = (function () {

    //Test: DONE
    const resolveWindowNavigationEvent = function () {
        MonitorService.capture('FILE: WindowEventManager.js');
        MonitorService.capture('Inserted in File: App.js ');

        if (window.performance) {
            console.info("window.performance supported: OK");
            const entriesNavigation = ((window.performance.getEntriesByType) !== undefined ) ? window.performance.getEntriesByType("navigation"): [];

            if (entriesNavigation.length>0 && entriesNavigation[0].entryType === 'navigation') {
                MonitorService.capture('navigation-EVENT-LOADED');
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
    MonitorService.capture('resolveAllMiddlewareWindowIntervalsTracked-STARTED');

    resolveUpdateExpiringSessionInterval();
    resolveIdleBrowserTimeoutInterval();
    MonitorService.capture('resolveAllMiddlewareWindowIntervalsTracked-END');
}

function resolveUpdateExpiringSessionInterval(){
    MonitorService.capture('resolveUpdateExpiringSessionInterval-STARTED');

    let intervalIdName = IntervalIdName[IntervalIdName.sessionUpdateIntervalId];
    let updateIntervalId = LocalStorageService.getItemFromLocalStorage ( intervalIdName );
    if(InputCommonInspector.inputExist( updateIntervalId ) || InputCommonInspector.stringIsValid(updateIntervalId) ){

        clearInterval(updateIntervalId);
        LocalStorageService.removeItemFromLocalStorage(intervalIdName);
        SessionUpdateInspector.resolveUpdateExpiringSession();
    }
    MonitorService.capture('resolveUpdateExpiringSessionInterval-END');
}




function resolveIdleBrowserTimeoutInterval(){
    MonitorService.capture('resolveIdleBrowserTimeoutInterval-STARTED');
    let storageName = IntervalIdName[IntervalIdName.idleBrowserIntervalId];
    let idleIntervalId = LocalStorageService.getItemFromLocalStorage(storageName);
    if(InputCommonInspector.inputExist( idleIntervalId ) || InputCommonInspector.stringIsValid(idleIntervalId) ){

        clearInterval(idleIntervalId);
        LocalStorageService.removeItemFromLocalStorage(storageName);
        IdleSessionInspector.scanIdleBrowserTime();
    }
    MonitorService.capture('resolveIdleBrowserTimeoutInterval-END');
}