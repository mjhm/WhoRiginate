
/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 */
'use strict';

var React = require('react-native');
var StyleSheetRegistry = require('StyleSheetRegistry');
var _ = require('lodash');

// jshint -W079
var {
  Image,
  StyleSheet,
  Text,
  TextInput,
  View,
  ScrollView,
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
    color: '#eee',
    fontFamily: 'Georgia',
    textAlign: 'center'
  },
  searchInput: {
    borderColor: 'gray',
    borderWidth: 1,
    borderRadius: 5,
    color: '#eee'
  },

  scrollView: {
    flex: 1,
    backgroundColor: '#1D1D1D'
  },
  card: {
    flex: 1,
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'flex-start',
    marginTop: 0,
    marginBottom: 0
  },
  infoBlurb: {
    textAlign: 'center',
    color: '#ddd'
  },
  infoLine: {
    textAlign: 'center',
    color: '#ddd'
  },
  portrait: {
    backgroundColor: '#000',
    borderColor: '#000',
    tintColor: '#000',
    opacity: 1
  }
});

var layout = {
  phone: StyleSheet.create({
    headline: {
      fontSize: 30,
      marginTop: 20,
      marginBottom: 5
    },
    searchInput: {
      height: 30,
      margin: 10,
      padding: 7
    },
    scrollView: {
      width: 300,
      height: 440
    },
    card: {
      width: 300,
      height: 440
    },
    infoBlurb: {
      fontSize: 12,
      margin: 10,
      marginTop: 0,
      marginBottom: 0
    },
    infoLine: {
      fontSize: 14,
      margin: 3
    },
    portrait: {
      marginTop: 10,
      marginBottom: 10,
      width: 300,
      height: 300
    }
  }),

  pad: StyleSheet.create({
    headline: {
      fontSize: 20,
      marginTop: 10,
      marginBottom: 3
    },
    searchInput: {
      fontSize: 12,
      height: 25,
      margin: 10,
      padding: 2,
      paddingLeft: 10,
      paddingRight: 10
    },
    scrollView: {
      width: 200,
      height: 360
    },
    card: {
      width: 200,
      height: 360
    },
    infoBlurb: {
      fontSize: 8,
      margin: 0,
      marginTop: 0,
      marginBottom: 0
    },
    infoLine: {
      fontSize: 10,
      margin: 2
    },
    portrait: {
      marginTop: 10,
      marginBottom: 10,
      width: 200,
      height: 200
    }
  })
};

var WhoRiginateView = React.createClass({

  propTypes: {
    isScraping: PropTypes.bool.isRequired,
    searchStr: PropTypes.string.isRequired,
    filteredPeople: PropTypes.any.isRequired,
    searchChangeHandler: PropTypes.func.isRequired
  },



  render: function() {
    var fmt = this.props.height > 480 ? 'phone' : 'pad';
    var cardWidth = this.props.width - 20;
    var cardHeight = Math.max(this.props.height - 120, 440);
    var portraitSize = Math.min(this.props.height - 260, cardWidth);
    var whoList = (0 < this.props.filteredPeople.length && this.props.filteredPeople.length < 20) ?
      this.props.filteredPeople : [this.props.defaultPerson];
    return (
      <View style={[styles.container, {width: this.props.width}]}>
        <Text style={[styles.headline, layout[fmt].headline]}>
          WhoRiginate
        </Text>
        <TextInput
          style={[styles.searchInput, layout[fmt].searchInput]}
          editable={!this.props.isScraping}
          placeholder={this.props.isScraping ? '' : 'Search by name'}
          placeholderTextColor='#777'
          onChangeText={_.debounce(this.props.searchChangeHandler, 400)}
          controlled={true}
        />

        <ScrollView
          horizontal={true}
          pagingEnabled={true}
          automaticallyAdjustContentInsets={false}
          style={[styles.scrollView, layout[fmt].scrollView]}>
          {
            whoList.map((who, index) => {
              return (
                <View key={index} style={[styles.card, layout[fmt].card]}>
                  <Text style={[styles.infoLine, layout[fmt].infoLine]}> {who.name || ' '} </Text>
                  <Text style={[styles.infoLine, layout[fmt].infoLine]}>
                    {who.location && who.title ? who.location + ' - ' + who.title : ' '}
                  </Text>
                  <Image
                   source={{uri: who.image}}
                   style={[styles.portrait, layout[fmt].portrait]}
                  />
                {who.blurb ? <Text style={[styles.infoBlurb, layout[fmt].infoBlurb]}> {who.blurb} </Text> : null}
                </View>
              );
            })
          }
        </ScrollView>
      </View>
    );
  }
});

module.exports = WhoRiginateView;
