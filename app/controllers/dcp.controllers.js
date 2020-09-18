var mysql      = require('mysql2');
var connection = mysql.createConnection({
host     : 'localhost', 
  user     : 'root', 
  password : 'MySQL@123', 
  database : 'mypersonadb'
  });
  connection.connect(function(err) {
  if (err) throw err
  console.log('You are now connected...')
})
  
exports.listall = (req, res) => {
connection.query('select * from persona_demographics', function (error, results, fields) {
    if (error) throw error;
    res.end(JSON.stringify(results));
  });
};

exports.listbyid = (req, res) => {
 console.log(req);
   connection.query('select * from persona_demographics where client_id=?', [req.params.client_id], function (error, results, fields) {
    if (error) throw error;
    res.end(JSON.stringify(results));
  });
};

exports.listcid = (req, res) => {
   connection.query('select client_id,first,last,email from persona_demographics',function (error, results, fields) {
    if (error) throw error;
    res.end(JSON.stringify(results));
  });
};
exports.cid = (req, res) => {
   connection.query('select client_id from persona_demographics where client_id=?', [req.params.client_id],function (error, results, fields) {
    if (error) throw error;
    res.end(JSON.stringify(results));
  });
};
exports.login = async function(req,res){
connection.query('select client_id,first,last,email from persona_demographics',function (error, results, fields) {
    if (error) throw error;
    res.end(JSON.stringify(results));
  });
};

//Get transaction details for leaflet map
exports.getmapdetails = (req, res) => {
  connection.query('SELECT TRANS_LATITUDE,TRANS_LONGITUDE,CATEGORY FROM mypersonadb.persona_weighted_transaction limit 50',function (error, results, fields) {
   if (error) throw error;
   res.end(JSON.stringify(results));
 });
};

//Get top 5 categories to display in dashboard widget
exports.categorytop5 = (req, res) => {
  connection.query('SELECT NAME,CATEGORY as CATEGORY,CLIENT_ID,sum(AMOUNT) as AMOUNT FROM persona_weighted_transaction where CLIENT_ID=? GROUP BY CATEGORY order by sum(AMOUNT) desc limit 5',[req.params.CLIENT_ID],function (error, results, fields) {
   if (error) throw error;
   res.end(JSON.stringify(results));
 });
};

//Get top 10 categories to display in dashboard widget
exports.categorytop10 = (req, res) => {
  connection.query('SELECT NAME,CATEGORY,CLIENT_ID,sum(AMOUNT) as AMOUNT FROM persona_weighted_transaction where CLIENT_ID=? GROUP BY CATEGORY order by sum(AMOUNT) desc limit 10',[req.params.CLIENT_ID],function (error, results, fields) {
   if (error) throw error;
   res.end(JSON.stringify(results));
 });
};


