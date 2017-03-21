/*!
 * im
 * Copyright(c) 2017 huangxin <3203317@qq.com>
 * MIT Licensed
 */
'use strict';

define(['jquery', 'underscore', 'actor'], function ($, _, actor){

  // var config = require('./config');
 
  var deferred = $.Deferred();

  var _client;

  var _starter = function(){
    _client = new ActorClient();
    if(!window.Promise){
      require(['./promise-pollfill'], function(){
        deferred.resolve(_client);
      });
    }else{
      deferred.resolve(_client);
    }
  };

  if(window.isJsAppLoaded){
    _starter();
  }else{
    window.jsAppLoaded = _starter;
  }

  var ActorClient = function(){
    this.messager = new window.actor.ActorApp();
    console.log(this.messager.sendCode)
  };

  var Model = function(){};
  var pro = Model.prototype;

  pro.login = function(pid, pname, cb){
    console.log(arguments);
    cb(pid);
  };

  pro.logout = function(){
    console.log('logout');
  };

  pro.sendMsg = function(uid, msg){
    console.log(uid +':'+ msg);
  };

  return new Model();
});