var dataAccess = require('../db/dataAccess'),
    memcached = require('../db/memcached'),
    cache = new memcached.Memcached();

exports.index = function(req, res){
  var art,
      renderArts = function(data){
        maps_url = 'http://maps.googleapis.com/maps/api/staticmap?sensor=false&size=568x300';

        for (var i = 0; i < data.length; i++){
          art = data[i];
          if (art.lat && art.lon){
            maps_url += '&markers=' + art.lat + ',' + art.lon;
          }
        }

        res.render('index', {page_title:'ascii', submissions:data, map_url:maps_url});
      };

  cache.get('arts', function(err, data){
    if (data.arts){
      renderArts(data.arts);
    } else {
      console.log('DB QUERY');
      dataAccess.getArt()
      .then(function(data){
        cache.set('arts', data);
        renderArts(data);
      });
    }
  })
  return;
}

exports.post = function(req, res){
  var error,
      title = req.body.title,
      art = req.body.art,
      location = req.body.geoPosition,
      locs = location.split('|'),
      lat = locs[0],
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
  console.log('DB QUERY');
  dataAccess.createArt(title, art, lat, lon).
  then(function(data){
    console.log('DB QUERY');
    dataAccess.getArt().then(function(data){
      cache.set('arts', data);
    });
    res.render('thanks', {page_title: 'ascii', post_id:data})
  });
  return;
}

exports.thanks = function(req, res){
  res.render('thanks', {page_title:'thanks'});
}