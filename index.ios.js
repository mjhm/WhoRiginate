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

var WhoRiginateView = require('./whoRiginateView');

var {
  AppRegistry
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
    var people = [defaultPerson];
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
    this.locationList = _(people).pluck('location').unique().value();
    this.titleList = _(people).pluck('title').unique().value();
    this.setState({isScraping: false});

    console.log('nameList', this.nameList);
    console.log('locationList', this.locationList);
    console.log('titleList', this.titleList);
  },

  searchChangeHandler: function (text) {
    var options = { pre: '<', post: '>' };
    var filterResult = fuzzy.filter(text, this.nameList, options);
    console.log('results', filterResult);
    this.setState({
      searchStr: text,
      currentPerson: this.people[(filterResult[0] || {}).index || 0]
    });
  },

  getInitialState: function () {
    return {
      isScraping: true,
      searchStr: '',
      currentPerson: defaultPerson
    };
  },

  componentWillMount: function () {
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
      <WhoRiginateView {...this.state}
        searchChangeHandler={this.searchChangeHandler}
      />
    );
  }
});

AppRegistry.registerComponent('WhoRiginate', () => WhoRiginate);
