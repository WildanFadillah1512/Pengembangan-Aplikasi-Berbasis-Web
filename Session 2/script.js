const h1 = document.getElementById('title');
h1.innerHTML1 = 'WEB DOM';
h1.style.backgroundColor = 'lightgreen';
h1.style.color = 'white';

const p = document.getElementsByTagName('p');

for(let i of p){
    i.style.backgroundColor = 'lightblue';
}


const ps2 = document.querySelector('section#section2 p');
ps2.style.backgroundColor = 'orange';

const ps3 = document.querySelectorAll('section#section2 p');
ps3[0].style.color = 'blue';
ps3[1].style.color = 'blue';
