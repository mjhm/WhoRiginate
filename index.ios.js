/* global fetch */
/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 */
'use strict';

var React = require('react-native');
var cheerio = require('./node_modules/cheerio/lib/cheerio');
// ^ short form: require('cheerio'); doesn't work with react-native's require.
var _ = require('lodash');
var fuzzy = require('fuzzy');
var Dimensions = require('Dimensions');

var WhoRiginateView = require('./whoRiginateView');

var {
  AppRegistry,
  PixelRatio
} = React;

// This is used by people without an image.
var defaultImage1 = ['https://originate-v3-prod.s3.amazonaws.com/sites/',
  '53854785dc60d94b96000002/theme/images/people-default.jpg'].join('');

// This is used as the image when the search doesn't match.
var defaultImage2 = ['http://www.originate.com/images/dynamic/',
    'W1siZnUiLCJodHRwczovL29yaWdpbmF0ZS12My1wcm9kLnMzLmFtYXpvbmF3cy5jb20',
    'vc2l0ZXMvNTM4NTQ3ODVkYzYwZDk0Yjk2MDAwMDAyL3BhZ2VzLzUzODc5YWY4NzA3OW',
    'RiMDY3YjAwMDBhOS9maWxlcy9QZW9wbGVfSGVhZGVyNC5qcGc%2FMTQyMzc2NjY0MyJ',
    'dLFsicCIsInRodW1iIiwiMTUwMHgxNTAwXHUwMDNFIl1d',
    '/People_Header4.jpg?sha=227eb0ca59820e48'].join('');

var defaultPerson = {
  name: '',
  title: '',
  location: '',
  blurb: '',
  image: defaultImage2,
  concat: ''
};

var WhoRiginate = React.createClass({

  people: [],
  nameList: [],
  locationList: [],
  titleList: [],

  scrapePeople: function (pageText, processPeople) {
    var $ = cheerio.load(pageText);
    var people = [];
    $('.person').each(function () {
      var name = $(this).find('.details .name').text().trim();
      var titleLocation = $(this).find('.details .title').text().trim();
      var blurb = $(this).find('.details .blurb').text().trim();
      var image = ($(this).css('background-image') || '').slice(4, -1);

      var title = titleLocation.replace(/\s+\-\s+.*$/, '');
      var location = titleLocation.replace(/^.*\s+\-\s+/, '');

      people.push({
        name: name,
        title: title,
        location: location,
        blurb: blurb,
        image: image || defaultImage1,
        concat: [name, location, title, blurb].join('\n')
      });
    });
    processPeople(null, people);
  },

  processPeople: function (err, people) {
    if (err) {
      console.log(err);
      return;
    }
    this.people = people;
    this.nameList = _.pluck(people, 'name');
    this.fuzzyIndex = people.map(function (p) {
      return p.name;
    });
    this.locationList = _(people).pluck('location').unique().value();
    this.titleList = _(people).pluck('title').unique().value();
    this.setState({isScraping: false});
  },

  searchChangeHandler: function (text) {
    var options = { pre: '<', post: '>' };
    var fuzzyResult = fuzzy.filter(text, this.fuzzyIndex, options);
    var filteredPeople = fuzzyResult.map((fuzzyItem) => {
      return this.people[fuzzyItem.index];
    });

    this.setState({
      searchStr: text,
      filteredPeople: filteredPeople
    });
  },

  getInitialState: function () {
    var dim = Dimensions.get('window');
    console.log('dimensions', dim);
    return {
      width: dim.width,
      height: dim.height,
      isScraping: true,
      searchStr: '',
      filteredPeople: []
    };
  },

  componentWillMount: function () {
    var self = this;
    fetch('http://www.originate.com/people')
    .then((response) => response.text())
    .catch((error) => {
      console.warn(error);
      return '';
    })
    .finally((responseText) => {
      this.scrapePeople(responseText, this.processPeople);
    });
  },
  render: function() {
    return (
      <WhoRiginateView {...this.state} defaultPerson={defaultPerson}
        searchChangeHandler={this.searchChangeHandler}
      />
    );
  }
});

AppRegistry.registerComponent('WhoRiginate', () => WhoRiginate);
