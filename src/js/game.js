require('jquery');
var N = 5;
var MAX_CHIPS = N * N;

function lights_out(num) {
  var parent = $('.output-area')[0];
  var chips = $(parent).children();
  var index = num - 1;

  //now
  $(chips[index]).toggleClass('light');  
  //left
  if( ((num - 1) >= 0) && (num == 0) || (((num - 1) % N) != 0 )) {
    $(chips[index - 1]).toggleClass('light');
  }
  //right
  if( ((num + 1) <= MAX_CHIPS) && ((num + 1) % N) != 1) {
    $(chips[index + 1]).toggleClass('light');
  }
  //top
  if((num - 5) >= 0 ) {
    $(chips[index - 5]).toggleClass('light');
  }
  //bottom
  if((num + 5) <= MAX_CHIPS ) {
    $(chips[index + 5]).toggleClass('light');
  }
}

function init() {
  // click eventをバインドする
  $('#create_btn').click(function(){
    $(this).prop('disabled',true);
    var elm = $('.chip')[0];
    // テンプレートのままではみえないので、templateクラスを除外
    elm = $(elm).clone().removeClass('template');
    
    // templateをコピーする
    for(var i=0; i<MAX_CHIPS; i++) {
      var tmp = $(elm).clone(true);
      $(tmp).on('click', {index: i+1}, function(e){
        lights_out(e.data.index);
      })
      $(tmp).appendTo('.output-area'); 
    }
  });  
}

$(function(){
  init();
});
