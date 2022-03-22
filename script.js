const countries = document.querySelector(".countries-container")
const dropDown = document.querySelector(".dropdown")
const regions = document.querySelector(".regions")
const region = document.querySelectorAll(".region")
const searchInput = document.querySelector(".search")
const toggleMode = document.querySelector(".toggle-mode")
const moonIcon = document.querySelector(".moon-icon")

async function getCountriesData() {
    const url = await fetch("https://restcountries.com/v2/all")
    const res = await url.json()
    res.forEach(element => {
        showCountries(element)
        // console.log(element.borders)
    });
}

function showCountries(data) {
    const country = document.createElement("div")
    country.setAttribute("id", `${data.region}-region`)
    country.classList.add("country")
    country.innerHTML = `<div class="country-card">
                                <div class="country-image">
                                    <img src="${data.flag}" alt="">
                                </div>
                                <div class="country-info">
                                    <h3 class="country-name">${data.name}</h3>
                                    <p><strong>Population:</strong> ${data.population}</p>
                                    <p class="region-name"><strong>Region:</strong> ${data.region}</p>
                                    <p><strong>Capital:</strong> ${data.capital}</p>
                                </div>
                           </div>`

    countries.appendChild(country)
    country.addEventListener("click", () => {
        showDetails(data)
    })
}

dropDown.addEventListener("click", () => {
    regions.classList.toggle("showdropdown")
})

const regionName = document.getElementsByClassName("region-name")

region.forEach( element => {
    element.addEventListener("click", () => {
        // console.log(element.dataset.region)
        // let id = element.dataset.id
        // console.log(id)
        Array.from(regionName).forEach( el => {
            // console.log(el.parentElement.parentElement)
            if(el.innerText.includes(element.innerText)) {
                // el.parentElement.parentElement.style.display = "grid"
                // document.getElementById(id).style.display = "grid"
                el.parentElement.parentElement.parentElement.style.display = ""
            } else {
                // document.getElementById(id).style.display = "none"
                el.parentElement.parentElement.parentElement.style.display = "none"
                // element.dataset.id
            }
        })
    })
})

const countryName = document.getElementsByClassName("country-name")

searchInput.addEventListener("input", () => {
    let filterValue = searchInput.value.toLowerCase()
    Array.from(countryName).forEach( el => {
        if(el.innerText.toLowerCase().includes(filterValue)) {
            el.parentElement.parentElement.parentElement.style.display = ""
        } else {
            el.parentElement.parentElement.parentElement.style.display = "none"
        }
    })
})




const modalContainer = document.querySelector(".modal-container")

function showDetails(data) {
    modalContainer.classList.toggle("show-modal")
    document.body.classList.add("modal-bg-bg")
    modalContainer.innerHTML = `<button class="back"><i class="fa-solid fa-arrow-left-long"></i>   Back</button>
                                    <div class="modal">
                                        <div class="flag-modal">
                                            <img src="${data.flag}" alt="">
                                        </div>
                                        <div class="info-modal">
                                            <h1>${data.name}</h1>

                                            <div class="modal-info">
                                                <div class="modal-info-left">
                                                    <p><strong>Native Name:</strong> ${data.nativeName}</p>
                                                    <p><strong>Population:</strong> ${data.population}</p>
                                                    <p><strong>Region:</strong> ${data.region}</p>
                                                    <p><strong>Sub Region:</strong> ${data.subregion}</p>
                                                    <p><strong>Capital:</strong> ${data.capital}</p>
                                                </div>
                                                
                                                <div class="modal-info-left">
                                                    <p><strong>Top Level Domain:</strong> ${data.topLevelDomain.map( tld => tld)}</p>
                                                    <p><strong>Currencies:</strong> ${data.currencies.map( currency => currency.name)}</p>
                                                    <p><strong>Languages:</strong> ${data.languages.map( language => language.name )}</p>
                                                </div>
                                            </div>

                                            <div class="border-countries">
                                                <p><strong>Border Countries:</strong></p>
                                                <ul class="bc-card">${data.borders.map(border => `<li class="bc-card-list" data-code="${border}">${border}</li>`).join('')}</ul>
                                            </div>

                                        </div>
                                    </div>`


    // console.log(data.borders)
    const bcCard = document.querySelector(".bc-card")
    // console.log(data.borders)
    if(data.borders == "undefined") {
        console.log("found")
        // bcCard.innerHTML = `<li class="bc-card-list"> No Borders </li>`
    }

    const borderlist = bcCard.childNodes

    borderlist.forEach( bl => {
        bl.addEventListener("click", () => {
            // get individual country by code
            const dataCode = bl.getAttribute("data-code");
            const request = new XMLHttpRequest();
            // const urldata = `https://restcountries.com/v2/alpha/${dataCode}`;
            request.open("GET", `https://restcountries.com/v2/alpha/${dataCode}`);
            request.send();
            request.addEventListener("load", function() {
                const dataPar = JSON.parse(this.responseText)
                // console.log(dataPar);
                modalContainer.innerHTML = `<button class="back backs"><i class="fa-solid fa-arrow-left-long"></i>   Back</button>
                <div class="modal">
                    <div class="flag-modal">
                        <img src="${dataPar.flag}" alt="">
                    </div>
                    <div class="info-modal">
                        <h1>${dataPar.name}</h1>

                        <div class="modal-info">
                            <div class="modal-info-left">
                                <p><strong>Native Name:</strong> ${dataPar.nativeName}</p>
                                <p><strong>Population:</strong> ${dataPar.population}</p>
                                <p><strong>Region:</strong> ${dataPar.region}</p>
                                <p><strong>Sub Region:</strong> ${dataPar.subregion}</p>
                                <p><strong>Capital:</strong> ${dataPar.capital}</p>
                            </div>
                            
                            <div class="modal-info-left">
                                <p><strong>Top Level Domain:</strong> ${dataPar.topLevelDomain.map( tld => tld)}</p>
                                <p><strong>Currencies:</strong> ${dataPar.currencies.map( currency => currency.name)}</p>
                                <p><strong>Languages:</strong> ${dataPar.languages.map( language => language.name )}</p>
                            </div>
                        </div>

                        <div class="border-countries">
                            <p><strong>Border Countries:</strong></p>
                            <ul class="bc-card">${dataPar.borders.map(border => `<li class="bc-card-list" data-code="${border}">${border}</li>`).join('')}</ul>
                        </div>

                    </div>
                </div>`
                const back = document.querySelector(".back")
                back.addEventListener("click", () => {
                    modalContainer.classList.toggle("show-modal")
                    document.body.classList.remove("modal-bg-bg")
                })
            })
        })    
    })

    
    const back = document.querySelector(".back")
    back.addEventListener("click", () => {
        modalContainer.classList.toggle("show-modal")
        document.body.classList.remove("modal-bg-bg")
    })
}

toggleMode.addEventListener("click", ()=> {
    document.body.classList.toggle("dark")
    modalContainer.classList.toggle("modal-dark")
    regions.classList.toggle("regionsBg")
    moonIcon.classList.toggle("fas")
})
getCountriesData()


// if (data.borders == 'undefined') {
//     bcCard.innerHTML = `<li>No border</li>`
// }