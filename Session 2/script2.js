// add new parapraph in section 1

const pNew = document.createElement('p');
const textNew = document.createTextNode('This is new paragraph');
pNew.appendChild(textNew);

const s1 = document.getElementById('section1');
s1.appendChild(pNew);

// Event Handler inline
function changeToBlue(){
    const p3 = document.getElementsByClassName('p3')[0];
    p3.style.backgroundColor = 'blue';
}


const p2 = document.getElementsByClassName('p2')[0];

p2.addEventListener('mouseenter', function(){
    p2.style.backgroundColor = 'yellow';
});

p2.addEventListener('mouseleave', function(){
    p2.style.backgroundColor = 'lightblue';
});
