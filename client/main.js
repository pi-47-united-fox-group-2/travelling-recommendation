function onSignIn(googleUser) {
  console.log('masuk')

  var id_token = googleUser.getAuthResponse().id_token;
    $.ajax({
      method:'POST',
      url:'http://localhost:3000/googlelogin',
      headers:{
        google_access_token:id_token
      }
    })
    .then(result=>{
    })
    .fail(err=>{

    })
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
  localStorage.removeItem('userId')
  beforeLogin()
})

function beforeLogin(){
  $("#login-form").show()
  $("#registration-form").hide()
  $("#afterLogin").hide()
  $("#btn-logout").hide()
  $("#btn-login").show()
  $("#btn-register").show()
  $("#search-bar").hide()
  $("#user-list").hide()

}

function afterLogin(){
  $("#login-form").hide()
  $("#registration-form").hide()
  $("#afterLogin").show()
  $("#btn-logout").show()
  $("#btn-login").hide()
  $("#btn-register").hide()
  $("#search-bar").show()
  $("#user-list").show()
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