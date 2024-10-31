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
    function RadioButtonCaps(){
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

function DropDownCaps() {
    const elements = document.querySelectorAll('.your-dropdown-class'); // Adjust selector as needed
    console.log('Form elements found, initializing dropdowns...');
    initializeDropdowns(elements);
    setTimeout(monitorForNewDropdowns, 1000); // Continue monitoring for new dropdowns
}

    // Attach functions to global scope
    global.waitForElement = waitForElement;
    global.hideElement = hideElement;
    global.RadioButtonCaps = RadioButtonCaps;
    global.DropDownCaps = DropDownCaps;

})(this); // 'this' refers to the global object, which is 'window' in browsers
