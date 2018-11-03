module.exports = function (express, app, fuggvenyek, initDb) {

    app.get('/', (req, res) => res.send("hello"))

    let allowCrossDomain = function(req, res, next) {
        res.header('Access-Control-Allow-Origin', "*");
        res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
        res.header('Access-Control-Allow-Headers', 'Content-Type');
        next();
    };


    app.use(allowCrossDomain);


    app.use(express.static(__dirname));

    app.listen(port=3002, () => console.log('Example app listening on port '+port+'!'));

    app.get('/add/:nev/:cim/:szam/:csaladtag', function (request, response) {
        var nev = request.params.nev;
        var cim = request.params.cim;
        var szam = request.params.szam;
        var csaladtag = request.params.csaladtag;
        fuggvenyek.add(nev, cim, szam, csaladtag).then((model) => {
            response.json({success: true, data: model})
        }).catch((err) => {
            response.json({success: false, errorMsg:err})
        })
    });

    app.get('/addData/:nev/:cim', function (request, response) {
        var nev = request.params.nev;
        var cim = request.params.cim;
        fuggvenyek.addData(nev, cim).then((model) => {
            response.json({success: true, data: model})
        }).catch((err) => {
            response.json({success: false, errorMsg:err})
        })
    });

    app.get('/addNumber/:id/:szam', function(request, response){
        var id = request.params.id;
        var szam = Number(request.params.szam);
        fuggvenyek.addNumber(id, szam).then((model) => {
            response.json({success: true, data: model})
            }).catch((err)=>{
            response.json({success: false, errorMsg:err})
        })
    });

    app.get('/addFamily/:id/:csaladtag', function(request, response){
        var id = request.params.id;
        var csaladtag = request.params.csaladtag;
        fuggvenyek.addFamily(id, csaladtag).then((model) => {
            response.json({success: true, data: model})
        }).catch((err)=>{
            response.json({success: false, errorMsg:err})
        })
    });

    app.get('/deleteAll/:id', function (request, response) {
        var id = request.params.id;
        fuggvenyek.deleteAll(id).then((model) => {
            response.json({success: true, data: model})
        }).catch((err)=>{
            response.json({success: false, errorMsg:err})
        })
    });

    app.get('/deleteNumber/:id', function (request, response) {
        var id = request.params.id;
        fuggvenyek.deleteNumber(id).then((model) => {
            response.json({success: true, data: model})
        }).catch((err)=>{
            response.json({success: false, errorMsg:err})
        })
    });

    app.get('/deleteFamily/:id', function (request, response) {
        var id = request.params.id;
        fuggvenyek.deleteFamily(id).then((model) => {
            response.json({success: true, data: model})
        }).catch((err)=>{
            response.json({success: false, errorMsg:err})
        })
    });

    app.get('/updateName/:id/:ujnev', function (request, response) {
        var id = request.params.id;
        var ujnev = request.params.ujnev;
        fuggvenyek.updateName(id, ujnev).then((model) => {
            response.json({success: true, data: model})
        }).catch((err)=>{
            response.json({success: false, errorMsg:err})
        })
    });

    app.get('/updateAdress/:id/:ujcim', function (request, response) {
        var id = request.params.id;
        var ujcim = request.params.ujcim;
        fuggvenyek.updateAdress(id, ujcim).then((model) => {
            response.json({success: true, data: model})
        }).catch((err)=>{
            response.json({success: false, errorMsg:err})
        })
    });

    app.get('/updateNumber/:id/:ujszam', function (request, response) {
        var id = request.params.id;
        var ujszam = request.params.ujszam;
        fuggvenyek.updateNumber(id, ujszam).then((model) => {
            response.json({success: true, data: model})
        }).catch((err)=>{
            response.json({success: false, errorMsg:err})
        })
    });

    app.get('/updateFamily/:nev/:ujcsaladtag', function (request, response) {
        var nev = request.params.nev;
        var ujcsaladtag = request.params.ujcsaladtag;
        fuggvenyek.updateFamily(id, ujcsaladtag).then((model) => {
            response.json({success: true, data: model})
        }).catch((err)=>{
            response.json({success: false, errorMsg:err})
        })
    });

    app.get('/searchName/:nev', function (request, response) {
        var nev = request.params.nev;
        fuggvenyek.searchName(nev).then((adatok) =>{
            response.json(adatok);
        });
    });

    app.get('/searchNumber/:szam', function (request, response) {
        var szam = request.params.szam;
        fuggvenyek.searchNumber(szam).then((adatok)=>{
            response.json(adatok);
        });
    });

    app.get('/nevjegy', function(request,response){
        fuggvenyek.nevjegy().then((adatok) =>{
            response.json(adatok);
        });
    });


    /*app.get('/nevjegy2', function(request,response){
        fuggvenyek.nevjegy2().then((adatok) =>{
            response.json(adatok);
        });
    });*/

    app.get('/nevjegy2', function(req, res) {
        fuggvenyek.nevjegy2(function(err, users) {
            res.json(users);
        });
    });

    app.get('/getall', function(req, res) {
        fuggvenyek.getall(function(err, users) {
            res.json(users);
        });
    });

    /*app.get('/getall', function(req, res) {
        fuggvenyek.getall().then((data)=>{
            res.json(data);
        });
    });*/

}
