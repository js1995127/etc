// JavaScript Document
$(document).ready(function() {
    
    "use strict";    

    console.log(localStorage.getItem('user'));

    function storeTeamNum() {
        $.ajax({
            url: '/read-state',
            type: 'POST',
            data: localStorage.getItem('user'),
            dataType: 'json',
            cache: false,
            contentType: false,
            processData: false,
            success: function(state) {
                //localStorage.setItem('team_number', state['teamNumber']);
                // set team logo and name on load of this page
                if (state['teamNumber'] == '2') {
                    $('#rightUsername').show();
                    $('#wrongUsername').hide();
                    $('#sideName').html('ROOSA');
                    $('#sideLogo').attr('src', 'images/logo money.png');
                } else if (state['teamNumber'] == '1') {
                    $('#rightUsername').show();
                    $('#wrongUsername').hide();
                    $('#sideName').html('GOGAN');
                    $('#sideLogo').attr('src', 'images/logo power.png');
                } else {
                    $('#rightUsername').hide();
                    $('#wrongUsername').show();
                    console.log("Opps! not a valid team number.");
                }
            },
            error: function() {
                $('#rightUsername').hide();
                $('#wrongUsername').show();
                console.log("Opps! not a valid username.");
            }
        });       
    }
    storeTeamNum();


    var dotCount = 0;
    setInterval(function() {
        $.ajax({
            url: '/read-state',
            type: 'POST',
            data: localStorage.getItem('user'),
            dataType: 'json',
            cache: false,
            contentType: false,
            processData: false,
            success: function(state) {
            	// respond to CLEAR command from ADMIN page
                console.log(state['matched']);
            	if (state['cleared']) {
            		localStorage.setItem('private_headlines', '');
           	        localStorage.setItem('public_headlines', '');
                    localStorage.setItem('postMade', 'NO');
                }
                else if (state['matched']) {
                    window.open('http://objection-1994.appspot.com/match_mentor', "_self");
                }
                if (state['cleared'] == false && (state['teamNumber'] == '1' || state['teamNumber'] == '2')) {
                    localStorage.setItem('version', state['versioncontrol']);
                    //console.log("stored username to use in link is " + localStorage.getItem('user'));
                    window.open('http://objection-1994.appspot.com/user?user=' + localStorage.getItem('user'), "_self");
                }
            },
            error: function() {
                $('#rightUsername').hide();
                $('#wrongUsername').show();
                console.log("Opps! not a valid username.");
            }
        });
        
        // simple dot animation on side page
        if (dotCount < 3) {
            $('#dots').append('.');  
            dotCount = dotCount + 1;
        } else {
            dotCount = 0;
            $('#dots').text("Waiting for question");
        }

    }, 1000);
      
});
