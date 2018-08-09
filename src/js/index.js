require('jquery');
require('jquery-sidebar');
$(function(){
  console.log('call js');
  $(".sidebar.right").sidebar({side: "right"});
  $('#sp-nav').click(function(){
    console.log('click!');
    $(this).toggleClass('open');
    $(".sidebar.right").trigger("sidebar:toggle");
  });  
});
