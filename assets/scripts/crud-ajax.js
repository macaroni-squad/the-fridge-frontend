'use strict';

const globalObjects = require('./global-objects');

let createFile = function(e) {
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

const updateFileData = function(e) {
  e.preventDefault();
  let formData = new FormData(e.target);
  // let fileId = $(e.target).attr('data-id');
  $.ajax({
    url: globalObjects.baseUrl + '/files/' /* + fileId */,
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

const deleteFile = function(e) {
  e.preventDefault();
  // let fileId = $(e.target).attr('data-id');
  $.ajax({
    url: globalObjects.baseUrl + '/files/' /* + fileId */,
    method: 'DELETE',
    headers: {
      Authorization: 'Token token=' + globalObjects.user.token,
    }
  }).done(function(data){
      console.log(data);
  }).fail(function(err) {
    console.error(err);
  });
};

module.exports = {
  createFile,
  updateFileData,
  deleteFile,
};
