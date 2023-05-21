const axios = require('axios');
const cheerio = require('cheerio');

const getRandomProxy = async () => {
    const url = 'https://free-proxy-list.net/';
    const headers = {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/58.0.3029.110 Safari/537.36'
    };

    try {
        const { data } = await axios.get(url, { headers });
        const $ = cheerio.load(data);
        const proxies = [];
        $('tbody tr').each((i, element) => {
            const ip = $(element).children().first().text();
            const port = $(element).children().first().next().text();
            proxies.push({ ip, port });
        });
        const randomProxy = proxies[Math.floor(Math.random() * proxies.length)];
        console.log(`Random proxy: ${randomProxy.ip}:${randomProxy.port}`);
    } catch (error) {
        console.log(`Error: ${error.message}`);
    }
};

getRandomProxy();
