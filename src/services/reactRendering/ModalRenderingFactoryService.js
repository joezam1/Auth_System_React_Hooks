import React from "react";
import ReactDOM from "react-dom/client";
import IdleSessionModal from "../../components/modals/IdleSessionModal.js";
import LogoutSessionModal from "../../components/modals/LogoutSessionModal.js";
import InputCommonInspector from '../validators/InputCommonInspector.js';
import Modal from '../../library/enumerations/Modal.js';

const ModalRenderingFactoryService = (function(){

    let _mounted = null;
    let _modalObject = null;


    const createRenderer = function(modalEnum){
        if(!InputCommonInspector.objectIsValid(_modalObject)){
            onInit();
        }
        renderFactory(modalEnum);
    }

    const removeRendererSeparateThread = function(){
        let timeoutId =setTimeout(()=>{
            if(InputCommonInspector.objectIsValid(_modalObject) && _mounted === true){
                _mounted = false;
                _modalObject.unmount();
                _modalObject = null;
            }
        },1);
    }

    //#REGION Private Functions

    function constructor(){

        onInit();
        return Object.freeze({
            createRenderer : createRenderer,
            removeRendererSeparateThread : removeRendererSeparateThread
        });
    }

    function onInit(){
        let modalHtmlElement = document.getElementById('modal')
        console.log( 'onInit-modalHtmlElement-modal', modalHtmlElement );
        if(modalHtmlElement !== null && !InputCommonInspector.valueIsUndefined(modalHtmlElement)){
            _modalObject =  ReactDOM.createRoot(modalHtmlElement);
        }
        console.log( 'onInit-layerHtmlElement-_modalObject', _modalObject );
    }

    function renderFactory (modalEnum){
        _mounted = true;
        switch(modalEnum){

            case Modal.idleSession:
                _modalObject.render(<IdleSessionModal/>);
            break;

            case Modal.logoutSession:
                _modalObject.render(<LogoutSessionModal/>);
            break;
        }
    }

    //#ENDREGION Private Functions

    return constructor();
})();

export default ModalRenderingFactoryService;
