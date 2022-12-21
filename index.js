const personagensContador = document.getElementById("personagens");
const luasContador = document.getElementById("luas");
const planetasContador = document.getElementById("planetas");
const navesContador = document.getElementById("naves");

const preencherContadores = () => {
  Promise.all([
    swapiGet("people/"),
    swapiGet("vehicles/"),
    swapiGet("planets/"),
    swapiGet("starships/"),
  ]).then(function (results) {
    personagensContador.innerHTML = results[0].data.count;
    luasContador.innerHTML = results[1].data.count;
    planetasContador.innerHTML = results[2].data.count;
    navesContador.innerHTML = results[3].data.count;
  });
};

const swapiGet = (param) => {
  return axios.get(`https://swapi.dev/api/${param}`);
};

const preencherTabela = async () => {
  const response = await swapiGet("films/");
  const tableData = response.data.results;
  console.log(tableData);
  tableData.forEach((film) => {
    $("#filmsTable").append(`<tr>
    <td>${film.title}</td>
    <td>${moment(film.release_date).format("DD/MM/YYYY")}</td>
    <td>${film.director}</td>
    <td>${film.episode_id}</td>
    </tr>`);
  });
};

google.charts.load("current", { packages: ["corechart"] });
google.charts.setOnLoadCallback(desenharGrafico);

async function desenharGrafico() {
    const response = await swapiGet('vehicles/');
    const vehiclesArray = response.data.results;

    const dataArray = [];
    dataArray.push(['Veiculos', 'Passageiros']);
    vehiclesArray.forEach(vehicle => {
        dataArray.push([vehicle.name, Number(vehicle.passengers)]);
    });

  const data = google.visualization.arrayToDataTable(dataArray);

  const options = {
    title: "Maiores Veículos",
    legend: "none"
  };

  const chart = new google.visualization.PieChart(
    document.getElementById("piechart")
  );

  chart.draw(data, options);
}

swapiGet("people/1/");
preencherContadores();
preencherTabela();
