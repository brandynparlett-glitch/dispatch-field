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
function getSelectedTickets() {
const checked = document.querySelectorAll('input[name="ticketsRequired"]:checked');
return Array.from(checked).map(cb => cb.value).join('; ');
}

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

// ===== STORE DISPATCH CALLS IN MEMORY =====
const calls = [];

// When the page is ready, wire up Add Call + Export CSV
document.addEventListener("DOMContentLoaded", () => {
// Try to find your dispatch form:
// If you ever give it an id="dispatchForm", this will use that.
// Otherwise it will just grab the first <form> on the page.
const form =
document.getElementById("dispatchForm") || document.querySelector("form");

const exportButton = document.getElementById("exportBtn");

if (!form) {
console.error("Dispatch form not found.");
return;
}

// === ADD CALL: runs when you click the "+ Add Call" button ===
form.addEventListener("submit", (event) => {
event.preventDefault(); // stop page reload

// Grab all form fields by their "name" attributes
const formData = new FormData(form);
const call = Object.fromEntries(formData.entries());

// Fix up the special fields:
call.ticketsRequired = getSelectedTickets();
call.cleanAbstract = document.getElementById("cleanAbstract")?.checked
? "Yes"
: "No";

call.medUnitResponsibility = getMedUnitResponsibility();
  
// Save this call in our array
calls.push(call);

console.log("Call added:", call);
alert("Dispatch call added.");

// If you want the form to clear after adding, uncomment this line:
// form.reset();
});

// === EXPORT CSV BUTTON (using the saved calls array) ===
if (exportButton) {
exportButton.addEventListener("click", () => {
if (calls.length === 0) {
alert("No calls to export yet.");
return;
}

// Build CSV headers from the first call's keys
const headers = Object.keys(calls[0]);

// Build rows
const rows = calls.map((call) =>
headers.map((key) => (call[key] ?? "").toString())
);

// Turn into CSV text
let csv = headers.join(",") + "\n";
csv += rows
.map((row) =>
row
.map((value) => `"${value.replace(/"/g, '""')}"`)
.join(",")
)
.join("\n");

// Download as a .csv file
const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
const url = URL.createObjectURL(blob);
const a = document.createElement("a");
a.href = url;
a.download = "minute-medic-dispatch.csv";
document.body.appendChild(a);
a.click();
document.body.removeChild(a);
URL.revokeObjectURL(url);
});
}
});

<!-- ===== MEDIC UNIT REQUIREMENTS ===== -->
<fieldset class="field-group">
<legend>Fully Stocked Medic Unit</legend>

<label class="radio-row">
<input type="radio" name="medUnitResponsibility" value="MEDIC_SUPPLIES" checked>
Fully stocked medic unit required (medic supplies unit + equipment)
</label>

<label class="radio-row">
<input type="radio" name="medUnitResponsibility" value="REQUESTER_PROVIDES">
Fully stocked medic unit provided by requester (unit + equipment on site)
</label>

<div class="hint" id="medUnitHint"></div>
</fieldset>
