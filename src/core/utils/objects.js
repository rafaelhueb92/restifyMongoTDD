const depareObjects = (arg, model) =>
  new Promise(resolve => {
    for (let key in arg) {
      if (arg.hasOwnProperty(key)) {
        if (arg[key] != undefined && arg[key] != null) model[key] = arg[key];
      }
    }
    return resolve(model);
  });

module.exports = { depareObjects };
