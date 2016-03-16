'use strict';

const globalObjects = require('./global-objects');

// takes an array of folders and removes duplicates
const makeUnique = function(folders) {
  var uniqueFolders = folders.filter(function(elem, pos) {
    return folders.indexOf(elem) === pos;
  });
  return uniqueFolders;
};

// Iterates through all files, grabs all the folder names, removes duplicates.
// Then, a folder object containing the folder name and an html tag-friendly version of the folder name to handlebars
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
    return {nospaces: folder.replace(/\s+/g, '-').replace(/[^a-zA-Z-]/g, ''), foldertext: folder};
  });
  $('.files-container').append(foldersTemplate({ foldersInfo }));
};

// If a file doesn't have a folder, assign Unsorted
// append the file to a div with class matching its folder
const displayFiles = function(files){
  let filesTemplate = require('./file-lister.handlebars');
  files.forEach(function(file) {
    if (file.folder === undefined) {
      file.folder = "Unsorted";
    }
    file.folder = file.folder.replace(/\s+/g, '-').replace(/[^a-zA-Z-]/g, '');
    $(`.${file.folder}`).append(filesTemplate({ file }));
  });
};


const getFiles = function() {
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
