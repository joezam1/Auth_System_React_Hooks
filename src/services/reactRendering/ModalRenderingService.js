import React from "react";
import ReactRenderer from './ReactRenderer';
import IdleSessionModal from "../../components/modals/IdleSessionModal.js";
import LogoutSessionModal from "../../components/modals/LogoutSessionModal.js";
import TargetHtmlElementId from "../../library/stringLiterals/TargetHtmlElementId";
import ModalWindowName from '../../library/enumerations/ModalWindowName.js';
import MonitorService from "../monitoring/MonitorService";





const ModalRenderingService = (function(){

    //Test: DONE
    const startRendering = function(modalEnum){
        if(!ReactRenderer.componentIsMounted()){
            onInit();
        }
        renderFactory(modalEnum);
    }
    //Test: DONE
    const stopRendering = function(){
        if(ReactRenderer.componentIsMounted()){
            ReactRenderer.stopRenderingUsingSeparateThread();
        }
    }



    //#REGION Private Functions

    function onInit(){
        ReactRenderer.setHtmlTargetElement( TargetHtmlElementId.MODAL);
        MonitorService.capture( 'ModalRenderingService-onInit-TRIGGERED' );
    }


    function renderFactory (modalEnum){

        switch(modalEnum){

            case ModalWindowName.idleSession:
                ReactRenderer.startRendering(<IdleSessionModal/>);
            break;

            case ModalWindowName.logoutSession:
                ReactRenderer.startRendering(<LogoutSessionModal/>);
            break;
        }
    }

    //#ENDREGION Private Functions



    function constructor(){

        onInit();
        return Object.freeze({
            startRendering : startRendering,
            stopRendering : stopRendering
        });
    }

    return constructor();
})();

export default ModalRenderingService;
