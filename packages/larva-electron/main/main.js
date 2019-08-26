const { app, BrowserWindow }  = require('electron');
const url = require('url');
const path = require('path');
if (process.platform === 'win32' && !process.env.OPENCV4NODEJS_DISABLE_AUTOBUILD) {
    process.env.path += ';' + require('../renderer/node_modules/opencv-build').opencvBinDir
}

let mainWindow;
const packageVersion = require('../package.json').version;


function createWindow() {
    mainWindow = new BrowserWindow({
        height: 800,
        width: 1200,
    })
    let mode = process.env;

    if(mode == "development") {
        const protocol = 'http:';
        const pathname = 'localhost:9094';
        mainWindow.loadURL(url.format({
            pathname,
            protocol,
            slashes: true,
        }));
    } else {
        const winURL = process.env.NODE_ENV === 'development'
            ? `http://localhost:9080`
            : `file://${path.join(__dirname,`../../larva-ui/dist/${packageVersion}/`, 'index.html')}`
        mainWindow.loadURL(winURL);
    }



    mainWindow.webContents.openDevTools();
    mainWindow.setResizable(true)
}

app.on('ready', () => {
    createWindow();
    // process.env.REACT_DEVTOOLS_PATH
    //     ? BrowserWindow.addDevToolsExtension(process.env.REACT_DEVTOOLS_PATH)
    //     : console.log('failed to load react dev tools process.env.REACT_DEVTOOLS_PATH:', process.env.REACT_DEVTOOLS_PATH)
    // process.env.REDUX_DEVTOOLS_PATH
    //     ? BrowserWindow.addDevToolsExtension(process.env.REDUX_DEVTOOLS_PATH)
    //     : console.log('failed to load redux dev tools process.env.REDUX_DEVTOOLS_PATH:', process.env.REDUX_DEVTOOLS_PATH)
});

app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') {
        app.quit()
    }
});

app.on('activate', () => {
    if (mainWindow === null) {
        createWindow()
    }
});
