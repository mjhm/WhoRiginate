
/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 */
'use strict';

var React = require('react-native');
var _ = require('lodash');
var Carousel = require('./carousel');
// ^ WIP Not hooked up.
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
    backgroundColor: '#1D1D1D'
  },
  headline: {
    fontSize: 40,
    color: '#eee',
    fontFamily: 'Georgia',
    textAlign: 'center',
    margin: 40
  },
  searchInput: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    borderRadius: 5,
    color: '#eee',
    margin: 20,
    padding: 10
  },
  card: {
    flex: 1,
    flexDirection: 'column',
    alignItems: 'center'
  },
  info: {
    textAlign: 'center',
    color: '#ddd',
    margin: 10,
    marginTop: 5,
    marginBottom: 5
  },
  portrait: {
    backgroundColor: '#000',
    borderColor: '#000',
    tintColor: '#000',
    opacity: 1,
    width: 300,
    height: 300
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
    return (
      <View style={styles.container}>
        <Text style={styles.headline}>
          WhoRiginate
        </Text>
        <TextInput
          style={styles.searchInput}
          editable={!this.props.isScraping}
          placeholder={this.props.isScraping ? '' : 'Search by name'}
          placeholderTextColor='#777'
          onChangeText={_.debounce(this.props.searchChangeHandler, 400)}
        />
        <View style={styles.card}>
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
           style={styles.portrait}
         />
        </View>
      </View>
    );
  }
});

module.exports = WhoRiginateView;
