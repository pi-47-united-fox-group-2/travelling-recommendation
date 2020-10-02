



function onSignIn(googleUser) {
    var profile = googleUser.getBasicProfile();
    console.log('ID: ' + profile.getId()); // Do not send to your backend! Use an ID token instead.
    console.log('Name: ' + profile.getName());
    console.log('Image URL: ' + profile.getImageUrl());
    console.log('Email: ' + profile.getEmail()); // This is null if the 'email' scope is not present.
  }

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

$("#btn-logout").click(function(){
  localStorage.removeItem('access_token')
  beforeLogin()
})

function beforeLogin(){
  $("#login-form").show()
  $("#registration-form").hide()
  $("#afterLogin").hide()
  $("#btn-logout").hide()
  $("#btn-login").show()
  $("#btn-register").show()
  $("#myList").hide()
}

function afterLogin(){
  $("#login-form").hide()
  $("#registration-form").hide()
  $("#afterLogin").show()
  $("#btn-logout").show()
  $("#btn-login").hide()
  $("#btn-register").hide()
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
    console.log(result,'result login')
    localStorage.setItem('access_token',result.access_token)
    afterLogin()
  })
}


$("#btn-myList").click(function(){
  $("#myList").show()
  $("#afterLogin").hide()
})

function fetchFoodList() {
  $.ajax({
      method: 'GET',
      url: 'http://localhost:3000/food',
      headers: {
          access_token: localStorage.access_token
      }
  })
  .done(result => {
      console.log(result)
      Food = result
      $("#myList").empty()
      $.each(Food, function(key, value){
          console.log(value)
          $("#myList").append(`
      <div class="col-4 mb-2">
    <div class="card" style="width: 18rem;">
      <img src="${value.imageUrl}" class="card-img-top" alt="...">
      <div class="card-body">
        <h5 class="card-title">${value.name}</h5>
        <p class="card-text">${value.location}</p>
        <p class="card-text">Notes: ${value.notes}</p>
        <br>
        <a href="#" class="btn btn-delete">Delete</a>
      </div>
    </div>
  </div>
  `)
      })
  })
  .fail(err => {
      console.log("error", error)
  })
}