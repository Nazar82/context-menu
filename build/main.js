'use strict';

(function () {
    var carsjson = '{"element":"cars", "id":"carsMenu", "items":[{"title":"Porsche","disabled":"true","models":[{"title":"Sedan","disable":"false"},{"title":"Hatchback","disable":"false"}]},{"title":"BMW","disabled":"false","models":[{"title":"Cabriolet","disable":"false"},{"title":"Break","disable":"false"}]},{"title":"Opel","disabled":"false"}, {"title":"Porsche","disabled":"false"}, {"title":"Porsche1","disabled":"false"},{"title":"Porsche2","disabled":"false"},{"title":"Porsche3","disabled":"false"}, {"title":"Porsche4","disabled":"false"}, {"title":"Porsche5","disabled":"false"}, {"title":"Porsche6","disabled":"false"}, {"title":"Porsche7","disabled":"false"}, {"title":"Porsche8","disabled":"false"}]}';

    var containerStyles = {
        'position': 'absolute',
        'width': '120px',
        'padding': '0',
        'margin': '0',
        'list-style-type': 'none',
        'background-color': 'grey'

    };
    var ulStyles = {
        'padding': '0',
        'margin': '0',
        'list-style-type': 'none',
        'border': '1px solid green'

    };
    var liStyles = {
        'background-color': 'beige',
        'padding': '2px 10px',
        'border-right': '1px solid green',
        'position': 'relative'

    };

    var arrowUpStyles = {
        'position': 'absolute',
        'top': '50%',
        'left': '50%',
        'transform': 'translate(-50% , -50% )',
        'border-left': '7px solid transparent',
        'border-right': '7px solid transparent',
        'border-bottom': '7px solid black'
    };

    var arrowDownStyles = {
        'position': 'absolute',
        'top': '50%',
        'left': '50%',
        'transform': 'translate(-50% , -50% )',
        'border-left': '7px solid transparent',
        'border-right': '7px solid transparent',
        'border-top': '7px solid black'
    };

    function addStyles(styles, element) {
        for (var styleName in styles) {
            element.style[styleName] = styles[styleName];
        }
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

        console.log('y', y);
        console.log('x', x);

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

    function selectItems(windowHeight) {

        var numberOfItems = Math.floor((windowHeight - 70) / 20);

        return {
            numberOfItems: numberOfItems,
            start: 0,
            end: 0

        };
    }

    function callBackOnMenuItem(e) {
        if (this.classList.value.includes('disabledItem')) {
            e.preventDefault();
        } else {
            alert('The name of the car You clicked on is ' + this.innerText + '.');
        }
    }
    var cars = JSON.parse(carsjson);
    var listStart = 0;

    function renderMenu(data, event) {
        if (document.getElementById('menuContainer')) {
            document.getElementById('menuContainer').remove();
        };

        var container = document.createElement('DIV');
        container.id = 'menuContainer';
        container.onclick = function (event) {
            event.stopPropagation();
        };

        var list = document.createElement('UL');
        list.id = data.id;

        addStyles(containerStyles, container);
        addStyles(ulStyles, list);

        var windowHeight = window.innerHeight;

        var itemsToShow = selectItems(windowHeight);

        console.log(itemsToShow);

        data.items.slice(listStart, itemsToShow.numberOfItems + 1).forEach(function (val) {
            var item = document.createElement('LI');
            item.classList.add('menuItem');

            item.innerText = val.title;
            item.onclick = callBackOnMenuItem;

            addStyles(liStyles, item);
            if (val.disabled === 'true') {
                console.log(val.disabled);
                item.classList.add('disabledItem');
                item.style.backgroundColor = 'red';
            }

            list.appendChild(item);
        });

        container.appendChild(list);
        var elemetToShowMenu = document.getElementById(data.element);
        elemetToShowMenu.appendChild(container);

        if (windowHeight < data.items.length * 20 + 60) {
            var scroll = document.createElement('div');
            scroll.classList.add('scroll');
            scroll.style.height = '22px';
            scroll.style.position = 'relative';
            scroll.onclick = function () {
                var additionalItem = 0;
                listStart--;
                if (listStart === 0) {
                    document.getElementsByClassName('scroll')[0].style.display = 'none';
                    additionalItem++;
                }

                if (data.items.length - listStart > itemsToShow.numberOfItems) {
                    document.getElementsByClassName('scroll')[1].style.display = 'block';
                }

                var list = document.getElementById("carsMenu");
                list.innerHTML = "";
                data.items.slice(listStart, itemsToShow.numberOfItems + listStart + additionalItem).forEach(function (val) {
                    var item = document.createElement('LI');
                    item.classList.add('menuItem');
                    item.innerText = val.title;
                    item.onclick = callBackOnMenuItem;
                    addStyles(liStyles, item);
                    list.appendChild(item);
                });
            };
            var arrowUp = document.createElement('div');
            addStyles(arrowUpStyles, arrowUp);
            scroll.appendChild(arrowUp);
            container.prepend(scroll);

            var scroll2 = document.createElement('div');
            scroll2.classList.add('scroll');
            scroll2.style.height = '22px';
            scroll2.style.position = 'relative';
            scroll2.onclick = function () {
                var additionalItem = 0;
                listStart++;
                if (listStart > 0) {
                    document.getElementsByClassName('scroll')[0].style.display = 'block';
                }
                if (data.items.length - listStart === itemsToShow.numberOfItems) {
                    document.getElementsByClassName('scroll')[1].style.display = 'none';
                    additionalItem--;
                }

                var list = document.getElementById("carsMenu");
                list.innerHTML = "";
                data.items.slice(listStart + additionalItem, itemsToShow.numberOfItems + listStart).forEach(function (val) {
                    var item = document.createElement('LI');
                    item.classList.add('menuItem');
                    item.innerText = val.title;
                    item.onclick = callBackOnMenuItem;
                    addStyles(liStyles, item);
                    list.appendChild(item);
                });
            };
            var arrowDown = document.createElement('div');
            addStyles(arrowDownStyles, arrowDown);
            scroll2.appendChild(arrowDown);
            container.appendChild(scroll2);

            if (listStart === 0) {
                console.log(listStart);
                scroll.style.display = 'none';
            }
        }

        var position = getMenuPosition(event, container.id);

        container.style.top = position.y + 'px';
        container.style.left = position.x + 'px';
    }

    var item = document.getElementById(cars.element);
    item.addEventListener('mousedown', function (event) {
        item.addEventListener("contextmenu", function (e) {
            e.preventDefault();
        }, false);
        if (event.button === 2 && event.target.id === 'cars') {

            console.log(event.target.id);
            renderMenu(cars, event);
        }
    });

    window.addEventListener('click', function () {
        if (document.getElementById('menuContainer')) {
            document.getElementById('menuContainer').remove();
        };
    });
})();
