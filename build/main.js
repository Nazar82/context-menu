'use strict';

(function (outerData) {

    function addStyles(styles, element) {
        for (var styleName in styles) {
            element.style[styleName] = styles[styleName];
        }
    }

    function createElement(element, styles) {
        var newElement = document.createElement(element);
        addStyles(styles, newElement);
        return newElement;
    }

    function getMenuPosition(event, id) {

        var windowWidth = window.innerWidth;
        var windowHeight = window.innerHeight;
        var menuContainer = document.getElementById(id);

        var menuWidth = menuContainer.offsetWidth;
        var menuHeight = menuContainer.offsetHeight;
        var x = event.offsetX;
        var y = event.offsetY;

        var top = y;
        var left = x;

        if (windowWidth - x < menuWidth) {
            left = x - menuWidth;
        }

        if (windowHeight - y < menuHeight) {
            top = y - menuHeight;
        }

        if (windowHeight - y < menuHeight && y < menuHeight) {
            top = 0;
        }

        if (menuHeight > windowHeight) {
            top = 0;
        }
        return {
            x: left,
            y: top
        };
    }

    var menuMargin = 70;
    var listItemHeight = 20;

    function countItems(windowHeight) {
        return Math.floor((windowHeight - menuMargin) / listItemHeight);
    }

    function callBackOnMenuItem(event) {
        this.classList.value.includes('disabledItem') ? event.preventDefault() : alert('The name of the car You clicked on is ' + this.innerText + '.');
    }

    function createListItem(val) {

        var item = createElement('LI', outerData.liStyles);

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
        var scroll = createElement('DIV', outerData.scrollStyles);
        scroll.classList.add('scroll');
        return scroll;
    }

    var cars = JSON.parse(outerData.carsjson);
    var elemetToShowMenu = document.getElementById(cars.element);

    function renderMenu(data, event) {
        var listStart = 0;
        var windowHeight = window.innerHeight;
        var itemsToShow = countItems(windowHeight);

        if (document.getElementById('menuContainer')) {
            document.getElementById('menuContainer').remove();
        };

        var container = createElement('DIV', outerData.containerStyles);
        container.id = 'menuContainer';
        container.onclick = function (event) {
            event.stopPropagation();
        };

        var list = createElement('UL', outerData.ulStyles);
        list.id = data.id;

        data.items.slice(listStart, itemsToShow + 1).forEach(function (val) {
            var item = createListItem(val);
            list.appendChild(item);
        });

        container.appendChild(list);
        elemetToShowMenu.appendChild(container);

        if (windowHeight < data.items.length * listItemHeight + menuMargin) {
            var scrollUp = creatScroll();

            scrollUp.onclick = function () {
                var additionalItem = 0;
                listStart--;
                if (listStart === 0) {
                    document.getElementsByClassName('scroll')[0].style.display = 'none';
                    additionalItem++;
                }

                if (data.items.length - listStart > itemsToShow) {
                    document.getElementsByClassName('scroll')[1].style.display = 'block';
                }

                document.getElementById("carsMenu").innerHTML = "";
                data.items.slice(listStart, itemsToShow + listStart + additionalItem).forEach(function (val) {
                    var item = createListItem(val);
                    list.appendChild(item);
                });
            };
            var arrowUp = createElement('DIV', outerData.arrowUpStyles);
            scrollUp.appendChild(arrowUp);
            container.prepend(scrollUp);

            var scrollDown = creatScroll();
            scrollDown.onclick = function () {
                var additionalItem = 0;
                listStart++;
                if (listStart > 0) {
                    document.getElementsByClassName('scroll')[0].style.display = 'block';
                }
                if (data.items.length - listStart === itemsToShow) {
                    document.getElementsByClassName('scroll')[1].style.display = 'none';
                    additionalItem--;
                }
                document.getElementById("carsMenu").innerHTML = "";
                data.items.slice(listStart + additionalItem, itemsToShow + listStart).forEach(function (val) {
                    var item = createListItem(val);
                    list.appendChild(item);
                });
            };
            var arrowDown = createElement('DIV', outerData.arrowDownStyles);
            scrollDown.appendChild(arrowDown);
            container.appendChild(scrollDown);

            if (listStart === 0) {
                scrollUp.style.display = 'none';
            }
        }

        var position = getMenuPosition(event, container.id);
        container.style.top = position.y + 'px';
        container.style.left = position.x + 'px';
    }

    elemetToShowMenu.addEventListener('mousedown', function (event) {
        elemetToShowMenu.addEventListener("contextmenu", function (e) {
            e.preventDefault();
        }, false);
        if (event.button === 2 && event.target.id === 'cars') {
            renderMenu(cars, event);
        }
    });

    window.addEventListener('click', function () {
        if (document.getElementById('menuContainer')) {
            document.getElementById('menuContainer').remove();
        };
    });
})(data);