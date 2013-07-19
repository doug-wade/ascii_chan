exports.index = function(req, res){
  res.render('index', {page_title:'ascii'});
}

exports.post = function(req, res){
  var error;
  var title = req.body.title;
  var art = req.body.art;
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
  res.render('thanks', {page_title: 'ascii'});
  return;
}

exports.thanks = function(req, res){
  res.render('thanks', {page_title:'thanks'});
}