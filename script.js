// spiner
const loadData = () =>{
  const url = 'https://restcountries.com/v3.1/all'
  fetch(url)
  .then(res => res.json())
  .then(data => display(data))
}
loadData()




const container = document.getElementById('country-container')

const display = (countries)=>{
  const loader = document.getElementById('preloader')


  container.textContent = ''  
  
    countries.forEach(country => {
      const div = document.createElement('div')
      div.classList.add('col')
      div.innerHTML = `
              <div class="card h-100 shadow p-4">
              <div class="row gx-0 gx-lg-1 align-items-start">
                <div class="col-md-4 col-lg-5 ">
                  <img src="${country.flags.png}" class="rounded " alt="...">
                </div>
                <div class="col-md-8 col-lg-7">
                  <div class="card-body">
                    <h5 class="text-dark fw-bold">${country.name.official}</h5>
                    <p class="card-text fw-bold pt-2">Capital: <span class="bg-warning">${country.capital ? country.capital[0] : 'No capital'}</span> </p>
                  <button type="button" class="btn btn-primary text-white px-3 py-1" data-bs-toggle="modal"
                      data-bs-target="#vehicles-modal" onclick='countryDetails("${country.cca2}")'>
                      view details
                  </button>
                    </div>
                </div>
                </div>
              </div>
          
            `
  loader.style.display = 'none'
  container.appendChild(div)
      
      
    });

    // <p class="card-text fw-bold pt-2 text-white">${country.independent === true ? `<span class="bg-success px-2">Independent Country </span>` : `<span class="bg-danger px-2">Not Idependent Country </span>`}</p>

}
/** */

function countryDetails(code){
    const url = `https://restcountries.com/v3.1/alpha/${code}`
    fetch(url)
    .then(res => res.json())
    .then(data => displayModal(data[0]))
    

}

const displayModal = (data) =>{
  
 const modalContainer = document.getElementById('country-details')
 const modalLoader = document.getElementById('preloader')
 
 
 const cur =  Object.values(data.currencies)
 const {name,symbol} = cur[0]

 const population = (data.population).toLocaleString("en-US") 
 
//  const values = data.currencies[cur].name

//  console.log(name,symbol)


  modalContainer.innerHTML = `
          <div class="modal-header">
              <h5 class="modal-title fw-bold" id="mymodalLabel">${data.name.common}</h5>
              <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
          </div>
          <div class="modal-body">
          <div class ="flag">
               <img src="${data.flags.svg}" class="img-fluid rounded" alt="...">
               </div>
            <div class="px-1 pt-4">
            <p class="card-text pt-2"><b>Capital:</b> <span class="text-muted">${data.capital ? data.capital[0] : 'No capital'}</span> </p>
               <p class="card-text"><b>Continent:</b> <span class="text-muted">${data.continents[0]}</span> </p>
               <p class="card-text"><b>Population:</b> <span class="text-muted">${population}</span> </p>
               <p class="card-text"><b>Languages:</b> <span class="text-muted">${Object.values(data.languages).toString().split(',').join(', ')}</span> </p>
               <p class="card-text"><b>Currency:</b><span class="text-muted"> (${symbol})${name}</span> </p>
               <p class="card-text"><b>Map:</b> <a class="text-primary" href=${data.maps['googleMaps']} target="_blank">click here</a></p>
               
          </div>

  `
  modalLoader.style.display = 'none'
}

const searchData = async(search)=>{
  try{
    const url = `https://restcountries.com/v3.1/name/${search}`
    const res = await fetch(url)
    const data = await res.json()
    display(data)
  }
  catch(error){
    if(search == ''){
      loadData()
    }else{

      container.innerHTML = `
      <div class="mx-auto text-danger"><h5 class="text-center">No data Found</h5></div>
        `
    }
  }
}
const searchCountry = (event) =>{
  event.preventDefault()
  const searchField = document.getElementById('search-field')
  const searchValue = searchField.value
  searchField.value = ''
  searchData(searchValue)
}
