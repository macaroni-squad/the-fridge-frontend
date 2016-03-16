'use strict';

const globalObjects = require('./global-objects');

const oneFile = function() {
  $.ajax({
    //url: globalObjects.baseUrl + '/files/' + globalObjects.editId,
    url: globalObjects.baseUrl + '/files/' + globalObjects.editId,
    method: 'GET',
    headers: {
      Authorization: 'Token token=' + globalObjects.user.token,
    },
    dataType: 'json'
  }).done(function(file){
    return file;
  }).fail(function(jqxhr) {
    console.error(jqxhr);
  });
};

module.exports = oneFile;
