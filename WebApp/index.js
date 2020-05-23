"use strict"
let images=[];

$(document).ready(function() {
	let image=["img/auto/sf-90str.jpg","img/auto/fordgt40.jpg","img/auto/kRegera.jpg","img/auto/lAventador.jpg","img/auto/p911turboS.jpg","img/auto/fF40.jpg"];

	let _body=$("body");
	let _wrapper=$("#wrapper");
	let _splashScreen=$("#splashScreen");

	let _lblPageNumber=$("#lblPage");
	let _buttonBackPage=$("#btnPBack");
	_buttonBackPage.show();
	let _buttonNextPage=$("#btnPNext");
	_buttonNextPage.show();
	let pagenumber=_lblPageNumber.html();
	console.log(pagenumber);
	if (pagenumber==1)
		_buttonBackPage.hide();

	_body.addClass("bodyW");
	_wrapper.hide();
	_splashScreen.show();


	let RQindex;
	let id;
	//for(let i=0;i<6;i++){
		id=1;
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

		for (let i=0;i<6;i++){
			$("#cardImg"+(i+1)).prop({"src":image[i]});
			$("#title"+(i+1)).html(data["data"][i]["marca"]+" "+data["data"][i]["modello"]);
			$("#cardInfo"+(i+1)).html(
				"-Potenza: "+data["data"][i]["potenza"]+" CV <br>"+
				"-Cilindrata: "+data["data"][i]["cilindrata"]+" cm3 <br>"+
				"-Prezzo: "+data["data"][i]["prezzo"]+"€"
			);
			$("#btnCard"+(i+1)).prop({"name":data["data"][i]["id"]});
		}
	});

	$("#logOut").on("click",function () {
		let RQLogOut=inviaRichiesta("POST","server/logOut.php");
		window.location.href="index.html";
	})
})