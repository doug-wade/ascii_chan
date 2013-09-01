function adjustGradient(){
  var h = $(window).height(),
      w = $(window).width();

  $('.container').css({'min-height': h,'min-width': w});
}

$(document).ready(function(){
  adjustGradient();

  if (geo_position_js.init()){
    geo_position_js.getCurrentPosition(function(p){
      $('.geoPosition').val(p.coords.latitude + "|" + p.coords.longitude);
    }, function(){
      console.log("fail.");
    });
  }

  $(window).resize(adjustGradient);
})