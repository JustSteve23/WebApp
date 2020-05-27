"use strict"

$(document).ready(function() {
	let _body=$("body");
	let _wrapper=$("#wrapper");
	let _splashScreen=$("#splashScreen");


	_body.addClass("bodyW");
	_wrapper.hide();
	_splashScreen.show();


	let RQindex;
	//for(let i=0;i<6;i++){
	RQindex=inviaRichiesta("GET","server/accountService.php");
	//}

	RQindex.fail(function (jqXHR,test_status,str_error) {
		if (jqXHR.status==403)
			window.location.href="login.html";
		else
			error(jqXHR,test_status,str_error);
	});

	RQindex.done(function (data) {
		setTimeout(function () {
			_body.removeClass("bodyW");
			_body.addClass("bodyMain");
			_splashScreen.hide();
			_wrapper.show();
		},1500);

		console.log(data);

		$("#accBtn").html(data[0][0]["nominativo"]);

		$("#nominativo").html(data[0][0]["nominativo"]);
		$("#dettagliAccount").html(
			"E-Mail: "+data[0][0]["email"]+"<br>"+
			"Username: "+data[0][0]["username"]+"<br>"
		);
	});

	let RQlistaPreferiti=inviaRichiesta("POST","server/listaPreferiti.php");
	RQlistaPreferiti.fail(function () {
		error();
	});
	RQlistaPreferiti.done(function (data) {
		
	});

	$("#logOut").on("click",function () {
		let RQLogOut=inviaRichiesta("POST","server/logOut.php");
		window.location.href="index.html";
	})

	$("#pwChange").on("click",function () {
		window.location.href="passwordChange.html";
	})

	$("#emailChange").on("click",function () {
		window.location.href="emailChange.html";
	})

	$("#usrChange").on("click",function () {
		window.location.href="usernameChange.html";
	})

	$("#nomChange").on("click",function () {
		window.location.href="nominativoChange.html";
	})
})

