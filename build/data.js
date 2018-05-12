'use strict';

var data = function () {

    var containerStyles = {
        'position': 'fixed',
        'width': '120px',
        'padding': '0',
        'margin': '0',
        'list-style-type': 'none',
        'background-color': 'grey',
        'z-index': '10'
    };
    var ulStyles = {
        'padding': '0',
        'margin': '0',
        'list-style-type': 'none',
        'border': '1px solid black'

    };
    var liStyles = {
        'background-color': 'beige',
        'padding': '2px 10px',
        'position': 'relative'
    };
    var scrollStyles = {
        'height': '22px',
        'position': 'relative',
        'cursor': 'pointer'
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

    return {
        containerStyles: containerStyles,
        ulStyles: ulStyles,
        liStyles: liStyles,
        arrowUpStyles: arrowUpStyles,
        arrowDownStyles: arrowDownStyles,
        scrollStyles: scrollStyles
    };
}();