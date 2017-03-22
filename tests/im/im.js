/*!
 * im
 * Copyright(c) 2017 huangxin <3203317@qq.com>
 * MIT Licensed
 */
'use strict';

define(['jquery', 'underscore', 'promise'], function ($, _, promise){

  var Model = function(){};
  var pro = Model.prototype;

  var toUserStr = function(pid, pname){
    return '&'+ pname +'&'+ pid;
  };

  var fileToBlob = function(file){
    var arr = file.split(','),
        mime = arr[0].match(/:(.*?);/)[1],
        bstr = atob(arr[1]),
        n = bstr.length,
        u8arr = new Uint8Array(n);

    while(n--){
      u8arr[n] = bstr.charCodeAt(n);
    }

    return new Blob([u8arr], { type: mime });
  };

  pro.login = function(uri, pid, pname, cb){
    var self = this;

    self.isLoggedIn(pid, function (uid){

      if(uid){
        self.loggedIn = true;
        console.debug('缓存登陆');
        return cb(null, null, uid);
      }

      promise.done(function (client){

        $.get(uri + pid, {
          apiPassword: 'justep-dangchat'
        }, function (token){

          if(!token) return cb(null, 'no token');

          try{
            client.messager.validateToken(pid, pname, token, function (state){

              switch(state){
                case 'logged_in':
                  var uid = client.messager.getUid();
                  if(uid){
                    self.loggedIn = true;
                    return cb(null, null, uid);
                  }

                  self.logout();
                  cb(null, '注册失败');
                  break;
                case 'signup': return cb(null, '注册不支持的');
                default: return cb(null, '不支持的返回值');
              }

            }, function (err){
              cb(err);
            });  // validateToken
          }catch(ex){
            cb(err);
          }  // try

        });  // get

      });  // promise

    });  // isLoggedIn
  };

  pro.logout = function(){
    this.loggedIn = false;
    if(localStorage) localStorage.clear();
  };

  pro.sendTextMessage = function(peer, msg){
    promise.done(function (client){
      client.messager.sendMessage(peer, msg);
    });
  };

  pro.sendPhotoMessage = function(peer, file, cb){
    if('function' !== typeof FileReader) return cb(new Error('nonsupport FileReader'));

    promise.done(function (client){
      var reader = new FileReader();
      reader.onerror = cb;

      reader.onload = function(e){
        var blob = fileToBlob(this.result);
        blob.name = peer.id +'_'+ new Date().getTime();
        client.messager.sendPhoto(peer, blob);
        cb();
      };

      reader.readAsDataURL(file);
    });
  };

  pro.sendFileMessage = function(peer, file, cb){
    if('function' !== typeof FileReader) return cb(new Error('nonsupport FileReader'));

    promise.done(function (client){
      var reader = new FileReader();
      reader.onerror = cb;

      reader.onload = function(e){
        var blob = fileToBlob(this.result);
        blob.name = peer.id +'_'+ new Date().getTime();
        client.messager.sendFile(peer, blob);
        cb();
      };

      reader.readAsDataURL(file);
    });
  };

  pro.bindMessages = function(peer, cb){
    promise.done(function (client){
      var ret = client.messager.bindMessages(peer, function (msgs){
        cb(msgs);
      });
      ret.initAll();
    });
  };

  pro.findUser = function(pid, pname, cb){
    if(!this.loggedIn) return cb();
    promise.done(function (client){
      client.messager.findUsers(toUserStr(pid, pname)).then(function (users){
        if(!users) return cb();
        cb((1 === users.length) ? users[0] : null);
      });
    });
  };

  pro.findUserPeer = function(pid, pname, cb){
    this.findUser(pid, pname, function (user){
      if(!user) return cb();
      promise.done(function (client){
        cb(client.messager.getUserPeer(user.id));
      });
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

      cb();
    });  // promise
  };

  return new Model();
});