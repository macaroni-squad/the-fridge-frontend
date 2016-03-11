'use strict';

const globalObjects = require('./global-objects');

const assignUserData = function(data) {
  globalObjects.user = data.user;
};

const signUp = function(e) {
  e.preventDefault();
  let formData = new FormData(e.target);
  $.ajax({
    url: globalObjects.baseUrl + '/sign-up',
    method: 'POST',
    contentType: false,
    processData: false,
    data: formData
  }).done(function(data){
    console.log(data);
  }).fail(function(jqxhr) {
    console.error(jqxhr);
  });
};

const signIn = function(e) {
  e.preventDefault();
  var formData = new FormData(e.target);
  $.ajax({
    url: globalObjects.baseUrl + '/sign-in',
    method: 'POST',
    contentType: false,
    processData: false,
    data: formData
  }).done(function(data){
      assignUserData(data);
  }).fail(function(jqxhr) {
    console.error(jqxhr);
  });
};

const signOut = function() {
  if (!globalObjects.user) {
    console.error('Wrong!');
  }

  $.ajax({
    url: globalObjects.baseUrl + '/sign-out/' + globalObjects.user.id,
    method: 'DELETE',
    headers: {
      Authorization: 'Token token=' + globalObjects.user.token,
    }
  }).done(function() {
    globalObjects.user = {};
  }).fail(function(data) {
    console.error(data);
  });
};

const changePassword = function(e) {
  e.preventDefault();
  if (!globalObjects.user) {
    console.error('Wrong!');
  }

  var formData = new FormData(e.target);
  $.ajax({
    url: globalObjects.baseUrl + '/change-password/' + globalObjects.user.id,
    method: 'PATCH',
    headers: {
      Authorization: 'Token token=' + globalObjects.user.token,
    },
    contentType: false,
    processData: false,
    data: formData,
  }).done(function(data) {
    console.log(data);
  }).fail(function(jqxhr) {
    console.error(jqxhr);
  });
};

module.exports = {
  signUp,
  signIn,
  signOut,
  changePassword,
};
