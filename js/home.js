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
  $form.addEventListener('submit', (event) => {
    event.preventDefault();
  })

  const actionList = await getData('https://yts.lt/api/v2/list_movies.json?genre=action');
  const dramaList = await getData('https://yts.lt/api/v2/list_movies.json?genre=drama');
  const animationList = await getData('https://yts.lt/api/v2/list_movies.json?genre=animation');

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

  function createTemplate(HTMLString){
    const html = document.implementation.createHTMLDocument();
    html.body.innerHTML = HTMLString;
    return html.body.children[0];
  }

  function addEventClick($element){
    $element.addEventListener('click', () => {

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

  const $featuringContainer = document.querySelector('#featuring');
  const $home = document.querySelector('#home');

  const $modal = document.getElementById('modal');
  const $overlay = document.getElementById('overlay');
  const $hideModal = document.getElementById('hide-modal');

  const $modalImage = $modal.querySelector('img');
  const $modalTitle = $modal.querySelector('h1');
  const $modalDescription = $modal.querySelector('p');

})()