import fetch from 'node-fetch';
import fs from "fs";

async function database() {
    var resp = await fetch("https://digital.sfasu.edu/digital/api/search/collection/RSP/maxRecords/30", {
        "headers": {
            "accept": "*/*",
            "accept-language": "en-US",
            "content-type": "application/json",
            "if-none-match": "\"08ab7f579d0aa5cec5917448c1530ed38--gzip\"",
            "sec-ch-ua": "\"Chromium\";v=\"110\", \"Not A(Brand\";v=\"24\", \"Google Chrome\";v=\"110\"",
            "sec-ch-ua-mobile": "?0",
            "sec-ch-ua-platform": "\"Windows\"",
            "sec-fetch-dest": "empty",
            "sec-fetch-mode": "cors",
            "sec-fetch-site": "same-origin",
            "cookie": "_ga=GA1.2.27941355.1674573533; JSESSIONID=YmQwNTkwMjYtMWRiZS00OGY5LWFkZmEtYTgxZmY0M2U2NzZi; _gid=GA1.2.599028219.1677005060; PHPSESSID=4e4992425ea5b4978776fcda40660181; _gat=1",
            "Referer": "https://digital.sfasu.edu/digital/collection/RSP/search",
            "Referrer-Policy": "strict-origin-when-cross-origin"
        },
        "body": null,
        "method": "GET"
    });
    return resp.json()
}


async function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}


async function main() {
    try {

        var resp = await database();
        console.log(resp)

        await sleep(1000)
    } catch (e) {
        console.log(e)
        await sleep(5000).then(console.log("sleeping 5 sec, error."))

    }



}

main()