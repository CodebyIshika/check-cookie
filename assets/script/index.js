'use strict';

import { onEvent, select } from "./utils.js";

// Selections
const modal = select('.modal');
const settingsBtn = select('.setting-btn');
const acceptBtn = select('.accept-btn');
const settingsDiv = select('.settings');
const modalContent = select('.modal-content');
const cookieModal = select('.modal');


const life =10;

// 
function displayModal() {
    // Check if cookies are enabled and the acceptance cookie is not set
    if (areCookiesEnabled() && getCookie('cookieAccepted') === null) {
        modal.style.display = 'block';
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

function areCookiesEnabled() {
    return navigator.cookieEnabled;
}

// getting system information 
function getSystemDetails() {
    let os = getOS();
    let browser = getSystemBrowser();
    let screenWidth = window.innerWidth;
    let screenHeight = window.innerHeight;
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
    console.log('OS:', getCookie('OS'));
    console.log('Browser:', getCookie('Browser'));
    console.log('Width:', getCookie('ScreenWidth'));
    console.log('Height:', getCookie('ScreenHeight'));

}


// Add click event listener to the Settings button
settingsBtn.addEventListener('click', function() {
    modal.innerHTML = ''; 
    modal.appendChild(settingsDiv);
    settingsDiv.style.display = 'block';
});


onEvent('load', window, () => {
    displayModal();
});

onEvent('load', window, displayModal);
onEvent('click', acceptBtn, allCookiesAccepted);
onEvent('click', settingsBtn, () => {
    settingsDiv.style.display = 'block';
});


