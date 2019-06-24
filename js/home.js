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
    const data = await response.json();
    if (data.data.movie_count > 0) {
      return data;
    }
    throw new Error('No se encontró ningún resultado');
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

    try {
      const {
        data: {
          movies: pelis
        }
      } = await getData(`${BASE_API}list_movies.json?limit=1&query_term=${data.get('name')}`);

      const HTMLString = featuringTemplate(pelis[0]);
      $featuringContainer.innerHTML = HTMLString;
    } catch(error) {
      alert(error.message);
      $loader.remove();
      $home.classList.remove('search-active');
    }
  })

  function videoItemTemplate(movie, category) {
    return (
      `<div class="primary-list-item" data-id="${movie.id}" data-category=${category}>
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
      showModal($element);
    })
  }

  function renderMovieList(list, $container, category) {
    $container.children[0].remove();
    list.forEach((movie) => {
      const HTMLString = videoItemTemplate(movie, category);
      const movieElement = createTemplate(HTMLString);
      $container.append(movieElement);
      const image = movieElement.querySelector('img');
      image.addEventListener('load', (event) => {
        event.srcElement.classList.add('fadeIn');
      })
      addEventClick(movieElement);
    })
  }

    const {
      data: {
        movies: actionList
      }
     } = await getData(`${BASE_API}list_movies.json?genre=action`);
  const $actionContainer = document.querySelector('#action');
  renderMovieList(actionList, $actionContainer, 'action');

  const {
    data: {
      movies: dramaList
    }
   } = await getData(`${BASE_API}list_movies.json?genre=drama`);
  const $dramaContainer = document.querySelector('#drama');
  renderMovieList(dramaList, $dramaContainer, 'drama');

  const {
    data: {
      movies: animationList
    }
   } = await getData(`${BASE_API}list_movies.json?genre=animation`);
  const $animationContainer = document.querySelector('#animation');
  renderMovieList(animationList, $animationContainer, 'animation');


  const $modal = document.getElementById('modal');
  const $overlay = document.getElementById('overlay');
  const $hideModal = document.getElementById('hide-modal');

  const $modalImage = $modal.querySelector('img');
  const $modalTitle = $modal.querySelector('h1');
  const $modalDescription = $modal.querySelector('p');

  function findById(list, id) {
    return list.find((movie) => {
      return movie.id === parseInt(id, 10);
    })
  }
  function findMovie(id, category) {
    switch (category) {
      case 'action' : {
        return findById(actionList, id)
      }
      case 'drama' : {
        return findById(dramaList, id)
      }
      case 'animation' : {
        return findById(animationList, id)
      }
    }
  }

  function showModal($element) {
    $overlay.classList.add('active');
    $modal.style.animation = 'modalIn .8s forwards';
    const id = $element.dataset.id;
    const category = $element.dataset.category;
    const data = findMovie(id, category);

    $modalImage.setAttribute('src', data.medium_cover_image);
    $modalTitle.textContent = data.title;
    $modalDescription.textContent = data.description_full;
  }

  $hideModal.addEventListener('click', hideModal);
  function hideModal() {
    $overlay.classList.remove('active');
    $modal.style.animation = 'modalOut .8s forwards';
  }


  async function getUser(url) {
    const response = await fetch(url);
    const data = await response.json();
    return data;
  }

  function userItemTemplate(user) {
    return (
      `
      <li>
        <a href="">
          <img class="playlist-friend-image" width="100" src="${user.picture.thumbnail}" alt="">
          <span class="playlist-friend-name">${user.name.first} ${user.name.last}</span>
        </a>
      </li>
      `
    )
  }

  function playlistItemplate(movie) {
    return (
      `
      <li>
        <a class="playlist-item" href="#">
          <span>${movie.title}</span>
        </a>
      </li>
      `
    )
  }

  function renderUserList(list, $container) {
    list.forEach((movie) => {
        const HTMLString = userItemTemplate(movie);
        const playlistElement = createTemplate(HTMLString);
        $container.append(playlistElement);
    })
  }
  
  function renderPlaylist(list, $container) {
    list.forEach((user) => {
      const HTMLString = playlistItemplate(user);
      const userElement = createTemplate(HTMLString);
      $container.append(userElement);
    })
  }

  const { results: userList } = await getUser('https://randomuser.me/api/?results=10');
  const $userContainer = document.querySelector('ul');
  renderUserList(userList, $userContainer);

  const { data: { movies: fantasyList } } = await getData(`${BASE_API}list_movies.json?genre=fantasy&limit=10`);
  $playListContainer = document.querySelector('.myPlaylist');
  renderPlaylist(fantasyList, $playListContainer);

})()