$(document).ready(function(){
  $("#firstName").hide();
});

function toggleLogin(){
  if($("#firstName").is(':visible')){
    login()
  }else {
    signup();
  }
}

function login(){
  $("#firstName").hide();
  $("#loginHeading").html("Login");
  $("#not-member-label").html("Not a member yet?");
  $("#signup-text").html("Signup");
  $("#nav-btn-login").html("Login");
  $("#btn-login").html("Login");
}

function signup(){
  $("#firstName").hide();
  $("#firstName").show();
  $("#loginHeading").html("Sign Up");
  $("#not-member-label").html("Already a member?");
  $("#signup-text").html("Login");
  $("#nav-btn-login").html("Signup");
  $("#btn-login").html("Signup");
}
