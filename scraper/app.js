const fetch = require('node-fetch'); 
const cheerio = require('cheerio'); 

const url = 'https://dragonballpedia.fandom.com/pt/wiki/Lista_de_Episódios_Dragon_Ball_Z';

async function fetchData() {
    try {
       
        const response = await fetch(url);
        const html = await response.text();
        const $ = cheerio.load(html);

        const episodios = [];

       
        $('table.article-table tbody tr').each(function () {
           
            const episodioInfo = $(this).find('th').text().trim();

       
            const [numeroEpisodio, nomeEpisodio] = episodioInfo.split('-').map(texto => texto);

          
            if (numeroEpisodio && nomeEpisodio) {
                episodios.push({
                    numeroEpisodio,
                    nomeEpisodio
                });
            }
        });

        // Exibe os dados no console
        console.log(episodios);
    } catch (error) {
        console.error('Erro ao buscar dados:', error);
    }
}

// Executa a função
fetchData();