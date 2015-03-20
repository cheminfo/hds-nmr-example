'use strict';

var hds = require('hds');
var Kind = hds.Kind;

Kind.create('experiment', {
    id: String,
    name: String
});

var jcamp = new Kind.File({
    mimetype: 'chemical/x-jcamp-dx'
});

Kind.create('nmr', {
    solv: String,
    freq: Number,
    jcamp: jcamp
});
