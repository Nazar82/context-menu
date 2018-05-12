(function (outerData) {


    // JSON for long contextmenu with scroll
    const carsjson = '{"element":"cars", "id":"carsMenu", "items":[{"title":"Porsche","disabled":"true","models":[{"title":"Sedan","disable":"false"},{"title":"Hatchback","disable":"false"}]},{"title":"BMW","disabled":"false","models":[{"title":"Cabriolet","disable":"false"},{"title":"Break","disable":"false"}]},{"title":"Opel","disabled":"false"}, {"title":"Porsche","disabled":"false"}, {"title":"Porsche1","disabled":"false"},{"title":"Moskvich","disabled":"false"},{"title":"BMW","disabled":"false"}, {"title":"Porsche4","disabled":"false"}, {"title":"Ford","disabled":"false"}, {"title":"Porsche","disabled":"false"}, {"title":"Toyota","disabled":"false"}, {"title":"Kia","disabled":"false"}, {"title":"Alfa Romeo","disabled":"true"}, {"title":"Nissan","disabled":"false"}, {"title":"Audi","disabled":"false"}, {"title":"VAZ","disabled":"true"}, {"title":"Kia","disabled":"false"}, {"title":"VF","disabled":"false"}, {"title":"Ford","disabled":"false"}, {"title":"ZAZ","disabled":"true"}, {"title":"Niva","disabled":"false"}, {"title":"Aston Martin","disabled":"false"}, {"title":"Porsche","disabled":"false"}, {"title":"Citroen","disabled":"false"}, {"title":"Porsche","disabled":"false"}, {"title":"BMW","disabled":"false"}, {"title":"Audi","disabled":"false"}, {"title":"Niva","disabled":"false"}, {"title":"Porsche","disabled":"false"}, {"title":"Honda","disabled":"false"}, {"title":"Toyota","disabled":"false"}, {"title":"Porsche","disabled":"false"}, {"title":"Ford","disabled":"false"}, {"title":"VF","disabled":"false"}, {"title":"Mazda","disabled":"false"}, {"title":"Porsche","disabled":"false"}, {"title":"Jaguar","disabled":"false"}, {"title":"Honda","disabled":"false"}, {"title":"Niva","disabled":"false"}, {"title":"Porsche","disabled":"false"}, {"title":"Ford","disabled":"false"}, {"title":"BMW","disabled":"false"}]}';

    // JSON for small contextmenu without scroll
    // const carsjson = '{"element":"cars", "id":"carsMenu", "items":[{"title":"Porsche","disabled":"true","models":[{"title":"Sedan","disable":"false"},{"title":"Hatchback","disable":"false"}]},{"title":"BMW","disabled":"false","models":[{"title":"Cabriolet","disable":"false"},{"title":"Break","disable":"false"}]},{"title":"Opel","disabled":"false"}, {"title":"Porsche","disabled":"false"}, {"title":"Porsche","disabled":"false"},{"title":"BMW","disabled":"false"},{"title":"Opel","disabled":"false"}, {"title":"Porsche","disabled":"false"}, {"title":"Ford","disabled":"false"}, {"title":"Toyota","disabled":"false"}, {"title":"Honda","disabled":"false"}, {"title":"Porsche","disabled":"false"}]}';


    function addStyles(styles, element) {
        for (let styleName in styles) {
            element.style[styleName] = styles[styleName];
        }
    }

    function createElement(element, styles) {
        let newElement = document.createElement(element);
        addStyles(styles, newElement);
        return newElement;
    }

    function getMenuPosition(event, listContainer) {

        let windowWidth = window.innerWidth;
        let windowHeight = window.innerHeight;
        let menuContainer = document.getElementById(listContainer.id);

        let menuWidth = menuContainer.offsetWidth;
        let menuHeight = menuContainer.offsetHeight;
        let x = event.pageX;
        let y = event.pageY;

        let top = y;
        let left = x;

        if ((windowWidth - x) < menuWidth) {
            left = x - menuWidth;
        }

        if ((windowHeight - y) < menuHeight) {
            top = y - menuHeight;
        }

        if ((windowHeight - y) < menuHeight && y < menuHeight) {
            top = 0;
        }

        return {
            x: left,
            y: top
        }
    }

    const menuMargin = 70;
    const listItemHeight = 20;
    const bottomOffset = 40;

    // Function to calculate quantity of list items 

    function countItems(windowHeight) {
        return Math.floor((windowHeight - menuMargin - bottomOffset) / listItemHeight);
    }

    function callBackOnMenuItem(event) {
        this.classList.value.includes('disabledItem') ? event.preventDefault() : alert(`The name of the car You clicked on is ${this.innerText}.`);
    }

    function createListItem(val) {

        const item = createElement('LI', outerData.liStyles);
        item.classList.add('menuItem');
        item.innerText = val.title;
        item.onclick = callBackOnMenuItem;

        if (val.disabled === 'true') {
            item.classList.add('disabledItem');
            item.style.backgroundColor = '#b4cee8';
        }
        return item;
    }

    function creatScroll() {
        const scroll = createElement('DIV', outerData.scrollStyles);
        scroll.classList.add('scroll');
        return scroll;
    }

    const cars = JSON.parse(carsjson);

    // Element on which contextmenu will appear
    const elemetToShowMenu = document.getElementById(cars.element);

    function renderMenu(data, event) {
        let listStart = 0;
        let windowHeight = window.innerHeight;
        let itemsToShow = countItems(windowHeight);

        if (document.getElementById('menuContainer')) {
            document.getElementById('menuContainer').remove();
        };

        let container = createElement('DIV', outerData.containerStyles);
        container.id = 'menuContainer';
        container.onclick = (event) => {
            event.stopPropagation();
        }

        let list = createElement('UL', outerData.ulStyles);
        list.id = data.id;

        data.items.slice(listStart, itemsToShow + 1).forEach(val => {
            const item = createListItem(val);
            list.appendChild(item);
        });

        container.appendChild(list);
        elemetToShowMenu.appendChild(container);

        // Add scroll when list does not fit into the screen
        if (windowHeight < data.items.length * listItemHeight + menuMargin) {
            let scrollUp = creatScroll();
            scrollUp.onclick = () => {
                let additionalItem = 0;
                listStart--;
                if (listStart === 0) {
                    document.getElementsByClassName('scroll')[0].style.display = 'none';
                    additionalItem++;
                }

                if ((data.items.length - listStart) > itemsToShow) {
                    document.getElementsByClassName('scroll')[1].style.display = 'block';
                }

                document.getElementById("carsMenu").innerHTML = "";
                data.items.slice(listStart, itemsToShow + listStart + additionalItem).forEach(val => {
                    let item = createListItem(val);
                    list.appendChild(item);
                });
            };
            let arrowUp = createElement('DIV', outerData.arrowUpStyles);
            scrollUp.appendChild(arrowUp);
            container.prepend(scrollUp);

            let scrollDown = creatScroll();
            scrollDown.onclick = () => {
                let additionalItem = 0;
                listStart++;
                if (listStart > 0) {
                    document.getElementsByClassName('scroll')[0].style.display = 'block';
                }
                if (data.items.length - listStart === itemsToShow) {
                    document.getElementsByClassName('scroll')[1].style.display = 'none';
                    additionalItem--;
                }
                document.getElementById("carsMenu").innerHTML = "";
                data.items.slice(listStart + additionalItem, itemsToShow + listStart).forEach(val => {
                    let item = createListItem(val);
                    list.appendChild(item);
                });

            };
            let arrowDown = createElement('DIV', outerData.arrowDownStyles);
            scrollDown.appendChild(arrowDown);
            container.appendChild(scrollDown);

            if (listStart === 0) {
                scrollUp.style.display = 'none';
            }
        }

        let position = getMenuPosition(event, container);
        container.style.top = position.y + 'px';
        container.style.left = position.x + 'px';
    }

    elemetToShowMenu.addEventListener('mousedown', (event) => {
        elemetToShowMenu.addEventListener("contextmenu", (e) => {
            e.preventDefault();
        }, false);
        if (event.button === 2 && event.target.id === 'cars') {
            renderMenu(cars, event);
        }

    });

    window.addEventListener('click', (event) => {
        if (document.getElementById('menuContainer')) {
            document.getElementById('menuContainer').remove();
        };
    });

    window.addEventListener('contextmenu', (event) => {
        if (event.target.id != 'carsMenu' && !event.target.classList.value.includes('menuItem') && event.target.id != 'cars') {
            if (document.getElementById('menuContainer')) {
                document.getElementById('menuContainer').remove();
            };
        }

    });

})(data);