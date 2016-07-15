var user_dao = function(db){
    this.getUser = function(uname){
        db.all("SELECT PASSWORD AS pswd FROM USER WHERE USERNAME=?", uname, function(err, rows) {
            console.log("Search successful")
    		return rows
		});
    }
}

module.exports = user_dao