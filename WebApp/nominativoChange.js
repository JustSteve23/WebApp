"use strict"

$(document).ready(function() {	
	let _password = $("#pwd")
	let _nome = $("#nome");
	let _cognome = $("#cognome");
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

		_password.removeClass("is-invalid");  // bordo rosso textbox
		_password.prev().removeClass("icona-rossa");  // colore icona
		_nome.removeClass("is-invalid");
		_nome.prev().removeClass("icona-rossa");
		_cognome.removeClass("is-invalid");
		_cognome.prev().removeClass("icona-rossa");

		_lblErrore.hide();		
		
        if (_password.val() == "") {
			_password.addClass("is-invalid"); // bordo rosso textbox
			_password.prev().addClass("icona-rossa"); // colore icona
        } 
		else if (_nome.val() == "") {
			_nome.addClass("is-invalid"); // bordo rosso textbox
			_nome.prev().addClass("icona-rossa"); // colore icona
        }
		else if(_cognome.val()=="") {
			_cognome.addClass("is-invalid"); // bordo rosso textbox
			_cognome.prev().addClass("icona-rossa"); // colore icona
		}
		else{
			// md5 restituisce una word esadecimale, quindi è obbligatorio .toString()
			let pass=CryptoJS.MD5(_password.val()).toString();
			let nom=_nome.val()+" "+_cognome.val();
			let _pwcontrolRequest=inviaRichiesta("POST", "server/passwordControl.php");
			_pwcontrolRequest.done(function (data) {
				console.log(data);
				console.log("pwN= "+pass);
				if (data[0]["password"]!=pass) {
					_lblErrore.show();
				}
				else
				{
					let _richiesta= inviaRichiesta("POST", "server/nominativoChange.php", {"nominativo":nom} );
					_richiesta.fail(function(jqXHR, test_status, str_error) {
						if (jqXHR.status == 401) { // unauthorized
							_lblErrore.show();
						} else
							error(jqXHR, test_status, str_error)
					});
					_richiesta.done(function(data) {
						if(data.ris=="changed") // test inutile
							window.location.href = "accountPage.html"
					});
				}
			})
		}
	}
	
	_lblErrore.children("button").on("click", function(){
		_lblErrore.hide();
	})

});