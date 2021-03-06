"use strict"

$(document).ready(function() {
	let _body=$("body");
	let _wrapper=$("#wrapper");
	let _splashScreen=$("#splashScreen");

	_body.addClass("bodyW");
	_wrapper.hide();
	_splashScreen.show();
	let favouriteList;

	let RQindex;
	//for(let i=0;i<6;i++){
	RQindex=inviaRichiesta("GET","server/elencoAuto.php");
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

		let id=localStorage.getItem("idForInfo")-1;
		console.log("carID: "+id);

		$("#carImg").prop("src",images[id]);

		$("#carName-Model").html(
			data["data"][id]["marca"]+" "+
			data["data"][id]["modello"]);

		$("#ToWriteDetails").html(
			"-Potenza: "+data["data"][id]["potenza"]+" CV<br>"+
			"-Cilindrata: "+data["data"][id]["cilindrata"]+" cm3<br>"+
			"-Motore: "+data["data"][id]["tipoMotore"]+"<br>"+
			"-Lunghezza: "+data["data"][id]["lunghezza"]+" mm<br>"+
			"-Larghezza: "+data["data"][id]["larghezza"]+" mm<br>"+
			"-Peso: "+data["data"][id]["peso"]+" KG<br>"+
			"-Anno Di Produzione: "+data["data"][id]["annoProduzione"]+"<br>"+
			"-Prezzo: "+data["data"][id]["prezzo"]+" €<br>"
		);
	});

	setTimeout(function () {
		RQpreferiti();
		setTimeout(function () {
			preferitiBtnControl(favouriteList);
		},200)
	},200)

	$(".preferiti").prop("name",localStorage.getItem("idForInfo")).on("click",function () {
		let RQPreferitiAdd=inviaRichiesta("POST","server/addFavouritesList.php",{"id":$(this).prop("name")});
		RQPreferitiAdd.fail(function (jqXHR,test_status,str_error) {
			error(jqXHR,test_status,str_error);
		})
		RQPreferitiAdd.done(function (data) {
			console.log(data);
		})
		setTimeout(function () {
			RQpreferiti();
			setTimeout(function () {
				preferitiBtnControl(favouriteList);
			},200)
		},200)
	})

	$("#logOut").on("click",function () {
		let RQLogOut=inviaRichiesta("POST","server/logOut.php");
		window.location.href="index.html";
	})

	function RQpreferiti() {
		let RQpreferiti = inviaRichiesta("POST", "server/elencoPreferiti.php");
		RQpreferiti.done(function (data) {
			favouriteList = data;
			console.log(favouriteList);
		})
	}
})
function preferitiBtnControl(favList) {
	for (let i = 0; i < 6; i++) {
		$("#btnCardPreferiti-" + (i + 1)).addClass("btn-sm").addClass("btn-info").css({"pointer-events":"all"});
		for (let j = 0; j < favList.length; j++) {
			if (favList[j]["id"] == localStorage.getItem("idForInfo"))
				$("#btnCardPreferiti-2").removeClass("btn-sm").removeClass("btn-info").css({"border": "1px solid #3acbcb","pointer-events":"none"});

		}
	}
}