let templateCard = document.getElementById('template-card').content;
let fragment = document.createDocumentFragment();
let items = document.getElementById('items');

const getData = async() => {
   
    let url = 'https://raw.githubusercontent.com/jennymontoya1001/endpointheroesjson/main/heroes.json';
    let respuesta = await fetch(url);
    let datos = await respuesta.json();
    let {results} = datos;
    return results;
}

const showData = async() => {

    let data = await getData();
    data.forEach(heroe => {
        let {superhero,image} = heroe;
        templateCard.querySelector('h5').textContent = superhero;
        templateCard.querySelector('img').setAttribute('src',image);
        const clone = templateCard.cloneNode(true);
        fragment.appendChild(clone);    
    });
     
    items.appendChild(fragment);
}

document.addEventListener('DOMContentLoaded', showData)


let boton = document.getElementById('btnBuscar');

boton.addEventListener('click', async() => {

    let texto = document.getElementById('inputBuscar').value;

    let data = await getData();
    let busqueda = data.filter(hero => hero.superhero.toLowerCase() ===  texto.toLowerCase())
    busqueda.forEach(heroe => {
        let {superhero,image} = heroe;
        templateCard.querySelector('h5').textContent = superhero;
        templateCard.querySelector('img').setAttribute('src',image);
        const clone = templateCard.cloneNode(true);
        fragment.appendChild(clone);    
    });
    items.innerHTML = "";
    items.appendChild(fragment);
})