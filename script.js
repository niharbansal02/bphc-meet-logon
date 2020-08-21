var firebaseConfig = {
    apiKey: "AIzaSyCAv8FYuYDHp3xRhmiHpCDtl4aeWEyF-g4",
    authDomain: "meet-logon.firebaseapp.com",
    databaseURL: "https://meet-logon.firebaseio.com",
    projectId: "meet-logon",
    storageBucket: "meet-logon.appspot.com",
    messagingSenderId: "572836069259",
    appId: "1:572836069259:web:2bc40b69e1c647e0af398e",
    measurementId: "G-RGJSPE5H2N"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);
const auth = firebase.auth();
const firestore = firebase.firestore();

const settings = {timestampsInSnapshots: true};
firestore.settings(settings);

const docRef = firestore.doc("TimeTable/CreateNa");
docRef.set({
    any: "new"
}).then(() => {
    console.log("Yaayt");
}).catch( error => {
    console.log("Error: ", error);
});


regis_button = document.querySelector(".button_regis");
log_button = document.querySelector(".button_log");

regis_submit = document.querySelector(".regis_submit");
// console.log(regis_button);

// regis_button.onclick = () => {
//     document.querySelector(".register").style.visibility = "visible";
// };

regis_button.addEventListener("click", function(){
    document.querySelector(".register").style.visibility = "visible";
    document.querySelector(".logon").style.visibility = "hidden";
});

log_button.addEventListener("click", () => {
    document.querySelector(".logon").style.visibility = "visible";
    document.querySelector(".register").style.visibility = "hidden";
});

var x = document.createElement("BUTTON");
x.setAttribute("class", "hi_button");
x.innerHTML = "HI";
document.querySelector(".register").appendChild(x);


regis_submit.addEventListener("click", () => {
    link = document.querySelector(".link_1").value;
    x.setAttribute("onclick", `window.location.href='${link}'`) //Working 
    alert(link);
});




// var anchor = document.createElement("A");
// anchor.setAttribute("href", "https://www.google.com");
// anchor.setAttribute("target", "_blank");
// anchor.innerHTML = "HI";
// document.querySelector(".register").appendChild(anchor);

