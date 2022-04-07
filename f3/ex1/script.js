
function applyStyles(){
    document.getElementsByTagName('header')[0].classList.add('azure');
    document.getElementsByTagName('div')[0].classList.add('wrapper');
    document.getElementsByTagName('div')[1].classList.add('left-col');
    document.getElementsByTagName('div')[2].classList.add('right-col');
    document.getElementsByTagName('nav')[0].classList.add('azure');
    document.getElementsByTagName('main')[0].classList.add('azure');
    document.getElementsByTagName('aside')[0].classList.add('azure');
    document.getElementsByTagName('aside')[0].classList.add('anim-zmiana-koloru');
    document.getElementsByTagName('footer')[0].classList.add('azure');
}

function deleteStyles(){
    var all = document.getElementsByTagName("*");
    for (var i=0, max=all.length; i < max; i++) {
        all[i].classList = [];
    }
}

document.getElementById('set').onclick = applyStyles;
document.getElementById('delete').onclick = deleteStyles;
