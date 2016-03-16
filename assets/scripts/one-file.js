'use strict';

const globalObjects = require('./global-objects');

// const oneFile = function() {
//   $.ajax({
//     //url: globalObjects.baseUrl + '/files/' + globalObjects.editId,
//     url: globalObjects.baseUrl + '/files/' + globalObjects.editId,
//     method: 'GET',
//     headers: {
//       Authorization: 'Token token=' + globalObjects.user.token,
//     },
//     dataType: 'json'
//   }).done(function(response){
//     console.log(response);
//   }).fail(function(jqxhr) {
//     console.error(jqxhr);
//   });
// };



module.exports = fileInfo;
