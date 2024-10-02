const lib = require('./lib');

function makeRequest(url, data) {
    // 요청을 보내기
    lib.reqeust.send(url, data); // 데이터 보내기

    // 데이터 return
    return lib.response.read(); // 데이터 읽기
}

const responseData = makeRequest('https://www.google.com', 'data');
console.log(responseData); // decrypted data