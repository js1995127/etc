$(document).ready(function() {
    

    $('#creat_data').click(function() {
        $.ajax({
            url: '/create_data',
            type: 'POST',
            cache: false,
            contentType: false,
            processData: false,
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

        setInterval(function(){
            console.log("Start Dropping Down")
            $.ajax({
                url: '/update',
                type: 'POST',
                cache: false,
                contentType: false,
                processData: false,
                success: function() {
                    console.log('GOT EM');
                }
            });
        }, 1000); 
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
