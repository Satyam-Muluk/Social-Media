module.exports.home = function(req,res){
    // return res.end('<h1> Express is up for Codeal</h1>')

    return res.render('home',{
        title:'Home'
    });
}

// moduel.exports.actionName = function(req,res)