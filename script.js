function showSection(id){
document.querySelectorAll(".page").forEach(p=>p.classList.add("hidden"));
document.getElementById(id).classList.remove("hidden");
loadHistory();
}

function saveRecord(type,value,status){
let records = JSON.parse(localStorage.getItem("healthRecords")) || [];
records.push({type,value,status,date:new Date().toLocaleString()});
localStorage.setItem("healthRecords",JSON.stringify(records));
}

function loadHistory(){
let list = document.getElementById("historyList");
list.innerHTML="";
let records = JSON.parse(localStorage.getItem("healthRecords")) || [];

records.forEach(r=>{
let li = document.createElement("li");
li.innerHTML=`${r.date} - ${r.type}: ${r.value} (${r.status})`;
list.appendChild(li);
});
}

function updateDashboard(type,value,status){
if(type==="BP"){
document.getElementById("lastBP").innerText=value+" ("+status+")";
}
if(type==="Sugar"){
document.getElementById("lastSugar").innerText=value+" ("+status+")";
}
if(type==="BMI"){
document.getElementById("lastBMI").innerText=value+" ("+status+")";
}
generateTip(status);
}

function generateTip(status){
let tip="";
if(status==="High"){
tip="Reduce salt & sugar intake. Daily walking recommended.";
}
else if(status==="Low"){
tip="Maintain balanced diet and consult doctor if frequent.";
}
else{
tip="Great! Maintain healthy lifestyle and regular exercise.";
}
document.getElementById("healthTip").innerText=tip;
}

function checkBP(){
let sys = parseInt(document.getElementById("systolic").value);
let dia = parseInt(document.getElementById("diastolic").value);
let result = document.getElementById("bpResult");

let status="";
if(sys>=90 && sys<=120 && dia>=60 && dia<=80){
status="Normal";
result.className="result normal";
}
else if(sys>120 || dia>80){
status="High";
result.className="result high";
}
else{
status="Low";
result.className="result low";
}

result.innerHTML="Blood Pressure is "+status;
saveRecord("BP",sys+"/"+dia,status);
updateDashboard("BP",sys+"/"+dia,status);
}

function checkSugar(){
let sugar = parseInt(document.getElementById("sugarValue").value);
let result = document.getElementById("sugarResult");

let status="";
if(sugar>=70 && sugar<=140){
status="Normal";
result.className="result normal";
}
else if(sugar>140){
status="High";
result.className="result high";
}
else{
status="Low";
result.className="result low";
}

result.innerHTML="Sugar Level is "+status;
saveRecord("Sugar",sugar,status);
updateDashboard("Sugar",sugar,status);
}

function calculateBMI(){
let weight = parseFloat(document.getElementById("weight").value);
let height = parseFloat(document.getElementById("height").value)/100;
let result = document.getElementById("bmiResult");

let bmi = (weight/(height*height)).toFixed(2);
let status="";

if(bmi<18.5){
status="Underweight";
result.className="result low";
}
else if(bmi>=18.5 && bmi<=24.9){
status="Normal";
result.className="result normal";
}
else{
status="Overweight";
result.className="result high";
}

result.innerHTML="BMI: "+bmi+" ("+status+")";
saveRecord("BMI",bmi,status);
updateDashboard("BMI",bmi,status);
}