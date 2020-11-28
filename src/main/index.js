import { app, BrowserWindow, ipcMain, shell } from 'electron'
// import '../server/app.js';
/**
 * Set `__static` path to static files in production
 * https://simulatedgreg.gitbooks.io/electron-vue/content/en/using-static-assets.html
 */
if (process.env.NODE_ENV !== 'development') {
    global.__static = require('path').join(__dirname, '/static').replace(/\\/g, '\\\\')
}

let mainWindow
const winURL = process.env.NODE_ENV === 'development'
    ? `http://localhost:9080`
    : `file://${__dirname}/index.html`

function createWindow () {
    /**
     * Initial window options
     */
    mainWindow = new BrowserWindow({
        height: 650,
        useContentSize: true,
        width: 1020,
        minHeight: 500,
        minWidth: 1020,
        backgroundColor: '#fff',
        frame: false
    })
    
    mainWindow.loadURL(winURL)
    
    mainWindow.on('closed', () => {
        mainWindow = null
    })
}

app.on('ready', createWindow)

app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') {
        app.quit()
    }
})

app.on('activate', () => {
    if (mainWindow === null) {
        createWindow()
    }
})

//窗口化最小化
ipcMain.on('window-min', () =>  mainWindow.minimize());

//接收最大化命令
ipcMain.on('window-max', () => {
    mainWindow.isMaximized() ? mainWindow.restore() : mainWindow.maximize();
})

//接收关闭命令
ipcMain.on('window-close', () => mainWindow.close());

//打开连接
ipcMain.on('open-url', (event, url) => {
    shell.openExternal(url);
});
/**
 * Auto Updater
 *
 * Uncomment the following code below and install `electron-updater` to
 * support auto updating. Code Signing with a valid certificate is required.
 * https://simulatedgreg.gitbooks.io/electron-vue/content/en/using-electron-builder.html#auto-updating
 */

/*
import { autoUpdater } from 'electron-updater'

autoUpdater.on('update-downloaded', () => {
  autoUpdater.quitAndInstall()
})

app.on('ready', () => {
  if (process.env.NODE_ENV === 'production') autoUpdater.checkForUpdates()
})
 */
