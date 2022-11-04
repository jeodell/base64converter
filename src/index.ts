import { app, BrowserWindow, Menu } from 'electron'
import path = require('path')

const isDev = process.env.NODE_ENV !== 'production'
const isMac = process.platform === 'darwin'

// Handle creating/removing shortcuts on Windows when installing/uninstalling.
if (require('electron-squirrel-startup')) {
  app.quit()
}

const createMainWindow = (): void => {
  // Create the browser window.
  const mainWindow = new BrowserWindow({
    height: 700,
    width: 1000,
    title: 'Main',
    webPreferences: {
      nodeIntegration: true,
      preload: path.join(__dirname, 'preload.js'),
    },
  })

  // and load the index.html of the app.
  mainWindow.loadFile(path.join(__dirname, '../src/html/index.html'))

  // Open the DevTools.
  if (isDev) {
    mainWindow.webContents.openDevTools()
  }
}

const createAboutWindow = (): void => {
  const aboutWindow = new BrowserWindow({
    height: 300,
    width: 300,
    title: 'About',
  })

  aboutWindow.loadFile(path.join(__dirname, '../src/html/about.html'))
}

// Explicit menu
const menu = [
  {
    label: 'File',
    submenu: [
      {
        label: 'Quit',
        click: () => app.quit(),
        accelerator: 'CmdOrCtrl+W',
      },
      {
        label: 'Open DevTools',
        click: () => {
          const windows = BrowserWindow.getAllWindows()
          windows.forEach((window) => window.webContents.openDevTools())
        },
      },
    ],
  },
  ...(!isMac
    ? [
        {
          label: 'Help',
          submenu: [
            {
              label: 'About',
              click: createAboutWindow,
            },
          ],
        },
      ]
    : []),
]

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
app.whenReady().then(() => {
  createMainWindow()

  const mainMenu = Menu.buildFromTemplate(menu)
  Menu.setApplicationMenu(mainMenu)
})

// Quit when all windows are closed, except on macOS.
app.on('window-all-closed', () => {
  if (!isMac) {
    app.quit()
  }
})

app.on('activate', () => {
  // On OS X it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  if (BrowserWindow.getAllWindows().length === 0) {
    createMainWindow()
  }
})
