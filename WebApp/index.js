"use strict"

$(document).ready(function() {	
	let _wrapper=$("#wrapper");
	let _titolo=$("#divTitolo");
	let _filiali=$("#divFiliali");
	let _movimenti=$("#divMovimenti");

	_wrapper.hide();

	let RQfiliali=inviaRichiesta("GET","server/elencoFiliali.php");
	RQfiliali.fail(function (jqXHR,test_status,str_error) {
		if (jqXHR.status==403)
			window.location.href="login.html";
		else
			error(jqXHR,test_status,str_error);
	});

	RQfiliali.done(function (data) {
		console.log(data);
		_wrapper.show();
		_movimenti.hide();

		let p=$("<p>",{
			"css":{"text-align":"right"},
			"html":"Benvenuto <b>"+ data["name"]+"</b>"
		}).appendTo(_titolo);

		for (let r of data["data"]){
			$("").on("click",function () {
				let _checked=$("inputp[type=radio]:checked");
				if (_checked.length==0)
					alert("Nessuna filiale selezionata");
				else {
					let cFiliale = _checked[0].value;
					let rqMovimenti = inviaRichiesta("POST", "server/elencoMovimenti.php", {"cFiliale": cFiliale});
					rqMovimenti.fail(function (jqXHR, text_status, str_error) {
						if (jqXHR.status == 403) {
							window.location.href = "login.html";
						}
						else
							error(jqXHR, text_status, str_error)
					})
					rqMovimenti.done(function (data) {
						console.log(data);
					})
				}
			});
		}
	});
});