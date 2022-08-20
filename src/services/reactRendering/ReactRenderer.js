import ReactDOM from 'react-dom/client';
import InputCommonInspector from '../validators/InputCommonInspector.js';


const ReactRenderer = (function () {
    let _targetHtmlElement = null;


    const componentIsMounted = function(){
        if(InputCommonInspector.inputExist(_targetHtmlElement)){
            return true;
        }
        return false;
    }

    const setHtmlTargetElement = function( htmlelementId) {
        let htmlElement = document.getElementById( htmlelementId )
        console.log('setHtmlTargetElement-BEFORE-htmlElement', htmlElement);
        if(InputCommonInspector.inputExist(htmlElement) &&
           !componentIsMounted(_targetHtmlElement)){
            _targetHtmlElement = ReactDOM.createRoot(htmlElement);
        }
        console.log('setHtmlTargetElement-AFTER-htmlElement', htmlElement);
    }


    const startRendering = function(component){
        if(componentIsMounted()){
            _targetHtmlElement.render( component);
        }
    }


    const stopRenderingUsingSeparateThread = function(){
        let executionTimeInMilliseconds = 1;

        setTimeout(()=>{
            if(componentIsMounted(_targetHtmlElement) ){
                _targetHtmlElement.unmount();
                _targetHtmlElement = null;
            }
        }, executionTimeInMilliseconds);
    }


    return Object.freeze({
        componentIsMounted : componentIsMounted,
        setHtmlTargetElement : setHtmlTargetElement,
        startRendering : startRendering,
        stopRenderingUsingSeparateThread : stopRenderingUsingSeparateThread

    });


    //#REGION Private Functions

    //#ENDREGION Private Functions
})();

export default ReactRenderer;
