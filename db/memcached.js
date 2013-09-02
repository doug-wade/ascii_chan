var crypto = require('crypto');

var Memcached = function(){
  var cache = {};

  this.cas = function(key, value, cas, callback){
    var err,
        curr_value = cache[key],
        curr_hash = crypto.createHash('md5').update(curr_value).digest('hex');

    if (curr_hash === cas){
      try{
        cache[key] = value;
      } catch (e) {
        err = e;
      }
    } else {
      err = new Error('CAS does not match current value');
    }

    if (callback){
      callback(err);
    }
  }

  this.get = function(key, callback){
    var err,
        data = {};

    if (key in cache){
      data[key] = cache[key];
    } else {
      err = new Error("Key not found.");
    }

    if (callback){
      callback(err, data);
    }
  }

  this.gets = function(key, callback){
    var hash,
        err,
        data = {},
        val = cache[key];

    if (key in cache){
      hash = crypto.createHash('md5').update(val).digest('hex');
    } else {
      err = new Error("Key not found.");
    }

    data[key] = val;
    data.cas = hash;

    if (callback){
      callback(err, data);
    }
  }

  this.flush = function(callback){
    cache = {};
    callback();
  }

  this.set = function(key, value, callback){
    var err;

    try{
      cache[key] = value;
    } catch (e) {
      err = e;
    }

    if (callback){
      callback(err);
    }
  }
}

module.exports.Memcached = Memcached;