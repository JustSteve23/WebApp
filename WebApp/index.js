"use strict"

$(document).ready(function() {
	let _body=$("body");
	let _wrapper=$("#wrapper");
	let _splashScreen=$("#splashScreen");
	let carData;
	let favouriteList;

	let _lblPageNumber=$("#lblPage");
	let _buttonBackPage=$("#btnPBack");
	_buttonBackPage.hide();
	let _buttonNextPage=$("#btnPNext");
	_buttonNextPage.show();
	let pagenumber=_lblPageNumber.html();
	console.log("Page N: "+pagenumber);

	let _selectMarca=$("#selectMarca");
	let _selectTipoMotote=$("#selectTipoMotore");

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

		caricaSelect(data,_selectMarca,_selectTipoMotote);

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

	$(".preferiti").on("click",function () {
		let RQPreferitiAdd=inviaRichiesta("POST","server/addFavouritesList.php",{"id":$(this).prop("name")});
		RQPreferitiAdd.fail(function (jqXHR,test_status,str_error) {
			error(jqXHR,test_status,str_error);
		})
		RQPreferitiAdd.done(function (data) {
			console.log(data);
		})
	})
})

function dataPush(data,pagenumber,_buttonBackPage,_buttonNextPage) {
	_buttonBackPage.show();
	_buttonNextPage.show();

	for (let i=0;i<6;i++)
		$("#cb"+(i+1)).hide()


	if (pagenumber==1)
		_buttonBackPage.hide();
	const dataUpperID=6;
	let basePageID=0;
	let z=0;
	if (pagenumber>1){
		for (let i=0;i<pagenumber-1;i++){
			basePageID+=dataUpperID;
		}
	}

	for (let i=0;i<6;i++){
		try{
				dataPushAus(data,i,basePageID);
		}
		catch (e) {
			_buttonNextPage.hide();
			$("#cb"+(i+1)).hide();
		}
	}
}
function dataPushAus(data,i,basePageID) {
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
	$("#btnCardPreferiti-" + (i + 1)).prop({"name": data["data"][i + basePageID]["id"]});
}

function caricaSelect(data) {
	let marcaArr=[];
	let tipoMotoreArr=[];
	let _selectMarca=$("#selectMarca");
	let _selectTipoMotote=$("#selectTipoMotore");

	for (let i=0;i<data["data"].length;i++){
		if (!marcaArr.includes(data["data"][i]["marca"])) {
			marcaArr[i]=data["data"][i]["marca"];
			$("<option>").prop("value", marcaArr[i]).html(marcaArr[i]).appendTo(_selectMarca);
		}
		if (!tipoMotoreArr.includes(data["data"][i]["tipoMotore"].split(" ")[0])){
			tipoMotoreArr[i]=data["data"][i]["tipoMotore"].split(" ")[0];
			$("<option>").prop("value", tipoMotoreArr[i]).html(tipoMotoreArr[i]).appendTo(_selectTipoMotote);
		}
	}
}