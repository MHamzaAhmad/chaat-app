import _ from "lodash";

export const rndStr = (length) => {
  var characters =
    "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";

  var randomString = "";
  const len = _.isUndefined(length) ? 16 : length;
  for (var i = 0; i < len; i++) {
    var randomIndex = Math.floor(Math.random() * characters.length);
    randomString += characters[randomIndex];
  }

  return randomString;
};
