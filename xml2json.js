// 遍历文件夹
// 从xml中提取中文（所有文本信息） 中文翻译英文  ok

// https://github.com/Leonidas-from-XIV/node-xml2js

'use strict';
const xml2js = require('xml2js');
const fs = require('fs');
const path = require('path');
const parseString = require('xml2js').parseString;
let filePath = path.resolve('./q');

function fileDisplay(filePath) {
  //根据文件路径读取文件，返回文件列表
  fs.readdir(filePath, function(err, files) {
    if (err) {
      console.warn(err);
    } else {
      //遍历读取到的文件列表
      files.forEach(function(filename) {
        //获取当前文件的绝对路径
        var filedir = path.join(filePath, filename);
        //根据文件路径获取文件信息，返回一个fs.Stats对象
        fs.stat(filedir, function(eror, stats) {
          if (eror) {
            console.warn('获取文件stats失败');
          } else {
            var isFile = stats.isFile(); //是文件
            var isDir = stats.isDirectory(); //是文件夹
            if (isFile && filedir.endsWith('.xml')) {
              console.log(filedir);
              function transfer(filedir) {
                fs.readFile(filedir, function(err, data) {
                  if (err) {
                    console.log(err);
                  } else {
                    let xml = data.toString('utf-8');
                    parseString(xml, { explicitArray: false }, function(
                      err,
                      result
                    ) {
                      console.dir(JSON.stringify(result));
                      // console.log(JSON.stringify(result));
                      // test
                      result.business.aaa = 'aaa';
                      let json = JSON.stringify(result);
                      fs.writeFile(
                        `./outputJSON/${filedir
                          .replace('.xml', '')
                          .replace(/\//g, '---')}.json`,
                        json,
                        function(err) {
                          if (err) {
                            console.log(err);
                          } else {
                            console.log('outputJSON ok.');
                          }
                        }
                      );
                    });
                  }
                });
              }

              transfer(filedir);
            }
            if (isDir) {
              fileDisplay(filedir); //递归，如果是文件夹，就继续遍历该文件夹下面的文件
            }
          }
        });
      });
    }
  });
}

fileDisplay(filePath);
