// main.js
const { app, BrowserWindow, ipcMain } = require("electron")
const path = require("path")
const WWSCli = require("./wws-cli")

function createWindow() {
  const win = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      nodeIntegration: true, // Allow Node.js integration
      contextIsolation: false, // Required for ipcRenderer
    },
  })

  win.loadFile("index.html")
}

app.whenReady().then(createWindow)

// Handle IPC calls from renderer process
ipcMain.handle("execute-command", async (event, command) => {
  const wwsCli = new WWSCli()
  let result = ""
  switch (command) {
    case "list":
      result = wwsCli.listCommand()
      break
    case "fetch":
      await wwsCli.fetchCommand([])
      result = "Fetch completed."
      break
    default:
      result = "Unknown command."
  }
  return result
})

app.on("window-all-closed", () => {
  if (process.platform !== "darwin") app.quit()
})
