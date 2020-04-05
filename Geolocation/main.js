'use strict'

// https://leafletjs.com/
// https://wheretheiss.at/w/developer

function $(selector, base = null) {
    base = (base === null) ? document : base;
    return base.querySelector(selector);
}

function $$(selector, base = null) {
    base = (base === null) ? document : base;
    return Array.from(base.querySelectorAll(selector));
}

window.onload = function(){
    async function getISS(){
        const api_url = "https://api.wheretheiss.at/v1/satellites/25544";
        const response =  await fetch(api_url);
        const data = await response.json();
        const {latitude, longitude} = data;
    
        $("#lat").textContent = latitude;
        $("#lon").textContent = longitude;

        marker.setLatLng([latitude, longitude]);
    }
    
    const issIcon = L.icon({
        iconUrl: 'iss.png',
        iconSize: [50, 32],
    });
    const map = L.map('issMap').setView([0, 0], 1);
    const marker = L.marker([0, 0], {icon: issIcon}).addTo(map);

    getISS();
    const tileurl = 'http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png';
    L.tileLayer(tileurl, {
        attribution: 
        'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>'
    }).addTo(map);
};