document.addEventListener("DOMContentLoaded", () => {
const testButton = document.getElementById("testBtn");

if (!testButton) {
console.error("testBtn not found in the HTML.");
return;
}

testButton.addEventListener("click", () => {
alert("Your JavaScript is working!");
});
});

const testButton = document.getElementById("testBtn");

if (!testButton) {
console.error("testBtn not found in the HTML.");
return;
}

testButton.addEventListener("click", () => {
alert("Your JavaScript is working!");
});

// CLEAR FORM BUTTON
const clearButton = document.getElementById("clearBtn");
const form = document.getElementById("dispatchForm");

if (clearButton && form) {
clearButton.addEventListener("click", () => {
form.reset();
});
} else {
console.error("Clear button or form not found in the HTML.");
}
});
