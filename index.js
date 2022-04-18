const checkboxes = document.getElementsByClassName("checkbox");
var checkNum = 0;
const generateBtn = document.getElementsByClassName("submit-btn")[0];
const form = document.getElementsByClassName("report-form")[0];
var owaspSans = false;

Array.from(checkboxes).forEach(ch => {
    ch.addEventListener("click", () => {
        var inputId = ch.id.split("-")[1];
        const input0 = document.querySelector(`#${inputId}`);
        const addStepsBtn = document.getElementsByClassName("add-step-btn")[0];
        if (ch.checked) {
            checkNum++;
            if (inputId === "steps") {
                addStepsBtn.style.display = "block";
            }
            else {
                if (inputId === "nameo") {
                    document.getElementById("nameo1").style.display = "block";
                    document.getElementById("nameo2").style.display = "block";
                    owaspSans = true;
                }
                else {
                    input0.style.display = "block";
                }

            }

        }
        else {
            checkNum--;
            if (inputId === "steps") {
                addStepsBtn.style.display = "none";
            }
            else {
                if (inputId === "nameo") {
                    document.getElementById("nameo1").style.display = "none";
                    document.getElementById("nameo2").style.display = "none";
                    owaspSans = false;
                }
                else {
                    input0.style.display = "none";
                }
            }

        }
        if (checkNum >= 1) {
            generateBtn.style.display = "inline-block";
        }
        else {
            generateBtn.style.display = "none";
        }
    });

    window.addEventListener("load", () => {
        ch.checked = false;
        form.reset();
    });
})

var currentStepNum = 0;
function addStep() {
    const stepsCon = document.getElementsByClassName("steps-con")[0];
    // var stepCon = document.createElement("div");
    // var stepInput = document.createElement("input");
    // var closeImg = document.createElement("img");
    // stepInput.setAttribute("type", "text");
    // stepInput.setAttribute("id", "steps");
    // stepInput.setAttribute("name", "step");
    // stepInput.setAttribute("placeholder", `Step ${currentStepNum}`);

    // closeImg.setAttribute("src", "./img/close.png");
    // closeImg.setAttribute("onclick", "removeStep(this)");
    // closeImg.classList.add(`close-img-${currentStepNum}`);
    // closeImg.classList.add("close-img");

    // stepCon.classList.add("step-con");
    // stepCon.classList.add(`step-con-${currentStepNum}`);
    // stepCon.appendChild(stepInput);
    // stepCon.appendChild(closeImg);
    currentStepNum++;
    var stepHTML = "";
    for (var i = 0; i < currentStepNum; i++) {
        stepHTML = stepHTML + `<div class="step-con"><input type="text" name="steps" class="steps-input" placeholder="Step ${i + 1}"><img src="./img/close.png" class="close-img" onclick="removeStep()" ></div>`;
    }
    // stepsCon.appendChild(stepCon);
    stepsCon.innerHTML = stepHTML;
}

function removeStep() {
    currentStepNum--;
    const stepsCon = document.getElementsByClassName("steps-con")[0];
    var stepHTML = "";
    for (var i = 0; i < currentStepNum; i++) {
        stepHTML = stepHTML + `<input type="text" name="steps" class="steps-input" placeholder="Step ${i + 1}"><img src="./img/close.png" class="close-img" onclick="removeStep()" >`;
    }
    stepsCon.innerHTML = stepHTML;
}

form.addEventListener("submit", (event) => {
    event.preventDefault();
    console.log(event.target);
    var url = event.target[1].value;
    var name = event.target[3].value;
    var no1 = event.target[5].value;
    var no2 = event.target[6].value;
    var servity = event.target[8].value;
    var browser = event.target[10].value;
    var summary = event.target[12].value;
    var temp = 15;
    var stepsList = [];
    while (true) {
        if (event.target[temp].classList[0] === "steps-input") {
            stepsList.push(event.target[temp].value);
        }
        else {
            break;
        }
        temp++;
    }
    var code = event.target[temp + 1].value;
    var reference = event.target[temp + 3].value;
    var mitigation = event.target[temp + 5].value;
    // console.log(event.target);
    // console.log(url, name, nameo, servity, browser, summary, code, reference, mitigation);
    // console.log(stepsList);
    var generatedReport = "";
    if (url) {
        generatedReport = generatedReport + `URL : ${url}<br><br>`;
    }
    if (name) {
        generatedReport = generatedReport + `Vulnerability Name : ${name}<br><br>`;
    }
    if (no1 !== "None" && no2 !== "None" && no1 && no2) {
        generatedReport = generatedReport + `Vulnerability Name : ${no1}, ${no2}<br><br>`;
    }
    if (servity !== "none") {
        generatedReport = generatedReport + `Servrity : ${servity}<br><br>`;
    }
    if (browser !== "none") {
        generatedReport = generatedReport + `Browser : ${browser}<br><br>`;
    }
    if (summary) {
        generatedReport = generatedReport + `Summary :<br>&nbsp&nbsp&nbsp&nbsp${summary}<br><br>`;
    }
    if (stepsList.length !== 0) {
        generatedReport = generatedReport + `Steps :<br>`;
        for (var i = 0; i < stepsList.length; i++) {
            if (stepsList[i] !== "") {
                generatedReport = generatedReport + `${i + 1} : ${stepsList[i]}<br>`;
            }
        }
        generatedReport = generatedReport + "<br>";
    }
    if (code) {
        generatedReport = generatedReport + `Code :<br><code>${code.toString()}</code><br><br>`;
    }
    if (reference) {
        generatedReport = generatedReport + `Reference :<br>&nbsp&nbsp&nbsp&nbsp${reference}<br><br>`;
    }
    if (mitigation) {
        generatedReport = generatedReport + `Mitigation :<br>&nbsp&nbsp&nbsp&nbsp${mitigation}<br><br>`;
    }

    const generatedReportCon = document.getElementsByClassName("generated-report-con")[0];
    generatedReportCon.innerHTML = generatedReport;
})

function valNameChange(target){
    const nameo2 = document.getElementById("nameo2");
    var valNameUserChoice = target.value;
    console.log(valNameUserChoice)
    if(valNameUserChoice === "Owasp"){
        nameo2.innerHTML = '<option value="None">None</option><option value="Broken Access Control">Broken Access Control</option><option value="Cryptographic Failures">Cryptographic Failures</option><option value="Injection">Injection</option><option value="Insecure Design">Insecure Design</option><option value="Security Misconfiguration">Security Misconfiguration</option><option value="Vulnerable and Outdated Components">Vulnerable and Outdated Components</option><option value="Identification and Authentication Failures">Identification and Authentication Failures</option><option value="Software and Data Integrity Failures">Software and Data Integrity Failures</option><option value="Security Logging and Monitoring Failures">Security Logging and Monitoring Failures</option><option value="Server-Side Request Forgery">Server-Side Request Forgery</option>'
    }
    else if(valNameUserChoice === "Sans"){
        nameo2.innerHTML = "";
        var sansList = ['None','Improper Restriction of Operations within the Bounds of a Memory Buffer',"Improper Neutralization of Input During Web Page Generation ('Cross-site Scripting')",'Improper Input Validation','Information Exposure','Out-of-bounds Read',"Improper Neutralization of Special Elements used in an SQL Command ('SQL Injection')",'Use After Free','Integer Overflow or Wraparound',"Cross-Site Request Forgery (CSRF)","Improper Limitation of a Pathname to a Restricted Directory ('Path Traversal')","Improper Neutralization of Special Elements used in an OS Command ('OS Command Injection')",'Out-of-bounds Write','Improper Authentication','NULL Pointer Dereference','Incorrect Permission Assignment for Critical Resource','Unrestricted Upload of File with Dangerous Type','Improper Restriction of XML External Entity Reference',"Improper Control of Generation of Code ('Code Injection')",'Use of Hard-coded Credentials','Uncontrolled Resource Consumption','Missing Release of Resource after Effective Lifetime','Untrusted Search Path','Deserialization of Untrusted Data','Improper Privilege Management','Improper Certificate Validation']
        for(var i = 0; i < sansList.length; i++){
            nameo2.innerHTML = nameo2.innerHTML + `<option value="${sansList[i]}">${sansList[i]}</option>`;
        }
    }
    else if(valNameUserChoice === "none"){
        nameo2.innerHTML = "";
    }
}

/*
function copyText() {
    const generatedReportCon = document.getElementsByClassName("generated-report-con")[0];
    const mySmartTextarea = document.createElement('textarea');
        
        // Step 2: Store your string in innerHTML of mySmartTextarea element       
        const parser = new DOMParser();
        mySmartTextarea.innerHTML = parser.parseFromString(generatedReportCon.innerHTML, "text/html"); 
        // mySmartTextarea.innerHTML = "<p>hi/nk</p>";
        console.log(mySmartTextarea.innerHTML)
        // Step3: find an id element within the body to append your mySmartTextarea there temporarily
        const parentElement = document.getElementsByClassName('generated-report-sec')[0];
        parentElement.appendChild(mySmartTextarea);
        
        // Step 4: Simulate selection of your text from mySmartTextarea programmatically 
        mySmartTextarea.select();
        
        // Step 5: simulate copy command (ctrl+c)
        // now your string with newlines should be copied to your clipboard 
        // document.execCommand('copy');

        // Step 6: Now you can get rid of your "smart" textarea element
        parentElement.removeChild(mySmartTextarea);
}
*/
