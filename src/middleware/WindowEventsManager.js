import IntervalIdName from '../library/enumerations/IntervalIdName.js';
import LocalStorageService from '../services/localStorage/LocalStorageService.js';
import InputCommonInspector from '../services/validators/InputCommonInspector.js';
import SessionRefreshInspector from '../middleware/SessionRefreshInspector.js';
import FetchWorker from '../backgroundWorkers/FetchWorker.js';

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
    let intervalIdName = IntervalIdName[IntervalIdName.sessionRefreshIntervalId];
    let intervalId = LocalStorageService.getItemFromLocalStorage ( intervalIdName );
    if(InputCommonInspector.objectIsValid( intervalId ) || InputCommonInspector.stringIsValid(intervalId) ){
        clearInterval(intervalId);
        LocalStorageService.removeItemFromLocalStorage(intervalIdName);
        SessionRefreshInspector.resolveRefreshingExpiringSession(FetchWorker);
    }
}