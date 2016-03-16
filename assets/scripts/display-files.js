'use strict';

const globalObjects = require('./global-objects');

let displayFolders = function(folders){
  let foldersTemplate = require('./folders.handlebars');
  console.log("displayFolders was callled");
  $('.files-container').append(foldersTemplate({ folders }));
};

// this function pulls the folder name from the S3 file url, or assigns "none" if it breaks
const extractFolder = function(location) {
  if ((location.split("/"))[3] === undefined) {
    return "none";
  } else {
  return (location.split("/"))[3];
  }
};

// takes an array of folders and removes duplicates
const makeUnique = function(folders) {
  var uniqueFolders = folders.filter(function(elem, pos) {
    return folders.indexOf(elem) === pos;
  });
  return uniqueFolders;
};

const assignFoldersTo = function (files) {
  let folders = [];
  files.forEach(function(file) {
    if (file.location === undefined) {
      file.folder = "none";
    } else {
      file.folder = extractFolder(file.location);
    }
    folders.push(file.folder);
  });
    displayFolders(makeUnique(folders));
};

// this function adds a folder key and value to each file
let displayFiles = function(files){
  assignFoldersTo(files);
  let filesTemplate = require('./file-lister.handlebars');
  files.forEach(function(file) {
    $(`.${file.folder}`).append(filesTemplate({ file }));
    // $('.files-container').html(filesTemplate({ file })); do we want append or html here since it runs for each file?
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
    displayFiles(response.files);
  }).fail(function(jqxhr) {
    console.error(jqxhr);
  });
};

module.exports = getFiles;
