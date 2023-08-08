import { ipcMain } from 'electron';
import PouchDB from 'pouchdb';
import { dataPath } from '.';

export function PouchDBRoutes(){
    let agentDB = new PouchDB('agents', {prefix: dataPath});
    let messageDB = new PouchDB('messages', {prefix: dataPath});
    let commandDB = new PouchDB('commands', {prefix: dataPath});
    let attachmentDB = new PouchDB('attachments', {prefix: dataPath});

    ipcMain.on('clear-data', (event, arg) => {
        agentDB.destroy();
        messageDB.destroy();
        commandDB.destroy();
        attachmentDB.destroy();
        createDBs();
    });

    function createDBs (){
        agentDB = new PouchDB('agents', {prefix: dataPath});
        messageDB = new PouchDB('messages', {prefix: dataPath});
        commandDB = new PouchDB('commands', {prefix: dataPath});
        attachmentDB = new PouchDB('attachments', {prefix: dataPath});
    }
};