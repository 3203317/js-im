/*!
 * im
 * Copyright(c) 2017 huangxin <3203317@qq.com>
 * MIT Licensed
 */
'use strict';

define(['jquery', 'underscore', 'promise'], function ($, _, promise){

  var Model = function(){};
  var pro = Model.prototype;

  pro.login = function(pid, pname, cb){
    var self = this;

    self.isLoggedIn(pid, function (uid){

      if(uid){
        self.loggedIn = true;
        console.info('缓存登陆');
        return cb(uid);
      }

      promise.done(function (client){

        $.get('http://10.0.1.249:9090/v1/tokens/'+ pid, {
          apiPassword : 'justep-dangchat'
        }, function (token){

          client.messager.validateToken(pid, pname, token, function (state){
            console.log(state)
            console.log('++++')
          }, function (err){
            console.error(err)
          });  // validateToken

        });  // get

      });  // promise

    });
  };

  pro.logout = function(cb){
    promise.done(function (client){
      console.log('logout');
      cb(true);
    });
  };

  pro.sendMsg = function(uid, msg, cb){
    promise.done(function (client){
      console.log('sendMsg');
      cb(true);
    });
  };

  pro.isLoggedIn = function(pid, cb){
    promise.done(function (client){
      if(client && client.messager.isLoggedIn()){
        var uid = client.messager.getUid();

        if(uid){
          var user = client.messager.getUser(uid);
          return cb((user && user.nick === pid) ? uid : null);
        }
      }

      cb(null);
    });  // promise
  };

  return new Model();
});