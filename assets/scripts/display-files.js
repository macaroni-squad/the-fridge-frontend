'use strict';

const globalObjects = require('./global-objects');

// takes an array of folders and removes duplicates
const makeUnique = function(folders) {
  var uniqueFolders = folders.filter(function(elem, pos) {
    return folders.indexOf(elem) === pos;
  });
  return uniqueFolders;
};

const splitFolderPath = function(file) {
  return file.folder.split('/');
};

var findChildren = function(fullFolderPath, files){
  var children = [];
  files.forEach(function(file){
    if (file.folder.indexOf(fullFolderPath) === 0) {
      children.push(file);
    }
  });
  return children;
};

// sample data for testing
// var files = [{ folder: 'food/fruit/bananas'},
// { folder: 'food/fruit/cantaloupe'},
// { folder: 'food/fruit/apples'},
// { folder: 'food/veggies/carrot'},
// { folder: 'food/veggies/celery'},
// { folder: 'favorites/veggies/celery'}];

console.log(findChildren('food/fruit', files));




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

// mongo timestamps are inconsistent with current time. Using only date for now
const formatTime = function(timestamp) {
  let date = timestamp.split('T')[0];
  let time = (timestamp.split('T')[1]).split(':');
  let hour = time[0];
  let ampm = 'am';
  hour = Math.abs(hour-4);
  if (hour >=13 ) {
    hour = hour-12;
    ampm = 'pm';
  }
  let minute = time[1];
  // return (date + ' at ' + hour + ':' + minute + ampm);
  return (date);
};

// If a file doesn't have a folder, assign Unsorted
// append the file to a div with class matching its folder
const displayFiles = function(files){
  let filesTemplate = require('./file-lister.handlebars');
  files.forEach(function(file) {
    if (file.folder === undefined) {
      file.folder = "Unsorted";
    }
    file.updatedAt = formatTime(file.updatedAt);
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
