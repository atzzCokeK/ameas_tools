// node genPrefectureJSON.js　でprefecture.jsonを作成
// ライブラリの使用
const jp = require("jp-prefecture")

const fs = require('fs')
//　ここにStrの都道府県を貼り付ける。
const prefectures = ["福井県", "愛知県", "滋賀県"];
// Gummaは注意s
// hukuiは注意

for (i = 0, convertedPrefectures = []; i < prefectures.length; i++) {
  convertedPrefectures.push(jp.prefConvert(prefectures[i], "en"))
}

console.log(convertedPrefectures)
let outputJson = [];
let targetedPrefecture = ''

const defaultJson = (targetedPrefecture) => {
  return {
    "keyValue": {
      "partitionId": {
        "projectId": "cb-app-stg"
      },
      "path": [{
        "kind": "Prefecture",
        "name": targetedPrefecture
      }]
    }
  }
};

const genJson = (convertedPrefectures) => {
  for (i = 0; i < convertedPrefectures.length; i++) {
    targetedPrefecture = convertedPrefectures[i];
    outputJson.push(defaultJson(targetedPrefecture));
  }
  finalJson = {
    "values": outputJson
  }
}

genJson(convertedPrefectures);

const fileName = 'prefectures.json'
fs.writeFile(`/Users/kawamura/Desktop/AeMas/devForAemas/${fileName}`, JSON.stringify(finalJson), (err) => {
  if (err) console.log(`error!::${err}`);
})