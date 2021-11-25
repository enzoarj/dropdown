var anoData = [], modalidadeData = [], valorCrecheData = [];


async function repasseChart() {
    await getRepasseData()
    await getCrecheData()

    const ctx = document.getElementById('line-chartVitoria').getContext('2d');

        const chart = new Chart(ctx, {
            type: 'line',
            data: {
                labels: anoData,
                    datasets: [
                        {
                            label: "Creche",
                            data: valorCrecheData,
                            backgroundColor:'transparent',
                            borderColor: 'rgba(82,33,143,0.6)',
                        }
                     ]
            }
        })

}

repasseChart()
function unique(value, index, self) { 
    return self.indexOf(value) === index;
}
async function getRepasseData(){
    var apiUrl = "https://amali-api.herokuapp.com/repasse/pMunicipio?municipio=vitoria_do_jari&esferaGoverno=municipal"

    var response = await fetch(apiUrl,{
        method: 'GET',
        headers: {
            'Content-type': 'application/json',
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Headers': 'Origin, X-Requested-With, Content-Type, Accept'      
            }});
    var data = await response.json();
    
    const ano = data.map((x) => x.ano)
    const anoU = ano.filter(unique) 
    anoData = anoU
}
async function getCrecheData(){
    const creche = "https://amali-api.herokuapp.com/repasse/pMunicipio?municipio=vitoria_do_jari&esferaGoverno=municipal&modalidadeEnsino=creche"

    response = await fetch(creche,{
        method: 'GET',
        headers: {
          'Content-type': 'application/json',
          'Access-Control-Allow-Origin': '*',
          'Access-Control-Allow-Headers': 'Origin, X-Requested-With, Content-Type, Accept'      
          }});
    data = await response.json();
    const valorCreche = data.map((x) => x.valorTotalEscolas)
    valorCrecheData = valorCreche
}
async function getFundamentalData(){
    apiUrl = "https://amali-api.herokuapp.com/repasse/pMunicipio?municipio=vitoria_do_jari&esferaGoverno=municipal&modalidadeEnsino=ensinoFundamental"

    response = await fetch(apiUrl,{
        method: 'GET',
        headers: {
          'Content-type': 'application/json',
          'Access-Control-Allow-Origin': '*',
          'Access-Control-Allow-Headers': 'Origin, X-Requested-With, Content-Type, Accept'      
          }});
    data = await response.json();
    const valorCreche = data.map((x) => x.valorTotalEscolas)
    valorCrecheData = valorCreche
}