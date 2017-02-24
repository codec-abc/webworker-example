var myState = { i : 0, shouldContinue : true};

onmessage = function(e) {
    var reverse = function reverse(s) {
        return s.split("").reverse().join("");
    };

    if (e.data != "STOP")
    {
        var workerResult = reverse(e.data);
        var nextStep = function(aState)
        {
            var nextStep = {i : aState.i + 1, shouldContinue : aState.shouldContinue};
            postMessage("" + nextStep.i);
            return nextStep;
        }

        var runRecursively = function() {
            if (myState.shouldContinue === true)
            {
                setTimeout(function ()  
                {
                    myState = nextStep(myState);
                    runRecursively();
                }, 0);
            }
        }

        runRecursively();
    }
    else
    {
        myState.shouldContinue = false;
    }
}