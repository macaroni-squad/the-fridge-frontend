'use strict';

const globalObjects = require('./global-objects');
const getFiles = require('./display-files.js');

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
    console.log("successfully signed up");
  }).fail(function(jqxhr) {
    console.error(jqxhr);
    console.log("sign up failed");
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
      getFiles();
      console.log(data);
      console.log("successfully signed in");
  }).fail(function(jqxhr) {
    console.error(jqxhr);
    console.log("sign in failed");
  });
};

// remember to use underscore id in all ajax
const signOut = function() {
  if (!globalObjects.user) {
    console.error('Wrong!');
  }

  $.ajax({
    url: globalObjects.baseUrl + '/sign-out/' + globalObjects.user._id,
    method: 'DELETE',
    headers: {
      Authorization: 'Token token=' + globalObjects.user.token,
    }
  }).done(function() {
    globalObjects.user = {};
    console.log("successfully signed out");
  }).fail(function(data) {
    console.error(data);
    console.log("sign out failed");
  });
};

// remember to use underscore id in all ajax
const changePassword = function(e) {
  e.preventDefault();
  if (!globalObjects.user) {
    console.error('Wrong!');
  }

  var formData = new FormData(e.target);
  $.ajax({
    url: globalObjects.baseUrl + '/change-password/' + globalObjects.user._id,
    method: 'PATCH',
    headers: {
      Authorization: 'Token token=' + globalObjects.user.token,
    },
    contentType: false,
    processData: false,
    data: formData,
  }).done(function(data) {
    console.log(data);
    console.log("password successfully changed");
  }).fail(function(jqxhr) {
    console.error(jqxhr);
    console.log("password change failed");
  });
};

module.exports = {
  signUp,
  signIn,
  signOut,
  changePassword,
};
