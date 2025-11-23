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
const clearButton = document.getElementById("clearFormBtn");

if (clearButton && clearButton.form) {
clearButton.addEventListener("click", () => {
clearButton.form.reset();
});
} else {
console.error("Clear button or its form not found.");
}
});
