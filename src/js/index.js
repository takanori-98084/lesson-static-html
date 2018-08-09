$ = require('jquery');
$(function(){
  console.log('call js');
  $('#sp-nav').click(function(){
    console.log('click!');
    $(this).toggleClass('open');
  });  
});
