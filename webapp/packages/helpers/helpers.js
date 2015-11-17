function onlyHash (obj) {
  return JSON.stringify(obj.hash) === '{}';
}

Template.registerHelper("print", function (first, second, third) {
  console.log("first, second, third:", first, second, third);
  if (first === undefined) {
    console.log("No arguments given to global print helper :(");
  } else if (second === undefined) {
    if (onlyHash(third)) {
      console.log(first, second);
    } else {
      console.log(first);
    }
  } else if (third === undefined) {
    if (onlyHash(second)) {
      console.log(first);
    } else {
      console.log(first, second);
    }
  } else if (onlyHash(third)) {
    console.log(first, second);
  } else {
    console.log("current print helper only does 2 arguments...");
  }
});

Template.registerHelper('compare', function (first, second) {
  if (typeof first === 'object' && typeof second === 'object') {
    return _.isEqual(first, second); // do a object comparison
  } else {
    return first === second;
  }
});
