# WhoRiginate

This is my test project for building a "React Native" app.  It scrapes the http://www.originate.com/people page for info about all the Originate people, and provides the user with a fuzzy search TextBox to display the info about a given person.

I started this project with practically no mobile app development experience, so I have a limitted perspective for comparison with the normal mobile development experience. However this did feel a lot like the pace and style of Web development.

These two articles also review the React Native development process.
* http://herman.asia/building-a-flashcard-app-with-react-native
* http://jlongster.com/First-Impressions-using-React-Native


### What I learned

1. React Native is **NOT** about implementing HTML/CSS in native mobile apps. Rather it is about using the ReactJS web development tools and techniques, and patterns for mobile app development.  Think of it as:
  * Web Development Envionment - HTML + JSX Wrapped IOS Components - CSS + Flexbox + ReactJS patterns.
1. The basic [React Native tutorial](http://facebook.github.io/react-native/docs/tutorial.html) was very easy to follow.
1. XCode is a monster of a user interface, but React Native only requires a few pieces of it.
1. The JavaScript environment is **NOT** Node, but rather a stripped down [JavaScriptCore](http://trac.webkit.org/wiki/JavaScriptCore). The `require` mechanism mostly acts like Node, but it implements its own packaging system to create the device runtime app.  The packaging is similar but not the same as "browserify", and many of the same caveats with "browserify" apply.
  1. Node modules with file access, and other System and C dependencies will probably not work at all.
  1. It depends on an incomplete set of polyfills.
  1. The "require" function behaves mostly like Node's require, but it sometimes gets confused.
1. The documentation is not bad for a pre release product, but it's missing quite a few details and examples.
1. Flexbox is a little like CSS, but I've got a lot of CSS unlearning ahead of me to master it, especially for responsive design.
