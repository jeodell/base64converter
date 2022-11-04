/* eslint-disable @typescript-eslint/no-var-requires */
var os = require('os');
var path = require('path');
var toastify = require('toastify-js');
var _a = require('electron'), contextBridge = _a.contextBridge, ipcRenderer = _a.ipcRenderer;
contextBridge.exposeInMainWorld('os', {
    homedir: function () { return os.homedir(); }
});
contextBridge.exposeInMainWorld('path', {
    join: function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        return path.join.apply(path, args);
    }
});
contextBridge.exposeInMainWorld('toastify', {
    toast: function (options) { return toastify(options).showToast(); }
});
contextBridge.exposeInMainWorld('ipcRenderer', {
    send: function (channel, data) { return ipcRenderer.send(channel, data); },
    on: function (channel, func) { return ipcRenderer.on(channel, function (event) {
        var args = [];
        for (var _i = 1; _i < arguments.length; _i++) {
            args[_i - 1] = arguments[_i];
        }
        return func.apply(void 0, args);
    }); }
});
//# sourceMappingURL=preload.js.map