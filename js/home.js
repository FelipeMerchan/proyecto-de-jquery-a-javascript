/* fetch('https://randomuser.me/api/sdf')
  .then(function (response){
    return response.json()
  })
  .then(function (user) {
    console.log('user', user.results[0].name.first)
  })
  .catch(function () {
    console.log('algo salió mal')
  }); */


(async function load() {
  async function getData(url) {
    const response = await fetch(url);
    const data = await response.json()
    return data;
  }

  const $form = document.querySelector('#form');
  const $home = document.querySelector('#home');
  const $featuringContainer = document.querySelector('#featuring');

  function setAttributes($element, attributes) {
    for (const attribute in attributes)
    {
      $element.setAttribute(attribute, attributes[attribute]);
    }
  }

  const BASE_API = 'https://yts.lt/api/v2/';

  function featuringTemplate(peli) {
    return (
      `
      <figure>
        <img src="${peli.medium_cover_image}" width="200" alt="">
      </figure>
      <div class="featuring-description">
        <p>Película encontrada</p>
        <p>${peli.title}</p>
      </div>
      `
    )
  }

  $form.addEventListener('submit', async (event) => {
    event.preventDefault();
    $home.classList.add('search-active');
    const $loader = document.createElement('img');
    setAttributes($loader, {
      src: 'images/loader.gif',
      width: 50,
      heigth: 50,
    })
    $featuringContainer.append($loader);
    $loader.classList.add('featuring-loader');
    const data = new FormData($form);
    const peli = await getData(`${BASE_API}list_movies.json?limit=1&query_term=${data.get('name')}`);
    const HTMLString = featuringTemplate(peli.data.movies[0]);
    $featuringContainer.innerHTML = HTMLString;
  })

  const actionList = await getData(`${BASE_API}list_movies.json?genre=action`);
  const dramaList = await getData(`${BASE_API}list_movies.json?genre=drama`);
  const animationList = await getData(`${BASE_API}list_movies.json?genre=animation`);

  function videoItemTemplate(movie) {
    return (
      `<div class="primary-list-item">
        <figure>
          <img src="${movie.medium_cover_image}" alt="">
        </figure>
        <h4 class="primary-list-movie"> ${movie.title}</h4>
      </div>`
    )
  }

  function createTemplate(HTMLString) {
    const html = document.implementation.createHTMLDocument();
    html.body.innerHTML = HTMLString;
    return html.body.children[0];
  }

  function addEventClick($element){
    $element.addEventListener('click', () => {
      showModal();
    })
  }

  function renderMovieList(list, $container) {
    $container.children[0].remove();
    list.forEach((movie) => {
      const HTMLString = videoItemTemplate(movie);
      const movieElement = createTemplate(HTMLString);
      $container.append(movieElement);
      addEventClick(movieElement);
    })
  }

  const $actionContainer = document.querySelector('#action');
  renderMovieList(actionList.data.movies, $actionContainer);

  const $dramaContainer = document.querySelector('#drama');
  renderMovieList(dramaList.data.movies, $dramaContainer);

  const $animationContainer = document.querySelector('#animation');
  renderMovieList(animationList.data.movies, $animationContainer);


  const $modal = document.getElementById('modal');
  const $overlay = document.getElementById('overlay');
  const $hideModal = document.getElementById('hide-modal');

  const $modalImage = $modal.querySelector('img');
  const $modalTitle = $modal.querySelector('h1');
  const $modalDescription = $modal.querySelector('p');

  function showModal() {
    $overlay.classList.add('active');
    $modal.style.animation = 'modalIn .8s forwards';
  }

  $hideModal.addEventListener('click', hideModal);
  function hideModal() {
    $overlay.classList.remove('active');
    $modal.style.animation = 'modalOut .8s forwards';
  }

})()