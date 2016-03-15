'use strict';

const globalObjects = require('./global-objects');
const getFiles = require('./display-files.js');

const createFile = function(e) {
  console.log('add file button works');
  e.preventDefault();
  let formData = new FormData(e.target);
  $.ajax({
    url: globalObjects.baseUrl + '/files/',
    headers: {
      Authorization: 'Token token=' + globalObjects.user.token,
    },
    method: 'POST',
    contentType: false,
    processData: false,
    data: formData,
  }).done(function(data) {
    console.log(data);
    console.log('File created!');
    $('#uploadModal').modal('hide');
  }).fail(function(jqxhr) {
    console.error(jqxhr);
  });
};

const updateFile = function(e) {
  e.preventDefault();
  let formData = new FormData(e.target);
  // formData.append("files[_owner]", globalObjects.user._id);
  console.log(globalObjects.editId);
  $.ajax({
    url: globalObjects.baseUrl + '/files/' + globalObjects.editId,
    method: 'PATCH',
    headers: {
      Authorization: 'Token token=' + globalObjects.user.token,
    },
    contentType: false,
    processData: false,
    data: formData
  }).done(function(data){
      console.log(data);
  }).fail(function(err) {
    console.error(err);
  });
};

const deleteFile = function() {
  $.ajax({
    url: globalObjects.baseUrl + '/files/' + globalObjects.editId,
    method: 'DELETE',
    headers: {
      Authorization: 'Token token=' + globalObjects.user.token,
    }
  }).done(function(data){
    console.log(data);
    $('#deleteFileModal').modal('hide');
    getFiles();
  }).fail(function(err) {
    console.error(err);
  });
};

module.exports = {
  createFile,
  updateFile,
  deleteFile,
};
