const express = require('express');
const bodyParser = require("body-parser");
const voca = require('voca');

const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: false
}));

const mongoose = require('mongoose');

// connect to the database
mongoose.connect('mongodb://localhost:27017/scripture-search', {
  useNewUrlParser: true
});

const verseSchema = new mongoose.Schema({
  volume_short_title: String,
  scripture_text: String,
  verse_title: String,
});

const Verse = mongoose.model('Verse', verseSchema, 'Verse');

const galleryItemSchema = new mongoose.Schema({
  graph_type: String,
  words: [String],
  filters: [String],
  graph_data: Object
});

const GalleryItem = mongoose.model('GalleryItem', galleryItemSchema, 'GalleryItem');

function parseSearchQuery(query) {
  query = query.replace(/\s+/g, ''); //remove whitespace
  let queryArray = query.split(','); //parse into array
  return queryArray;
}

const commonWords = ["the", "of", "and", "in", "that", "is", "to", "for", "be",
"you", "unto", "our", "which", "you", "unto", "our", "which", "ye", "not", "but",
"are", "by", "he", "we", "she", "in", "i", "him", "her", "was", "his", "with",
"thou", "us", "if", "because", "they", "from", "shalt", "have", "them", "as", "thy",
"me", "hath", "this", "your", "my", "any", "shall", "also", "a", "it", "said", "whom",
"thee", "therefore", "saith", "may", "their", "let", "now", "who", "or", "so", "were",
"when", "there", "had", "should", "into", "then", "on", "an", "at", "than", "s", "behold",
"did", "upon"];

app.get('/api/standardworks/instances', async (req, res) => {
  let words = parseSearchQuery(req.query.words);
  try {
    let results = []
    for (word of words) {
      let otVerses = await Verse.find( { $text: { $search: word },  volume_short_title: "OT" } );
      let ntVerses = await Verse.find( { $text: { $search: word },  volume_short_title: "NT" } );
      let bomVerses = await Verse.find( { $text: { $search: word },  volume_short_title: "BoM" } );
      let dcVerses = await Verse.find( { $text: { $search: word },  volume_short_title: "D&C" } );
      let pogpVerses = await Verse.find( { $text: { $search: word },  volume_short_title: "PGP" } );
      results.push({
        word: word,
        instances: {
          ot: otVerses.length,
          nt: ntVerses.length,
          bom: bomVerses.length,
          dc: dcVerses.length,
          pgp: pogpVerses.length
        }
      });
    }
    res.send(results);
  } catch (error) {
    console.log(error);
    res.sendStatus(500);
  }
});

app.get('/api/standardworks/frequency', async (req, res) => {
  let words = parseSearchQuery(req.query.words);
  try {
    let results = []
    for (word of words) {
      let otVerses = await Verse.find( { $text: { $search: word },  volume_short_title: "OT" } )
      let ntVerses = await Verse.find( { $text: { $search: word },  volume_short_title: "NT" } )
      let bomVerses = await Verse.find( { $text: { $search: word },  volume_short_title: "BoM" } )
      let dcVerses = await Verse.find( { $text: { $search: word },  volume_short_title: "D&C" } )
      let pogpVerses = await Verse.find( { $text: { $search: word },  volume_short_title: "PGP" } )
      results.push({
        word: word,
        instances: {
          ot: otVerses.length/23145,
          nt: ntVerses.length/7957,
          bom: bomVerses.length/6604,
          dc: dcVerses.length/3654,
          pgp: pogpVerses.length/635
        }
      });
    }
    res.send(results);
  } catch (error) {
    console.log(error);
    res.sendStatus(500);
  }
});

app.get('/api/wordrelations/:filter', async (req, res) => {
  let word = req.query.word;
  let filter = req.params.filter;
  console.log(filter);
  try {
    let results = [];
    let resultText = "";
    let verses = await Verse.find( { $text: { $search: word },  volume_short_title: filter } );
    verses = verses.map(verse => verse.scripture_text);
    resultText = verses.reduce((allVerses, oneVerse) => allVerses + ' ' + oneVerse);
    resultText = resultText.toLowerCase();
    resultArray = voca.words(resultText);
    resultArray = resultArray.filter(item => !commonWords.includes(item));
    resultArray = resultArray.filter(item => item !== word);
    wordData = [];
    while (resultArray.length > 0) {
      wordInstance = resultArray[0];
      let wordInstances = resultArray.filter(item => item === wordInstance);
      results.push(
        {
          word: wordInstance,
          instances: wordInstances.length
        }
      );
      resultArray = resultArray.filter(item => item !== wordInstance);
    }
    results.sort((a,b) => (a.instances < b.instances) ? 1 : ((b.instances < a.instances) ? -1 : 0));
    console.log(results.slice(0, 10));
    res.send(results.slice(0, 10));
  } catch (error) {
    console.log(error);
    res.sendStatus(500);
  }
});

app.get('/api/galleryitems', async (req, res) => {
  try {
    let items = await GalleryItem.find();
    res.send(items);
  } catch (error) {
    console.log(error);
    res.sendStatus(500);
  }
});

app.post('/api/galleryitems', async (req, res) => {
  const galleryItem = new GalleryItem({
    graph_type: req.body.graph_type,
    words: req.body.words,
    filters: req.body.filters,
    graph_data: req.body.graph_data
  });
  try {
    await galleryItem.save();
    res.send(galleryItem);
  } catch (error) {
    console.log(error);
    res.sendStatus(500);
  }
});

app.delete('/api/galleryitems/:id', async (req, res) => {
  try {
    await GalleryItem.deleteOne({
      _id: req.params.id
    });
    res.sendStatus(200);
  } catch (error) {
    console.log(error);
    res.sendStatus(500);
  }
});

app.listen(3000, () => console.log('Server listening on port 3000!'));
