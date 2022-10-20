const ngrok = require('ngrok');
const {Client} = require('amocrm-js');

const run = async () => {
    const port = 3000;
    const client = new Client({
        domain: 'deepprinty',
        auth: {
            client_id: 'f39f39f7-c2ca-4189-8a1a-a0a08630d6a7',
            client_secret: 'iRhWi2F1rstZxoNFCoitatSdSh5AY3rgSQpEBfrD8inR31BiNZFmJMT9RLgbua97',
            server: {
                port
            }
        }
    });

    console.log('Включаю ngrok...');
    const url = await ngrok.connect(port);
    console.log('Укажите адрес в настройках интеграции AmoCRM:', url);

    client.environment.set('auth.redirect_uri', url);

    const authUrl = client.auth.getUrl();
    console.log('Перейдите по адресу для завершения авторизации', authUrl);

    try {
        const connected = await client.connection.connect();
        console.log('Статус подключения:', connected);
    } catch (e) {
        console.log('Ошибка установления соединения', e);
    }

    console.log(client.token.getValue())
    console.log('Выключаю ngrok...');
    await ngrok.kill();
};

run();
