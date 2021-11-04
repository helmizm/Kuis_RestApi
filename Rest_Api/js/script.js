const baseUrl = "https://jadwal-shalat-api.herokuapp.com/cities";
const jadwal = "https://jadwal-shalat-api.herokuapp.com/daily?date=2021-01-06&cityId=58";
const date = new Date();
const tanggal = date.getDate();
const bulan = date.getMonth();
const tahun = date.getFullYear();
const contents = document.querySelector("#content-list");
const title = document.querySelector(".card-title");

function getListKota() {
    title.innerHTML = "Daftar Kota"
    fetch(baseUrl)
        .then(response => response.json())
        .then(resJson => {
            console.log(resJson.data);
            let dafkot = "";
            resJson.data.forEach(jashol => {
                dafkot += `
                <li class="collection-item avatar">
                    <span class="title">${jashol.cityId}</span>
                    <span class="title">${jashol.cityName}</span>
                    <a href="#!" data-id = "${jashol.cityId}" class="secondary-content"><i data-id = "${jashol.cityId}" class="material-icons">info</i></a>
                </li>
                `
            });
            contents.innerHTML = '<ul class="collection">' + dafkot + '</ul>'
            const detil = document.querySelectorAll('.secondary-content');
            detil.forEach(btn=>{
                btn.onclick=(event)=>{
                    jadwalsholat(event.target.dataset.id);
                }
            })
        }).catch(err => {
            console.error(err);
        })
}

function jadwalsholat(id){
    const jadwal = "https://jadwal-shalat-api.herokuapp.com/daily?date=" + tahun + "-" + bulan +  "-" + tanggal + "&cityId=" + id;
    console.log(jadwal);
    fetch(jadwal) 
        .then(response => response.json())
        .then(resJson=> {


            contents.innerHTML = `<div class="col s12 m7">
            <div class="card horizontal">
              <div class="card-stacked">
                <div class="card-content">
                  <p>Nama Kota : ${resJson.region}</p>
                  <p>Tanggal : ${resJson.date}</p>
                  <p>Jadwal Sholat : ${resJson.data}</p>
                </div>
              </div>
            </div>
          </div>` ;
         } )  
}


function loadPage(page) {
    switch (page) {
        case "kota":
            getListKota();
            break;
    }
}

document.addEventListener('DOMContentLoaded', function () {
    var elems = document.querySelectorAll('.sidenav');
    var instances = M.Sidenav.init(elems);

    document.querySelectorAll(".sidenav a, .topnav a").forEach(elm => {
        elm.addEventListener("click", evt => {
            let sideNav = document.querySelector(".sidenav");
            M.Sidenav.getInstance(sideNav).close();
            page = evt.target.getAttribute("href").substr(1);
            loadPage(page);
        })
    })
    var page = window.location.hash.substr(1);
    if (page === "" || page === "!") page = "kota";
    loadPage(page);
});