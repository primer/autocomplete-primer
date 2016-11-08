module.exports = {
  provider: null,

  activate: function() {},
  deactivate: function() {},

  provide: function() {
    return [
      require('./css/provider'),
      require('./octicons/provider')
    ]
  }
}
