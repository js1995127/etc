$(document).ready(function() {
    
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
        }, 3000); 
    });

});
