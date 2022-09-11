import React from "react";
import ReactRenderer from "./ReactRenderer";
import TransparentLayer from "../../components/modals/TransparentBackgroundLayer";
import TargetHtmlElementId from '../../library/stringLiterals/TargetHtmlElementId.js';
import MonitorService from "../monitoring/MonitorService";




const LayerRenderingService = (function(){

    //Test: DONE
    const startRendering = function(){
        if(!ReactRenderer.componentIsMounted()){
            onInit();
        }
        ReactRenderer.startRendering(<TransparentLayer/>);
    }
    //Test: DONE
    const stopRendering = function(){
        if(ReactRenderer.componentIsMounted()){
            ReactRenderer.stopRenderingUsingSeparateThread();
        }
    }


    //#REGION Private Functions

    function onInit(){
        ReactRenderer.setHtmlTargetElement( TargetHtmlElementId.LAYER);
        MonitorService.capture( 'onInit-ReactRenderer.setHtmlTargetElement-TRIGGERED' );
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

export default LayerRenderingService;
