const electron = require('electron');
const { ipcMain, app, BrowserWindow } = electron;
const { getVideoDurationInSeconds } = require('get-video-duration')

const ipc = ipcMain;
app.on('ready', () => {
    const mainWindow = new BrowserWindow({
        webPreferences: {
            nodeIntegration: true
        }

    });
    mainWindow.loadURL(`file://${__dirname}/index.html`);
});
ipc.on('hello', (event, args) => {
    console.log(args);
    getVideoDurationInSeconds(args).then((duration) => {
        console.log(duration);
        event.sender.send('videodurationreply', duration)
    })
});