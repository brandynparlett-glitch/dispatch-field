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

document.getElementById("clearBtn").addEventListener("click", function() {
document.getElementById("dispatchForm").reset();
});
