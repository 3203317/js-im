/*!
 * im
 * Copyright(c) 2017 huangxin <3203317@qq.com>
 * MIT Licensed
 */
'use strict';

define(['jquery', 'underscore'], function ($, _){

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