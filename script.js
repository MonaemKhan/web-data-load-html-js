var images = [];
var card = [];
var currentIndex = 0;
var currentCardIndex = 0;
var cardLast = `<div style="flex: 0 0 100%; display: flex; justify-content: space-around;">
                <div>
                    <p id="prevCardbtn" onclick="prevCardView()" style="color: blue; cursor: pointer;"> >> Previous >> </p>
                </div>
                <div>
                    <p id="nextCardbtn" onclick="nextCardView()" style="color: blue; cursor: pointer;"> >> Next >> </p>
                </div>
            </div>`;

window.onload = function() {
    // Fetch JSON content from a file
    fetch('https://raw.githubusercontent.com/M-A-Monaem-Khan/WebVisibilityProject/refs/heads/main/DataFile/ImageList.json')
        .then(response => response.json())  // Convert the response to JSON
        .then(data => {
            images = data;            
            checkBtnVisibility();
        })
        .catch(error => {
            console.error('Error reading the JSON file:', error);
        });

        fetch('https://raw.githubusercontent.com/M-A-Monaem-Khan/WebVisibilityProject/refs/heads/main/DataFile/cardData.json')
        .then(response => response.json())  // Convert the response to JSON
        .then(data => {           
            card = data;
            CardView();
        })
        .catch(error => {
            console.error('Error reading the JSON file:', error);
        });
};

function changeImage() {    
    checkBtnVisibility();
    var img = document.getElementById('myImage');
    img.src = './Images/'+images[currentIndex].imageName;
    if(currentIndex == images.length-1){
        currentIndex = -1;
    }
    currentIndex = (currentIndex + 1);
    
}

setInterval(changeImage, 3000);

function checkBtnVisibility(){
    if(currentIndex == 0){
        var d = document.getElementById('prevbtn');
        d.style.display = 'none';
    }
    else{
        var d = document.getElementById('prevbtn');
        d.style.display = 'block';
    }

    if(currentIndex == images.length-1){
        var d = document.getElementById('nextbtn');
        d.style.display = 'none';
    }
    else{
        var d = document.getElementById('nextbtn');
        d.style.display = 'block';
    }
}

function nextClick() {
    currentIndex = (currentIndex + 1);
    checkBtnVisibility();
    var img = document.getElementById('myImage');
    img.src = './Images/'+images[currentIndex].imageName;
}

function prevClick() {
    currentIndex = (currentIndex - 1);
    checkBtnVisibility();
    var img = document.getElementById('myImage');
    img.src = './Images/'+images[currentIndex].imageName;
}

function CardView(){
    if(card.length > 0){
        document.getElementById('cardId').style.display = '';
    }
    var text = '';
    
        text = text + `<div class="card-body">
                <h2 class="card-title">${card[0].cardTitle}</h2>
                <p class="card-text">${card[0].cardHead}</p>
                <button onclick="learnMoreClick(${currentCardIndex})" class="card-btn">Read More</button>
            </div>`;
    document.getElementById('cardId').innerHTML = text+cardLast;
    showhidCardbtn();
}

function prevCardView(){
    currentCardIndex = currentCardIndex-1;
    var text = '';
        text = text + `<div class="card-body">
                <h2 class="card-title">${card[currentCardIndex].cardTitle}</h2>
                <p class="card-text">${card[currentCardIndex].cardHead}</p>
                <button onclick="learnMoreClick(${currentCardIndex})" class="card-btn">Read More</button>
            </div>`;
    document.getElementById('cardId').innerHTML = text+cardLast;
    showhidCardbtn();
}

function nextCardView(){
    currentCardIndex = currentCardIndex+1;
    var text = '';
        text = text + `<div class="card-body">
                <h2 class="card-title">${card[currentCardIndex].cardTitle}</h2>
                <p class="card-text">${card[currentCardIndex].cardHead}</p>
                <button onclick="learnMoreClick(${currentCardIndex})" class="card-btn">Read More</button>
            </div>`;
    document.getElementById('cardId').innerHTML = text+cardLast;
    showhidCardbtn();
}

function showhidCardbtn(){
    if(currentCardIndex == card.length-1){
        document.getElementById('nextCardbtn').style.display = 'none';
    }else{
        document.getElementById('nextCardbtn').style.display = '';
    }

    if(currentCardIndex == 0){
        document.getElementById('prevCardbtn').style.display = 'none';
    }else{
        document.getElementById('prevCardbtn').style.display = '';
    }
}

function closePopupClick(){
    document.getElementById('popupTitle').innerText = '';
    document.getElementById('popupBody').innerText = '';
    document.getElementById('overlay').style.display = 'none';
}

function learnMoreClick(index){
    document.getElementById('popupTitle').innerText = card[index].cardTitle;
    document.getElementById('popupBody').innerText = card[index].cardBody;
    document.getElementById('overlay').style.display = 'block';
}