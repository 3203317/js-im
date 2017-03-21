/*!
 * im
 * Copyright(c) 2017 huangxin <3203317@qq.com>
 * MIT Licensed
 */
'use strict';

define(['jquery'], function ($){

  var Model = function(){};
  var pro = Model.prototype;

  pro.login = function(){
    console.log('login');
  };

  pro.logout = function(){
    console.log('logout');
  };

  pro.sendMsg = function(uid, msg){
    console.log(uid +':'+ msg);
  };

  return new Model();
});