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
    function modifyRemainingText() {
        // Select all spans with the class 'optionname' within divs with class 'radio'
        let optionSpans = document.querySelectorAll('.radio .optionname');
 
        optionSpans.forEach(span => {
            // Check if the text includes 'remaining'
            if (span.textContent.includes('remaining')) {
                // Remove the ' - [number] remaining' part from the text
                span.textContent = span.textContent.replace(/ - \d+ remaining/, '');
                console.log('Modified text:', span.textContent);
            }
        });
    }
 
    function observeDOMChanges() {
        const observer = new MutationObserver(mutations => {
            mutations.forEach(mutation => {
                if (mutation.type === 'childList') {
                    modifyRemainingText(); // Modify text when changes are detected
                }
            });
        });
 
        // Start observing the document body for changes
        observer.observe(document.body, { childList: true, subtree: true });
    }
    function radioButtonCaps(){
        observeDOMChanges(); // Start observing the DOM for changes
        modifyRemainingText(); // Modify text initially
    }

    let processedDropdowns = [];

function modifyDropdownText(text) {
    return text.replace(/ - \d+ remaining/, '');
}

function handleDropdownOptionClick(event) {
    const clickedOption = event.target;
    if (clickedOption.classList.contains('ss__option')) {
        console.log('Option clicked:', clickedOption.textContent);
        clickedOption.textContent = modifyDropdownText(clickedOption.textContent);
    }
}

function updateDropdownSelectedValue(dropdown) {
    const selectedValue = dropdown.querySelector('.ss__value-container');
    if (selectedValue) {
        const span = selectedValue.querySelector('span') || selectedValue.querySelector('div');
        if (span && span.textContent.includes('remaining')) {
            span.textContent = modifyDropdownText(span.textContent);
            console.log('Updated selected value:', span.textContent);
        }
    }
}

function observeDropdownChanges(dropdown) {
    const observer = new MutationObserver(mutations => {
        mutations.forEach(mutation => {
            if (mutation.type === 'childList' || mutation.type === 'subtree') {
                console.log('Mutation detected in dropdown:', dropdown);
                dropdown.querySelectorAll('.ss__option').forEach(option => {
                    if (option.textContent.includes('remaining')) {
                        option.textContent = modifyDropdownText(option.textContent);
                    }
                });
                updateDropdownSelectedValue(dropdown);
            }
        });
    });

    observer.observe(dropdown, { childList: true, subtree: true });
}

function interceptDropdownOptionClicks(dropdown) {
    dropdown.addEventListener('click', function (event) {
        handleDropdownOptionClick(event);
        setTimeout(() => updateDropdownSelectedValue(dropdown), 100);
    });
}

function setupDropdown(dropdown) {
    if (!processedDropdowns.includes(dropdown)) {
        console.log('Setting up dropdown:', dropdown);
        observeDropdownChanges(dropdown);
        interceptDropdownOptionClicks(dropdown);
        updateDropdownSelectedValue(dropdown);
        processedDropdowns.push(dropdown);
    }
}

function initializeDropdowns(elements) {
    elements.forEach(dropdown => setupDropdown(dropdown));
}

function dropDownCaps() {
    const elements = document.querySelectorAll('.your-dropdown-class'); // Adjust selector as needed
    console.log('Form elements found, initializing dropdowns...');
    initializeDropdowns(elements);
    setTimeout(monitorForNewDropdowns, 1000); // Continue monitoring for new dropdowns
}

function hideHeader() {
    const imgElement = document.querySelector('.form-header.no-portal img'); // Select the image element directly

    if (imgElement) {
        try {
            const isEmbedded = window.self !== window.top;
            const referrer = document.referrer;
            const normalDomain = 'fellowshiponego.com'; // Change this to the actual F1Go domain

            if (isEmbedded && !referrer.includes(normalDomain)) {
                imgElement.style.display = 'none';
                console.log('Image hidden because the form is embedded in a different domain.');
            } else {
                console.log('Form is either not embedded or embedded in the normal domain.');
            }
        } catch (e) {
            imgElement.style.display = 'none'; // Assume it's embedded in a different domain if there's an error
            console.log('Error occurred, hiding the image as a precaution.');
        }
    } else {
        setTimeout(hideHeaderImageIfNecessary, 100); // Retry after 100ms if the element is not found
        console.log('Image element not found, retrying...');
    }
}


function radioVar(radioNum, radioArray, textNum, textArray) {
    try {
        const textInput = document.querySelector(`input[name="${textNum}"]`);
        if (!textInput) {
            console.error(`Error: No input field found with name "${textNum}"`);
            return;
        }
        const formGroup = textInput.closest('.form-group');
            if (formGroup) {
                formGroup.style.display = "none";
            }
        
        const radios = document.querySelectorAll(`input[type="radio"][name="${radioNum}"]`);
        if (radios.length === 0) {
            console.error(`Error: No radio buttons found with name "${radioNum}"`);
            return;
        }
        
        const submitButton = document.querySelector('button[data-qa="fb-client-button-submit"]');
        if (!submitButton) {
            console.error(`Error: No submit button found with data-qa="fb-client-button-submit"`);
            return;
        }
        
        submitButton.addEventListener('click', function () {
            try {
                const selectedRadio = Array.from(radios).find(radio => radio.checked);
                
                if (selectedRadio) {
                    console.log(`Selected campus: ${selectedRadio.value}`);
                    
                    // Loop through the radioArray to find a match
                    let foundMatch = false;
                    for (let i = 0; i < radioArray.length; i++) {
                        if (radioArray[i] === selectedRadio.value) {
                            textInput.value = textArray[i];
                            foundMatch = true;
                            break;
                        }
                    }
                    
                    if (!foundMatch) {
                        console.error(`Error: No matching value found in radioArray for selected radio: ${selectedRadio.value}`);
                    }
                } else {
                    console.log('No campus selected.');
                }
            } catch (error) {
                console.error("Error during submit button click handler:", error);
            }
        });
    } catch (error) {
        console.error("Error initializing radioVar function:", error);
    }
}


let IP = null; // Store the IP globally so it can be accessed later
    
async function fetchIP() {
    try {
        let response = await fetch('https://api.ipify.org?format=json');
        let data = await response.json();
        IP = data.ip; // Set the global IP variable
    } catch (error) {
        IP = null; // Set IP to null if there's an error
    }
}

function ip(num) {
    fetchIP();
    const textBox = document.querySelector(`input[name="${num}"]`);
    if (textBox) {
        textBox.style.display = "none"; // Hide the input field

        // Find and hide the closest label to the text input
        const label = textBox.closest('.form-group').querySelector('label');
        if (label) {
            label.style.display = "none"; // Hide the label
        }

        // Set up the button click listener
        document.querySelector('button[data-qa="fb-client-button-submit"]').addEventListener('click', function () {
            if (textBox && IP) {
                textBox.value = IP; // Set the input value to the fetched IP on submit
            } 
        });
    }
}





    // Attach functions to global scope
    global.ip = ip;
    global.radioVar = radioVar;
    global.waitForElement = waitForElement;
    global.hideElement = hideElement;
    global.radioButtonCaps = radioButtonCaps;
    global.dropDownCaps = dropDownCaps;
    global.hideHeader = hideHeader;

})(this); // 'this' refers to the global object, which is 'window' in browsers
