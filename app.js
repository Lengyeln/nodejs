var express = require('express');
var app = express();

var db = require('./db');
const fs = require('fs');
const conif = require('node-console-input');

db.initDb();




var fuggvenyek = {
    add:
    //uj nevjegy felvitele
        function add(nev, cim, szam, csaladtag) {
            return db.insertData(db.models.Adatok, {
                nev: nev,
                cim: cim
            }).then((datas) => {
                db.insertData(db.models.Szamok, {
                    szam: szam,
                    referencId: datas.id
                });
                db.insertData(db.models.Csalad, {
                    csaladtag: csaladtag,
                    referencId: datas.id
                });
            });
        },

    addData:
        function addData(nev, cim) {
            return db.insertData(db.models.Adatok, {
                nev: nev,
                cim: cim
            });
        },

    addNumber:
        function addNumber(id, szam) {
            return db.insertData(db.models.Szamok, {
                szam: szam,
                referencId: id
            });
        },

    addFamily:
        function addFamily(id, csaladtag) {
            return db.insertData(db.models.Csalad, {
                csaladtag: csaladtag,
                referencId: id
            });
        },

    deleteAll:
        function deleteAll(id) {
                return db.deleteData(db.models.Szamok, {
                    where: {
                        referencId: id
                    }
                }).then((datas) => {
                    db.deleteData(db.models.Csalad, {
                        where: {
                            referencId: id
                        }
                    });
                    db.deleteData(db.models.Adatok, {
                        where: {
                            id: id
                        }
                    })
                });
        },

    deleteNumber:
        function deleteNumber(id){
            return db.deleteData(db.models.Szamok, {
                where: {
                    id: id
                }
            })
        },

    deleteFamily:
        function deleteFamily(id){
            return db.deleteData(db.models.Csalad, {
                where: {
                    id: id
                }
            });
        },

    updateName:
        function updateName(id, ujnev){
            return db.models.Adatok.update({
                nev: ujnev,
            }, {
                where: {
                    id: id,
                }
            });
        },

    updateAdress:
        function updateAdress(id, ujcim){
            return db.models.Adatok.update({
                cim: ujcim,
            }, {
                where: {
                    id: id,
                }
            });
        },

    updateNumber:
        function updateNumber(id, ujszam) {
            return db.models.Szamok.update({
                    szam: ujszam,
                }, {
                    where: {
                        id: id
                    },
                }
            )
        },

    updateFamily:
        function updateFamily(id, ujcsaladtag){
            return db.models.Adatok.update({
                csaladtag: ujcsaladtag,
            }, {
                where: {
                    id: id,
                }
            })
        },

    searchName:
        function searchName(nev){
            return new Promise((resolve,reject)=>{
                var szemelyadatok={};
                db.models.Adatok.findOne({
                    where: {nev: nev},
                    limit: 5000
                }).then((selectedRow) => {
                    szemelyadatok=selectedRow.dataValues;
                    console.log(szemelyadatok);
                    var csaladPromise = db.models.Csalad.findOne({
                        where: {referencId: selectedRow.dataValues.id},
                        limit: 5000
                    });
                    var szamokPromise=db.models.Szamok.findOne({
                        where: {referencId: selectedRow.dataValues.id},
                        limit: 5000
                    });
                    Promise.all([csaladPromise,szamokPromise]).then((values)=>{
                        ///console.log("VALUE",values[0]);
                        if(values[0]) szemelyadatok.csaladtagok=values[0].dataValues;
                        if(values[1]) szemelyadatok.szamok=values[1].dataValues;
                        resolve(szemelyadatok);
                    });
                })
            });
        },

    /*nevjegy2:
        function nevjegy2() {
        return new Promise((resolve, reject)=>{
            var szemelyadatok = [];
            db.models.Adatok.findAll({
                raw: true
            }).then((selectedRow) => {
                szemelyadatok = selectedRow.dataValues;
                resolve(szemelyadatok);
                console.log(szemelyadatok);
            })
        })
        },*/

    nevjegy2:
            function nevjegy2(obj) {
                var szemelyadatok = [];
                db.models.Adatok.findAll({}).then((selectedRow) => {
                    console.log(obj(selectedRow));
                    szemelyadatok = (selectedRow).dataValues;
                    //console.log(szemelyadatok);
                    return szemelyadatok;
                })
            },

  /*  getall:
        function getall(cb){
            db.models.Adatok.findAll().then(function (users) {
                return cb(null, users);
            }).catch(function(err) {
                return cb(err);
            })
        }*/

    /*nevjegy:
        function nevjegy() {
            return new Promise((resolve,reject)=>{
                var szemelyadatok=[];
                db.models.Adatok.findOne({
                    limit: 5000
                }).then((selectedRow) => {
                    szemelyadatok=selectedRow.dataValues;
                    var csaladPromise = db.models.Csalad.findOne({
                        where: {referencId: selectedRow.dataValues.id},
                        limit: 5000
                    });
                    var szamokPromise=db.models.Szamok.findOne({
                        where: {referencId: selectedRow.dataValues.id},
                        limit: 5000
                    });
                    Promise.all([csaladPromise,szamokPromise]).then((values)=>{
                        ///console.log("VALUE",values[0]);
                        if(values[0]) szemelyadatok.csaladtagok=values[0].dataValues;
                        if(values[1]) szemelyadatok.szamok=values[1].dataValues;
                        resolve(szemelyadatok);
                    });
                })
            });
        },*/
    //

    nevjegy:
        function nevjegy() {
            return new Promise((resolve,reject)=>{
                var szemelyadatok=[];
                db.models.Adatok.findOne({
                    limit: 5000
                }).then((selectedRow) => {
                    szemelyadatok=selectedRow.dataValues;
                    console.log(szemelyadatok);
                    var csaladPromise = db.models.Csalad.findOne({
                        where: {referencId: selectedRow.dataValues.id},
                        limit: 5000
                    });
                    var szamokPromise=db.models.Szamok.findOne({
                        where: {referencId: selectedRow.dataValues.id},
                        limit: 5000
                    });
                    Promise.all([csaladPromise,szamokPromise]).then((values)=>{
                        ///console.log("VALUE",values[0]);
                        if(values[0]) szemelyadatok.csaladtagok=values[0].dataValues;
                        if(values[1]) szemelyadatok.szamok=values[1].dataValues;
                        resolve(szemelyadatok);
                    });
                })
            });
        },

    searchNumber:
        function searchNumber(szam){
            return new Promise((resolve,reject)=>{
                var szemelyadatok={};
                db.models.Szamok.findOne({
                    where: {szam: szam},
                    limit: 5000
                }).then((selectedRow) => {
                    szemelyadatok=selectedRow.dataValues;
                    var csaladPromise = db.models.Csalad.findOne({
                        where: {referencId: selectedRow.dataValues.referencId},
                        limit: 5000
                    });
                    var adatokPromise=db.models.Adatok.findOne({
                        where: {id: selectedRow.dataValues.referencId},
                        limit: 5000
                    });
                    Promise.all([csaladPromise,adatokPromise]).then((values)=>{
                        //console.log("VALUE",values[0]);
                        if(values[0]) szemelyadatok.csaladtagok=values[0].dataValues;
                        if(values[1]) szemelyadatok.nev=values[1].dataValues;
                        resolve(szemelyadatok);
                    });
                })
            });
        },

    getall:
        function getall(cb){
                db.models.Adatok.findAll().then(function (users) {
                    return cb(null, users);
                }).catch(function(err) {
                    return cb(err);
                })
        }


}

require('./endpoints')(express, app, fuggvenyek);