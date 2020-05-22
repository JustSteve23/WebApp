"use strict"

$(document).ready(function() {	
	let _email = $("#usr")
	let _password = $("#pwd")
	let _password2=$("#pwd2");
	let _user=$("#username");
	let _name=$("#nome");
	let _lastName=$("#cognome");
	let _lblErrore = $("#lblError")
	
	// all'avvio apriamo subito il jumbotron
	$(".jumbotron").trigger("click");
    _lblErrore.hide();

	$("#btnLogin").on("click", controllaLogin)
	
	// il submit deve partire anche senza click 
	// ma con il solo tasto INVIO
	$(document).on('keydown', function(event) {	
	   if (event.keyCode == 13)  
		   controllaLogin();
	});
	
	
	function controllaLogin(){

		_email.removeClass("is-invalid");  // bordo rosso textbox
		_email.prev().removeClass("icona-rossa");  // colore icona
        _password.removeClass("is-invalid");
		_password.prev().removeClass("icona-rossa");
		_password2.removeClass("is-invalid");
		_password2.prev().removeClass("icona-rossa");
		_user.removeClass("is-invalid");
		_user.prev().removeClass("icona-rossa");
		_name.removeClass("is-invalid");
		_name.prev().removeClass("icona-rossa");
		_lastName.removeClass("is-invalid");
		_lastName.prev().removeClass("icona-rossa");


		_lblErrore.hide();		
		
        if (_email.val() == "") {
			_email.addClass("is-invalid"); // bordo rosso textbox
			_email.prev().addClass("icona-rossa"); // colore icona
        }
		else if (_user.val() == "") {
			_user.addClass("is-invalid"); // bordo rosso textbox
			_user.prev().addClass("icona-rossa"); // colore icona
		}
		else if (_name.val() == "") {
			_name.addClass("is-invalid"); // bordo rosso textbox
			_name.prev().addClass("icona-rossa"); // colore icona
		}
		else if (_lastName.val() == "") {
			_lastName.addClass("is-invalid"); // bordo rosso textbox
			_lastName.prev().addClass("icona-rossa"); // colore icona
		}
		else if (_password.val() == "") {
            _password.addClass("is-invalid"); // bordo rosso textbox
			_password.prev().addClass("icona-rossa"); // colore icona
        }
		else if (_password2.val() == "") {
			_password2.addClass("is-invalid"); // bordo rosso textbox
			_password2.prev().addClass("icona-rossa"); // colore icona
		}
		else if(_password.val()!=_password2.val()){
			_password.addClass("is-invalid"); // bordo rosso textbox
			_password.prev().addClass("icona-rossa"); // colore icona
			_password2.addClass("is-invalid"); // bordo rosso textbox
			_password2.prev().addClass("icona-rossa"); // colore icona
		}
		else{
			let user=_email.val();
			// md5 restituisce una word esadecimale, quindi è obbligatorio .toString()
			let pass=CryptoJS.MD5(_password.val()).toString();
			let nominativo=_name.val()+" "+_lastName.val() ;
			let username=_user.val();
			let _richiestaLogin= inviaRichiesta("POST", "server/signIn.php", { "email":user, "password":pass,"nominativo":nominativo,"username":username } );
			_richiestaLogin.fail(function(jqXHR, test_status, str_error) {
					_lblErrore.show();
			});
			_richiestaLogin.done(function(data) {
					window.location.href = "login.html"
			});
		}
	}
	
	_lblErrore.children("button").on("click", function(){
		_lblErrore.hide();
	})
	
});