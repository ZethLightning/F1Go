    function waitForElement(selector, callback) {
        console.log('Looking for element:', selector);
        if (document.querySelector(selector)) {
            console.log('Element found:', selector);
            callback();
        } else {
            setTimeout(function () {
                console.log('Element not found, retrying...');
                waitForElement(selector, callback);
            }, 100); // Check again after 100ms
        }
    };



    function hideElement(array){
        for (let i = 0; i < array.length; i++) {
            const textInput1 = document.querySelector(`input[name="${array[i]}"]`);
                if (textInput1) {
         
                    const formGroup = textInput1.closest('.form-group');
                    if (formGroup) {
                        formGroup.style.display = "none";
                    }
                }
         
             }
    }