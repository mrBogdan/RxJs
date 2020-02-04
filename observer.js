const Observer = {
  closed: true,

  next(value) {
    console.log('Observer Value: ', value);
  },

  error(error) {
    console.log('Observer Error: ', error);
  },

  complete() {
    console.log('Observer Completed');
  },
};

exports.Observer = Observer;
