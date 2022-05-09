function createPageBtn(page, classes = []) {
    let btn = document.createElement('button');
    classes.push('btn');
    for (cls of classes) {
        btn.classList.add(cls);
    }
    btn.dataset.page = page;
    btn.innerHTML = page;
    return btn;
}

function renderPaginationElement(info) {
    let btn;
    let paginationContainer = document.querySelector('.pagination');
    paginationContainer.innerHTML = '';

    btn = createPageBtn(1, ['first-page-btn']);
    btn.innerHTML = 'Первая страница';
    if (info.current_page == 1) {
        btn.style.visibility = 'hidden';
    }
    paginationContainer.append(btn);

    let buttonsContainer = document.createElement('div');
    buttonsContainer.classList.add('pages-btns');
    paginationContainer.append(buttonsContainer);

    let start = Math.max(info.current_page - 2, 1);
    let end = Math.min(info.current_page + 2, info.total_pages);
    for (let i = start; i <= end; i++) {
        buttonsContainer.append(createPageBtn(i, i == info.current_page ? ['active'] : []));
    }

    btn = createPageBtn(info.total_pages, ['last-page-btn']);
    btn.innerHTML = 'Последняя страница';
    if (info.current_page == info.total_pages) {
        btn.style.visibility = 'hidden';
    }
    paginationContainer.append(btn);
}

function perPageBtnHandler(event) {
    downloadData(1);
}

function setPaginationInfo(info) {
    document.querySelector('.total-count').innerHTML = info.total_count;
    let start = info.total_count > 0 ? (info.current_page - 1) * info.per_page + 1 : 0;
    document.querySelector('.current-interval-start').innerHTML = start;
    let end = Math.min(info.total_count, start + info.per_page - 1)
    document.querySelector('.current-interval-end').innerHTML = end;
}

function pageBtnHandler(event) {
    if (event.target.dataset.page) {
        downloadData(event.target.dataset.page);
        window.scrollTo(0, 0);
    }
}

function createAuthorElement(record) {
    let user = record.user || { 'name': { 'first': '', 'last': '' } };
    let authorElement = document.createElement('div');
    authorElement.classList.add('author-name');
    authorElement.innerHTML = user.name.first + ' ' + user.name.last;
    return authorElement;
}

function createUpvotesElement(record) {
    let upvotesElement = document.createElement('div');
    upvotesElement.classList.add('upvotes');
    upvotesElement.innerHTML = record.upvotes;
    return upvotesElement;
}

function createFooterElement(record) {
    let footerElement = document.createElement('div');
    footerElement.classList.add('item-footer');
    footerElement.append(createAuthorElement(record));
    footerElement.append(createUpvotesElement(record));
    return footerElement;
}

function createContentElement(record) {
    let contentElement = document.createElement('div');
    contentElement.classList.add('item-content');
    contentElement.innerHTML = record.text;
    return contentElement;
}

function createListItemElement(record) {
    let itemElement = document.createElement('div');
    itemElement.classList.add('facts-list-item');
    itemElement.append(createContentElement(record));
    itemElement.append(createFooterElement(record));
    return itemElement;
}

// modifications here
function renderRecords(records) {
    let factsList = document.querySelector('.facts-list');
    factsList.innerHTML = '';
    for (let i = 0; i < records.length; i++) {
        factsList.append(createListItemElement(records[i]));
    }
}

function downloadData(page = 1, filterText = '') {
    let factsList = document.querySelector('.facts-list');
    let url = new URL(factsList.dataset.url);
    let perPage = document.querySelector('.per-page-btn').value;
    url.searchParams.append('page', page);
    url.searchParams.append('per-page', perPage);
    // adding 'q'-key to searchParams
    url.searchParams.append('q', filterText);

    // XMLrequest содержимого страницы
    let xhr = new XMLHttpRequest();
    xhr.open('GET', url);
    xhr.responseType = 'json';
    xhr.onload = function () {
        renderRecords(this.response.records);
        setPaginationInfo(this.response['_pagination']);
        renderPaginationElement(this.response['_pagination']);
    }
    xhr.send();
}


// 
//Создание списка подсказки ввода
// 

// функция создания списка подсказки ввода------------------
function createSuggestList(item) {
    let itemElement = document.createElement('li');
    itemElement.classList.add('suggest-item');
    itemElement.innerHTML = item;
    return itemElement;
}


// Запрос с подсказкой ввода
function downloadDataComp(filterText) {
    //Обращение к базе Обработка полученного filterText в запрос к базе для получения значений 
    // и мгновенный вывод их в список подсказки ввода
    // Адрес базы  определяется как новый URL
    let urlAutComp = new URL('http://cat-facts-api.std-900.ist.mospolytech.ru/autocomplete');
    // Адрес.Параметр запроса.добавить(ключ,значение) 
    urlAutComp.searchParams.append('q', filterText);
    // Открытие запроса: xhr = Новый XHR запрос
    let xhr = new XMLHttpRequest();
    // Создание запроса типа get, по ссылке
    xhr.open('GET', urlAutComp);
    // Указание типа ответа
    xhr.responseType = 'json';
    // Тело запроса 
    xhr.onload = function () {
        // Запись тела результата в переменную (текст,текст,текст)
        let searchSuggest = this.response;
        // Запись в переменную Строки с указанием на Объект по его классу
        let suggestItem = document.getElementById('suggest');
        // Очистка содержимого Объекта в переменной,
        suggestItem.innerHTML = '';
        // Добавление искомой строки в выпадающий список поиска
        //Проверка по длине массива тела результата 
        for (let i = 0; i < searchSuggest.length; i++) {
            // htmlОбъект,добавить(Создать элемент(Элемент массива результата))
            suggestItem.append(createSuggestList(searchSuggest[i]));
        }
        document.getElementById("suggest").classList.add("show");
    }
    // Отправка запроса и его Закрытие
    xhr.send();
}
// mycodehere

// В renderRecords происходит обработка текста запроса
// Тест функция которую я в renderRecords встрою
function filterSearch(event) {
    // Занесение в переменную текста поисковой строки
    let filterText = document.querySelector('.search-field').value;
    // загрузка с применением фильтра из inputform
    downloadData(page = 1, filterText);
    // Загрузка подсказки по введенной строке

    // search-form.append(createListSuggest(filterText));
    return;
}
// end my of function code

// show-hide suggestion
function showSuggest(event) {

    // Проверка на нажатие Enter
    if (event.keyCode == 13) {
        filterSearch();
        // alert('hello');
        document.getElementById("suggest").classList.remove("show");
        // document.getElementById('suggest').innerHTML = '';
        return;
    }
    // Взятие значения поля ввода в переменную textTyped
    const textTyped = document.getElementById("search-field").value;
    // Перезагрузка содержимого по введенному тексту
    downloadDataComp(textTyped);
}
function selectSuggest(event) {
    document.querySelector('.search-field').value = event.target.innerHTML;
    // let f= document.querySelector('.search-field').textContent;
    // return f
    // document.querySelector('.buttons').onclick = (event)
    document.getElementById("suggest").classList.remove("show");
}



// onload
window.onload = function () {
    downloadData();
    document.querySelector('.pagination').onclick = pageBtnHandler;
    document.querySelector('.per-page-btn').onchange = perPageBtnHandler;
    // Вызов функции поиска по нажатию кнопки
    document.querySelector('.search-btn').onclick = filterSearch;
    // suggestion
    document.querySelector('.search-field').onkeyup = showSuggest;
    document.querySelector('.suggest').onclick = selectSuggest;
    
}