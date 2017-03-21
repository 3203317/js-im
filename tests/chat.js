/*!
 * im
 * Copyright(c) 2017 huangxin <3203317@qq.com>
 * MIT Licensed
 */
'use strict';

var console = console || { log: function(){ return; } };
require.config(config);

var fn = function($, _, IM){
  $(function(){
    $('#login').click(function(){
      IM.login($('#myid').val(), $('#myid').val(), function (err, msg, uid){
        if(err) return console.error(err);
        if(msg) return console.info(msg);
        console.log(uid);
      });
    });

    $('#send').click(function(){
      IM.sendMsg($('#fid').val(), $('#msg').val());
    });

    $('#logout').click(function(){
      IM.logout();
    });

    $('#isLoggedIn').click(function(){
      IM.isLoggedIn('123456789', function (uid){
        console.log(uid)
      });
    });

  });
};

var err = function(err){
  console.error(err);
};

require(['jquery', 'underscore', 'im'], fn, err);
