var pg = require('pg'),
    Q = require('q');

var dbUrl = 'tcp://japbAdmin:34ae82ede2@localhost/ascii_chan';

var handleError = function(err, deferred, done) {
  if(!err) return false;
  done();
  deferred.reject(err);
  return true;
};

exports.createArt = function(title, art){
  var deferred = Q.defer();

  pg.connect(dbUrl, function(err, client, done){
    client.query('insert into ascii_art (post_title, post_text) '
        + ' values ($1, $2) returning post_id;', [title, art], function(err, result){
      handleError(err, deferred, done);

      done();

      deferred.resolve(result.rows[0].post_id);
    });
  });

  return deferred.promise;
}

exports.getArt = function(){
  var deferred = Q.defer();

  pg.connect(dbUrl, function(err, client, done){
    client.query('select * from ascii_art', function(err, result){
      handleError(err, deferred, done);

      done();

      var ascii_art = [];
      result.rows.forEach(function(art, i){
        ascii_art.push({
          id: art.post_id,
          title: art.post_title,
          art: art.post_text
        });
      });
      
      deferred.resolve(ascii_art);
    });
  });

  return deferred.promise;
}