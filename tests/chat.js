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

    var uri = 'http://10.0.1.249:9090/v1/tokens/';

    $('#login').click(function(){
      IM.login(uri, $('#myid').val(), $('#myid').val(), function (err, code, uid){
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



    $('#upload_pic').click(function(){
      var s = $('#pic_uri');
      var files = s[0].files;

      if(0 === files.length) return console.error('please select');
      var file = files[0];

      IM.findUserPeer($('#fid').val(), $('#fid').val(), function (peer){
        if(!peer) return console.error('not found peer');
        IM.sendPhotoMessage(peer, file, function (err){
          if(err) return console.error(err);
          console.log('success')
        });
      });
    });



  });
};

var err = function(err){
  console.error(err);
};

require(['jquery', 'underscore', 'im'], fn, err);
