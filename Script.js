// Variables

const bootScreen = document.getElementById("boot-screen");
const desktop = document.getElementById("desktop");
const menu = document.getElementById("menu");
const menuOverlay = document.getElementById("menu-overlay");
const settingsMenu = document.getElementById("settings-menu");

let currentPlace = null;

// Loading screen

function SwitchToDesktop() {
    bootScreen.style.display = "none";
    desktop.style.display = "block"
    currentPlace = "desktop";
}

setTimeout(SwitchToDesktop, 3000)

// Taskbar icons

function UpdateClock() {
    let currentTime = new Date();
    let hours = currentTime.getHours()
    let minutes = String(currentTime.getMinutes()).padStart(2, "0");

    document.getElementById("clock").textContent = hours + ":" + minutes;
}

UpdateClock()
setInterval(UpdateClock, 1000)

function UpdateDate() {
    let currentDate = new Date();
    let day = currentDate.day();
    let month = currentDate.month();
    let year = currentDate.year();

    document.getElementById("date").textContent = day + "." + month + "." + year;
}

UpdateDate()
setInterval(UpdateDate, 1000)

// Open and close main menu 

function OpenMenu() {
    menu.style.display = "block";
    menuOverlay.style.display = "block";
    currentPlace = "menu";
}

function CloseProgram() {
    if (currentPlace === "menu")
    {
        menu.style.display = "none";
        menuOverlay.style.display = "none";
        currentPlace = "desktop";
    }
    else if (currentPlace === "settings")
    {
        settingsMenu.style.display = "none";
        menu.style.display = "block";
        currentPlace = "menu";
    }
    else {
        currentPlace = "desktop"
    }
}

document.getElementById("home-button").addEventListener("click", OpenMenu);

document.querySelectorAll(".return-button").forEach(button => {
    button.addEventListener("click", CloseProgram);
});

// Close nexoOS

function PowerOff() {
    bootScreen.style.display = "block";
    desktop.style.display = "none";
    document.querySelector("#boot-screen h1").textContent = "Shutting down";

    setTimeout(() => window.close(), 2000);
}

document.getElementById("power-button").addEventListener("click", PowerOff);

// Open settings

function OpenSettings()
{
    menu.style.display = "none";
    menuOverlay.style.display = "block";
    settingsMenu.style.display = "block";
    currentPlace = "settings";
}

document.getElementById("settings-button").addEventListener("click", OpenSettings);

// Change wallpaper

const wallpaperInput = document.getElementById("wallpaper");

wallpaperInput.addEventListener("change", function() {
    const image = wallpaperInput.files[0];

    if (!image) return;

    const imageUrl = URL.createObjectURL(image);

    document.documentElement.style.setProperty(
        "--wallpaper",
        `url("${imageUrl}")`
    )
});

// Terminal

function terminalCheck()
{   
    let terminalInput = document.getElementById("terminal").value;
    let commandParts = terminalInput.split(" ");

    if (commandParts[0] === "nexo" && commandParts.length === 3)
    {
        switch (commandParts[1])
        {
            case "-s":
                if (commandParts[2] === "settings")
                    OpenSettings();
                if (commandParts[2] === "menu")
                    OpenMenu();
                break;

            case "-p":
                if (commandParts[2] === "off")
                    PowerOff();
                break;
        }
    }
}

document.getElementById("terminal").addEventListener("keydown", function(event) {
    if (event.key === "Enter")
    {
        terminalCheck();
        document.getElementById("terminal").value = "";
    }
});