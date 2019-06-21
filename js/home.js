fetch('https://randomuser.me/api/sdf')
  .then(function (response){
    return response.json()
  })
  .then(function (user) {
    console.log('user', user.results[0].name.first)
  })
  .catch(function () {
    console.log('algo salió mal')
  })