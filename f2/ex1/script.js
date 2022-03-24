// let res = window.prompt("Tekst1");
// console.log(res);
// console.log(typeof(res));

var documentForm = document.forms.test

function formHandler(){
    console.log("Someone clicked!")
    console.log("value: " + documentForm.pole_tekstowe.value + ", type:" + typeof(documentForm.pole_tekstowe.value))
    console.log("value: " + documentForm.pole_liczbowe.value + ", type:" + typeof(documentForm.pole_liczbowe.value))
}