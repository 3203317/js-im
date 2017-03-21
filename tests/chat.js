/*!
 * im
 * Copyright(c) 2017 huangxin <3203317@qq.com>
 * MIT Licensed
 */
'use strict';

var console = console || { log: function(){ return; } };
require.config(config);

var fn = function($, _, im){
  // console.log('----');
  // console.log($)
  // console.log(_.min([10, 5, 100, 2, 1000]))
  // console.log(im)
  // console.log('----');

  $(function(){
    $('#login').click(function(){
      im.login($('#myid').val(), $('#myid').val(), function (uid){
        if(!uid) return;
        console.log(uid);
      });
    });

    $('#send').click(function(){
      im.sendMsg($('#fid').val(), $('#msg').val());
    });
  });
};

var err = function(err){
  console.error(err);
};

require(['jquery', 'underscore', 'im'], fn, err);
