const Sequelize = require('sequelize');
var fs = require('fs');
var path = require('path');
var db = null;
var models={};

function initDb() {
    db = new Sequelize({
        database: 'database',
        dialect: 'sqlite',
        // SQLite only
        storage: 'database.sqlite'
    });

    models.Adatok= db.define('data', {
        nev: {
            type: Sequelize.STRING,
            unique: true
        },
        cim: {
            type: Sequelize.STRING,
            notNull: true
        }
    });

    models.Szamok = db.define('number', {
        szam: {
            type: Sequelize.INTEGER
        },
        referencId: {
            type: Sequelize.INTEGER,
            references: {
                model: 'data',
                key: 'id',
            }
        }
    });

    models.Csalad = db.define('family', {
        csaladtag: {
            type: Sequelize.STRING
        },
        referencId: {
            type: Sequelize.INTEGER,
            references: {
                model: 'data',
                key: 'id',
            }
        }
    });

    db.sync();
}

function insertData(model, jsondata){
    return model.create(jsondata);
}

function deleteData(model, jsondata){
    return model.destroy(jsondata);
}

function getDb() {
    return db;
}


module.exports = {
    initDb: initDb,
    getDb: getDb,
    insertData: insertData,
    deleteData: deleteData,
    models: models,
    irdki: function(){
        console.log("KIIRVA");
    }
    //insertInto: insertInto,
    //addNumber: addNumber
}



