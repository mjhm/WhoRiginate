
'use strict';

var React = require('react-native');
// jshint -W079
var {
  StyleSheet,
  View,
  Text,
  ScrollView,
  Image
} = React;
// jshint +W079

var Carousel = React.createClass({

  getDefaultProps() {
    return {
      hideIndicators: false,
      indicatorColor: '#000000',
      indicatorSize: 20,
      inactiveIndicatorColor: '#999999',
      indicatorAtBottom: true,
      width: 375
    };
  },

  getInitialState() {
    return {
      activePage: 0
    };
  },

  render() {

    // return (
    //   <View style={{ flex: 1 }}>
    //     <ScrollView ref="scrollview"
    //       contentContainerStyle={styles.container}
    //       automaticallyAdjustContentInsets={false}
    //       horizontal={true}
    //       pagingEnabled={true}
    //       showsHorizontalScrollIndicator={false}
    //       bounces={false}
    //       onMomentumScrollEnd={this.onAnimationEnd}
    //     >
    //       {this.props.children}
    //     </ScrollView>
    //   </View>
    // );

    return (
      <ScrollView
        horizontal={true}
        style={[styles.scrollView, styles.horizontalScrollView]}>
        {this.props.children}
      </ScrollView>
    );
  },
  indicatorPressed(ind){
    this.setState({
      activePage: ind
    });

    this.refs.scrollview.scrollTo(0, ind * this.props.width);
  },

  renderPageIndicator() {
    if (this.props.hideIndicators === true) {
      return null;
    }

    var indicators = [],
        indicatorStyle = this.props.indicatorAtBottom ? styles.pageIndicatorBottom : styles.pageIndicatorTop,
        style, position;

    position = {
      width: this.props.children.length * 15
    };
    position.left = (this.props.width - position.width) / 2;

    for (var i = 0; i < this.props.children.length; i++) {
      style = i === this.state.activePage ? { color: this.props.indicatorColor } : { color: this.props.inactiveIndicatorColor };
      indicators.push(<Text style={[style, { fontSize: this.props.indicatorSize }]} key={i} onPress={this.indicatorPressed.bind(this, i)}>&bull;</Text>);
    }

    return (
      <View style={[styles.pageIndicator, position, indicatorStyle]}>
        {indicators}
      </View>
    );
  },

  onAnimationEnd(e) {
    var activePage = e.nativeEvent.contentOffset.x / this.props.width;
    this.setState({
      activePage: activePage
    });
    if (this.props.onPageChange) {
      this.props.onPageChange(activePage);
    }
  }
});


var Thumb = React.createClass({
  shouldComponentUpdate: function(nextProps, nextState) {
    return false;
  },
  render: function() {
    return (
      <View style={styles.button}>
        <Image style={styles.img} source={{uri:this.props.uri}} />
      </View>
    );
  }
});

var THUMBS = ['https://fbcdn-dragon-a.akamaihd.net/hphotos-ak-ash3/t39.1997/p128x128/851549_767334479959628_274486868_n.png', 'https://fbcdn-dragon-a.akamaihd.net/hphotos-ak-prn1/t39.1997/p128x128/851561_767334496626293_1958532586_n.png', 'https://fbcdn-dragon-a.akamaihd.net/hphotos-ak-ash3/t39.1997/p128x128/851579_767334503292959_179092627_n.png', 'https://fbcdn-dragon-a.akamaihd.net/hphotos-ak-prn1/t39.1997/p128x128/851589_767334513292958_1747022277_n.png', 'https://fbcdn-dragon-a.akamaihd.net/hphotos-ak-prn1/t39.1997/p128x128/851563_767334559959620_1193692107_n.png', 'https://fbcdn-dragon-a.akamaihd.net/hphotos-ak-prn1/t39.1997/p128x128/851593_767334566626286_1953955109_n.png', 'https://fbcdn-dragon-a.akamaihd.net/hphotos-ak-prn1/t39.1997/p128x128/851591_767334523292957_797560749_n.png', 'https://fbcdn-dragon-a.akamaihd.net/hphotos-ak-prn1/t39.1997/p128x128/851567_767334529959623_843148472_n.png', 'https://fbcdn-dragon-a.akamaihd.net/hphotos-ak-prn1/t39.1997/p128x128/851548_767334489959627_794462220_n.png', 'https://fbcdn-dragon-a.akamaihd.net/hphotos-ak-prn1/t39.1997/p128x128/851575_767334539959622_441598241_n.png', 'https://fbcdn-dragon-a.akamaihd.net/hphotos-ak-ash3/t39.1997/p128x128/851573_767334549959621_534583464_n.png', 'https://fbcdn-dragon-a.akamaihd.net/hphotos-ak-prn1/t39.1997/p128x128/851583_767334573292952_1519550680_n.png'];
THUMBS = THUMBS.concat(THUMBS); // double length of THUMBS
var createThumbRow = (uri, i) => <Thumb key={i} uri={uri} />;

var styles = StyleSheet.create({

  // Carousel Styles
  container: {
    flex: 1,
    justifyContent: 'center'
  },
  page: {
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1
  },
  pageIndicator: {
    position: 'absolute',
    flexDirection: 'row',
    flex: 1,
    justifyContent: 'space-around',
    alignItems: 'center',
    backgroundColor: 'transparent'
  },
  pageIndicatorTop: {
    top: 20
  },
  pageIndicatorBottom: {
    bottom: 5
  },



  scrollView: {
    backgroundColor: '#6A85B1',
    height: 300,
  },
  horizontalScrollView: {
    height: 120,
  },
  containerPage: {
    height: 50,
    width: 50,
    backgroundColor: '#527FE4',
    padding: 5,
  },
  text: {
    fontSize: 20,
    color: '#888888',
    left: 80,
    top: 20,
    height: 40,
  },
  button: {
    margin: 7,
    padding: 5,
    alignItems: 'center',
    backgroundColor: '#eaeaea',
    borderRadius: 3,
  },
  buttonContents: {
    flexDirection: 'row',
    width: 64,
    height: 64,
  },
  img: {
    width: 64,
    height: 64,
  }
});

module.exports = Carousel;
