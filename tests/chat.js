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
      IM.login($('#myid').val(), $('#myid').val(), function (uid){
        if(!uid) return;
        console.log(uid);
      });
    });

    $('#send').click(function(){
      IM.sendMsg($('#fid').val(), $('#msg').val());
    });

    $('#isLoggedIn').click(function(){
      IM.isLoggedIn('1', function (uid){
        console.log(uid)
      });
    });

  });
};

var err = function(err){
  console.error(err);
};

require(['jquery', 'underscore', 'im'], fn, err);
