$(document).ready(function () {
	deruleazaPozeInainteAutomat();
	$("#previousFeedbackButtton").on("click", function () {
		showPreviousFeedback();
	});
	$("#nextFeedbackButtton").on("click", function () {
		showNextFeedback();
	});
	$("#butonStartGalerieFoto").on("click", function () {
		playGallery();
	});
	$("#butonPauzaGalerieFoto").on("click", function () {
		pauseGallery();
	});
	$("#inputNumarPozeSlider").on("change", function () {
		schimbaNumarPozeSlider();
	});
	$("#nextSliderPhoto").on("click", function () {
		deruleazaPozeInainte();
	});
	$("#previousSliderPhoto").on("click", function () {
		deruleazaPozeInapoi();
	});
	$("#inputSecundeDerularePozeSlider").on("click", function () {
		deruleazaPozeInainteAutomat();
	});
});


// populare dropdown judete si orase

var listaJudete = ["Cluj", "Bihor", "Salaj", "Alba", "Sibiu"]
var listaOraseCluj = ["Cluj-Napoca", "Floresti", "Apahida", "Gherla", "Dej"]
var listaOraseBihor = ["Oradea", "Baile Felix", "Alesd", "Beius", "Vadu Crisului"]
var listaOraseSalaj = ["Zalau", "Jibou", "Benesat", "Aghires", "Simleu Silvaniei"]
var listaOraseAlba = ["Alba-Iulia", "Sebes", "Abrud", "Aiud", "Blaj"]
var listaOraseSibiu = ["Sibiu", "Medias", "Cisnadie", "Dumbraveni", "Saliste"]

function initializarePagina() {

	var judeteDropdown = document.getElementById("judeteDropdown")

	for (var i = 0; i < listaJudete.length; i++) {
		var judet = listaJudete[i];
		var optiune = document.createElement("option");
		optiune.textContent = judet;
		optiune.value = judet;
		judeteDropdown.appendChild(optiune);
	}
}

function populeazaOraseDropdown() {
	var oraseDropdown = document.getElementById("oraseDropdown")

	var judet = document.getElementById("judeteDropdown").value;

	var optiuni = document.querySelectorAll('#oraseDropdown option');
	optiuni.forEach(x => x.remove()); //refresh la optiuni

	if (judet == "Cluj") {
		for (var i = 0; i < listaOraseCluj.length; i++) {
			var oras = listaOraseCluj[i];
			var optiune = document.createElement("option");
			optiune.textContent = oras;
			optiune.value = oras;
			oraseDropdown.appendChild(optiune);
		}
	}
	if (judet == "Bihor") {
		for (var i = 0; i < listaOraseBihor.length; i++) {
			var oras = listaOraseBihor[i];
			var optiune = document.createElement("option");
			optiune.textContent = oras;
			optiune.value = oras;
			oraseDropdown.appendChild(optiune);
		}
	}
	if (judet == "Salaj") {
		for (var i = 0; i < listaOraseSalaj.length; i++) {
			var oras = listaOraseSalaj[i];
			var optiune = document.createElement("option");
			optiune.textContent = oras;
			optiune.value = oras;
			oraseDropdown.appendChild(optiune);
		}
	}
	if (judet == "Alba") {
		for (var i = 0; i < listaOraseAlba.length; i++) {
			var oras = listaOraseAlba[i];
			var optiune = document.createElement("option");
			optiune.textContent = oras;
			optiune.value = oras;
			oraseDropdown.appendChild(optiune);
		}
	}
	if (judet == "Sibiu") {
		for (var i = 0; i < listaOraseSibiu.length; i++) {
			var oras = listaOraseSibiu[i];
			var optiune = document.createElement("option");
			optiune.textContent = oras;
			optiune.value = oras;
			oraseDropdown.appendChild(optiune);
		}
	}
}

// sortare tabel
function sortTable(n) {
	var table, rows, switching, i, x, y, shouldSwitch, dir, switchcount = 0;
	table = document.getElementById("tabelRasaAnimale");
	switching = true;
	//Set the sorting direction to ascending:
	dir = "asc";
	/*Make a loop that will continue until
	no switching has been done:*/
	while (switching) {
		//start by saying: no switching is done:
		switching = false;
		rows = table.rows;
		/*Loop through all table rows (except the
		first, which contains table headers):*/
		for (i = 1; i < (rows.length - 1); i++) {
			//start by saying there should be no switching:
			shouldSwitch = false;
			/*Get the two elements you want to compare,
			one from current row and one from the next:*/
			x = rows[i].getElementsByTagName("TD")[n];
			y = rows[i + 1].getElementsByTagName("TD")[n];
			/*check if the two rows should switch place,
			based on the direction, asc or desc:*/
			if (dir == "asc") {
				if ((n == 2 && parseInt(x.innerText) > parseInt(y.innerText)) || (n != 2 && x.innerHTML.toLowerCase() > y.innerHTML.toLowerCase())) {
					//if so, mark as a switch and break the loop:
					shouldSwitch = true;
					break;
				}
			} else if (dir == "desc") {
				if ((n == 2 && parseInt(x.innerText) < parseInt(y.innerText)) || (n != 2 && x.innerHTML.toLowerCase() < y.innerHTML.toLowerCase())) {
					//if so, mark as a switch and break the loop:
					shouldSwitch = true;
					break;
				}
			}
		}
		if (shouldSwitch) {
			/*If a switch has been marked, make the switch
			and mark that a switch has been done:*/
			rows[i].parentNode.insertBefore(rows[i + 1], rows[i]);
			switching = true;
			//Each time a switch is done, increase this count by 1:
			switchcount++;
		} else {
			/*If no switching has been done AND the direction is "asc",
			set the direction to "desc" and run the while loop again.*/
			if (switchcount == 0 && dir == "asc") {
				dir = "desc";
				switching = true;
			}
		}
	}
}
function sortTable2(n) {
	var table, rows, switching, i, x, y, shouldSwitch;
	table = document.getElementById("aparateFoto");
	switching = true;
	while (switching) {
		switching = false;
		rows = table.rows;
		for (i = 1; i < (rows.length - 1); i++) {
			shouldSwitch = false;
			x = rows[i].getElementsByTagName("TD")[n];
			y = rows[i + 1].getElementsByTagName("TD")[n];
			if (Number(x.innerHTML) > Number(y.html)) {
				shouldSwitch = true;
				break;
			}
		}
		if (shouldSwitch) {
			rows[i].parentNode.insertBefore(rows[i + 1], rows[i]);
			switching = true;
		}
	}
}
// transitia elementelor din lista de feedback
function showFeedbackList() {
	arr = document.getElementsByClassName("feedback-list-item");

	if (arr.length > 0) {
		var i = 0;
		while (i < arr.length) {
			if (arr[i].classList.contains("d-block")) {
				arr[i].classList.remove("d-block");
				arr[i].classList.add("d-none");

				var next = i + 1;
				if (i + 1 == arr.length) next = 0;

				arr[next].classList.remove("d-none");
				arr[next].classList.add("d-block");

				i = i + 2;
			} else {
				i = i + 1;
			}
		}
	}
};


//setInterval(showFeedbackList, 5000);

function showPreviousFeedback() {
	var nextButton = $("#nextFeedbackButtton");
	var previousButton = $("#previousFeedbackButtton");
	nextButton.removeAttr("disabled");

	var htmlCollectionFeedback = $(".feedback-list-item");
	var elementVizibil = $(".feedback-list-item.d-block");
	var listaFeedback = [].slice.call(htmlCollectionFeedback);
	var indexFeedbackVizibil = listaFeedback.indexOf(elementVizibil[0]);

	var previousIndexElementVizibil = indexFeedbackVizibil - 1;
	var previousElementVizibil = listaFeedback[previousIndexElementVizibil];

	elementVizibil.removeClass("d-block");
	elementVizibil.addClass("d-none");

	$(previousElementVizibil).addClass("d-block");
	$(previousElementVizibil).removeClass("d-none");

	if (previousIndexElementVizibil == 0) {
		previousButton.attr("disabled", "");
	}
}

function showNextFeedback() {
	var nextButton = $("#nextFeedbackButtton");
	var previousButton = $("#previousFeedbackButtton");
	previousButton.removeAttr("disabled");

	var htmlCollectionFeedback = $(".feedback-list-item");
	var elementVizibil = $(".feedback-list-item.d-block");
	var listaFeedback = [].slice.call(htmlCollectionFeedback);
	var indexFeedbackVizibil = listaFeedback.indexOf(elementVizibil[0]);

	var nextIndexElementVizibil = indexFeedbackVizibil + 1;
	var nextElementVizibil = listaFeedback[nextIndexElementVizibil];

	elementVizibil.removeClass("d-block");
	elementVizibil.addClass("d-none");

	$(nextElementVizibil).addClass("d-block");
	$(nextElementVizibil).removeClass("d-none");

	if (nextIndexElementVizibil == listaFeedback.length - 1) {
		nextButton.attr("disabled", "");
	}
}

//functii de validare
function validareNume(input)
{ 
    var regex = /^[A-Za-z]+$/;
    if(input.value.match(regex))
    {
	  	return true;
    }
    else
    {
      	return false;
    }
}
function validareText(input) {
	var regex = /^[A-Za-z0-9]+$/;
	if (input.value.match(regex)) {
		return true;
	}
	else {
		return false;
	}
}

function validareParola(input) {
	var regex = /^[A-Za-z0-9!]+$/;
	if (input.value.match(regex)) {
		return true;
	}
	else {
		return false;
	}
}

function validareEmail(input) {
	var regex = /^([a-zA-Z0-9_]+)@(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,})$/;
	if (input.value.match(regex)) {
		return true;
	}
	else {
		return false;
	}
}
function validareEmail(email) {
    var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(email);
};

function validareNumarTelefon(input) {
	var regex = /^[+][(]{0,1}40[)]{0,1}[\s/0-9]{9}$/;
	if (input.value.match(regex)) {
		return true;
	}
	else {
		return false;
	}
}

function validareData(input, format) {
	if (format = 'zz/ll/aaaa') {
		return valideaza_zz_ll_aaaa(input.value.replaceAll("-", "/"));
	}
	if (format = 'll/zz/aaaa') {
		return valideaza_ll_zz_aaaa(input.value.replaceAll("-", "/"));
	}
	if (format = 'zz/ll/aa') {
		return valideaza_zz_ll_aa(input.value.replaceAll("-", "/"));
	}
}

function valideaza_zz_ll_aaaa(text) {
	var textSplit = text.split("/");
	var zi = +textSplit[2];
	var luna = +textSplit[1];
	var an = +textSplit[0];

	var data = new Date(an + '/' + luna + '/' + zi);

	var dataValida = (data && (data.getMonth() + 1) == luna &&
		data.getDate() == zi && data.getFullYear() == an);

	return dataValida;
}

function valideaza_ll_zz_aaaa(text) {
	var textSplit = text.split("/");
	var zi = +textSplit[1];
	var luna = +textSplit[2];
	var an = +textSplit[0];

	var data = new Date(an + '/' + luna + '/' + zi);

	var dataValida = (data && (data.getMonth() + 1) == luna &&
		data.getDate() == zi && data.getFullYear() == an);

	return dataValida;
}

function valideaza_zz_ll_aa(text) {
	var textSplit = text.split("/");
	var zi = +textSplit[2];
	var luna = +textSplit[1];
	var an = Number("20" + textSplit[0]);

	var data = new Date(an + '/' + luna + '/' + zi);

	var dataValida = (data && (data.getMonth() + 1) == luna &&
		data.getDate() == zi && data.getFullYear() == an);

	return dataValida;
}

//atasarea functiilor de validare inputurilor in functie de tip
function valideazaNumeInput(input){
	if (validareNume(input)==false){
		input.nextElementSibling.classList.remove("d-none");
	}else{
		input.nextElementSibling.classList.add("d-none");
	}
}

function valideazaTextInput(input) {
	if (validareText(input) == false) {
		input.nextElementSibling.classList.remove("d-none");
	} else {
		input.nextElementSibling.classList.add("d-none");
	}
}

function valideazaEmailInput(input) {
	if (validareEmail(input) == false) {
		input.nextElementSibling.classList.remove("d-none");
	} else {
		input.nextElementSibling.classList.add("d-none");
	}
}

function valideazaParolaInput(input) {
	if (validareParola(input) == false) {
		input.nextElementSibling.classList.remove("d-none");
	} else {
		input.nextElementSibling.classList.add("d-none");
	}
}

function valideazaTelefonInput(input) {
	if (validareNumarTelefon(input) == false) {
		input.nextElementSibling.classList.remove("d-none");
	} else {
		input.nextElementSibling.classList.add("d-none");
	}
}

function valideazaDataInput(input) {
	if (validareData(input, "ll/zz/aaaa") == false) {
		input.nextElementSibling.classList.remove("d-none");
	} else {
		input.nextElementSibling.classList.add("d-none");
	}
}

//functii de submit pe butoane
function submitRegister() {
	var numeInput = document.getElementById("numeInputRegister");
	var prenumeInput = document.getElementById("prenumeInputRegister");
	var numarTelefonInput = document.getElementById("numarTelefonInputRegister");
	var dataNasteriiInput = document.getElementById("dataNasteriiInputRegister");
	var emailInput = document.getElementById("emailInputRegister");
	var parolaInput = document.getElementById("passwordInputRegister");
	var confirmaParolaInput = document.getElementById("confirmPasswordInputRegister");

	var numeValid = validareText(numeInput);
	var prenumeValid = validareText(prenumeInput);
	var numarTelefonValid = validareNumarTelefon(numarTelefonInput);
	var dataNasteriiValida = validareData(dataNasteriiInput, "ll/zz/aaaa")
	var emailValid = validareEmail(emailInput);
	var parolaValida = validareParola(parolaInput);
	var confirmaParolaValida = validareParola(parolaInput);
	var paroleleCorespund = parolaInput.value == confirmaParolaInput.value;

	var mesaj = "";

	if (numeValid && prenumeValid && numarTelefonValid && dataNasteriiValida && emailValid && parolaValida && confirmaParolaValida && paroleleCorespund) {
		mesaj = "Date valide";
	} else {
		if (!numeValid) {
			mesaj += "Numele nu este valid! "
		}
		if (!prenumeValid) {
			mesaj += "Prenumele nu este valid! "
		}
		if (!numarTelefonValid) {
			mesaj += "Numarul de telefon nu este valid! "
		}
		if (!dataNasteriiValida) {
			mesaj += "Data nasterii nu este valida! "
		}
		if (!emailValid) {
			mesaj += "Email-ul nu este valid! "
		}
		if (!parolaValida) {
			mesaj += "Parola nu este valida!"
		}
		if (!confirmaParolaValida) {
			mesaj += "Confirmarea parolei nu este valida!"
		}
		if (!paroleleCorespund) {
			mesaj += "Parolele nu corespund!"
		}
	}

	alert(mesaj);
	if (mesaj == "Date valide") {
		window.location.href = "./login.html";
	}
}

function submitLogin() {
	var emailInput = document.getElementById("emailInputLogin");
	var parolaInput = document.getElementById("passwordInputLogin");

	var emailValid = validareEmail(emailInput);
	var parolaValida = validareParola(parolaInput);

	var mesaj = "";

	if (emailValid && parolaValida) {
		mesaj = "Date valide";
	} else {
		if (!emailValid) {
			mesaj += "Email-ul nu este valid! "
		}
		if (!parolaValida) {
			mesaj += "Parola nu este valida!"
		}
	}

	alert(mesaj);

	if (mesaj == "Date valide") {
		window.location.href = "./index.html";
	}
}

//functii pentru play/pause galerie foto  - JQuery
var intervalGalerieFoto;

function playGallery() {
	var butonStartGalerieFoto = $("#butonStartGalerieFoto");
	var butonPauzaGalerieFoto = $("#butonPauzaGalerieFoto")
	butonStartGalerieFoto.attr("disabled", "");
	butonPauzaGalerieFoto.removeAttr("disabled");

	var intervalSecunde = +$("#intervalSecundeGalerieFoto").val();
	intervalGalerieFoto = setInterval(schimbaPozaGalerie, intervalSecunde * 1000);
}

function pauseGallery() {
	var butonStartGalerieFoto = $("#butonStartGalerieFoto");
	var butonPauzaGalerieFoto = $("#butonPauzaGalerieFoto");
	butonStartGalerieFoto.removeAttr("disabled");
	butonPauzaGalerieFoto.attr("disabled", "");

	clearInterval(intervalGalerieFoto);
}

function schimbaPozaGalerie() {
	var listaPozeMici = $(".galerie-foto-imagine-mica");
	var pozaActiva = $(".galerie-foto-imagine-mica.galerie-foto-imagine-activa");
	var indexPozaActiva = +pozaActiva.attr("id").replace("galerie-foto-", "");
	pozaActiva.removeClass("galerie-foto-imagine-activa");

	var indexNextPozaActiva = indexPozaActiva + 1;
	if (indexNextPozaActiva > listaPozeMici.length) {
		var repeta = $("input[@id=repetaGalerieFoto]:checked").length;
		if (repeta > 0) {
			indexNextPozaActiva = 1; // o luam de la capat
		} else {
			indexNextPozaActiva = indexNextPozaActiva - 1; //nu trebuie sa inaintam
		}
	}

	var nextPozaActiva = $("#galerie-foto-" + indexNextPozaActiva);
	nextPozaActiva.addClass("galerie-foto-imagine-activa");
	nextPozaActiva[0].click(); //simulam click-ul pe imaginea mica

	//resetarea setarii intervalului de apel al functiei in cazul in care in timpul executiei
	//se schimba valoarea intervalului de secunde
	clearInterval(intervalGalerieFoto);
	var intervalSecunde = +$("#intervalSecundeGalerieFoto").val();
	intervalGalerieFoto = setInterval(schimbaPozaGalerie, intervalSecunde * 1000);
}

// functii pentru slider jQuery

function schimbaNumarPozeSlider() {
	var toatePozele = $(".slider-image");

	//ascundem toate pozele ca mai apoi sa aratam doar cate introduce utilizatorul
	toatePozele.each(function (index, valoare) {
		$(valoare).removeClass("d-block");
		$(valoare).addClass("d-none");
	});

	var numarPoze = +$("#inputNumarPozeSlider").val();

	toatePozele.each(function (index, valoare) {
		if (index < numarPoze) {
			$(valoare).addClass("d-block");
			$(valoare).removeClass("d-none");
		} else {
			$(valoare).removeClass("d-block");
			$(valoare).addClass("d-none");
		}
	});
}

function deruleazaPozeInainte() {
	var toatePozele = $(".slider-image");
	var toatePozeleVizibile = $(".slider-image.d-block");

	//luam urmatoarea poza de dupa ultima vizibila
	var ultimaPozaVizibila = toatePozeleVizibile[toatePozeleVizibile.length - 1];
	var indexUltimaPozaVizibila = +$(ultimaPozaVizibila).attr("id").replace("slider-img-", "");

	if (indexUltimaPozaVizibila < toatePozele.length) {
		//ascundem prima poza vizibila
		var primaPozaVizibila = toatePozeleVizibile[0];
		$(primaPozaVizibila).removeClass("d-block");
		$(primaPozaVizibila).addClass("d-none");

		//derulam inainte
		var urmatoareaPozaVizibila = $("#slider-img-" + (indexUltimaPozaVizibila + 1))[0];
		$(urmatoareaPozaVizibila).removeClass("d-none");
		$(urmatoareaPozaVizibila).addClass("d-block");
	}
}

function deruleazaPozeInapoi() {
	var toatePozeleVizibile = $(".slider-image.d-block");

	//luam urmatoarea poza de dupa ultima vizibila
	var primaPozaVizibila = toatePozeleVizibile[0];
	var indexPrimaPozaVizibila = +$(primaPozaVizibila).attr("id").replace("slider-img-", "");

	if (indexPrimaPozaVizibila > 1) {
		//ascundem prima poza vizibila
		var ultimaPozaVizibila = toatePozeleVizibile[toatePozeleVizibile.length - 1];
		$(ultimaPozaVizibila).removeClass("d-block");
		$(ultimaPozaVizibila).addClass("d-none");

		//derulam inapoi
		var urmatoareaPozaVizibila = $("#slider-img-" + (indexPrimaPozaVizibila - 1))[0];
		$(urmatoareaPozaVizibila).removeClass("d-none");
		$(urmatoareaPozaVizibila).addClass("d-block");
	}
}

var intervalSlider;

function deruleazaPozeInainteAutomat(){
	var intervalSecundeDerulareAutomata = +$("#inputSecundeDerularePozeSlider").val();

	clearInterval(intervalSlider);
	intervalSlider = setInterval(autoClickDeruleazaInainteSliderFoto, intervalSecundeDerulareAutomata * 1000);
}

function autoClickDeruleazaInainteSliderFoto(){
	var nextSliderPhotoButton = $("#nextSliderPhoto");

	nextSliderPhotoButton.click();
}