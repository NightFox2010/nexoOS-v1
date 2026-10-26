// DOM References

const bootScreen = document.getElementById("boot-screen");
const desktop = document.getElementById("desktop");
const mainMenu = document.getElementById("menu");
const menuOverlay = document.getElementById("menu-overlay");
const settingsMenu = document.getElementById("settings-menu");

let currentView = null;


// Boot Sequence

function SwitchToDesktop() {
    bootScreen.style.display = "none";
    desktop.style.display = "block";
    currentView = "desktop";
}

setTimeout(SwitchToDesktop, 3000);


// Taskbar

function UpdateClock() {
    const now = new Date();
    const hours = now.getHours();
    const minutes = String(now.getMinutes()).padStart(2, "0");

    document.getElementById("clock").textContent =
        hours + ":" + minutes;
}

UpdateClock();
setInterval(UpdateClock, 1000);


function UpdateDate() {
    const today = new Date();
    const day = today.getDate();
    const month = today.getMonth() + 1;
    const year = today.getFullYear();

    document.getElementById("date").textContent =
        day + "." + month + "." + year;
}

UpdateDate();
setInterval(UpdateDate, 1000);


// Main Menu Navigation

function OpenMainMenu() {
    mainMenu.style.display = "block";
    menuOverlay.style.display = "block";
    currentView = "menu";
}


function CloseCurrentView() {
    if (currentView === "menu") {
        mainMenu.style.display = "none";
        menuOverlay.style.display = "none";
        currentView = "desktop";
    }
    else if (currentView === "settings") {
        settingsMenu.style.display = "none";
        mainMenu.style.display = "block";
        currentView = "menu";
    }
    else {
        currentView = "desktop";
    }
}


document.getElementById("home-button")
    .addEventListener("click", OpenMainMenu);

document.querySelectorAll(".return-button").forEach(button => {
    button.addEventListener("click", CloseCurrentView);
});


// System Power

function ShutdownSystem() {
    bootScreen.style.display = "flex";
    desktop.style.display = "none";

    document.querySelector("#boot-screen h1").textContent =
        "Shutting down";

    setTimeout(() => window.close(), 2000);
}

document.getElementById("power-button")
    .addEventListener("click", ShutdownSystem);


// Settings

function OpenSettingsMenu() {
    mainMenu.style.display = "none";
    menuOverlay.style.display = "block";
    settingsMenu.style.display = "block";
    currentView = "settings";
}

document.getElementById("settings-button")
    .addEventListener("click", OpenSettingsMenu);


// Wallpaper Management

const wallpaperInput = document.getElementById("wallpaper");

wallpaperInput.addEventListener("change", function () {
    const selectedWallpaper = wallpaperInput.files[0];

    if (!selectedWallpaper) return;

    const wallpaperUrl = URL.createObjectURL(selectedWallpaper);

    document.documentElement.style.setProperty(
        "--wallpaper",
        `url("${wallpaperUrl}")`
    );
});


// Terminal

function ExecuteTerminalCommand() {
    const terminalInput = document.getElementById("terminal").value;
    const commandParts = terminalInput.split(" ");

    if (commandParts[0] === "nexo" && commandParts.length === 3) {
        switch (commandParts[1]) {
            case "-s":
                if (commandParts[2] === "settings")
                    OpenSettingsMenu();

                if (commandParts[2] === "menu")
                    OpenMainMenu();

                break;

            case "-p":
                if (commandParts[2] === "off")
                    ShutdownSystem();

                break;
        }
    }
}


document.getElementById("terminal")
    .addEventListener("keydown", function (event) {
        if (event.key === "Enter") {
            ExecuteTerminalCommand();
            document.getElementById("terminal").value = "";
        }
    });