// Headshot preview
const headshotInput = document.getElementById("headshot");
const headshotPreview = document.getElementById("headshotPreview");

if (headshotInput && headshotPreview) {
headshotInput.addEventListener("change", () => {
const file = headshotInput.files && headshotInput.files[0];
if (!file) return;

const reader = new FileReader();
reader.onload = () => {
headshotPreview.src = reader.result;
headshotPreview.style.display = "block";
};
reader.readAsDataURL(file);
});
}

// TEMP: confirm radios are working (prints selected value)
document.addEventListener("change", (e) => {
if (e.target && e.target.name === "level") {
console.log("Selected level:", e.target.value);
}
});


// --- LOCATION: GPS + Google reverse geocode ---
// 1) Uses browser GPS (navigator.geolocation)
// 2) Uses Google Geocoding API to translate lat/lng to City + Province
// NOTE: Restrict your Google API key by HTTP referrer in Google Cloud Console.

const GOOGLE_GEOCODE_KEY = "PASTE_YOUR_KEY_HERE"; // TODO: replace

const useLocationBtn = document.getElementById("useLocationBtn");
const locStatus = document.getElementById("locStatus");
const cityInput = document.getElementById("city");
const provinceSelect = document.getElementById("province");

async function reverseGeocodeToCityProvince(lat, lng) {
const url = `https://maps.googleapis.com/maps/api/geocode/json?latlng=${lat},${lng}&key=${GOOGLE_GEOCODE_KEY}`;
const res = await fetch(url);
const data = await res.json();

if (data.status !== "OK" || !data.results?.length) {
throw new Error(`Geocode failed: ${data.status}`);
}

// Find city + province from address_components
const comps = data.results[0].address_components;

const getComp = (types) => comps.find(c => types.every(t => c.types.includes(t)));

// City could be locality OR (sometimes) postal_town / sublocality
const cityComp =
getComp(["locality"]) ||
getComp(["postal_town"]) ||
getComp(["administrative_area_level_3"]) ||
getComp(["sublocality"]);

// Province (in Canada usually admin_area_level_1)
const provComp = getComp(["administrative_area_level_1"]);

const city = cityComp?.long_name || "";
const provLong = provComp?.short_name || ""; // e.g., "BC", "AB"

return { city, province: provLong };
}

useLocationBtn?.addEventListener("click", () => {
if (!navigator.geolocation) {
locStatus.textContent = "Location not supported on this browser.";
return;
}

locStatus.textContent = "Requesting location permission…";

navigator.geolocation.getCurrentPosition(
async (pos) => {
try {
const { latitude, longitude } = pos.coords;
locStatus.textContent = "Getting city/province…";

const { city, province } = await reverseGeocodeToCityProvince(latitude, longitude);

if (city) cityInput.value = city;
if (province) provinceSelect.value = province;

locStatus.textContent = "Location applied (city/province only).";
} catch (err) {
locStatus.textContent = "Could not auto-fill city/province. You can type it manually.";
console.error(err);
}
},
(err) => {
if (err.code === 1) locStatus.textContent = "Location permission denied.";
else locStatus.textContent = "Could not get location. Try again or enter city manually.";
},
{ enableHighAccuracy: false, timeout: 10000 }
);
});

// --- Preferred Locations list (chips) ---
const prefInput = document.getElementById("prefLocationInput");
const addPrefBtn = document.getElementById("addPrefLocationBtn");
const prefList = document.getElementById("prefLocationsList");

let preferredLocations = []; // array of strings

function renderPreferredLocations() {
if (!prefList) return;
prefList.innerHTML = "";

preferredLocations.forEach((loc, idx) => {
const chip = document.createElement("button");
chip.type = "button";
chip.className = "chip";
chip.textContent = `${loc} ×`;
chip.addEventListener("click", () => {
preferredLocations.splice(idx, 1);
renderPreferredLocations();
});
prefList.appendChild(chip);
});
}

function addPreferredLocation(value) {
const v = (value || "").trim();
if (!v) return;

// prevent duplicates
if (preferredLocations.map(x => x.toLowerCase()).includes(v.toLowerCase())) return;

preferredLocations.push(v);
renderPreferredLocations();
}

addPrefBtn?.addEventListener("click", () => {
addPreferredLocation(prefInput.value);
prefInput.value = "";
prefInput.focus();
});

prefInput?.addEventListener("keydown", (e) => {
if (e.key === "Enter") {
e.preventDefault();
addPreferredLocation(prefInput.value);
prefInput.value = "";
}
});

