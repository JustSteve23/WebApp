"use strict"

$(document).ready(function() {
	let _body=$("body");
	let _wrapper=$("#wrapper");
	let _splashScreen=$("#splashScreen");

	_body.addClass("bodyW");
	_wrapper.hide();
	_splashScreen.show();

	$("#lblInv").hide();

	let prezzoTot;
	let dataCar;
	let id;

	//for(let i=0;i<6;i++){
	let RQindex=inviaRichiesta("GET","server/elencoAuto.php");
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

		dataCar=data;
		console.log(data);

		$("#accBtn").html(data["nominativo"]);

		id=localStorage.getItem("idForInfo")-1;
		console.log("carID: "+id);

		$("#carImg").prop("src",images[id]);

		$("#carName-Model").html(
			data["data"][id]["marca"]+" "+
			data["data"][id]["modello"]);


		let colors=["Nero","Blu","Bianco","Rosso +2300€","Giallo +2300€","Blu elettrico +3000€","Grigio Metallizato +3500€"];
		let fari=["Standard","Xeno +1500€"];
		let copriPastiglie=["Standard","Rosso +800€","Giallo +800€","Verde +1000€"];
		let cerchi=["Lega","Carbonio +8000€","OZ Racing +10000€"];
		$("#ToWriteDetails").html(
			"-Potenza: "+data["data"][id]["potenza"]+" CV<br>"+
			"-Cilindrata: "+data["data"][id]["cilindrata"]+" cm3<br>"+
			"-Motore: "+data["data"][id]["tipoMotore"]+"<br>"+
			"-Lunghezza: "+data["data"][id]["lunghezza"]+" mm<br>"+
			"-Larghezza: "+data["data"][id]["larghezza"]+" mm<br>"+
			"-Peso: "+data["data"][id]["peso"]+" KG<br>"+
			"-Anno Di Produzione: "+data["data"][id]["annoProduzione"]+"<br>"+
			"-Prezzo: "+data["data"][id]["prezzo"]+" €<br>"+
			"-Colore: <select id='colors' style='font-size: 15pt;border: 0;border-bottom: 1px solid #3acbcb; background-color: transparent; color: white;'></select></br>"+
			"-Fari: <select id='fari' style='font-size: 15pt;border: 0;border-bottom: 1px solid #3acbcb; background-color: transparent; color: white;'></select><br>"+
			"-Copri pastiglie: <select id='copriPastiglie' style='font-size: 15pt;border: 0;border-bottom: 1px solid #3acbcb; background-color: transparent; color: white;'></select><br>"+
			"-Cerchi: <select id='cerchi' style='font-size: 15pt;border: 0;border-bottom: 1px solid #3acbcb; background-color: transparent; color: white;'></select><br>"
		)
		setOption(colors,"colors");
		setOption(fari,"fari");
		setOption(copriPastiglie,"copriPastiglie");
		setOption(cerchi,"cerchi");

		prezzoTot=parseInt(data["data"][id]["prezzo"]);

	});

	$("#preventivo").on("click",function () {
		prezzoTot=prezzoTot+parseInt($("#colors option:selected").prop("value"))+parseInt($("#fari option:selected").prop("value"))+parseInt($("#copriPastiglie option:selected").prop("value"))+parseInt($("#cerchi option:selected").prop("value"));
		console.log(prezzoTot);
		let colore=$("#colors option:selected").html().split("+")[0];
		let fari=$("#fari option:selected").html().split("+")[0];
		let copriPastiglie=$("#copriPastiglie option:selected").html().split("+")[0];
		let cerchi=$("#cerchi option:selected").html().split("+")[0];
		let RQemailPreventivo=inviaRichiesta("POST","server/mailPreventivo.php",{"dataCar":dataCar,"colore":colore,"Fari":fari,"copriPastiglie":copriPastiglie,"cerchi":cerchi,"prezzo":prezzoTot,"id":id});
		$("#lblInv").show();
	});

	$("#logOut").on("click",function () {
		let RQLogOut=inviaRichiesta("POST","server/logOut.php");
		window.location.href="index.html";
	})
})

function setOption(vect,_option) {
	let val;
	for (let i=0;i<vect.length;i++){
		try {
			let aus = vect[i].split("+");
			val = aus[1].split("€")[0];
		}
		catch (e) {
			val=0;
		}
		$("<option>").prop("value",val).html(vect[i]).appendTo($("#"+_option));
	}
}