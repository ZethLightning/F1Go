# F1Go



function waitForElement Waits until it finds the element to run


hide element takes an array to then loop throught to hide thoes input elements and the lables around them. 



    global.radioVar = radioVar;
    takes in four variables first is the number for the raido button you want it to check, secound is an array of items you want it to check for
    like south, west, north, and joplin, third is the number for the text box and last is the array of items you want in the text box like clark chaple, KCI, etc. It will also hide the text box you give it. 



    global.waitForElement = waitForElement;
    if things are happening to eary you can use this to wait until it finds the element to do the funciton




    global.hideElement = hideElement;
    give this an array filled with the numbers of the elements you want to hide



    global.RadioButtonCaps = radioButtonCaps;
    removes caps for all radio buttons does not require a VAR


    global.DropDownCaps = dropDownCaps;
    removes caps for all drop downs no var required



    global.hideHeader = hideHeader;
    this will hide the header image if it is not in the f1go domain. no var required. 







    Some good starters for if you are using the java script is this 
    

copy from here------------------------------------------------------------------------------------------------------------

    <script src="https://zethlightning.github.io/F1Go/F1Go.js" defer></script>
    <script defer>
function runInlineScript() {
    try {
        if (typeof window.radioButtonCaps === 'function') {

            //Write code here --------------------








            //------------------------------------

            console.log("Function executed successfully.");
        } else {
            throw new Error("radioButtonCaps function not loaded yet");
        }
    } catch (error) {
        console.error("Error in runInlineScript:", error.message);
        // Retry after 100ms if radioButtonCaps is not available
        setTimeout(runInlineScript, 100);
    }
}

// Run the script initially
setTimeout(runInlineScript, 100);
/*
radioVar
waitForElement
hideElement
radioButtonCaps
dropDownCaps
hideHeader
     */
</script>


TO here -----------------------------------------------------------------------------------------------------------------------
using this will make sure that it has loaded the funntions you are using and has a lot of the funcions names below


to use the css I would use this 

copy form here ----------------------------------------------------------------------------------------------------------------

<link href="https://zethlightning.github.io/F1Go/F1Go.css" rel="stylesheet">
<style>
:root {
    --primary-color: #00a3e0;
    --dark-red: #990000; 
    --label-gray: #666666; 
}
</style>

to here -=----------------------------------------------------------------------------------------------------------------------


This will make it so you can still change the varables in the code. 
