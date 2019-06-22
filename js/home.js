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
  const actionList = await getData('https://yts.lt/api/v2/list_movies.json?genre=action');
  const dramaList = await getData('https://yts.lt/api/v2/list_movies.json?genre=drama');
  const animationList = await getData('https://yts.lt/api/v2/list_movies.json?genre=animation');
  console.log(actionList, dramaList, animationList);

  function videoItemTemplate(movie) {
    return (
      `<div class="primary-list-item">
        <figure>
          <img src="${movie.medium_cover_image}" alt="">
        </figure>
        <p class="primary-list-movie"> ${movie.title}</p>
      </div>`
    )
  }

  actionList.data.movies.forEach((movie) => {
    const HTMLString = videoItemTemplate(movie);
    console.log(HTMLString);
  })

  const $accionContainer = document.querySelector('#action');
  const $dramaContainer = document.querySelector('#drama');
  const $animationContainer = document.querySelector('#animation');

  const $featuringContainer = document.querySelector('#featuring');
  const $form = document.querySelector('#form');
  const $home = document.querySelector('#home');

  const $modal = document.getElementById('modal');
  const $overlay = document.getElementById('overlay');
  const $hideModal = document.getElementById('hide-modal');

  const $modalImage = $modal.querySelector('img');
  const $modalTitle = $modal.querySelector('h1');
  const $modalDescription = $modal.querySelector('p');

})()