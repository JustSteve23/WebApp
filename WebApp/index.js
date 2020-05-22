"use strict"
let images=[];

$(document).ready(function() {
	let _body=$("body");
	let _wrapper=$("#wrapper");
	let _splashScreen=$("#splashScreen");

	_body.addClass("bodyW");
	_wrapper.hide();
	_splashScreen.show();


	let RQindex;
	let id;
	//for(let i=0;i<6;i++){
		id=1;
	RQindex=inviaRichiesta("GET","server/elencoAuto.php",{"id":id});
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

		$("#accBtn").html(data["nominativo"]);
	});

	$("#logOut").on("click",function () {
		let RQLogOut=inviaRichiesta("POST","server/logOut.php");
		window.location.href="index.html";
	})
})