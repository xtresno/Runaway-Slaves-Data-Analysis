import fetch from 'node-fetch';
import fs from "fs";
import XlsxPopulate from 'xlsx-populate';


// 3017
async function database() {
    var resp = await fetch("https://digital.sfasu.edu/digital/api/search/collection/RSP/maxRecords/3017", {
        "headers": {
            "accept": "*/*",
            "accept-language": "en-US",
            "if-none-match": "\"0a10701fb748b3d03ed199c5b4ae7748b--gzip\"",
            "sec-ch-ua": "\"Chromium\";v=\"110\", \"Not A(Brand\";v=\"24\", \"Google Chrome\";v=\"110\"",
            "sec-ch-ua-mobile": "?0",
            "sec-ch-ua-platform": "\"Windows\"",
            "sec-fetch-dest": "empty",
            "sec-fetch-mode": "cors",
            "sec-fetch-site": "same-origin",
            "cookie": "_ga=GA1.2.27941355.1674573533; JSESSIONID=NTAxOWMxOWQtOGRjNy00ZjQzLWI0MzEtMDE4MzNmNmY5YjVl; _gid=GA1.2.424579397.1677167339; PHPSESSID=822ec39585b12422901c822f8f411cf3; _gat=1",
            "Referer": "https://digital.sfasu.edu/digital/collection/RSP/id/555/rec/1",
            "Referrer-Policy": "strict-origin-when-cross-origin"
        },
        "body": null,
        "method": "GET"
    });
    return resp.json()
}

async function main() {
    try {
        var resp = await database();
        var workbook = await XlsxPopulate.fromBlankAsync();
        var sheet = workbook.sheet(0);
        sheet.cell("A1").value("Iteration");
        sheet.cell("B1").value("Name");
        sheet.cell("C1").value("Age");
        sheet.cell("D1").value("Gender");
        sheet.cell("E1").value("Weight");
        sheet.cell("F1").value("Height");
        sheet.cell("G1").value("Complexion");
        sheet.cell("H1").value("Reward");
        sheet.cell("I1").value("Date");
        sheet.cell("J1").value("Document Location");

        var row = 2;

        if (resp.items) { // Check if resp.items is defined
            var iter = 1

            for (let i = 0; i < resp.items.length; i++) {
                var id = resp.items[i].itemId;
                var title = resp.items[i].title;
                var record_response = await requestRecord(id)

                iter++
                console.log(iter, id)

                // console.log(record_response)
                if (record_response) {

                    var name = "";
                    var age = "";
                    var gender = "";
                    var weight = "";
                    var height = "";
                    var complexion = "";
                    var reward = "";
                    var date = "";
                    var newspaper_location = "";

                    // console.log(record_response)

                    // console.log(record_response.fields.length)

                    // if (!record_response.fields.length === undefined) {



                    try {
                        for (let j = 0; j < record_response.fields.length; j++) {
                            var key_field = record_response.fields[j].key;
                            if (key_field == "age") {
                                age = record_response.fields[j].value;
                            } else if (key_field == "sex") {
                                gender = record_response.fields[j].value;
                            } else if (key_field == "runawa") {
                                name = record_response.fields[j].value;
                            } else if (key_field == "weight") {
                                weight = record_response.fields[j].value;
                            } else if (key_field == "height") {
                                height = record_response.fields[j].value;
                            } else if (key_field == "comple") {
                                complexion = record_response.fields[j].value;
                            } else if (key_field == "date") {
                                date = record_response.fields[j].value;
                            } else if (key_field == "reward") {
                                reward = record_response.fields[j].value;
                            } else if (key_field == "newspa") {
                                newspaper_location = record_response.fields[j].value;
                            }


                        }
                    } catch (e) {
                        console.log(e)
                        continue;
                    }

                    sheet.cell(row, 1).value(i + 1);
                    sheet.cell(row, 2).value(name);
                    sheet.cell(row, 3).value(age);
                    sheet.cell(row, 4).value(gender);
                    sheet.cell(row, 5).value(weight);
                    sheet.cell(row, 6).value(height);
                    sheet.cell(row, 7).value(complexion);
                    sheet.cell(row, 8).value(reward);
                    sheet.cell(row, 9).value(date);
                    sheet.cell(row, 10).value(newspaper_location);

                    row++;
                    // }

                }
            }

        } else {
            console.log("resp.items is undefined")
        }

        await workbook.toFileAsync("output.xlsx");
    } catch (e) {
        console.error(e); // log the error to the console
        await sleep(5000).then(console.log("sleeping 5 sec, error."))
    }
}

main()

async function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

async function requestRecord(id) {
    var resp = await fetch(`https://digital.sfasu.edu/digital/api/collections/RSP/items/${id}/false`, {
        "headers": {
            "accept": "*/*",
            "accept-language": "en-US",
            "sec-ch-ua": "\"Chromium\";v=\"110\", \"Not A(Brand\";v=\"24\", \"Google Chrome\";v=\"110\"",
            "sec-ch-ua-mobile": "?0",
            "sec-ch-ua-platform": "\"Windows\"",
            "sec-fetch-dest": "empty",
            "sec-fetch-mode": "cors",
            "sec-fetch-site": "same-origin",
            "cookie": "_ga=GA1.2.1673912556.1677167813; JSESSIONID=MWFmNmM4ODQtNzFhYi00ZmM3LTkzODctZTdkNjFhNmQxNWJi; _gid=GA1.2.1595317800.1678373901; PHPSESSID=2b4b2d9078f04c86b2cc1358a7c15c34; _gat=1",
            "Referrer-Policy": "strict-origin-when-cross-origin"
        },
        "body": null,
        "method": "GET"
    });
    return resp.json();
}

