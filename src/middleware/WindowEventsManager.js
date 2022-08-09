import IntervalIdName from '../library/enumerations/IntervalIdName.js';
import LocalStorageService from '../services/localStorage/LocalStorageService.js';
import InputCommonInspector from '../services/validators/InputCommonInspector.js';
import SessionRefreshInspector from '../middleware/SessionRefreshInspector.js';
import FetchWorker from '../backgroundWorkers/FetchWorker.js';

const WindowEventManager = (function () {

    const resolveWindowNavigationEvent = function () {
        console.log('FILE: WindowEventManager.js');
        console.log('Inserted in File: App.js ');

        if (window.performance) {
            console.info("window.performance supported: OK");
            const entriesNavigation = window.performance.getEntriesByType("navigation");

            if (entriesNavigation[0].entryType === 'navigation') {
                console.log('navigation-EVENT-LOADED');
                //console.log('navigation-entries', entriesNavigation);
                //console.log('navigation-entry-type', entriesNavigation[0].entryType);
                resolveAllMiddlewareWindowIntervalsTracked();
            }
            const entriesB = performance.getEntriesByType("resource");
            console.log('navigation-entry-type', entriesB[0].entryType);

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
    let setInntervalIdName = IntervalIdName[IntervalIdName.sessionRefreshIntervalId];
    let intervalId = LocalStorageService.getItemFromLocalStorage ( setInntervalIdName );
    if(InputCommonInspector.objectIsValid(intervalId)){
        clearInterval(intervalId);
        SessionRefreshInspector.resolveRefreshingExpiringSession(FetchWorker);
    }
}