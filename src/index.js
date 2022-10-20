import express from 'express'
import {Client} from 'amocrm-js'
import fs from 'fs'
import cors from 'cors'
import bodyParser from 'body-parser'
import * as path from "path";
import { dirname } from 'path';

const app = express();
const port = 5002;


app.use(bodyParser());
app.use(cors())
const crm = new Client({
    // логин пользователя в портале, где адрес портала domain.amocrm.ru
    domain: 'deepprinty', // может быть указан полный домен вида domain.amocrm.ru, domain.amocrm.com
    auth: {
        client_id: 'f39f39f7-c2ca-4189-8a1a-a0a08630d6a7', // ID интеграции
        client_secret: 'iRhWi2F1rstZxoNFCoitatSdSh5AY3rgSQpEBfrD8inR31BiNZFmJMT9RLgbua97', // Секретный ключ
    },
});

// const filePath = path.resolve(dirname, './token.json');

crm.token.on('change', () => {
    const token = crm.token.getValue();
    fs.writeFileSync('./token.json', JSON.stringify(token));
});

const json = fs.readFileSync('./token.json').toString();
const currentToken = JSON.parse(json);
crm.token.setValue(currentToken);

app.post('/pick-up', async ({body}, response) => {
    try {
        await crm.leads.create([
            {
                name: "Вид услуги: забор",
                custom_fields_values: [
                    {
                        "field_id": 1066695,
                        "values": [{"value": body.from}]
                    },
                    {
                        "field_id": 1066697,
                        "values": [{"value": body.type}]
                    },
                    {
                        "field_id": 1066699,
                        "values": [{"value": body.pickUpDate}]
                    },
                    {
                        "field_id": 1066701,
                        "values": [{"value": body.orderNumber}]
                    },
                    {
                        "field_id": 1066703,
                        "values": [{"value": body.withContract}]
                    },
                    {
                        "field_id": 1066705,
                        "values": [{"value": body?.companyName}]
                    },
                    {
                        "field_id": 1066707,
                        "values": [{"value": body?.fromLastName}]
                    },
                    {
                        "field_id": 1066709,
                        "values": [{"value":  body?.fromFirstName}]
                    },
                    {
                        "field_id": 1066711,
                        "values": [{"value": body?.fromPhone}]
                    },
                    {
                        "field_id": 1066713,
                        "values": [{"value": body?.fromExtraPhone}]
                    },
                    {
                        "field_id": 1066715,
                        "values": [{"value": body?.fromAddress}]
                    },
                    {
                        "field_id": 1066717,
                        "values": [{"value": body?.fromExtraAddress}]
                    },
                    {
                        "field_id": 1066719,
                        "values": [{"value": body?.fromPickUpTimeMin}]
                    },
                    {
                        "field_id": 1066721,
                        "values": [{"value": body?.fromPickUpTimeMax}]
                    },
                    {
                        "field_id": 1066723,
                        "values": [{"value": body?.fromCompanyName}]
                    },
                    {
                        "field_id": 1066725,
                        "values": [{"value": body?.fromDocuments}]
                    },
                    {
                        "field_id": 1066727,
                        "values": [{"value": body?.nature}]
                    },
                    {
                        "field_id": 1066729,
                        "values": [{"value": body?.natureDescription}]
                    },
                    {
                        "field_id": 1066731,
                        "values": [{"value": body?.needPass}]
                    },
                    {
                        "field_id": 1066733,
                        "values": [{"value": body?.call}]
                    },
                    {
                        "field_id": 1066735,
                        "values": [{"value": body?.to}]
                    },
                    {
                        "field_id": 1066737,
                        "values": [{"value": body?.toLastName}]
                    },
                    {
                        "field_id": 1066739,
                        "values": [{"value": body?.toFirstName}]
                    },
                    {
                        "field_id": 1066741,
                        "values": [{"value": body?.toPhone}]
                    },
                    {
                        "field_id": 1066743,
                        "values": [{"value": body?.toExtraPhone}]
                    },
                    {
                        "field_id": 1066745,
                        "values": [{"value": body?.toAddress}]
                    },
                    {
                        "field_id": 1066747,
                        "values": [{"value": body?.toExtraAddress}]
                    },
                    {
                        "field_id": 1066749,
                        "values": [{"value": body?.toPickUpTimeMin}]
                    },
                    {
                        "field_id": 1066751,
                        "values": [{"value": body?.toPickUpTimeMax}]
                    },
                    {
                        "field_id": 1066753,
                        "values": [{"value": body?.toCompanyName}]
                    },
                    {
                        "field_id": 1066755,
                        "values": [{"value": body?.toDocuments}]
                    },
                ]
            }
        ]);
        response.send('ok')
    } catch (e) {
        console.log(e)
    }
});

app.post('/delivery', async ({body}, response) => {
    try {
        await crm.leads.create([
            {
                name: "Вид услуги: доставка",
                custom_fields_values: [
                    {
                        "field_id": 1066757,
                        "values": [{"value": body.to}]
                    },
                    {
                        "field_id": 1066759,
                        "values": [{"value": body.type}]
                    },
                    {
                        "field_id": 1066761,
                        "values": [{"value": body.appNumber}]
                    },
                    {
                        "field_id": 1066763,
                        "values": [{"value": body.date}]
                    },
                    {
                        "field_id": 1066765,
                        "values": [{"value": body.ready}]
                    },
                    {
                        "field_id": 1066767,
                        "values": [{"value": body?.fromLastName}]
                    },
                    {
                        "field_id": 1066769,
                        "values": [{"value": body?.fromFirstName}]
                    },
                    {
                        "field_id": 1066771,
                        "values": [{"value":  body?.fromPhone}]
                    },
                    {
                        "field_id": 1066773,
                        "values": [{"value": body?.fromExtraPhone}]
                    },
                    {
                        "field_id": 1066775,
                        "values": [{"value": body?.fromAddress}]
                    },
                    {
                        "field_id": 1066777,
                        "values": [{"value": body?.fromExtraAddress}]
                    },
                    {
                        "field_id": 1066779,
                        "values": [{"value": body?.fromPickUpTimeMin}]
                    },
                    {
                        "field_id": 1066781,
                        "values": [{"value": body?.fromPickUpTimeMax}]
                    },
                    {
                        "field_id": 1066783,
                        "values": [{"value": body?.fromCompanyName}]
                    },
                    {
                        "field_id": 1066785,
                        "values": [{"value": body?.fromDocuments}]
                    },
                    {
                        "field_id": 1066787,
                        "values": [{"value": body?.nature}]
                    },
                    {
                        "field_id": 1066789,
                        "values": [{"value": body?.natureDescription}]
                    },
                    {
                        "field_id": 1066791,
                        "values": [{"value": body?.needPass}]
                    },
                    {
                        "field_id": 1066793,
                        "values": [{"value": body?.call}]
                    },

                    {
                        "field_id": 1066795,
                        "values": [{"value": body?.toLastName}]
                    },
                    {
                        "field_id": 1066797,
                        "values": [{"value": body?.toFirstName}]
                    },
                    {
                        "field_id": 1066799,
                        "values": [{"value": body?.toPhone}]
                    },
                    {
                        "field_id": 1066801,
                        "values": [{"value": body?.toExtraPhone}]
                    },
                    {
                        "field_id": 1066803,
                        "values": [{"value": body?.toAddress}]
                    },
                    {
                        "field_id": 1066807,
                        "values": [{"value": body?.toExtraAddress}]
                    },
                    {
                        "field_id": 1066749,
                        "values": [{"value": body?.toPickUpTimeMin}]
                    },
                    {
                        "field_id": 1066809,
                        "values": [{"value": body?.toPickUpTimeMax}]
                    },
                    {
                        "field_id": 1066811,
                        "values": [{"value": body?.toCompanyName}]
                    },
                    {
                        "field_id": 1066813,
                        "values": [{"value": body?.toDocuments}]
                    },
                ]
            }
        ]);
        response.send('ok')
    } catch (e) {
        console.log(e)
    }
});

app.listen(port, () => console.log(`Running on port ${port}`));
