"use strict"

$(document).ready(function() {
	let _body=$("body");
	let _wrapper=$("#wrapper");
	let _splashScreen=$("#splashScreen");

	_body.addClass("bodyW");
	_wrapper.hide();
	_splashScreen.show();

	$("#listaVuotaBox").hide();

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

	let RQlistaPreferiti=inviaRichiesta("POST","server/elencoPreferiti.php");
	RQlistaPreferiti.fail(function () {
		error();
	});
	RQlistaPreferiti.done(function (data) {
		dataPush(data)
	});

	function dataPush(data){
		console.log(data);
		$("#tbody").empty();
		if (data.length>0) {
			$("#listaVuotaBox").hide();
			for (let i = 0; i < data.length; i++) {
				let _tr = $("<tr>").appendTo($("#tbody"));
				$("<th>").html(data[i]["marca"]).prop({"name": data[i]["id"]}).appendTo(_tr).on("click", function () {
					idSet($(this).prop("name"));
					window.location.href="moreInfo.html";
				});
				$("<th>").html(data[i]["modello"]).prop({"name": data[i]["id"]}).appendTo(_tr).on("click", function () {
					idSet($(this).prop("name"));
					window.location.href="moreInfo.html";
				});
				$("<th>").html(data[i]["potenza"] + " CV").prop({"name": data[i]["id"]}).appendTo(_tr).on("click", function () {
					idSet($(this).prop("name"));
					window.location.href="moreInfo.html";
				});
				$("<th>").html(data[i]["cilindrata"] + " cm3").prop({"name": data[i]["id"]}).appendTo(_tr).on("click", function () {
					idSet($(this).prop("name"));
					window.location.href="moreInfo.html";
				});
				$("<th>").html(data[i]["prezzo"] + "€").prop({"name": data[i]["id"]}).appendTo(_tr).on("click", function () {
					idSet($(this).prop("name"));
					window.location.href="moreInfo.html";
				});
				$("<th>").html("Rimuovi").prop("name",data[i]["id"]).addClass("underline").appendTo(_tr).on("click",function () {
					let RQListaPreferitiRimuovi=inviaRichiesta("POST","server/rimuoviPreferiti.php",{"id":$(this).prop("name")})
					RQListaPreferitiRimuovi.fail(function (jqXHR,test_status,str_error) {
						error(jqXHR,test_status,str_error);
					})
					RQListaPreferitiRimuovi.done(function (data) {
						console.log(data["ris"]);
						RQlistaPreferiti=inviaRichiesta("POST","server/elencoPreferiti.php");
						RQlistaPreferiti.fail(function (jqXHR,test_status,str_error) {
							error(jqXHR,test_status,str_error);
						});
						RQlistaPreferiti.done(function (data) {
							dataPush(data);
						})
					})
				})
				$("<th>").html("Preventivo").prop("name",data[i]["id"]).addClass("underline").appendTo(_tr).on("click",function () {
					idSet($(this).prop("name"));
					window.location.href="preventivo.html";
				})
			}
		}
		else
		{
			$(".table").hide();
			$("#listaVuotaBox").show();
		}
	}

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

function idSet(_thisID) {
	localStorage.removeItem("idForInfo");
	localStorage.setItem("idForInfo",_thisID);
}

