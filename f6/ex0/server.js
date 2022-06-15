const express = require('express');
const app = express();

var MongoClient = require('mongodb').MongoClient;
var url = "mongodb://localhost:27017";

var db = [];
db.push(new Array());
db.push(new Array());

var bodyParser = require('body-parser');

// configure the app to use bodyParser()
app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(bodyParser.json());



MongoClient.connect(url, function (err, db) {
    if (err) throw err;
    var dbo = db.db("js2");

    app.get('/', (req, res) => {
        res.send('Hello World!');
    });

    app.post('/', (req, res) => {
        dbo.collection("produkty").insertOne(req.body, (err, res) => {
            if (err) throw err;
            console.log(res);
        })
        res.send('<h1> Dane zostały dodane </h1>');
    });

    app.post('/summary', async (req, res) => {
        dbo.collection("transakcje").insertOne(req.body, (err, res) => {
            if (err) throw err;
            console.log(res);
        })

        var str = `
        <table>
        <tr>
        <th>NAZWA</th>
        <th>ILOŚĆ</th>
        <th>CENA</th>
        <th>KUPIONE PRZEZ</th>
        </tr>
    
        `
        
        var added = false;
        var df = [];
        let promise = new Promise((resolve, reject) => {
            df.push({resolve: resolve, reject: reject});
        })
        dbo.collection("produkty").find({}).toArray(async function (err, res) {
            if (err) throw err;
            res.forEach(async (item) => {
                str = str.concat(`
            <tr>
            <td>${item.nazwa} </tf>
            <td>${item.ilosc} </tf>
            <td>${item.cena} </tf>
            `)
            let promise2 = new Promise((resolve, reject) => {
                df.push({resolve: resolve, reject: reject});
            })
            dbo.collection("transakcje").find({produkt: item.nazwa}).toArray(function (err,res) {
                added = true;
                console.log(res);
                res.forEach(res2 => {
                    str = str.concat(`<td>${res2.nazwisko}</td>`)
                });
                df[1].resolve();
            })
            await promise2;
            });
            df[0].resolve();
        });
        await promise;
        if (!added) {
            str = str.concat(`<td>NONE</td>`)
        }
        str = str.concat("</tr>");
        str = str.concat("</table>")
        res.send(str);
    });

    app.get('/addProduct', (req, res) => {
        res.send(`
        
        <form action="/" method="post">
      <label for="nazwa">Nazwa:</label><br>
      <input type="text" id="nazwa" name="nazwa" value=""><br>
      <label for="ilosc">Ilość</label><br>
      <input type="number" id="ilosc" name="ilosc"><br><br>
      <label for="cena">Cena:</label><br>
      <input type="text" id="cena" name="cena" value=""><br>
      <input type="submit" value="Dodaj">
        </form> 
    
        `);
    });

    app.get('/addTransaction', (req, res) => {
        res.send(`
        
        <form action="/summary" method="post">
      <label for="nazwisko">Nazwisko:</label><br>
      <input type="text" id="nazwisko" name="nazwisko" value=""><br>
      <label for="produkt">Produkt</label><br>
      <input type="text" id="produkt" name="produkt"><br><br>
      <label for="ilosc">Ilosc</label><br>
      <input type="number" id="ilosc" name="ilosc" value=""><br>
      <input type="submit" value="Dodaj">
        </form> 
    
        `);
    });


    app.listen(4000, () => {
        console.log('Example app listening on 4000!');
    });


});


//Run app, then load http://localhost:4000 in a browser to see the output.