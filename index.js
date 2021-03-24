const personagensContador = document.getElementById("personagens");
const luasContador = document.getElementById("luas");
const planetasContador = document.getElementById("planetas");
const navesContador = document.getElementById("naves");

preencherContadores();
preencherTabela();

google.charts.load("current", { packages: ["corechart"] });
google.charts.setOnLoadCallback(desenharGrafico);

async function desenharGrafico() {
  const response = await swapiGet("vehicles/");
  const vehiclesArray = response.data.results;
  console.log(vehiclesArray);

  const dataArray = [];
  dataArray.push(["Veículo", "Passageiros"]);
  vehiclesArray.forEach((vehicle) => {
    dataArray.push([vehicle.name, Number(vehicle.passengers)]);
  });

  var data = google.visualization.arrayToDataTable(dataArray);

  var options = {
    title: "Maiores veículos"
  };

  var chart = new google.visualization.PieChart(
    document.getElementById("piechart")
  );

  chart.draw(data, options);
}

async function preencherTabela() {
  const response = await swapiGet("films/");
  console.log(response);
  const tableData = response.data.results;
  tableData.forEach((film) => {
    $("#filmsTable").append(`<tr>
  <td>${film.title}</td>
  <td>${film.release_date}</td>
  <td>${film.director}</td>
  <td>${film.episode_id}</td>
  </tr>`);
  });
}

function preencherContadores() {
  //personagensContador.innerHTML = swapiGet("people/").data.count;
  Promise.all([
    swapiGet("people/"),
    swapiGet("vehicles/"),
    swapiGet("planets/"),
    swapiGet("starships/")
  ]).then(function (results) {
    personagensContador.innerHTML = results[0].data.count;
    luasContador.innerHTML = results[1].data.count;
    planetasContador.innerHTML = results[2].data.count;
    navesContador.innerHTML = results[3].data.count;
  });
}

function swapiGet(params) {
  return axios.get(`https://swapi.dev/api/${params}`);
}
