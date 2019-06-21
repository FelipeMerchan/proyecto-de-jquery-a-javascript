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
})()