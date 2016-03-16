'use strict';

const globalObjects = require('./global-objects');

// takes an array of folders and removes duplicates
const makeUnique = function(folders) {
  var uniqueFolders = folders.filter(function(elem, pos) {
    return folders.indexOf(elem) === pos;
  });
  return uniqueFolders;
};

const displayFolders = function(files){
  let foldersTemplate = require('./folders.handlebars');
  let folders = [];
  files.forEach(function(file) {
    if (file.folder === undefined) {
      folders.push("Unsorted");
    } else {
    folders.push(file.folder);
    }
  });
  folders = makeUnique(folders);
  let foldersInfo = folders.map(function(folder) {
    return {nospaces: folder.replace(/\s+/g, ''), foldertext: folder};
  });
  console.log(foldersInfo);
  $('.files-container').append(foldersTemplate({ foldersInfo }));
};

// this function adds a folder key and value to each file
let displayFiles = function(files){
  let filesTemplate = require('./file-lister.handlebars');
  files.forEach(function(file) {
    if (file.folder === undefined) {
      file.folder = "Unsorted";
    }
    $(`.${file.folder.replace(/\s+/g, '')}`).append(filesTemplate({ file }));
  });
};


let getFiles = function() {
  $.ajax({
    url: globalObjects.baseUrl + '/files/',
    method: 'GET',
    headers: {
      Authorization: 'Token token=' + globalObjects.user.token,
    },
    dataType: 'json'
  }).done(function(response){
    console.log("this get was called");
    displayFolders(response.files);
    displayFiles(response.files);
  }).fail(function(jqxhr) {
    console.error(jqxhr);
  });
};

module.exports = getFiles;
