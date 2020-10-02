

$(document).ready(function(){
  if(localStorage.access_token){
    afterLogin()
  }else{
    beforeLogin()
  }
})


$("#btn-register").click(function(){
  $("#registration-form").show()
  $("#login-form").hide()
})

$("#btn-login").click(function(){
  $("#registration-form").hide()
  $("#login-form").show()
  
})

$("#btn-myList").click(function(){
  fetchFoodList()
  $("#myList").show()
  $("#afterLogin").hide()
})

$("#btn-home").click(function(){
  $("#myList").hide()
  $("#afterLogin").show()
})

function signOutGoogle() {
  var auth2 = gapi.auth2.getAuthInstance();
  auth2.signOut().then(function () {
    console.log('User signed out.');
  });
}


$("#btn-logout").click(function(){
  localStorage.removeItem('access_token')
  localStorage.removeItem('userId')
  signOutGoogle()
  beforeLogin()
})

function onSignIn(googleUser) {
  console.log('masukgooglelogin2')

  var id_token = googleUser.getAuthResponse().id_token;
    $.ajax({
      method:'POST',
      url:'http://localhost:3000/googlelogin',
      headers:{
        google_access_token:id_token
      }
    })
    .then(result=>{
      localStorage.setItem('userId',result.userId)
      localStorage.setItem('access_token',result.access_token)
    afterLogin()
    })
    .fail(err=>{
      console.log(err)
    })
  }

function beforeLogin(){
  $("#login-form").show()
  $("#registration-form").hide()
  $("#afterLogin").hide()
  $("#btn-logout").hide()
  $("#btn-login").show()
  $("#btn-register").show()
  $("#search-bar").hide()

  $("#myList").hide()
}

function afterLogin(){
  $("#login-form").hide()
  $("#registration-form").hide()
  $("#afterLogin").show()
  $("#btn-logout").show()
  $("#btn-login").hide()
  $("#btn-register").hide()
  $("#search-bar").show()
  $("#foodcontainer").hide()

  $("#myList").hide()
}


function register(event){
  event.preventDefault()
  let email = $("#emailregister").val()
  let password = $("#passwordregister").val()

  $.ajax({
    method:'POST',
    url:'http://localhost:3000/register',
    data:{email,password}
  })
  .done(result=>{
    console.log(result,'result register')
    $("#login-form").show()
    $("#registration-form").hide()
  })
  .fail(error=>{
    console.log(error,'error register')
  })
}


function login(event){
  event.preventDefault()
  let email = $("#emaillogin").val()
  let password = $("#passwordlogin").val()

  $.ajax({
    method:'POST',
    url:'http://localhost:3000/login',
    data:{email,password}
  })
  .done(result=>{
    console.log(result.userId,'result login')
    localStorage.setItem('userId',result.userId)
    localStorage.setItem('access_token',result.access_token)
    afterLogin()
  })
}

function addFoodToList({userId,name,imageUrl,location}){
  console.log(userId,name,imageUrl,location)
  $.ajax({
    method:'POST',
    url:'http://localhost:3000/food',
    data:{name,imageUrl,location,userId},
    headers:{
      access_token:localStorage.access_token
    }
  })
  .done(result=>{
    console.log(result)
  })
  .fail(error=>{
    console.log(error)
  })
}

function fetchDelete(input){
  // console.log(input)
  $.ajax({
    method: 'DELETE',
    url: `http://localhost:3000/food/${input}`,
    headers: {
        access_token: localStorage.access_token
    }
  })
  .done(result=>{
    console.log(result)
    fetchFoodList()
  })
  .fail(err=>{
    console.log(error, 'error')
  })
}

function fetchEdit(id, event,){
  let note = $("#editdata").val()
  console.log(note)
  // $.ajax({
  //   method: 'PATCH',
  //   url: `http://localhost:3000/food/${input}`,
  //   headers: {
  //       access_token: localStorage.access_token
  //   }
  // })
  // .done(result=>{
  //   console.log(result)
  //   fetchFoodList()
  // })
  // .fail(err=>{
  //   console.log(error, 'error')
  // })
}

function fetchFoodList(){
  $.ajax({
      method: 'GET',
      url: 'http://localhost:3000/food',
      headers: {
          access_token: localStorage.access_token
      }
  })
  .done(result => {
    let Food = result
    // console.log(Food)
      $("#myListCard").empty()
      $.each(Food.data, function(key, value){
        console.log(value.id)
          $("#myListCard").append(`
          <div class="col-4 mb-2" key=${key}>
            <div class="card" style="width: 18rem;">
                <img src="${value.imageUrl}" class="card-img-top" alt="..." height="200px">
              <div class="card-body">
                <h5 class="card-title">${value.name}</h5>
                <p class="card-text">${value.location}</p>
                <br>
               
                <button class="btn btn-warning" onClick="fetchDelete(${value.id})">Delete</button>
              </div>
            </div>
          </div>
        `)
      })
      // <p class="card-text">Notes: ${value.note}</p>
      // <form onsubmit="fetchEdit(${value.id}, event)">
      // <input type="text" class="mb-5" id="editdata">
      // <button class="btn btn-primary">Add Note</button>
      // </form>
  })
  .fail(err => {
      console.log("error", error)
  })
}


function submitCity(event){
  event.preventDefault()
  let city = $("#search").val()

  $.ajax({
    method:'GET',
    url:`http://localhost:3000/recommended?city=${city}`,
    headers:{
      access_token:localStorage.access_token
    }
  })
  .done(result=>{
    console.log(result)
    $("#covidcontainer").empty()
    $("#foodcard").empty()
    $("#weathercontainer").empty()

    $("#weathercontainer").append(`
      <h3>Weather on the city</h3>
      <div class="card mb-4" style="max-width: 520px;">
          <div class="row no-gutters">
          <div class="col-md-4 bg-primary" >
              <img src="${result.weather.icon[0]}" class="card-img" alt="..." >
          </div>
          <div class="col-md-8">
              <div class="card-body">
              <h5 class="card-title">${result.weather.city}, ${result.weather.country}</h5>
              <p class="card-text">${result.weather.weather[0]}</p>
              <p class="card-text"><small class="text-muted"><b>Local Time: </b>${result.weather.localtime}</small></p>
              </div>
          </div>
          </div>
      </div>
    `)

    
    $.each(result.food,function(key,value){
      $("#foodcard").append(`
      <div class="col mb-4" key=${key}>
      <div class="card">
        <img src="${value.restaurant.featured_image}" class="card-img-top" alt="..." height="300px">
        <div class="card-body">
          <h5 class="card-title"><b>${value.restaurant.name}</b></h5>
          <p class="card-text">${value.restaurant.location.address}</p>
        </div>
      </div>
      <br>
      <center><button type="button" class="btn btn-primary" onclick="addFoodToList({userId:${localStorage.userId},name:'${value.restaurant.name}',imageUrl:'${value.restaurant.featured_image}',location:'${value.restaurant.location.address}'})">add to wishlist</button></center>
    </div>
      `)
    })


    $("#covidcontainer").append(`
      <h3>Covid Update Negara Indonesia</h3>
          <table class="table table-hover table-dark">
            <thead>
              <tr>
                <th scope="col">Positif</th>
                <th scope="col">Sembuh</th>
                <th scope="col">Meninggal</th>
                <th scope="col">Dirawat</th>
              </tr>
            </thead>
            <tbody>
              <tr style="font-size: xx-large;">
                <td>${result.covid[0].positif}</td>
                <td>${result.covid[0].sembuh}</td>
                <td>${result.covid[0].meninggal}</td>
                <td>${result.covid[0].dirawat}</td>
              </tr>
            </tbody>
          </table>
    `)
    $("#foodcontainer").show()
  })
  .fail(error=>{
    console.log(error)
  })
}



function fetchRecommend(input){

}