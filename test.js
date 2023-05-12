var mysql = require('mysql');

var con = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "Kunal$4076",
    database: "chat_log"
});

con.connect(function(err) {
    if (err) throw err;
    console.log("Connected!");
    var sql = `INSERT INTO chats (username , message) VALUES ('Kunal Chauhan' , 'Hi how are you')`;
    con.query(sql, function (err, result) {
    if (err) throw err;
    });
});