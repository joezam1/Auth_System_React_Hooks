import IntervalIdName from '../library/enumerations/IntervalIdName.js';
import LocalStorageService from '../services/localStorage/LocalStorageService.js';
import InputCommonInspector from '../services/validators/InputCommonInspector.js';
import FetchWorker from '../backgroundWorkers/FetchWorker.js';
import SessionUpdateInspector from './SessionUpdateInspector.js';
import IdleSessionInspector from './IdleSessionInspector.js';
import JwtUpdateInspector from './JwtUpdateInspector.js';

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
    resolveUpdateExpiringJsonWebTokenInterval();
    resolveIdleBrowserTimeoutInterval();
    console.log('resolveAllMiddlewareWindowIntervalsTracked-END');
}

function resolveUpdateExpiringSessionInterval(){
    let intervalIdName = IntervalIdName[IntervalIdName.sessionRefreshIntervalId];
    let updateIntervalId = LocalStorageService.getItemFromLocalStorage ( intervalIdName );
    if(InputCommonInspector.objectIsValid( updateIntervalId ) || InputCommonInspector.stringIsValid(updateIntervalId) ){

        clearInterval(updateIntervalId);
        LocalStorageService.removeItemFromLocalStorage(intervalIdName);
        SessionUpdateInspector.resolveUpdatingExpiringSession(FetchWorker);
    }
}

function resolveUpdateExpiringJsonWebTokenInterval(){
    let jwtIntervalIdName = IntervalIdName[IntervalIdName.jwtTokenUpdateIntervalId];
    let jwtUpdateIntervalId = LocalStorageService.getItemFromLocalStorage ( jwtIntervalIdName );
    if(InputCommonInspector.objectIsValid( jwtUpdateIntervalId ) || InputCommonInspector.stringIsValid(jwtUpdateIntervalId) ){

        clearInterval(jwtUpdateIntervalId);
        LocalStorageService.removeItemFromLocalStorage(jwtIntervalIdName);
        JwtUpdateInspector.resolveUpdateExpiringJwtToken(FetchWorker);
    }
}

function resolveIdleBrowserTimeoutInterval(){
    let storageName = IntervalIdName[IntervalIdName.idleBrowserIntervalId];
    let idleIntervalId = LocalStorageService.getItemFromLocalStorage(storageName);
    if(InputCommonInspector.objectIsValid( idleIntervalId ) || InputCommonInspector.stringIsValid(idleIntervalId) ){

        clearInterval(idleIntervalId);
        LocalStorageService.removeItemFromLocalStorage(storageName);
        IdleSessionInspector.scanIdleBrowserTime();
    }
}