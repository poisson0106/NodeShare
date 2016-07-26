var Q = require('q');

var user_dao = function(db){
    this.getUser = function(uname){
        var deferred = Q.defer();
        db.all("SELECT PASSWORD AS pswd FROM USER WHERE USERNAME=?", uname, function(err, rows) {
           if(rows == null){
               deferred.reject("ERROR");
           }
           else{
                deferred.resolve(rows);
           }

		});
        return deferred.promise;
    }
}

module.exports = user_dao