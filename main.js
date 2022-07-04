
//>>>>>>>>>[ TYPING EFFECT ]<<<<<<<<<<<//

/*>>>>>>>>>>  THIS FUNCTION TAKED 2 DAYS!! <<<<<<<<<<<<<<<<*/

function reTypingPage(arrayWithTextsLocations,timeBetweenTypingLetters,marker){
    let reloaded;
    if(sessionStorage.reloaded != null && sessionStorage.reloaded != ''){
        if(JSON.parse(sessionStorage.reloaded) == true){
            reloaded = false
            sessionStorage.reloaded = reloaded
        }else{
            reloaded = true
            sessionStorage.reloaded = reloaded
        }
        
    }else{
        reloaded = false
        sessionStorage.reloaded = reloaded
    }






    if(JSON.parse(sessionStorage.reloaded) == false){
        // let innerHTMLCopy = [];
    // for(i=0;i<arrayWithTextsLocations.length;i++){
    //     let eleLocation = document.querySelector(arrayWithTextsLocations[i])
    //     innerHTMLCopy.push(eleLocation.innerHTML)
    // }


    let lastTime;
    let textsArray = []
    for(i=0;i<arrayWithTextsLocations.length;i++){
        let eleLocation = document.querySelector(arrayWithTextsLocations[i])
        let ele = eleLocation.textContent
        textsArray.push(ele)
        eleLocation.textContent = ''
    }
    let m=0;
    let itIsFirstLoop = true;
    for(i=0;i<textsArray.length;i++){
        if(itIsFirstLoop){
            lastTime = 100
            itIsFirstLoop = false
        }else{
            lastTime += textsArray[i-1].length*timeBetweenTypingLetters
        }
        let text = textsArray[i]
        let eleLocation = document.querySelector(arrayWithTextsLocations[i])
        setTimeout(() => {
            if(marker==true){
                var style = document.createElement('style');
            console.log(arrayWithTextsLocations[m])
            style.innerHTML = `
                ${arrayWithTextsLocations[m]} {
                width:fit-content;
                text-align:center;
                border-right: 2px solid #333;
                padding-right:2px;
                animation: blinking 0.7s infinite;
                }
                @keyframes blinking {
                    from{
                        border-right: 2px solid #555;
                    }
                    to{
                        border-right: 2px solid transparent;
                    }
                }
                `;
            document.head.appendChild(style);
            m++
            }
            let l=0;
            let eleTime = setInterval(() => {
                eleLocation.textContent +=text[l]
                l = l+1
                if(l === text.length){
                    clearInterval(eleTime)
                }
            }, timeBetweenTypingLetters);
        }, lastTime);
    }
    // setTimeout(()=>{
    //     for(i=0;i<arrayWithTextsLocations.length;i++){
    //         let eleLocation = document.querySelector(arrayWithTextsLocations[i])
    //         eleLocation.innerHTML = innerHTMLCopy[i]
    //     }
    // }, lastTime)
    setTimeout(()=>{
        location.reload()
    },lastTime + (textsArray[textsArray.length - 1].length * timeBetweenTypingLetters))
    }
}

//>>>>>>>>>[ END OF TYPING EFFECT ]<<<<<<<<<<<//

//////////////[ random arrayelements ]///////////////

/*>>>>>>>>>> THIS FUNCTION TAKED WHOLE DAY!! <<<<<<<<<<<<<<<<*/

function randomArrayElements(array){
    let randomNumbers = [];
    let test = [];
    for(i=0;i<array.length;i++){
        let randomNumber = Math.floor(Math.random() * array.length)
        for(i=0;i<2000000;i++){
            if(randomNumbers.includes(randomNumber)){
                randomNumber = Math.floor(Math.random() * array.length)
            }else{
                randomNumbers.push(randomNumber)
                test.push(array[randomNumber])
                break
            }
        }
    }
    array.splice(0,array.length)
    for(i=0;i<test.length;i++){
        array.push(test[i])
    }
}

//////////////[ end of random arrayelements ]///////////////

//////////////[ Typing things ]///////////////
function typing(nameLocation , duration){
    let locName = document.querySelector(nameLocation)
    let myName = locName.textContent
    locName.textContent = ''
    let i=0;
    let myNameTime = setInterval(() => {
        locName.textContent += myName[i]
        i = i+1
        if(i === myName.length){
            clearInterval(myNameTime)
        }
    }, duration); 
}
//////////////[ END Typing things ]///////////////


//////////////[ avoid paste ]///////////////

function avoidPaste(inputId , message1 , message2){
    let pasted;
    const input =document.getElementById(inputId)
    if(sessionStorage.pasted != null && sessionStorage.pasted != ''){
        pasted = sessionStorage.pasted
    }else{
        pasted = false
    }
    input.onpaste = () =>{
        sessionStorage.pasted = pasted
        if(!pasted){
            input.value = message1
            pasted =true
            return false
        }else{
            input.value = message2
            return false
        }
    }
}
avoidPaste('word-field',"You can't paste anything here." ,'Did i stutter ?!')
//////////////[ end of avoid paste ]///////////////



const title =document.querySelector('.header h2')
const levelName =document.querySelector('.message .lvl')
const levelTime =document.querySelector('.message .seconds')
const startbtn =document.querySelector('.start-btn')
const randomWord =document.querySelector('.random-word')
const wordField =document.querySelector('.word-field')
const upcomingWords =document.querySelector('.upcoming-words')
const timeLeft =document.querySelector('.time-left')
const playerScore =document.querySelector('.player-score')
const totalScore =document.querySelector('.total-score')
const finishMessage =document.querySelector('.finish')
const reloadBtn =document.querySelector('.reload-btn')
const chooseLanguage =document.querySelector('.choose-language')
const chooseLanguageBtn =document.querySelector('#choose-language')
const chooseLvl =document.querySelector('.choose-lvl')




let words;
let lanMood;

if(localStorage.lanMood != null && localStorage.lanMood != ''){
    lanMood = localStorage.lanMood
}else{
    lanMood = "En";
}

wordsLan()
chooseLanguageBtn.textContent=lanMood
chooseLanguageBtn.onclick=()=>{
    chooseLanguage.style.display='flex'
}
function changeLanMood(id){
    lanMood = id
    chooseLanguageBtn.textContent = lanMood
    chooseLanguage.style.display='none'
    wordsLan()
    localStorage.lanMood = id
    refreshDefaults()
}
let wordsCopy = words.slice(0,words.length)




const levels = {
    "Hard": 2,
    "Normal":3,
    "Easy":5
}
let gameMood = "Normal";
levelName.onclick=()=>{
    chooseLvl.style.display='flex'
}
function changeGameMood(id){
    gameMood = id
    chooseLvl.style.display='none'
    refreshDefaults()
}
let defaultLevelName;
let defaultLevelTime;
refreshDefaults()


let pageTexts=[".title",".message",".random-word",".start-btn",".upcoming-words",".time",".score"]
reTypingPage(pageTexts,25,false)


let itIsTheFirstWord;
startbtn.onclick=()=>{
    itIsTheFirstWord = true;
    wordField.focus();
    startbtn.remove()
    showUpcomingWords()
    startPlay()
}
reloadBtn.onclick=()=>{
    itIsTheFirstWord = true;
    wordField.focus();
    reloadBtn.remove()
    playerScore.textContent = 0
    words = wordsCopy
    showUpcomingWords()
    startPlay()
}


function refreshDefaults(){
    defaultLevelName = gameMood;
    defaultLevelTime = levels[defaultLevelName]

    levelName.textContent = defaultLevelName
    levelTime.textContent = defaultLevelTime
    timeLeft.textContent = defaultLevelTime
    totalScore.textContent = words.length
}
function wordsLan(){
    if(lanMood == "En"){
        let groubs = [["Hello" , "Funny" , "Arabs" , "Programming" , "Account" , "Category" , "Type" , "Root" , "Garden" , "Sky" , "Blue" , "Table" , "Lake" , "Capital" , "Better" ,"House" , "Flower" , "Car" , "Box" , "Fox" , "Dark" , "Main" , "light" , "Stars" , "ballon" , "Fish" , "Tree" , "Three" , "Field" , "Monkey" , "Doctor" , "Numbers" , "Bed" , "Animals" , "Jump" , "Four" , "Five","hen","ten","Shift"],
        ["One","Two","three","four","five","six","Seven","Eight","Nine","Ten","Eleven","Twelve","Thirteen ","Fifteen","sixteen","twenty","Thirty","fourty","fifty","Sixty","Seventy","Ninety","Hundred","seventeen","Eighteen"],
        ["Face","nose","Mouth","ears","tall","Short","Player","Football","Bike","Fat","Thin","Earth","age","Head","Hear","miss","Channel","Internet","window","Home","view","File","edit","code","date","key","Search","play","question","Patient","wait","restaurant","Social","Site","Avoid"]]
        words = groubs[Math.floor(Math.random() * groubs.length) ]
        randomWord.textContent="Hello !"
    }else if(lanMood == "Ar"){
        let groubs = [["مرح","العرب","برنامج","حساب","فئة","نوع","جزر","حديقة","سماء","أزرق","مكتب","بحيرة","عاصمة","أفضل","منزل","زهرة","سيارة","صندوق","ثعلب","ظلام","ضوء","رئيسي","نجوم","أسد","سمكة","شجرة","ثلاثة","قرد","حقل","نمر","أرقام","حيوانات","يقفز","رمال","أربعة","خمسة","دجاجة","كلب", "عشرة","حقيبة"],
        ["واحد","اثنان","ثلاثة","أربعة","خمسة","ستة","سبعة","ثمانية","تسعة","عشرة","ألفان","مئتان","مليون","مليونان","صفر","عشرين","ثلاثون","أربعون","خمسون","ستون", "سبعون" , "تسعون","مائة" , "سبعة عشر" , "ثمانية عشر" ],
        
["وجه" , "أنف" , "فم" , "آذان" , "طويل" , "قصير" , "لاعب" , "كرة قدم" , "دراجة" , "سمين" , "نحيف" , "أرض" , " العمر "," الرأس "," سماع "," فقد "," القناة "," الإنترنت "," النافذة "," الصفحة الرئيسية "," عرض "," ملف "," تحرير "," رمز "," تاريخ " , "مفتاح" , "بحث" , "تشغيل" , "سؤال" , "المريض" , "انتظار" , "مطعم" , "اجتماعي" , "موقع" ,"تجنب"]]
        words = groubs[Math.floor(Math.random() * groubs.length) ]
        randomWord.textContent=" ! مرحباً"
    }
}
function showUpcomingWords(){
    upcomingWords.innerHTML = ''
    randomArrayElements(words)
    for(i=0;i<words.length;i++){
        upcomingWords.innerHTML +=`
        <p>${words[i]}</p>
        <style>
            .upcoming-words p:first-child{
                background:green;
            }
        </style>
        `
        randomWord.textContent = words[0]
    }
}
function removeFirstElement(){
    words.splice(0,1)
    upcomingWords.innerHTML = ''
    for(i=0;i<words.length;i++){
        upcomingWords.innerHTML +=`
        <p>${words[i]}</p>
        <style>
            .upcoming-words p:first-child{
                background:green;
            }
        </style>
        `
        randomWord.textContent = words[0]
    }
}
function estimates(){
    if(words.length>0){
        removeFirstElement()
    }else{
        if((playerScore.textContent/totalScore.textContent) >= 0.9 ){
            finishMessage.textContent = "Excellent!"
            finishMessage.style.display ='flex'
            finishMessage.style.color= 'rgb(0, 153, 0)'
        }if(0.9 > (playerScore.textContent/totalScore.textContent) >= 0.7 ){
            finishMessage.textContent = "Very Good!"
            finishMessage.style.display ='flex'
            finishMessage.style.color= '#62a837'
        }if(0.7 > (playerScore.textContent/totalScore.textContent) >= 0.5 ){
            console.log('m')
            finishMessage.textContent = "Good."
            finishMessage.style.display ='flex'
            finishMessage.style.color= 'rgb(153, 140, 0)'
        }if(0.5 > (playerScore.textContent/totalScore.textContent) >= 0.3 ){
            finishMessage.textContent = "agreeable."
            finishMessage.style.display ='flex'
            finishMessage.style.color= 'rgb(153, 74, 0)'
        }if((playerScore.textContent/totalScore.textContent) < 0.3){
            finishMessage.innerHTML = "Try again, You can do it ."
            finishMessage.style.display ='flex'
            finishMessage.style.color= 'red'
        }
    }
}

function startPlay(){
    if(itIsTheFirstWord){
        timeLeft.textContent = defaultLevelTime * 2
        let timer =setInterval(() => {
            timeLeft.textContent--
            if(timeLeft.textContent == 0){
                clearInterval(timer)
                if(words.length>0){
                    if(wordField.value == randomWord.textContent){
                        playerScore.textContent++
                        wordField.value = ''
                        startPlay()
                        estimates()
                    }else{
                        wordField.value = ''
                        startPlay()
                        estimates()
                    }
                }else{
                    clearInterval(timer)
                    reloadBtn.style.display='block'
                    estimates()
                }
            }
        },1000)
        itIsTheFirstWord = false
    }else{
        timeLeft.textContent = defaultLevelTime
        let timer =setInterval(() => {
            timeLeft.textContent--
            if(timeLeft.textContent == 0){
                clearInterval(timer)
                if(words.length>0){
                    if(wordField.value == randomWord.textContent){
                        playerScore.textContent++
                        wordField.value = ''
                        startPlay()
                        estimates()
                    }else{
                        wordField.value = ''
                        startPlay()
                        estimates()
                    }
                }else{
                    clearInterval(timer)
                    reloadBtn.style.display='block'
                    estimates()
                }
            }
        },1000)
    }
}
finishMessage.onclick=()=>{
    finishMessage.style.display="none"
}



if(sessionStorage.reloaded != null && sessionStorage.reloaded != ''){
    if(JSON.parse(sessionStorage.reloaded) == true){
            document.querySelector('.circle1').style.display='block'
            document.querySelector('.circle2').style.display='block'
    }else{
        setTimeout(()=>{
            document.querySelector('.circle1').style.display='block'
            document.querySelector('.circle2').style.display='block'
        },6500)
    }
}else{
    setTimeout(()=>{
        document.querySelector('.circle1').style.display='block'
        document.querySelector('.circle2').style.display='block'
    },6500)
}





wordField.onkeypress = ()=>{
    var snd = new Audio("../t.wav");  
    snd.playbackRate=1.7
    snd.play();
}