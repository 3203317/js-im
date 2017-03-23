/*!
 * im
 * Copyright(c) 2017 huangxin <3203317@qq.com>
 * MIT Licensed
 */
'use strict';

define(['jquery', 'underscore', 'actor.min'], function ($, _){
  var deferred = $.Deferred();

  var _starter = function(){
    var client = new ActorClient();
    if(!window.Promise){
      require(['promise-pollfill'], function(){
        deferred.resolve(client);
      });
    }else{
      deferred.resolve(client);
    }
  };

  if(window.isJsAppLoaded){
    _starter();
  }else{
    window.jsAppLoaded = _starter;
  }

  var ActorClient = function(){
    var self = this;
    self.messager = new window.actor.ActorApp();
    require(['config'], function (config){
      self.messager.init(config);
    });
  };

  return deferred.promise();
});