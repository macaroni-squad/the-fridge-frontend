'use strict';

const globalObjects = require('./global-objects');

// let displayFolder = function(folder){
//   let foldersTemplate = require('./folders.handlebars');
//   console.log("displayFolder was callled");
//   $('.files-container').append(foldersTemplate({ folder }));
// };
//
let displayFiles = function(file){
  console.log(file);
  let filesTemplate = require('./file-lister.handlebars');
  $('.files-container').html(filesTemplate({ file }));
};
//
const extractFolders = function(filepaths) {
  let folders = [];
  filepaths.forEach(function(filepath) {
    folders.push((filepath.location.split("/"))[3]);
  });

  var uniqueFolders = folders.filter(function(elem, pos) {
    return folders.indexOf(elem) === pos;
  });
  return uniqueFolders;
};

const extractLocations = function(files) {
  let downloadLinks = [];
  files.forEach(function(file) {
    console.log(file.title);
    downloadLinks.push(file.location);
  });
  return downloadLinks;
};


// const showFilesByFolder = function(files) {
//   let downloadLinks = extractLocations(files);
//   let folders = extractFolders(files);
//   // let titles = extractTitles(files);
//   folders.forEach(function(folder) {
//     displayFolder(folder);
//     let filesInThisFolder = [];
//     downloadLinks.forEach(function(downloadLink) {
//       if ((downloadLink.split("/"))[3] === folder) {
//         filesInThisFolder.push(downloadLink);
//         displayFiles(filesInThisFolder, folder);
//       }
//     });
//   });
// };


const showFilesByFolder = function(files) {
  let downloadLinks = extractLocations(files);
  let filesInThisFolder = [];
  let folder = extractFolders(files);
  displayFiles(files);
  // downloadLinks.forEach(function(downloadLink) {
  //   if ((downloadLink.split("/"))[3] === folder) {
  //     filesInThisFolder.push(downloadLink);
  //
  //   }
};

let getFiles = function() {
  $.ajax({
    url: 'http://localhost:3000' + '/files/',
    method: 'GET',
    // headers: {
    //   Authorization: 'Token token=' + globalObjects.user.token,
    // },
    dataType: 'json'
  }).done(function(response){
    console.log(response);
    console.log(response.files);
    showFilesByFolder(response.files);
    // fileByTitle(response.files);
  }).fail(function(jqxhr) {
    console.error(jqxhr);
  });
};

// getFiles();

module.exports = getFiles;
