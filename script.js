let firebaseConfig = {
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


regis_button = document.querySelector(".button_regis");
log_button = document.querySelector(".button_log");

regis_submit = document.querySelector(".regis_submit");

const dataListPlus = document.querySelector(".fas");
let count = 0;

regis_button.addEventListener("click", function(){
    regis_button.style.visibility = "hidden";
    log_button.style.visibility = "visible";
    
    document.querySelector(".register").style.visibility = "visible";
    document.querySelector(".logon").style.visibility = "hidden";
});

log_button.addEventListener("click", () => {
    log_button.style.visibility = "hidden";
    regis_button.style.visibility = "visible";
    document.querySelector(".logon").style.visibility = "visible";
    document.querySelector(".register").style.visibility = "hidden";
});

// let x = document.createElement("BUTTON");
// x.setAttribute("class", "hi_button");
// x.innerHTML = "HI";
// document.querySelector(".register").appendChild(x);


// regis_submit.addEventListener("click", () => {
//     link = document.querySelector(".link_1").value;
//     x.setAttribute("onclick", `window.location.href='${link}'`) //Working 
//     alert(link);
// });




// let anchor = document.createElement("A");
// anchor.setAttribute("href", "https://www.google.com");
// anchor.setAttribute("target", "_blank");
// anchor.innerHTML = "HI";
// document.querySelector(".register").appendChild(anchor);

// console.log("   Example String    ");
// console.log("    Stripped    ".trim());

const retrieveData = () => {
    let ttRef = firestore.collection("TimeTable");

    ttRef.doc("BIO F111")
        .get()
        .then( doc => {
            if(doc.exists) {
                // console.log("Doc Data: ", doc.data());
                docData = doc.data();
                console.log(typeof(docData));
                for (section in docData){
                    console.log(section);
                    console.log(docData[section]["Instructors"]);
                    console.log(docData[section]["Days"]);
                    console.log(docData[section]["Time"]);
                    // doc.data()[section];
                }
            } else {
                console.log("No such data exists");
            }
        }).catch( error => {
            console.log("Error: ", error);
        });

    
    // console.log(ttRef);
};

// retrieveData();

const displayCourseDet = courseObj => {
    let fireStoreRef;

    for(courseId in courseObj){
        fireStoreRef = firestore.collection("TimeTable/");    
        
        fireStoreRef.doc(courseId)
            .get()
            .then(doc => {
                if(doc.exists){
                    console.log(doc.data()["courseName"]);
                    let sections = (doc.data()["sections"]);
                    for(section in sections){
                        console.log(section);
                    }
                } else {
                    console.log("Doc Not found");
                }
            }).catch(error => {
                console.log(`${error} occured while fetching ${courseId}.`);
            });
    }

}



const log_on_submit = document.querySelector(".regis-submit");
log_on_submit.addEventListener("click", () => {
    let email = "f20191405@hyderabad.bits-pilani.ac.in"
    let fireStoreRef = firestore.doc("Users/" + email);

    let jsonObjArr = [];

    for(let i = 0; i <= count; i++){
        let courseId = document.querySelector(".dl" + i).value;
        let jsonObjStr = `{ "${courseId}": { "MeetLink": "meet", "StreamLink": "Alter" } }`;
        let jsonObj = JSON.parse(jsonObjStr);
        jsonObjArr.push(jsonObj);
    }
            
    let combObj = {};

    for(let i = 0; i <= count; i++){
        combObj = Object.assign(combObj, jsonObjArr[i]);
    }

    console.log(combObj);
    fireStoreRef.set(combObj)
        .then(() => {
            console.log("Successfully updated");
            displayCourseDet(combObj);
        }).catch(error => {
            console.log(`${error} occured`);
        });
        
    

});


let dateTime = document.querySelector(".date_time_holder");

dateFunc = () =>{
    const formatFixer = nom => {
        if(nom < 10)
            return "0" + nom;
        else
            return nom;
    };

    const stringDay = day => {
        let dayStr;
        switch(day){
            case 0: 
                dayStr = "Sunday"; 
                break;
            case 1:
                dayStr = "Monday";
                break;
            case 2:
                dayStr = "Tuesday";
                break;
            case 3:
                dayStr = "Wednesday";
                break;
            case 4:
                dayStr = "Thursday";
                break;
            case 5:
                dayStr = "Friday";
                break;
            case 6:
                dayStr = "Saturday";
                break;                       
        }
        return dayStr;
    };

    let d = new Date();
    yearN = d.getFullYear();
    monthN = formatFixer(d.getMonth() + 1);
    dateN = formatFixer(d.getDate());
    hourN = formatFixer(d.getHours());
    minN = formatFixer(d.getMinutes());
    secN = formatFixer(d.getSeconds());
    milSecN = d.getMilliseconds();
    dayWeekN = d.getDay();

    dateTime.innerHTML = dateN + " - " + monthN + " - " + yearN + "<br>" + stringDay(dayWeekN) + "<br>" + hourN + ":" + minN + ":" + secN;

    let dateObj = {
        "year": yearN,
        "month": monthN,
        "date": dateN,
        "hour": hourN,
        "min": minN,
        "sec": secN,
        "milliSec": milSecN,
        "day": dayWeekN
    };

    return dateObj;
};

setInterval(dateFunc, 100);

const addOptionsToDatalist = async () => {
    const dataList = document.querySelector("#course-list");
    // dataList.innerHTML += "<option value=\"BIO\">BIOOO</option>";
    // let fireStoreRef = firestore.collection("TimeTable/");
    const snapshot = await firestore.collection("TimeTable/").get();

    snapshot.docs.map(doc => {
        let currObj = doc.data();
        let courseId = doc.id;
        let courseName = currObj["courseName"];
        dataList.innerHTML += `<option value=\"${courseId}\">${courseName}</option>`;
    });

};

addOptionsToDatalist();

dataListPlus.onclick = () =>{
    count++;
    let x = document.createElement("INPUT");
    x.setAttribute("list", "course-list");
    x.setAttribute("class", `dl dl${count}`);
    document.querySelector(".datalists").appendChild(x);
    console.log(count);
}
