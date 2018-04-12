// 遍历文件夹
// 从xml中提取中文（所有文本信息） 中文翻译英文  ok

// https://github.com/Leonidas-from-XIV/node-xml2js

'use strict';
const xml2js = require('xml2js');
const fs = require('fs');
const parseString = require('xml2js').parseString;
let xml;

fs.readFile('./a.xml', function(err, data) {
  if (err) {
    console.log(err);
  } else {
    let xml = data.toString('utf-8');
    parseString(xml, { explicitArray: false }, function(err, result) {
      console.dir(JSON.stringify(result));
      // console.log(JSON.stringify(result));
      let json = JSON.stringify(result);
      fs.writeFile('output.json', json, function(err) {
        if (err) {
          console.log(err);
        } else {
          console.log('output.json ok.');

          let builder = new xml2js.Builder();
          let newXml = builder.buildObject(result);
          fs.writeFile('output.xml', newXml, function(err) {
            if (err) {
              console.log(err);
            } else {
              console.log('output.xml ok.');
            }
          });
        }
      });

      // let builder = new xml2js.Builder();
      // let newXml = builder.buildObject(result);
      // fs.writeFile('output.xml', newXml, function(err) {
      //   if (err) {
      //     console.log(err);
      //   } else {
      //     console.log('output.xml ok.');
      //   }
      // });
    });
  }
});
