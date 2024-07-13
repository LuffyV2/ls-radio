$(function() {
    window.addEventListener('message', function(event) {
        if (event.data.type == "open") {
            QBRadio.SlideUp()
        }

        if (event.data.type == "close") {
            QBRadio.SlideDown()
        }
    });

    document.onkeyup = function (data) {
        if (data.key == "Escape") { // Escape key
            $.post('https://qb-radio/escape', JSON.stringify({}));
        } else if (data.key == "Enter") { // Enter key
            $.post('https://qb-radio/joinRadio', JSON.stringify({
                channel: $("#channel").val()
            }));
        }
    };
});

QBRadio = {}

$(document).on('click', '#submit', function(e){
    e.preventDefault();

    $.post('https://qb-radio/joinRadio', JSON.stringify({
        channel: $("#channel").val()
    }));
});

$(document).on('click', '#disconnect', function(e){
    e.preventDefault();

    $.post('https://qb-radio/leaveRadio');
});

$(document).ready(function() {
    function updateVolume(value) {
        $('#volume').val(value);
        $('#volume-value').text(value);
    }

    $('#volumeUp').on('click', function(e) {
        e.preventDefault();
        let currentVolume = parseInt($('#volume').val());
        if (currentVolume < 100) {
            currentVolume += 10;
            updateVolume(currentVolume);
            $.post('https://qb-radio/volumeUp', JSON.stringify({
                channel: $("#channel").val()
            }));
        }
    });

    $('#volumeDown').on('click', function(e) {
        e.preventDefault();
        let currentVolume = parseInt($('#volume').val());
        if (currentVolume > 0) {
            currentVolume -= 10;
            updateVolume(currentVolume);
            $.post('https://qb-radio/volumeDown', JSON.stringify({
                channel: $("#channel").val()
            }));
        }
    });
});

$(document).on('click', '#decreaseradiochannel', function(e){
    e.preventDefault();

    $.post('https://qb-radio/decreaseradiochannel', JSON.stringify({
        channel: $("#channel").val()
    }));
});

$(document).on('click', '#increaseradiochannel', function(e){
    e.preventDefault();

    $.post('https://qb-radio/increaseradiochannel', JSON.stringify({
        channel: $("#channel").val()
    }));
});

$(document).on('click', '#poweredOff', function(e){
    e.preventDefault();

    $.post('https://qb-radio/poweredOff', JSON.stringify({
        channel: $("#channel").val()
    }));

    let powerStatus = $('#power-status p');
    if (powerStatus.text() === 'P0WERED ON') {
        powerStatus.text('POWERED OFF');
        $('#poweredOff').removeClass('radio-on').addClass('radio-off');
    } else {
        powerStatus.text('P0WERED ON');
        $('#poweredOff').removeClass('radio-off').addClass('radio-on');
    }
});

QBRadio.SlideUp = function() {
    $(".container").css("display", "block");
    $(".radio-container").animate({bottom: "0vh",}, 250);
}

QBRadio.SlideDown = function() {
    $(".radio-container").animate({bottom: "-110vh",}, 400, function(){
        $(".container").css("display", "none");
    });
}