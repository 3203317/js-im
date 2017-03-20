/*!
 * im
 * Copyright(c) 2017 huangxin <3203317@qq.com>
 * MIT Licensed
 */
'use strict';

var console = console || { log: function(){ return; } };
require.config(config);


var fn = function($, actor, _){
  console.log('----');
  console.log($)
  console.log(_.min([10, 5, 100, 2, 1000]))
  console.log(actor)
  console.log('----');
};

require(['jquery', 'actor', 'underscore'], fn);
