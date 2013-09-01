dataAccess = require('../db/dataAccess');

exports.index = function(req, res){
  dataAccess.getArt().
  then(function(data){
    res.render('index', {page_title:'ascii', submissions:data});
  });
  return;
}

exports.post = function(req, res){
  var error;
  var title = req.body.title;
  var art = req.body.art;
  var location = req.body.geoPosition;
  console.log(req.body);
  locs = location.split('|');
  var lat = locs[0],
      lon = locs[1];

  if (!title){
    if (!art){
      error = 'Please provide a title and some art.'
    } else {
      error = 'Please provide a title.';
    }
    res.render('index', {page_title: 'ascii', error: error, title: title, art: art});
  } else if (!art){
    error = 'Please provide some ascii art.';
    res.render('index', {page_title: 'ascii', error: error, title: title, art: art});
  }
  dataAccess.createArt(title, art, lat, lon).
  then(function(data){
    res.render('thanks', {page_title: 'ascii', post_id:data})
  });
  return;
}

exports.thanks = function(req, res){
  res.render('thanks', {page_title:'thanks'});
}