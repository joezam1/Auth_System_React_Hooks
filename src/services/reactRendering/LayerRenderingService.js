import React from "react";
import ReactDOM from "react-dom/client";
import TransparentLayer from "../../components/modals/TransparentBackgroundLayer";
import InputCommonInspector from '../validators/InputCommonInspector.js';

const LayerRenderingService = (function(){

    let _mounted = null;
    let _backgroundLayerSeparator = null;


    const startRendering = function(){
        if(!InputCommonInspector.objectIsValid(_backgroundLayerSeparator)){
            onInit();
        }
        _mounted = true;
        _backgroundLayerSeparator.render(<TransparentLayer/>);
    }

    const stopRendering = function(){
        if(InputCommonInspector.objectIsValid(_backgroundLayerSeparator) && _mounted === true){
            _mounted = false;
            _backgroundLayerSeparator.unmount();
            _backgroundLayerSeparator = null;
        }
    }



    //#REGION Private Functions

    function constructor(){

        onInit();
        return Object.freeze({
            startRendering : startRendering,
            stopRendering : stopRendering
        });
    }

    function onInit(){
        let layerHtmlElement = document.getElementById('layer')
        console.log( 'onInit-layerHtmlElement-layer', layerHtmlElement );
        if(layerHtmlElement !== null && !InputCommonInspector.valueIsUndefined(layerHtmlElement)){
            _backgroundLayerSeparator =  ReactDOM.createRoot(layerHtmlElement);
        }
        console.log( 'onInit-layerHtmlElement-_backgroundLayerSeparator', _backgroundLayerSeparator );
    }

    //#ENDREGION Private Functions

    return constructor();
})();

export default LayerRenderingService;
