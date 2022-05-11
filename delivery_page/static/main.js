

// navtogglesr suggest show/hide
function togglerShow() {
    let buttonValue = document.getElementById("navbarNav").classList.contains("show");
    
    if (!buttonValue) {
        document.getElementById("navbarNav").classList.add("show")
       
    }
    else {
        document.getElementById("navbarNav").classList.remove("show");
   
    }
}


// navbar suggest hide
function navHide() {
    document.getElementById("navbarNav").classList.remove("show");
}







// MENU SECTORs
function MenuHand(event) {
    // Подсчет количества элементов
    const selectPrevElement = event.target.parentElement.previousElementSibling;
    const selectNextElement = event.target.parentElement.nextElementSibling;

    if (event.target.innerHTML == '+') {
        if (selectPrevElement == '' | !Number.isInteger(Number(selectPrevElement.value))) {
            return
        }
        selectPrevElement.value = Number(selectPrevElement.value) + 1;
        // event.currentTarget.nextSibling.value;
        //     
        //    let wow= event.currentTarget.getElementById ('').value;
    } else if (event.target.innerHTML == '-') {
        if (selectNextElement == '' | Number(selectNextElement.value) == 0 | !Number.isInteger(Number(selectNextElement.value))) {
            return
        }
        selectNextElement.value = Number(selectNextElement.value) - 1;
    }

}

// Menu items list
// id       "item-"+i
// name     "name"
// descript "good product"
// price     780 +" руб."
// amount    id="item-amount-"+i 
// 






// addr list pages
function addrPages(){
    // for (let i = 0; i < item.length; i++) {
    
    //     pageParts = [item[i],item[i+1],item[i+2]]
    //     pageParts = item[number]
    // }
    alert("page")
}





// Здесь создается элемент списка адресов
    //  name | typeObject | address 
    // classlist.add("id-19700")
function CreateListItem(item,i) {
    let sampleClass = 'id-'+item.id+' addr-item-'+Number(i+1)+' d-flex flex-row flex-nowrap justify-content-between align-items-center';

    let itemListHead = document.createElement('div');
    itemListHead.className = sampleClass;
    //div.name 
    let nameDiv = document.createElement('div')
    nameDiv.innerHTML = item.name;
    nameDiv.className = ('addr-item-name col-3');
    itemListHead.append(nameDiv);
    //div.type
    let typeDiv = document.createElement('div');
    typeDiv.innerHTML = item.typeObject;
    typeDiv.className = ('addr-item-type col-2');
    itemListHead.append(typeDiv);
    // div.address
    let addrDiv = document.createElement('div');
    addrDiv.innerHTML = item.address;
    addrDiv.className = ('addr-item-addr col-5');
    itemListHead.append(addrDiv);
    

    let btnDiv = document.querySelector('.addr-item-action');
    let newnew = btnDiv.cloneNode();

    itemListHead.append(newnew);

    return itemListHead;
}

function completeAddrList(item) {
    //  name | typeObject | address 
    // classlist.add("id-19700")
    // 
    // let firstItem = document.getElementById('addr-list').firstElementChild;
    
    

    for (let i = 0; i < 3; i++) {

        // добавляю элемент в список
        let addrListHolder = document.querySelector('.addr-list');
        addrListHolder.append(CreateListItem(item[i],i));

        //    .lastElementChild

        // Добавление элементов
        // let ListItem = item[i].address;

    }


    // var item = JSON.parse(item);
    //  alert('item response: '+item.name+' and firstItem: '+firstItem)

}





function downloadData() {

    let urlGetList = new URL('http://exam-2022-1-api.std-900.ist.mospolytech.ru/api/restaurants?api_key=6d384815-d70b-4202-a3ad-4902c3eb1e3d');
    let xhr = new XMLHttpRequest();
    xhr.open('GET', urlGetList);
    xhr.responseType = 'json';
    xhr.onload = function () {
        let resultList = this.response;
        completeAddrList(this.response);
    }
    xhr.send();
}





// onload
window.onload = function () {
    downloadData();
    // navbar-show
    document.querySelector('.navbar-toggler').onclick = togglerShow;
    document.querySelector('.navbar-nav').onclick = navHide;
    // Элемент Меню
    document.querySelector('.item-elements').onclick = MenuHand;
    // 

    // 

}