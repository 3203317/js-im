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
      IM.login($('#myid').val(), $('#myid').val(), function (err, code, uid){
        if(err) return console.error(err);
        if(code) return console.info(code);
        console.debug(uid);
      });
    });



    $('#send').click(function(){

      IM.findUserPeer($('#fid').val(), $('#fid').val(), function (peer){
        if(!peer) return console.error('not found peer');
        IM.sendTextMessage(peer, $('#msg').val());
      });
    });



    $('#logout').click(function(){
      IM.logout();
    });



    $('#bind').click(function(){
      IM.findUserPeer($('#fid').val(), $('#fid').val(), function (peer){
        if(!peer) return console.error('not found peer');

        IM.bindMessages(peer, function (msgs){
          console.debug(JSON.stringify(msgs));
          console.debug(new Date());
        });
      });
    });



    $('#isLoggedIn').click(function(){
      IM.isLoggedIn($('#myid').val(), function (uid){
        console.debug(uid)
      });
    });



  });
};

var err = function(err){
  console.error(err);
};

require(['jquery', 'underscore', 'im'], fn, err);
