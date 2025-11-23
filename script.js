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

document.addEventListener("DOMContentLoaded", () => {
const clearButton = document.getElementById("clearBtn");
const form = document.getElementById("dispatchForm");

if (clearButton && form) {
clearButton.addEventListener("click", () => {
form.reset();
});
}
});
