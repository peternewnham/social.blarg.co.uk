const fs = require('fs-extra');
const path = require('path');

module.exports = function write(name, data) {

  const dir = path.resolve(__dirname, '../data');
  const file = `${dir}/${name}.json`;

  return new Promise((resolve, reject) => {

    fs.ensureDir(dir, err => {
      if (err) {
        reject(err);
      }
      else {
        fs.writeFile(file, data, err => {
          if (err) {
            reject(err);
          }
          else {
            resolve(file);
          }
        })
      }
    });

  });

};
