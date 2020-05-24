"use strict"

$(document).ready(function() {
	let _body=$("body");
	let _wrapper=$("#wrapper");
	let _splashScreen=$("#splashScreen");
	let carData;

	let _lblPageNumber=$("#lblPage");
	let _buttonBackPage=$("#btnPBack");
	_buttonBackPage.hide();
	let _buttonNextPage=$("#btnPNext");
	_buttonNextPage.show();
	let pagenumber=_lblPageNumber.html();
	console.log("Page N: "+pagenumber);

	_body.addClass("bodyW");
	_wrapper.hide();
	_splashScreen.show();


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
		carData=data;
		setTimeout(function () {
			_body.removeClass("bodyW");
			_body.addClass("bodyMain");
			_splashScreen.hide();
			_wrapper.show();
		},1500);

		console.log(carData);

		$("#accBtn").html(data["nominativo"]);

		dataPush(data,pagenumber,_buttonBackPage,_buttonNextPage);
	});

	$(".moreInfo").on("click",function () {
		localStorage.removeItem("idForInfo");
		localStorage.setItem("idForInfo",$(this).prop("name"));
		window.location.href="moreInfo.html";
	})

	$("#logOut").on("click",function () {
		let RQLogOut=inviaRichiesta("POST","server/logOut.php");
		window.location.href="index.html";
	})

	_buttonNextPage.on("click",function () {
		pagenumber++;
		_lblPageNumber.html(pagenumber);
		dataPush(carData,pagenumber,_buttonBackPage,_buttonNextPage)
	})
	_buttonBackPage.on("click",function(){
		pagenumber--;
		_lblPageNumber.html(pagenumber);
		dataPush(carData,pagenumber,_buttonBackPage,_buttonNextPage)
	})
})

function dataPush(data,pagenumber,_buttonBackPage,_buttonNextPage) {
	_buttonBackPage.show();
	_buttonNextPage.show();
	if (pagenumber==1)
		_buttonBackPage.hide();
	const dataUpperID=6;
	let basePageID=0;
	if (pagenumber>1){
		for (let i=0;i<pagenumber-1;i++){
			basePageID+=dataUpperID;
		}
	}
	for (let i=0;i<6;i++){
		try{
			$("#cb"+(i+1)).show();
			$("#cardImg" + (i + 1)).prop({"src":""});
			$("#cardImg" + (i + 1)).prop({"src": images[i + basePageID]});
			$("#title" + (i + 1)).html(data["data"][i + basePageID]["marca"] + " " + data["data"][i + basePageID]["modello"]);
			$("#cardInfo" + (i + 1)).html(
				"-Potenza: " + data["data"][i + basePageID]["potenza"] + " CV <br>" +
				"-Cilindrata: " + data["data"][i + basePageID]["cilindrata"] + " cm3 <br>" +
				"-Prezzo: " + data["data"][i + basePageID]["prezzo"] + "€"
			);
			$("#btnCard-" + (i + 1)).prop({"name": data["data"][i + basePageID]["id"]});
		}
		catch (e) {
			_buttonNextPage.hide();
			$("#cb"+(i+1)).hide();
		}
	}
}