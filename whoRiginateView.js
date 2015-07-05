
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
  },
  card: {
    flex: 1,
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'space-around'
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
    filteredPeople: PropTypes.any.isRequired,
    searchChangeHandler: PropTypes.func.isRequired
  },

  render: function() {
    var cardWidth = this.props.width - 20;
    var portraitSize = Math.min(this.props.height - 260, cardWidth);
    var whoList = (0 < this.props.filteredPeople.length && this.props.filteredPeople.length < 20) ?
      this.props.filteredPeople : [this.props.defaultPerson];
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
          <Carousel width={cardWidth} hideIndicators={whoList.length < 2}>{
            whoList.map((who, index) => {
              return (
                <View key={index} style={[styles.card, {width: cardWidth}]}>
                  {who.name ? <Text style={styles.info}> {who.name} </Text> : null}
                  {who.name ? <Text style={styles.info}> {who.location + ' - ' + who.title} </Text> : null}
                  {who.blurb ? <Text style={styles.info}> {who.blurb} </Text> : null}
                  <Image
                   source={{uri: who.image}}
                   style={[styles.portrait, {height: portraitSize, width: portraitSize}]}
                  />
                </View>
              );
            })}
          </Carousel>
        </View>
      </View>
    );
  }
});

module.exports = WhoRiginateView;
