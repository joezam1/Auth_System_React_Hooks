import LayerRenderingService from '../services/reactRendering/LayerRenderingService.js'
import ModalRenderingService from '../services/reactRendering/ModalRenderingService.js'
import RouteConfig from '../../configuration/routes/RouteConfig.js';
import Helpers from '../library/common/Helpers.js';
import SessionConfig from '../../configuration/authentication/SessionConfig.js';
import LocalStorageService from '../services/localStorage/LocalStorageService.js';
import IntervalIdName from '../library/enumerations/IntervalIdName.js';
import InputCommonInspector from '../services/validators/InputCommonInspector.js';
import CookieService from '../services/cookieStorage/CookieService.js';
import CookieProperty from '../library/stringLiterals/CookieProperty.js';
import ModalWindowName from '../library/enumerations/ModalWindowName.js';
import MonitorService from '../services/monitoring/MonitorService.js';




const IdleSessionInspector = (function(){

    //Test: DONE
    const scanIdleBrowserTime = function(){

        let cookieName = LocalStorageService.getItemFromLocalStorage( CookieProperty.NAME);
        let cookieValue = CookieService.getCookieFromDataStoreByName(cookieName);

        if(!InputCommonInspector.stringIsValid(cookieValue)){
            return;
        }

        const WARNING_MESSAGE_COUNTDOWN_IN_SECONDS = SessionConfig.IDLE_SESSION_COUNTDOWN_SIXTY_SECONDS_IN_MILLISECONDS / SessionConfig.ONE_SECOND_IN_MILLISECONDS;

        const MINIMUM_IDLE_TIMEOUT_THREE_MINUTES_IN_SECONDS = 60 * 2; //seconds
        const TOTAL_IDLE_TIMEOUT = (MINIMUM_IDLE_TIMEOUT_THREE_MINUTES_IN_SECONDS - 0 )
        const DISPLAY_LOGOUT_WARNING = TOTAL_IDLE_TIMEOUT - WARNING_MESSAGE_COUNTDOWN_IN_SECONDS;

        let _idleBrowserIntervalId = null;
        var _idleSecondsCounter = -1;
        let _countdown = WARNING_MESSAGE_COUNTDOWN_IN_SECONDS;


        document.onclick = function() {
            _idleSecondsCounter = -1;
        };

        document.onmousemove = function() {
            _idleSecondsCounter = -1;
        };

        document.onkeypress = function() {
            _idleSecondsCounter = -1;
        };

        _idleBrowserIntervalId = window.setInterval(()=>{
            startIdleTimeScanner();
        }, SessionConfig.ONE_SECOND_IN_MILLISECONDS);

        let storageName = IntervalIdName[IntervalIdName.idleBrowserIntervalId];
        LocalStorageService.setItemInLocalStorage(storageName, _idleBrowserIntervalId);


        function startIdleTimeScanner() {
            _idleSecondsCounter++;
            MonitorService.capture('CheckTime-_idleSecondsCounter:' , _idleSecondsCounter);
            MonitorService.capture('CheckTime-MODAL --> _countdown:' , _countdown);
            if(_idleSecondsCounter === 0){
                ModalRenderingService.stopRendering();
                LayerRenderingService.stopRendering();
                _countdown = WARNING_MESSAGE_COUNTDOWN_IN_SECONDS;

            }
            if(_idleSecondsCounter >= DISPLAY_LOGOUT_WARNING){

                MonitorService.capture('_countdown-BEFORE : ',_countdown);
                LocalStorageService.setItemInLocalStorage(SessionConfig.IDLE_SESSION_COUNTDOWN_VALUE , _countdown);
                _countdown--;
                MonitorService.capture('_countdown-AFTER : ',_countdown);
            }
            if(_idleSecondsCounter === DISPLAY_LOGOUT_WARNING){

                LayerRenderingService.startRendering();
                ModalRenderingService.startRendering( ModalWindowName.idleSession )
            }

            if (_idleSecondsCounter >= TOTAL_IDLE_TIMEOUT) {
                resolveLogoutUser(_countdown , _idleSecondsCounter);
            }
            if(_countdown <= 0 ){
                resolveLogoutUser(_countdown , _idleSecondsCounter);
            }
        }
    }

    return Object.freeze({
        scanIdleBrowserTime : scanIdleBrowserTime
    });
})();

export default IdleSessionInspector;

//#REGION Private Functions

function resolveLogoutUser(countdown){
    MonitorService.capture("resolveLogoutUser-countdown", countdown);
    let storageName = IntervalIdName[IntervalIdName.idleBrowserIntervalId];
    let intervalId =  LocalStorageService.getItemFromLocalStorage(storageName);
    MonitorService.capture("resolveLogoutUser-intervalId", intervalId);
    MonitorService.capture("Time expired!");

    window.clearInterval(intervalId);
    LocalStorageService.removeItemFromLocalStorage(storageName);
    ModalRenderingService.stopRendering();
    LayerRenderingService.stopRendering();

    Helpers.setUrlRedirect(RouteConfig.authLogoutPath);
}
//#ENDREGION Private Functions