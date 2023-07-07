"use strict";
exports.__esModule = true;
var electron_1 = require("electron");
var path = require("path");
var isDev = process.env.NODE_ENV !== 'production';
var isMac = process.platform === 'darwin';
// Handle creating/removing shortcuts on Windows when installing/uninstalling.
if (require('electron-squirrel-startup')) {
    electron_1.app.quit();
}
var createMainWindow = function () {
    // Create the browser window.
    var mainWindow = new electron_1.BrowserWindow({
        height: 700,
        width: 1000,
        title: 'Main',
        webPreferences: {
            nodeIntegration: true,
            devTools: isDev,
            preload: path.join(__dirname, 'preload.js')
        }
    });
    // and load the index.html of the app.
    mainWindow.loadFile(path.join(__dirname, '../src/html/index.html'));
    // Open the DevTools.
    if (isDev) {
        mainWindow.webContents.openDevTools();
    }
};
// Explicit menu
var menu = [
    {
        label: 'File',
        submenu: [
            {
                label: 'Quit',
                click: function () { return electron_1.app.quit(); },
                accelerator: 'CmdOrCtrl+W'
            },
            {
                label: 'Open DevTools',
                click: function () {
                    var windows = electron_1.BrowserWindow.getAllWindows();
                    windows.forEach(function (window) { return window.webContents.openDevTools(); });
                }
            },
        ]
    },
];
// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
electron_1.app.whenReady().then(function () {
    createMainWindow();
    var mainMenu = electron_1.Menu.buildFromTemplate(menu);
    electron_1.Menu.setApplicationMenu(mainMenu);
});
// Quit when all windows are closed, except on macOS.
electron_1.app.on('window-all-closed', function () {
    if (!isMac) {
        electron_1.app.quit();
    }
});
electron_1.app.on('activate', function () {
    // On OS X it's common to re-create a window in the app when the
    // dock icon is clicked and there are no other windows open.
    if (electron_1.BrowserWindow.getAllWindows().length === 0) {
        createMainWindow();
    }
});
//# sourceMappingURL=index.js.map