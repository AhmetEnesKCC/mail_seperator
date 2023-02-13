const { app, BrowserWindow } = require("electron");
let mainWindow = null;
const createMainWindow = () => {
  mainWindow = new BrowserWindow({
    width: 600,
    height: 400,
    alwaysOnTop: true,
    webPreferences: {
      nodeIntegration: true,
      contextIsolation: false,
    },
  });
  mainWindow.loadURL("http://localhost:3000");
};

app.on("ready", () => {
  createMainWindow();
});
