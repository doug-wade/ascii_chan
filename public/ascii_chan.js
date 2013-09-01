$(document).ready(function(){
  if (geo_position_js.init()){
    geo_position_js.getCurrentPosition(function(p){
      $('.geoPosition').val(p.coords.latitude + "|" + p.coords.longitude);
    }, function(){
      console.log("fail.");
    });
  }
})