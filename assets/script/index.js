'use strict';

import { onEvent, select } from "./utils.js";

// Selections
const modal = select('.modal');
const settingsBtn = select('.setting-btn');
const acceptBtn = select('.accept-btn');
const settingsDiv = select('.settings');
const modalContent = select('.modal-content');
const cookieModal = select('.modal');


const life = 15;

// Check if cookies are enabled
function areCookiesEnabled() {
    return navigator.cookieEnabled;
}

// Function to display modal after a delay
function displayModal() {
    if (areCookiesEnabled() && document.cookie.length === 0) {
        setTimeout(() => {
            modal.style.display = 'block';
        }, 2000); 
    } else {
        // Cookies are accepted, hide the modal
        modal.style.display = 'none';
    }
}

// screen dimensions
function getScreenDimensions() {
    let width= window.innerWidth;
    let height= window.innerHeight;
}

// System
function getOS () {
    const opSystem = navigator.userAgent.toLowerCase();

    if(opSystem.includes('windows')) {
        return 'Windows';
    } else {
        return 'Unknown';
    }

}


function getSystemBrowser () {
    const browser = navigator.userAgent.toLowerCase();

    if (/edg/.test(browser)) {
        return 'Edge';
    } 
    if (/chrome/.test(browser)) {
        return 'Chrome';
    }  
    if (/firefox/.test(browser)) {
        return 'Firefox';
    }

    return 'Unknown';
}

const defaultSwitches = document.querySelectorAll('.settings input[type="checkbox"]');

defaultSwitches.forEach(checkbox => {
    checkbox.checked = true;
});

// function for getting cookies
function getCookie(name) {
    let matches = document.cookie.match(new RegExp(
      "(?:^|; )" + name.replace(/([\.$?*|{}\(\)\[\]\\\/\+^])/g, '\\$1') + "=([^;]*)"
    ));
  
    return matches ? decodeURIComponent(matches[1]) : undefined;
}

function setCookie(name, value, life) {
    document.cookie = `${name}=${value}; path=/; max-age=${life}; SameSite=Lax`;
}

// getting system information 
function getSystemDetails() {
    let os = getOS();
    let browser = getSystemBrowser();
    let screenWidth = window.innerWidth;
    let screenHeight = window.innerHeight;
}

// Event listener for the "Save preferences" button
select('.save').addEventListener('click', savePreferences);

// function to save user preferences
function savePreferences() {
    // Get the state of the switches
    const browserSwitch = select('#browserSwitch');
    const osSwitch = select('#osSwitch');
    const screenWidthSwitch = select('#screenWidthSwitch');
    const screenHeightSwitch = select('#screenHeightSwitch');

    setCookie('cookieAccepted', 'true', life);

    // Set cookies based on user preferences
    setCookie('Browser', browserSwitch.checked ? getSystemBrowser()  : 'Rejected', life);
    setCookie('OS', osSwitch.checked ? getOS() : 'Rejected', life);
    setCookie('ScreenWidth', screenWidthSwitch.checked ? window.innerWidth : 'Rejected', life);
    setCookie('ScreenHeight', screenHeightSwitch.checked ? window.innerHeight : 'Rejected', life);

    // console log the saved preferences
    console.log('User preferences saved!');
    cookieInfo();

    modal.style.display = 'none';
}

// function when all cookie are accepted
function allCookiesAccepted() {

    getSystemDetails();

    let os = getOS();
    let browser = getSystemBrowser();
    let screenWidth = window.innerWidth;
    let screenHeight = window.innerHeight;

    setCookie('OS', os, life);
    setCookie('Browser', browser, life);
    setCookie('ScreenWidth', screenWidth.toString(), life);
    setCookie('ScreenHeight', screenHeight.toString(), life);

    console.log('All cookies are accepted!');    

    // Log the values of the cookies
    cookieInfo();

    modal.style.display = 'none';

}

function cookieInfo() {
    console.log('OS:', getCookie('OS'));
    console.log('Browser:', getCookie('Browser'));
    console.log('Width:', getCookie('ScreenWidth'));
    console.log('Height:', getCookie('ScreenHeight'));
}

function printCookies() {
    if (document.cookie.length === 0 ) {
        console.log('No cookies available');
    } else {
        cookieInfo();
    }
}

onEvent('load', window, () => {
    displayModal();
    printCookies();
});

onEvent('click', settingsBtn, () => {
    modal.innerHTML = ''; 
    modal.appendChild(settingsDiv);
    settingsDiv.style.display = 'block';
})

onEvent('click', acceptBtn, allCookiesAccepted);


