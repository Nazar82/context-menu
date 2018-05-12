const data = (function () {
    const carsjson = '{"element":"cars", "id":"carsMenu", "items":[{"title":"Porsche","disabled":"true","models":[{"title":"Sedan","disable":"false"},{"title":"Hatchback","disable":"false"}]},{"title":"BMW","disabled":"false","models":[{"title":"Cabriolet","disable":"false"},{"title":"Break","disable":"false"}]},{"title":"Opel","disabled":"false"}, {"title":"Porsche","disabled":"false"}, {"title":"Porsche1","disabled":"false"},{"title":"Porsche2","disabled":"false"},{"title":"Porsche3","disabled":"false"}, {"title":"Porsche4","disabled":"false"}, {"title":"Porsche5","disabled":"false"}, {"title":"Porsche6","disabled":"false"}, {"title":"Porsche7","disabled":"false"}, {"title":"Porsche8","disabled":"false"}]}';

    const containerStyles = {
        'position': 'absolute',
        'width': '120px',
        'padding': '0',
        'margin': '0',
        'list-style-type': 'none',
        'background-color': 'grey',
    };
    const ulStyles = {
        'padding': '0',
        'margin': '0',
        'list-style-type': 'none',
        'border': '1px solid green',

    };
    const liStyles = {
        'background-color': 'beige',
        'padding': '2px 10px',
        'border-right': '1px solid green',
        'position': 'relative',
    };
    const arrowUpStyles = {
        'position': 'absolute',
        'top': '50%',
        'left': '50%',
        'transform': 'translate(-50% , -50% )',
        'border-left': '7px solid transparent',
        'border-right': '7px solid transparent',
        'border-bottom': '7px solid black'
    }

    const arrowDownStyles = {
        'position': 'absolute',
        'top': '50%',
        'left': '50%',
        'transform': 'translate(-50% , -50% )',
        'border-left': '7px solid transparent',
        'border-right': '7px solid transparent',
        'border-top': '7px solid black'
    }

    return {
        carsjson: carsjson,
        containerStyles: containerStyles,
        ulStyles: ulStyles,
        liStyles: liStyles,
        arrowUpStyles: arrowUpStyles,
        arrowDownStyles: arrowDownStyles
    }
})();