(function (global) {
    console.log('F1Go.js has been loaded'); // This will run as soon as the file is loaded

    function waitForElement(selector, callback) {
        console.log('Looking for element:', selector);
        if (document.querySelector(selector)) {
            console.log('Element found:', selector);
            callback();
        } else {
            console.log('Element not found, retrying...'); // Added log here
            setTimeout(function () {
                waitForElement(selector, callback);
            }, 100); // Check again after 100ms
        }
    }

    function hideElement(array) {
        console.log('Hiding elements with names:', array); // Added log here
        for (let i = 0; i < array.length; i++) {
            const textInput1 = document.querySelector(`input[name="${array[i]}"]`);
            if (textInput1) {
                const formGroup = textInput1.closest('.form-group');
                if (formGroup) {
                    formGroup.style.display = "none";
                    console.log(`Hid element with name: ${array[i]}`); // Added log here
                }
            } else {
                console.log(`Element with name ${array[i]} not found.`); // Added log here
            }
        }
    }

    // Attach functions to global scope
    global.waitForElement = waitForElement;
    global.hideElement = hideElement;

})(this); // 'this' refers to the global object, which is 'window' in browsers
