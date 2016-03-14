'use strict';

const globalObjects = require('./global-objects');

const uploadFromForm = function(e) {
  e.preventDefault();
  let formData = new FormData(e.target);
  $.ajax({
    url: globalObjects.baseUrl + '/files',
    method: 'POST',
    headers: {
      Authorization: 'Token token=' + globalObjects.user.token,
    },
    processData: false,
    data: formData
  }).done(function(data){
    console.log(data);
    console.log("upload success");
  }).fail(function(jqxhr) {
    console.error(jqxhr);
    console.log("upload failed");
  });
};

module.exports = {
  uploadFromForm,
};
