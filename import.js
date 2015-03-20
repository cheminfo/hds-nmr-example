'use strict';

var fs = require('fs');
var hds = require('hds');
var Entry = hds.Entry;

// Load kinds
require('./kinds');

hds.init({
    database: require('./mongo.json')
}).then(function () {
    return hds.dropDatabase()
}).then(startImport);

function startImport() {

    var experiment = Entry.create('experiment', {
        id: 'abc123',
        name: 'myExperiment'
    }, {
        owner: 'test@cheminfo.org'
    });

    experiment.save().then(saveNmr);

    function saveNmr() {

        var file1 = './data/nmr1.jdx';
        var nmr1 = experiment.createChild('nmr', {
            solv: 'Ethanol',
            freq: 400,
            jcamp: {
                value: fs.readFileSync(file1),
                filename: 'nmr1.jdx'
            }
        });

        var file2 = './data/nmr2.jdx';
        var nmr2 = experiment.createChild('nmr', {
            solv: 'Ethanol',
            freq: 400,
            jcamp: {
                value: fs.readFileSync(file2),
                filename: 'nmr2.jdx'
            }
        });

        Promise.all([nmr1.save(), nmr2.save()])
            .then(function () {
                console.log('Everything saved');
                process.exit(0);
            });

    }

}
