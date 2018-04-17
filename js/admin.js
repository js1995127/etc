$(document).ready(function() {
    // $('#inc').click(function() {
    //     console.log("NEXT ROUND LET'S GO");
    //     $.ajax({
    //         url: '/increment-round',
    //         type: 'POST',
    //         cache: false,
    //         contentType: false,
    //         processData: false,
    //         success: function() {
    //             console.log('NAILED IT');
    //         }
    //     });
    // });
    var array = [];
    $('#hashtag').find('.userinfo').each(function() {
        var text = $(this).text();
        array.push(text);
    });

    $('#creat_data').click(function() {
        console.log("WAX ON");
        $.ajax({
            url: '/',
            type: 'POST',
            data: JSON.stringify({
                'array': array, 
            }), 
            dataType: 'json',
            cache: false,
            contentType: 'application/json;charset=UTF-8',
            success: function() {
                console.log('GOT EM');
            }
        });
    });

    $('#game_end').click(function() {
        console.log("REBOOT");
        $.ajax({
            url: '/reset',
            type: 'POST',
            cache: false,
            contentType: false,
            processData: false,
            success: function() {
                console.log('RESET');
            }
        });
    });

    $('#game_start').click(function() {
        console.log("Game Start");
        $.ajax({
            url: '/matchstate',
            type: 'POST',
            cache: false,
            contentType: false,
            processData: false,
            success: function() {
                console.log('MATCH');
            }
        });
    });

    // setInterval(function() {
    //     $.ajax({
    //         url: '/unity-read',
    //         type: 'GET',
    //         cache: false,
    //         contentType: false,
    //         processData: false,
    //         success: function(state) {
    //             var state = JSON.parse(state);
    //             $('#showInfo').empty();
    //             for (var i in state['public_headlines']) {
    //                 $('#showInfo').append('<h4 class="col s6">'+state['public_headlines'][i]+'</h4>');
    //                 $('#showInfo').append('<h4 class="col s6">'+state['likes'][state['public_headlines'][i]]+'</h4>');
    //             }
    //         }
    //     });
    // }, 1000);
});
