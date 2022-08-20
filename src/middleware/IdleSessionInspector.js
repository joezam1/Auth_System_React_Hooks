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

const IdleSessionInspector = (function(){

    const scanIdleBrowserTime = function(){

        let cookieName = LocalStorageService.getItemFromLocalStorage( CookieProperty.NAME);
        let cookieValue = CookieService.getCookieFromDataStoreByName(cookieName);

        if(!InputCommonInspector.stringIsValid(cookieValue)){
            return;
        }

        const WARNING_MESSAGE_COUNTDOWN_IN_SECONDS = SessionConfig.IDLE_SESSION_COUNTDOWN_SIXTY_SECONDS_IN_MILLISECONDS / SessionConfig.ONE_SECOND_IN_MILLISECONDS;
        const SCANNER_INTERVAL_FREQUENCY = SessionConfig.ONE_SECOND_IN_MILLISECONDS;
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
        }, SCANNER_INTERVAL_FREQUENCY);

        let storageName = IntervalIdName[IntervalIdName.idleBrowserIntervalId];
        LocalStorageService.setItemInLocalStorage(storageName, _idleBrowserIntervalId);


        function startIdleTimeScanner() {
            _idleSecondsCounter++;
            console.log('CheckTime-_idleSecondsCounter:' , _idleSecondsCounter);
            if(_idleSecondsCounter === 0){
                ModalRenderingService.stopRendering();
                LayerRenderingService.stopRendering();
            }
            if(_idleSecondsCounter >= DISPLAY_LOGOUT_WARNING){

                console.log('_countdown-BEFORE : ',_countdown);
                LocalStorageService.setItemInLocalStorage(SessionConfig.IDLE_SESSION_COUNTDOWN_VALUE , _countdown);
                _countdown--;
                console.log('_countdown-AFTER : ',_countdown);
            }
            if(_idleSecondsCounter === DISPLAY_LOGOUT_WARNING){

                LayerRenderingService.startRendering();
                ModalRenderingService.startRendering( ModalWindowName.idleSession )
            }

            if (_idleSecondsCounter >= TOTAL_IDLE_TIMEOUT) {
                window.clearInterval(_idleBrowserIntervalId);
                console.log("Time expired!");
                ModalRenderingService.stopRendering();
                LayerRenderingService.stopRendering();

                Helpers.setUrlRedirect(RouteConfig.authLogoutPath);
            }
        }
    }

    return Object.freeze({
        scanIdleBrowserTime : scanIdleBrowserTime
    });
})();

export default IdleSessionInspector;