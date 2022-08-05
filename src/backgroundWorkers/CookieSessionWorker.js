
const CookieSessionWorker = function () {


    self.onmessage = function (event) {
        console.log('CookieSessionWorker-onmessage-event', event);
        processWork(22);
    };



    let processWork = function (counter) {

        console.log('Worker: Message received from main script');
        counter++;
        console.log('counter', counter);
        const result = 21;
        if (isNaN(result)) {
            self.postMessage('Please write two numbers');
        } else {
            const workerResult = 'Result: ' + result;
            console.log('Worker: Posting message back to main script');
            self.postMessage(workerResult);
        }
    }


}

let codeString = CookieSessionWorker.toString();
codeObject = codeString.substring(codeString.indexOf('{') + 1, codeString.lastIndexOf('}'));
let blob = new Blob([codeObject], { type: 'application/javascript' });
const cookieSessionWorkerScript = URL.createObjectURL(blob);

module.exports = cookieSessionWorkerScript;
