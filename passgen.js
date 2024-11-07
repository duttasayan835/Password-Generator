const result = document.getElementById("result");
const length = document.getElementById("length");
const uppercase = document.getElementById("uppercase");
const lowercase = document.getElementById("lowercase");
const numbers = document.getElementById("numbers");
const symbols = document.getElementById("symbols");
const Clipboard = document.getElementById("Clipboard");
const ShowError = document.getElementById("ShowError");
const generate = document.getElementById("generate");

const lowercases = "abcdefghijklmnopqrstuvwxyz";
const uppercases = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
const numberss = "0123456789";
const symbolsss = "!@#$%^&*()_+[]{}|;':,./<>?";

generate.addEventListener("click", function() {
    // Clear any previous error message
    ShowError.textContent = "";

    // Validate the password length
    if (length.value < 6) {
        // Update the error message style to show in red color
        ShowError.style.color = "red";
        ShowError.textContent = "Password length must be at least 8 characters.";
        return;
    }

    let password = "";

    // Create an array to store the possible character choices
    let characterPool = [];

    // Add selected character types to the pool
    if (lowercase.checked) characterPool.push(getRandomLower);
    if (uppercase.checked) characterPool.push(getRandomUpper);
    if (numbers.checked) characterPool.push(getRandomNumber);
    if (symbols.checked) characterPool.push(getRandomSymbol);

    // If no character types are selected, show error
    if (characterPool.length === 0) {
        ShowError.textContent = "Please select at least one character type.";
        return;
    }

    // Ensure the password includes at least one of each selected character type
    password += characterPool[Math.floor(Math.random() * characterPool.length)]();
    password += characterPool[Math.floor(Math.random() * characterPool.length)]();
    password += characterPool[Math.floor(Math.random() * characterPool.length)]();
    password += characterPool[Math.floor(Math.random() * characterPool.length)]();

    // Pad the password with random characters from the selected types
    while (password.length < length.value) {
        password += characterPool[Math.floor(Math.random() * characterPool.length)]();
    }

    // Shuffle the password to randomize the order
    password = shuffleString(password);

    result.textContent = password;

    // Clipboard copy functionality
    Clipboard.textContent = "Copy to Clipboard";
    Clipboard.addEventListener("click", function() {
        navigator.clipboard.writeText(password);
        Clipboard.textContent = "Copied";
    });
});

// Function to shuffle the characters in the password
function shuffleString(str) {
    const arr = str.split("");
    for (let i = arr.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [arr[i], arr[j]] = [arr[j], arr[i]]; // Swap elements
    }
    return arr.join("");
}

function getRandomLower() {
    return lowercases[Math.floor(Math.random() * lowercases.length)];
}

function getRandomUpper() {
    return uppercases[Math.floor(Math.random() * uppercases.length)];
}

function getRandomNumber() {
    return numberss[Math.floor(Math.random() * numberss.length)];
}

function getRandomSymbol() {
    return symbolsss[Math.floor(Math.random() * symbolsss.length)];
}
