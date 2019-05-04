function PageLoaded()
{
    ShowSection('welcome');
}

var screen;
function ShowSection(id)
{
    //hide all sections
    var section1 = document.getElementById('game');
    section1.style.visibility="hidden";
    var section2 = document.getElementById('welcome');
    section2.style.visibility="hidden";
    var section3 = document.getElementById('signUp');
    section3.style.visibility="hidden";
    var section4 = document.getElementById('login');
    section4.style.visibility="hidden";
    var section5 = document.getElementById('settings');
    section5.style.visibility="hidden";

    window.clearInterval(interval);

    document.getElementById('music').pause();
    document.getElementById('music').currentTime = 0;
    setDefault();
    
    //show only one section
    var selected = document.getElementById(id);
    selected.style.visibility="visible";
    screen=id;
    if(id=="game"){
        document.getElementById('pacName').innerHTML=currentUser.firstName;
        document.getElementById('music').play();
        Start();

    }
}

function setDefault(){
    document.getElementById("userName").value = "";
    document.getElementById("password").value = "";
    document.getElementById("firstName").value = "";
    document.getElementById("lastName").value = "";
    document.getElementById("emailAdd").value = "";
    document.getElementById("birthDate").value = "";
    document.getElementById("userNameLog").value = "";
    document.getElementById("passwordLog").value = "";
    document.getElementById("upSet").value = "";
    document.getElementById("downSet").value = "";
    document.getElementById("leftSet").value = "";
    document.getElementById("rightSet").value = "";
    document.getElementById("ballsnum").value = "";
    document.getElementById("5color").value = "#000000";
    document.getElementById("15color").value = "#000000";
    document.getElementById("25color").value = "#000000";
    document.getElementById("maxTime").value = "";
    document.getElementById("monsNum").value = "";

}

function openModal(){
    document.getElementById('about').style.display = "block";
}

function closeModal(){
    document.getElementById('about').style.display = "none";
}

window.onclick = function(event) {
    if (event.target == document.getElementById('about')) {
        document.getElementById('about').style.display = "none";
    }
}

window.onkeydown = function(event){
    if(event.code=="Escape"){
        document.getElementById('about').style.display = "none";
    }
}

class user{
    constructor(userName,password, firstName, lastName, email, birthDate){
        this.userName=userName;
        this.password=password;
        this.firstName=firstName;
        this.lastName=lastName;
        this.email=email;
        this.birthDate=birthDate;
    }
}

var userA= new user('a','a','a','a','a@gmail.com','444');
var users=[userA];
var currentUser;

function saveChanges(){
    if(screen == "signUp"){
        window.alert("submitted");
        saveUser();
        ShowSection('settings');
    }
    else if(screen == "settings"){
        alert("Setting Saved!");
        saveSettings();
        ShowSection('game');
    }
}

function saveUser(){
    var name=document.getElementById("userName").value;
    var password=document.getElementById("password").value;
    var firstName=document.getElementById("firstName").value;
    var lastName=document.getElementById("lastName").value;
    var email=document.getElementById("emailAdd").value;
    var birthDate=document.getElementById("birthDate").value;
    var u= new user(name,password,firstName,lastName,email,birthDate);
    users[users.length]=u;
    currentUser=u;
}

function checkLogin(){
    var userName=document.getElementById("userNameLog").value;
    var password=document.getElementById("passwordLog").value;
    var i;
    var l=users.length;
    for (i=0; i<l; i++){
        if(users[i].userName==userName & users[i].password==password){
            currentUser=users[i];
            ShowSection('settings');
            break;
        }
    }
    if(i == l)
        alert("Wrong user name or password!");
}

var up;
var down;
var left;
var right;

function clear(arrow){
    document.getElementById(arrow).clear;
}

function setUpKey(event){
    up=event.code;
    document.getElementById('upSet').value=up;
}

function setDownKey(event){
    down=event.code;
    document.getElementById('downSet').value=down;
}
function setLeftKey(event){
    left=event.code;
    document.getElementById('leftSet').value=left;
}
function setRightKey(event){
    right=event.code;
    document.getElementById('rightSet').value=right;
}

var ballsNum;
var fiveColor;
var fifteenColor;
var twentyColor;
var maxTime;
var monsNum;

function getRandomColor(){
    var letters='0123456789ABCDEF';
    var color='#';
    for(var i=0; i<6; i++){
        color+=letters[Math.floor(Math.random()*16)];
    }
    return color;
}

function randomSet(){
    up="ArrowUp";
    down="ArrowDown";
    left="ArrowLeft";
    right="ArrowRight";
    document.getElementById('upSet').value="ArrowUp";
    document.getElementById('downSet').value="ArrowDown";
    document.getElementById('leftSet').value="ArrowLeft";
    document.getElementById('rightSet').value="ArrowRight";
    document.getElementById('ballsnum').value=Math.floor(Math.random()*40)+50;
    document.getElementById('5color').value=getRandomColor();
    document.getElementById('15color').value=getRandomColor();
    document.getElementById('25color').value=getRandomColor();
    document.getElementById('maxTime').value=Math.floor(Math.random()*3540)+60;
    document.getElementById('monsNum').value=Math.floor(Math.random()*2)+1;
}

function saveSettings(){
    ballsNum=document.getElementById('ballsnum').value;
    fiveColor=document.getElementById('5color').value;
    fifteenColor=document.getElementById('15color').value;
    twentyColor=document.getElementById('25color').value;
    maxTime=document.getElementById('maxTime').value;
    monsNum=document.getElementById('monsNum').value;
}

var context;
var shape = new Object();
var board;
var balls;
var pac_color;
var start_time;
var time_elapsed;
var interval;
var balls5=0;
var balls15=0;
var balls25=0;
var mons = [new Object(),new Object(), new Object()];
var fruits = ["apple.png", "watermelon.png", "orange.png", "lemon.png"]
var choosenFruit;
var orange= new Object();
var medication = new Object();
var mStartTime;
var medicationLeft = 2;

function Start() {
    choosenFruit = Math.floor(Math.random()*3);
    balls5=0;
    balls15=0;
    balls25=0;
    lives=2;
    context = document.getElementById('canvas').getContext("2d");
    board = new Array();
    if(monsNum>=1){
        mons[0].i=0;
        mons[0].j=0;
    }
    if(monsNum>=2){
        mons[1].i=19;
        mons[1].j=0;
    }
    if(monsNum>=3){
        mons[2].i=19;
        mons[2].j=9;
    }
    orange.eaten=false;
    medicationLeft = 2;
    medication.i = -1;
    medication.j = -1;    
    orange.i=0;
    orange.j=9;
    balls = 0;
    pac_color = "yellow";
    var cnt = 200;
    var food_remain = ballsNum;
    var pacman_remain = 1;
    var numberOf60= Math.floor(food_remain*0.6);
    var numberOf30= Math.floor(food_remain*0.3);
    var numberOf10= Math.floor(food_remain*0.1);
    if((numberOf60+numberOf30+numberOf10) < ballsNum)
        numberOf60+= (ballsNum-(numberOf60+numberOf30+numberOf10));
    start_time = new Date();
    bonusPoints=0;
    for (var i = 0; i < 20; i++) {
        board[i] = new Array();
        for (var j = 0; j < 10; j++) {
            if ((i === 4 && j === 2) || (i === 1 && j === 3) || (i === 1 && j === 4) || (i === 1 && j === 5) || (i === 1 && j === 6)
                    || (i=== 5 && j===2) || (i===5 && j===6) || (i===5 && j===7) || (i===5 && j===8) || (i===6 && j===6) || (i===6 && j===7) ||
                            (i===6 && j===8 ) || (i===8 && j===1) || (i===9 && j===1) || (i===10 && j===1) || (i===11 && j===1) ||
                                (i===12 && j===1) || (i===12 && j===5) || (i===12 && j===6) || (i===13 && j===1) ||
                                    (i===13 && j===5) || (i===13 && j===6) || (i===14 && j===5) || (i===14 && j===6) || 
                                        (i===15 && j===5) || (i===15 && j===6) || (i===17 && j===1) || (i===17 && j===2) ||
                                            (i===18 && j===1) || (i===18 && j===2) || (i===18 && j===6) || (i===18 && j===7) || (i===18 && j===8)) {
                board[i][j] = 4;
            } else {
                var randomNum = Math.random();
                if (randomNum <= 1.0 * food_remain / cnt) {
                    var newRandomNum=Math.random();
                    if(newRandomNum<=0.6 && numberOf60>0){
                        board[i][j] = 1;
                        numberOf60--;
                    }
                    else if(newRandomNum>0.6 && newRandomNum<=0.9  && numberOf30>0){
                        board[i][j] = 5;
                        numberOf30--;
                    }
                    else if(numberOf10>0){
                        board[i][j] = 6;
                        numberOf10--;
                    }
                    food_remain--;
                } else if (randomNum < 1.0 * (pacman_remain + food_remain) / cnt &&  i!==0 && j!==0 && i!==19 && j!==9)  {
                    shape.i = i;
                    shape.j = j;
                    pacman_remain--;
                    board[i][j] = 2;
                    
                } else {
                    board[i][j] = 0;
                }
                cnt--;
            }
        }
    }
    if(pacman_remain==1){
        var location= findRandomEmptyCell(board);
        while(location[0]==0 || location[1]==0 || location[0]==19 || location[1]==9){
            location=findRandomEmptyCell(board);
        }
        lastDirect=4;
        shape.i=location[0];
        shape.j=location[1];
    }
    while (numberOf60 > 0) {
        var emptyCell = findRandomEmptyCell(board);
        board[emptyCell[0]][emptyCell[1]] = 1;
        numberOf60--;
    }
    while (numberOf30 > 0) {
        var emptyCell = findRandomEmptyCell(board);
        board[emptyCell[0]][emptyCell[1]] =5;
        numberOf30--;
    }
    while (numberOf10 > 0) {
        var emptyCell = findRandomEmptyCell(board);
        board[emptyCell[0]][emptyCell[1]] = 6;
        numberOf10--;
    }
    keysDown = {};
    addEventListener("keydown", function (e) {
        keysDown[e.code] = true;
    }, false);
    addEventListener("keyup", function (e) {
        keysDown[e.code] = false;
    }, false);
    interval = setInterval(UpdatePosition, 80);
}


function findRandomEmptyCell(board) {
    var i = Math.floor((Math.random() * 18) + 1);
    var j = Math.floor((Math.random() * 8) + 1);
    while (board[i][j] !== 0) {
        i = Math.floor((Math.random() * 18) + 1);
        j = Math.floor((Math.random() * 8) + 1);
    }
    return [i, j];
}

/**
* @return {number}
*/
function GetKeyPressed() {
    if (keysDown[up]) {
        return 1;
    }
    if (keysDown[down]) {
        return 2;
    }
    if (keysDown[left]) {
        return 3;
    }
    if (keysDown[right]) {
        return 4;
    }
}

var lastDirect=4;
var lives=2;
var bonusPoints=0;

function Draw(x) {
    context.clearRect(0, 0, document.getElementById('canvas').width, document.getElementById('canvas').height); //clean board
    context.strokeRect(0,0,1200,600);
    var score=balls15*15+balls25*25+balls5*5-(2-lives)*10+bonusPoints;
    lblScore.value = score.toString();
    lblTime.value = Math.floor(maxTime-time_elapsed);
    lblLives.value=lives;
    for (var i = 0; i < 20; i++) {
        for (var j = 0; j < 10; j++) {
            var center = new Object();
            center.x = i * 60 + 30;
            center.y = j * 60 + 30;
            if (board[i][j] === 2) {
                if(x==1){
                    context.beginPath();
                    context.arc(center.x, center.y, 30, 1.65 * Math.PI, 3.35 * Math.PI); // half circle
                    context.lineTo(center.x, center.y);
                    context.fillStyle = pac_color; //color
                    context.fill();
                    context.beginPath();
                    context.arc(center.x - 15, center.y - 5, 5, 0, 2 * Math.PI); // circle
                    context.fillStyle = "black"; //color
                    context.fill();
                }
                else if(x==2){
                    context.beginPath();
                    context.arc(center.x, center.y, 30, 0.65 * Math.PI, 2.35 * Math.PI); // half circle
                    context.lineTo(center.x, center.y);
                    context.fillStyle = pac_color; //color
                    context.fill();
                    context.beginPath();
                    context.arc(center.x - 15, center.y + 5, 5, 0, 2 * Math.PI); // circle
                    context.fillStyle = "black"; //color
                    context.fill();
                }
                else if(x==3){
                    context.beginPath();
                    context.arc(center.x, center.y, 30, 1.15 * Math.PI, 2.85 * Math.PI); // half circle
                    context.lineTo(center.x, center.y);
                    context.fillStyle = pac_color; //color
                    context.fill();
                    context.beginPath();
                    context.arc(center.x - 5, center.y - 15, 5, 0, 2 * Math.PI); // circle
                    context.fillStyle = "black"; //color
                    context.fill();
                }
                else{
                    context.beginPath();
                    context.arc(center.x, center.y, 30, 0.15 * Math.PI, 1.85 * Math.PI); // half circle
                    context.lineTo(center.x, center.y);
                    context.fillStyle = pac_color; //color
                    context.fill();
                    context.beginPath();
                    context.arc(center.x + 5, center.y - 15, 5, 0, 2 * Math.PI); // circle
                    context.fillStyle = "black"; //color
                    context.fill();
                }
            } else if (board[i][j] === 1) {
                context.beginPath();
                context.arc(center.x, center.y, 15, 0, 2 * Math.PI); // circle
                context.fillStyle = fiveColor; //color
                context.fill();
                context.beginPath();
                context.font="15px Verdana";
                context.fillStyle="white";
                context.fillText("5",center.x-5, center.y+5);
                context.fill();
            } 
            else if (board[i][j] === 5) {
                context.beginPath();
                context.arc(center.x, center.y, 15, 0, 2 * Math.PI); // circle
                context.fillStyle = fifteenColor; //color
                context.fill();
                context.beginPath();
                context.font="15px Verdana";
                context.fillStyle="white";
                context.fillText("15",center.x-10, center.y+5);
                context.fill();
            }
            else if (board[i][j] === 6) {
                context.beginPath();
                context.arc(center.x, center.y, 15, 0, 2 * Math.PI); // circle
                context.fillStyle = twentyColor; //color
                context.fill();
                context.beginPath();
                context.font="15px Verdana";
                context.fillStyle="white";
                context.fillText("25",center.x-10, center.y+5);
                context.fill();
            }else if (board[i][j] === 4) {
                context.beginPath();
                context.rect(center.x - 30, center.y - 30, 60, 60);
                context.fillStyle = "grey"; //color
                context.fill();
            }
        }
    }
    for(var i=0; i<monsNum; i++){
        var center = new Object();
        center.x = mons[i].i * 60 ;
        center.y = mons[i].j * 60 ;
        var sprite =new Image();
        sprite.src='mons'+(i+1).toString()+'.png';
        context.drawImage(sprite,center.x, center.y);
    }
    if(orange.eaten==false){
        var center = new Object();
        center.x = orange.i * 60 ;
        center.y = orange.j * 60 ;
        var sprite =new Image();
        sprite.src=fruits[choosenFruit];
        context.drawImage(sprite,center.x, center.y);
    }
    var center = new Object();
    center.x = medication.i * 60 ;
    center.y = medication.j * 60 ;
    var sprite =new Image();
    sprite.src='Medication.png';
    context.drawImage(sprite,center.x, center.y);
}

function moveOrange(){
    var moved=false;
    while(moved==false){        
        var rand=Math.floor(Math.random()*3)+1;
        if(rand==1){
            if(orange.j>0 && board[orange.i][orange.j-1]!==4  ){
                orange.j-=1;
                moved=true;
            }
        }
        if(rand==2){
            if( orange.i<19 && board[orange.i+1][orange.j]!==4 ){
                orange.i+=1;
                moved=true;
            }
        }
        if(rand==3){
            if(orange.j<9 && board[orange.i][orange.j+1]!==4 ){
                orange.j+=1;
                moved=true;
            }
        }
        if(rand==4){
            if(orange.i>0 && board[orange.i-1][orange.j]!==4){
                orange.i-=1;
                moved=true;
            }
        }
    }
}

function moveMons(){
    for(var i=0; i<monsNum; i++){
        var distI=mons[i].i-shape.i;
        var distJ=mons[i].j-shape.j;
        if(Math.abs(distI)>Math.abs(distJ)){
            if(distI<0 && mons[i].i<19 && board[mons[i].i+1][mons[i].j]!==4){
                mons[i].i+=1;
            }
            else if(distI<0 && distJ<=0 && mons[i].j<9 && board[mons[i].i][mons[i].j+1]!==4){
                mons[i].j+=1;
            }
            else if(distI<0 && distJ>=0 && mons[i].j>0 && board[mons[i].i][mons[i].j-1]!==4 ){
                mons[i].j-=1;
            }
            else if(distI<0 && mons[i].i>0 && board[mons[i].i-1][mons[i].j]!==4 ){
                mons[i].i-=1;
            }
            else if(distI>=0 && mons[i].i>0 && board[mons[i].i-1][mons[i].j]!==4){
                mons[i].i-=1;
            }
            else if(distI>=0 && distJ<=0 && mons[i].j<9 && board[mons[i].i][mons[i].j+1]!==4){
                mons[i].j+=1;
            }
            else if(distI>=0 && distJ>=0 && mons[i].j>0 && board[mons[i].i][mons[i].j-1]!==4){
                mons[i].j-=1;
            }
            else if(distI>=0 && mons[i].i<19 && board[mons[i].i+1][mons[i].j]!==4){
                mons[i].i+=1;
            }
        }
        else{
            if(distJ<0 && mons[i].j<9 && board[mons[i].i][mons[i].j+1]!==4 ){
                mons[i].j+=1;
            }
            else if(distJ<0 && distI<=0 && mons[i].i<19 && board[mons[i].i+1][mons[i].j]!==4){
                mons[i].i+=1;
            }
            else if(distJ<0 && distI>=0 && mons[i].i>0 && board[mons[i].i-1][mons[i].j]!==4){
                mons[i].i-=1;
            }
            else if(distJ<0 && mons[i].j>0 && board[mons[i].i][mons[i].j-1]!==4){
                mons[i].j-=1;
            }
            else if(distJ>=0 &&  mons[i].j>0 && board[mons[i].i][mons[i].j-1]!==4 ){
                mons[i].j-=1;
            }
            else if(distJ>=0 && distI<=0 && mons[i].i<19 && board[mons[i].i+1][mons[i].j]!==4){
                mons[i].i+=1;
            }
            else if(distJ>=0 && distI>=0 && mons[i].i>0 && board[mons[i].i-1][mons[i].j]!==4){
                mons[i].i-=1;
            }
            else if(distJ>=0 && mons[i].j<9 && board[mons[i].i][mons[i].j+1]!==4){
                mons[i].j+=1;
            }
        }
    }
}

var counter =0;

function UpdatePosition() {
    counter++;
    if(counter==8){
        moveMons();
        if(orange.eaten==false)
            moveOrange();
        counter=0;
    }
    var currentTime = new Date();
    if(medicationLeft > 0 && medication.i == -1 && medication.j == -1){
        var r=Math.random();
        if(r>0.993){
            medicationLeft--;
            medication.i = Math.floor(Math.random()*19);
            medication.j = Math.floor(Math.random()*9);
            while(board[medication.i][medication.j] == 4){
                medication.i = Math.floor(Math.random()*19);
                medication.j = Math.floor(Math.random()*9); 
            }
            mStartTime = new Date();
        }
    }
    else if((currentTime - mStartTime)/1000 > 10 && medication.i != -1 && medication.j != -1){
        medication.i = -1;
        medication.j = -1;

    }
    board[shape.i][shape.j] = 0;
    var x = GetKeyPressed();
    if (x === 1) {
        if (shape.j > 0 && board[shape.i][shape.j - 1] !== 4) {
            shape.j--;
        }
        lastDirect=x;
    }
    if (x === 2) {
        if (shape.j < 9 && board[shape.i][shape.j + 1] !== 4) {
            shape.j++;
        }
        lastDirect=x;
    }
    if (x === 3) {
        if (shape.i > 0 && board[shape.i - 1][shape.j] !== 4) {
            shape.i--;
        }
        lastDirect=x;
    }
    if (x === 4) {
        if (shape.i < 19 && board[shape.i + 1][shape.j] !== 4) {
            shape.i++;
        }
        lastDirect=x;
    }
    if (board[shape.i][shape.j] === 1) {
        balls++;
        balls5++;
    }
    if (board[shape.i][shape.j] === 5) {
        balls++;
        balls15++;
    }
    if (board[shape.i][shape.j] === 6) {
        balls++;
        balls25++;
    }
    board[shape.i][shape.j] = 2;
    currentTime = new Date();
    time_elapsed = (currentTime - start_time) / 1000;
    var isEat=false;
    if(orange.i==shape.i && orange.j==shape.j){
        bonusPoints+=50;
        orange.eaten=true;
        orange.i=-1;
        orange.j=-1;
    }
    for(var i=0; i<monsNum; i++){
        if(mons[i].i==shape.i && mons[i].j==shape.j){
            isEat=true;
        }
    }
    if(shape.i == medication.i && shape.j == medication.j){
        medication.i = -1;
        medication.j = -1;
        lives++;
    }
    if (balls == ballsNum) {
        window.clearInterval(interval);
        document.getElementById('music').pause();
        document.getElementById('music').currentTime = 0;
        Draw(lastDirect);
        window.alert("We have a Winner!!!");
    } 
    else if((maxTime-time_elapsed)<=0){
        window.clearInterval(interval);
        time_elapsed=maxTime;
        Draw(lastDirect);
        if(parseInt(lblScore.value)<150){
            document.getElementById('music').pause();
            document.getElementById('music').currentTime = 0;
            window.alert("You can do better , score: "+lblScore.value); 
        }
        else{
            document.getElementById('music').pause();
            document.getElementById('music').currentTime = 0;
            window.alert("We have a Winner!!!");
        }
    }
    else if(isEat){
        if(lives>0){
            lives--;
            mons[0].i=0;
            mons[0].j=0;
            mons[1].i=19;
            mons[1].j=0;            
            mons[2].i=19;
            mons[2].j=9;
            var location= findRandomEmptyCell(board);
            while(location[0]==0 || location[1]==0 || location[0]==19 || location[1]==9){
                location=findRandomEmptyCell(board);
            }
            board[shape.i][shape.j]=0;
            lastDirect=4;
            shape.i=location[0];
            shape.j=location[1];
        }
        else{
            window.clearInterval(interval);
            board[shape.i][shape.j]=0;
            document.getElementById('music').pause();
            document.getElementById('music').currentTime = 0;
            Draw(lastDirect);
            window.alert("You Lost!");
        }
    }
    else {
        Draw(lastDirect);
    }
}

function newGame(){
    window.clearInterval(interval);
    document.getElementById('music').pause();
    document.getElementById('music').currentTime = 0;
    document.getElementById('music').play();
    Start();
}
