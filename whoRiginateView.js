
/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 */
'use strict';

var React = require('react-native');
var _ = require('lodash');
var Carousel = require('./carousel');

// jshint -W079
var {
  Image,
  StyleSheet,
  Text,
  TextInput,
  View,
  PropTypes
} = React;
// jshint +W079



var styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#1D1D1D',
    borderWidth: 2,
    borderColor: '#ff0',
    overflow: 'hidden',
    padding: 0
  },
  headline: {
    fontSize: 30,
    color: '#eee',
    fontFamily: 'Georgia',
    textAlign: 'center',
    marginTop: 30,
    marginBottom: 5
  },
  searchInput: {
    height: 30,
    borderColor: 'gray',
    borderWidth: 1,
    borderRadius: 5,
    color: '#eee',
    margin: 10,
    padding: 7
  },
  carousel: {
    flex: 1, alignItems: 'flex-start', overflow: 'hidden',
    backgroundColor: '#b00',
    borderWidth: 2,
    borderColor: '#0bb'
  },
  card: {
    flex: 1,
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'space-around',
    borderWidth: 2,
    borderColor: '#804'
  },
  info: {
    textAlign: 'center',
    color: '#ddd',
    fontSize: 12,
    margin: 10,
    marginTop: 0,
    marginBottom: 0
  },
  portrait: {
    backgroundColor: '#000',
    borderColor: '#000',
    tintColor: '#000',
    opacity: 1
  }
});


var WhoRiginateView = React.createClass({

  propTypes: {
    isScraping: PropTypes.bool.isRequired,
    searchStr: PropTypes.string.isRequired,
    currentPerson: PropTypes.any.isRequired,
    searchChangeHandler: PropTypes.func.isRequired
  },

  render: function() {
    var who = this.props.currentPerson;
    var cardWidth = this.props.width - 20;
    var portraitSize = this.props.height -260;
    return (
      <View style={[styles.container, {width: this.props.width}]}>
        <Text style={styles.headline}>
          WhoRiginate
        </Text>
        <TextInput
          style={styles.searchInput}
          editable={!this.props.isScraping}
          placeholder={this.props.isScraping ? '' : 'Search by name'}
          placeholderTextColor='#777'
          onChangeText={_.debounce(this.props.searchChangeHandler, 400)}
          controlled={true}
        />
      <View style={[styles.carousel, {width: cardWidth}]}>
          <Carousel width={cardWidth}>
            <View style={[styles.card, {width: cardWidth}]}>
              <Text style={styles.info}>
               {who.name}
              </Text>
              <Text style={styles.info}>
               {who.name ? who.location + ' - ' + who.title : ' '}
              </Text>
              <Text style={styles.info}>
               {who.blurb}
              </Text>
              <Image
               source={{uri: who.image}}
               style={[styles.portrait, {height: portraitSize, width: portraitSize}]}
              />
            </View>
            <View style={[styles.card, {width: cardWidth}]}>
              <Text style={styles.info}>
               {who.name}
              </Text>
              <Text style={styles.info}>
               {who.name ? who.location + ' - ' + who.title : ' '}
              </Text>
              <Text style={styles.info}>
               {who.blurb}
              </Text>
              <Image
               source={{uri: who.image}}
               style={[styles.portrait, {height: portraitSize, width: portraitSize}]}
              />
            </View>
          </Carousel>
        </View>
      </View>
    );
  }
});

module.exports = WhoRiginateView;
