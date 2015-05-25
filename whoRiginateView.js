
/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 */
'use strict';

var React = require('react-native');
var _ = require('lodash');
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
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#1D1D1D',
  },
  title: {
    fontSize: 40,
    color: '#eee',
    fontFamily: 'Georgia',
    textAlign: 'center',
    margin: 10,
    marginBottom: 20
  },
  info: {
    textAlign: 'center',
    color: '#ddd',
    marginBottom: 5,
  },
  searchInput: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    borderRadius: 5,
    color: '#eee',
    margin: 10,
    padding: 10
  },
  portrait: {
    backgroundColor: '#0ff',
    borderColor: '#f0f',
    tintColor: '#ff0',
    opacity: 1,
    width: 300,
    height: 300,
  },
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
        <Text style={styles.title}>
          WhoRiginate
        </Text>
        <Text style={styles.info}>
         {who.name}
        </Text>
        <Text style={styles.info}>
         {who.name ? who.location + ' - ' + who.title : ' '}
        </Text>
        <Text style={styles.info}>
         {who.blurb}
        </Text>
        <TextInput
          style={styles.searchInput}
          editable={!this.props.isScraping}
          placeholder='Search by name'
          placeholderTextColor='#777'
          onChangeText={_.debounce(this.props.searchChangeHandler, 400)}
        />
        <Image
         source={{uri:who.image}}
         style={styles.portrait}
       />
      </View>
    );
  }
});

module.exports = WhoRiginateView;
