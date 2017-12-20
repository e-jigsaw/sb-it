const {resolve} = require('path')
const {app, BrowserWindow, ipcMain} = require('electron')
const Config = require('electron-config')

const config = new Config({
  defaults: {
    bounds: {
      width: 800,
      height: 600
    }
  }
})

let mainWindow
app.on('ready', () => {
  const {x, y, width, height} = config.get('bounds')
  const updateBounds = event => config.set('bounds', mainWindow.getBounds())
  mainWindow = new BrowserWindow({
    title: 'sbj',
    x, y, width, height
  })
  mainWindow.loadURL(`file://${resolve(__dirname, './index.html')}`)
  mainWindow.on('closed', () => (mainWindow = null))
  mainWindow.on('resize', updateBounds)
  mainWindow.on('move', updateBounds)
})
app.on('window-all.closed', () => app.quit())
