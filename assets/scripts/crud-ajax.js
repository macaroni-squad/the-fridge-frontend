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
  }).fail(function(jqxhr) {
    console.error(jqxhr);
  });
};

module.exports = {
  createFile
};
