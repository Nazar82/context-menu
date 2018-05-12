(function (outerData) {

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

    function getMenuPosition(event, id) {

        let windowWidth = window.innerWidth;
        let windowHeight = window.innerHeight;
        let menuContainer = document.getElementById(id);

        let menuWidth = menuContainer.offsetWidth;
        let menuHeight = menuContainer.offsetHeight;
        let x = event.offsetX;
        let y = event.offsetY;

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

        if (menuHeight > windowHeight) {
            top = 0;
        }
        return {
            x: left,
            y: top
        }
    }

    const menuMargin = 70;
    const listItemHeight = 20;

    function countItems(windowHeight) {
        return Math.floor((windowHeight - menuMargin) / listItemHeight);
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
            item.style.backgroundColor = 'red';
        }
        return item;
    }

    function creatScroll() {
        const scroll = createElement('DIV', outerData.scrollStyles);
        scroll.classList.add('scroll');
        return scroll;
    }

    const cars = JSON.parse(outerData.carsjson);
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

        let position = getMenuPosition(event, container.id);
        container.style.top = position.y + 'px';
        container.style.left = position.x + 'px';
    }

    elemetToShowMenu.addEventListener('mousedown', (event) => {
        elemetToShowMenu.addEventListener("contextmenu", function (e) {
            e.preventDefault();
        }, false);
        if (event.button === 2 && event.target.id === 'cars') {
            renderMenu(cars, event);
        }
    });

    window.addEventListener('click', () => {
        if (document.getElementById('menuContainer')) {
            document.getElementById('menuContainer').remove();
        };
    });

})(data);