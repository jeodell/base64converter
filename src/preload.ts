/* eslint-disable @typescript-eslint/no-var-requires */
const os = require('os')
const path = require('path')
const toastify = require('toastify-js')
const { contextBridge, ipcRenderer } = require('electron')

contextBridge.exposeInMainWorld('os', {
  homedir: () => os.homedir(),
})

contextBridge.exposeInMainWorld('path', {
  join: (...args: string[]) => path.join(...args),
})

contextBridge.exposeInMainWorld('toastify', {
  toast: (options: any) => toastify(options).showToast(),
})

contextBridge.exposeInMainWorld('ipcRenderer', {
  send: (channel: string, data: any) => ipcRenderer.send(channel, data),
  on: (channel: string, func: any) => ipcRenderer.on(channel, (event, ...args) => func(...args)),
})
