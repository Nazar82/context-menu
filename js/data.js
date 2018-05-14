const data = (function () {
     
    const containerStyles = {
        'position': 'fixed',
        'width': '120px',
        'padding': '0',
        'margin': '0',
        'list-style-type': 'none',
        'background-color': 'grey',
        'z-index': '10'
    };
    const ulStyles = {
        'padding': '0',
        'margin': '0',
        'list-style-type': 'none',
        'border': '1px solid black',

    };
    const liStyles = {
        'background-color': 'beige',
        'padding': '2px 10px',
        'position': 'relative',
        'cursor': 'pointer'
    };
    const scrollStyles = {
        'height': '22px',
        'position': 'relative',
        'cursor': 'pointer'
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

    const arrowLeftStyles = {
        'position': 'absolute',
        'top': '50%',
        'left': '90%',
        'transform': 'translate(-50% , -50% )',
        'border-top': '6px solid transparent',
        'border-bottom': '6px solid transparent',
        'border-left': '6px solid black'
    }

    return {
        containerStyles: containerStyles,
        ulStyles: ulStyles,
        liStyles: liStyles,
        arrowUpStyles: arrowUpStyles,
        arrowDownStyles: arrowDownStyles,
        scrollStyles: scrollStyles,
        arrowLeftStyles: arrowLeftStyles
    }
})();