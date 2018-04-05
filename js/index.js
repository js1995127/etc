$(document).ready(function() {

    "use strict";
    
    $('#user').keydown(function(e) {
        if (e.keyCode === 13) {
            e.preventDefault();
        }
    });

    $('#user').keyup(function(e) {
        e.preventDefault();
        if (e.keyCode === 13) {
            StoreUser();
            window.location.href = 'side';
        }
    });
    
    $('#usernameSubmit').click(function(k) {
        k.preventDefault();
        StoreUser();
        window.location.href = 'side';
    });

    var selected = false;
    var selection_to_post;
    var step = -5;
    //could get the value from thing that got selected
    $('.userinfo').click(function() {
        if (selected === false) {
            selected = true;
            selection_to_post = $(this).children('p').text();
            console.log(selection_to_post);
            $(this).css({"background-color":"#5f5248"})
            $(this).children('p').css({"color":"#faf6e4"});
            $('#userinfoSubmit').children('img').attr('src','images/next-color.png');
        } else if (selected === true) {
            selection_to_post = $(this).children('p').text();
            $(this).closest('a').siblings().children('div').css({"background-color":"#faf6e4"})
            $(this).closest('a').siblings().children('div').children('p').css({"color":"#5f5248"});
            $(this).css({"background-color":"#5f5248"});
            $(this).children('p').css({"color":"#faf6e4"});
        }
    });
    //temp variable for store information for future use 
    var teamName;
    var personName;
    $('#userinfoSubmit').click(function() {
        //This is new pages for our projects
        //This is page 1
        if (step === -5) { 
            $('#teamName').hide();
            $('#personName').show();
            teamName = $('#team_infor').val();
            step++;
        } else if (step === -4) {
            $('#personName').hide();
            $('#welcome_page').show();
            $('#regtitle').html("Welcome");
            personName = $('#person_infor').val();
            step++;
        } else if (step === -3) {
            $('#welcome_page').hide();
            $('#story_page').show();
            $('#regtitle').html("");
            step++;
        } else if (step === -2) {
            $('#story_page').hide();
            $('#title').show();
            $('#regtitle').html("Choose Your Title");
            step++;
        }
        if(selected === true && step > -2) {
            var newusername = $(this).closest('div').children('p').text().toLowerCase();
            $.ajax({
                url: '/',
                type: 'POST',
                data: JSON.stringify({'step': step, 'selection': selection_to_post, 
                   'username': newusername}), 
                dataType: 'json',
                cache: false,
                contentType: 'application/json;charset=UTF-8',
                success: function() {
                    console.log('GOT EM');
                }
            });
            if (step === -1) {
                console.log(step);
                $('#title').hide();
                $('#hashtag').show();
                $('#regtitle').html("Choose Your Hashtags");
                step++; 
            } else if(step === 0) {
                selected = false;
                $('#userinfoSubmit').children('img').attr('src','images/next-grey.png');
                $('#hashtag').hide();
                $('#age').show();
                $('#regtitle').html("Target Audience");
                step++;
            } else if(step === 1) {
                selected = false;
                $('#userinfoSubmit').children('img').attr('src','images/next-grey.png');
                $('#age').hide();
                $('#source').show();
                $('.userinfo').each(function(i) {
                    $(this).css({"width":"85%"});
                })
                $('#regtitle').html("Choose Your Source");
                step++;
            } else if (step === 2) {
                selected = false;
                $('#userinfoSubmit').children('img').attr('src','images/next-grey.png');
                $('#source').hide();
                $('#post_time').show();
                $('.userinfo').each(function(i) {
                    $(this).css({"width":"85%"});
                })
                $('#regtitle').html("Post Time");
                step++;
            } else if (step === 3) {
                selected = false;
                $('#userinfoSubmit').children('img').attr('src','images/next-grey.png');
                $('#post_time').hide();
                $('#photo').show();
                $('.userinfo').each(function(i) {
                    $(this).css({"width":"85%"});
                })
                $('#regtitle').html("Choose A Photo");
                step++;
            } else if (step === 4) {
                selected = false;
                $('#userinfoSubmit').children('img').attr('src','images/next-grey.png');
                $('#photo').hide();
                $('#postmedia').show();
                $('.userinfo').each(function(i) {
                    $(this).css({"width":"85%"});
                })
                $('#regtitle').html("Where To Post?");
                step++;
            } else if (step === 5) {
                selected = false;
                $('#userinfoSubmit').children('img').attr('src','images/next-grey.png');
                $('#postmedia').hide();
                $('#media_page').show();
                $('.userinfo').each(function(i) {
                    $(this).css({"width":"85%"});
                })
                $('#regtitle').html("FaceBook");
                step++;
            } else if (step === 6) {
                selected = false;
                $('#userinfoSubmit').children('img').attr('src','images/next-grey.png');
                $('#media_page').hide();
                $('#res').show();
                $('.userinfo').each(function(i) {
                    $(this).css({"width":"85%"});
                })
                $('#userinfoSubmit').hide();
                $('#regtitle').html("Final Result");
                step++;
            }       
        } else if(selected === true) {
            var newusername = $(this).closest('div').children('p').text().toLowerCase();
            $.ajax({
                url: '/',
                type: 'POST',
                data: JSON.stringify({'step': step, 'selection': selection_to_post, 
                   'username': newusername}),
                dataType: 'json',
                cache: false,
                contentType: 'application/json;charset=UTF-8',
                success: function() {
                    console.log('GOT EM');
                }
            });
            // if(step === 8) {
            //     //StoreUser();
            //     window.location.href = 'side';
            // }
            // if(step === 7) {
            //     selected = false;
            //     $('#matchimgdiv').children('img').attr('src','images/student-5.png');
            //     $('#userinfoSubmit').children('img').attr('src','images/next-grey.png');
            //     step++;
            // }
            // else if(step === 6) {
            //     selected = false;
            //     $('#matchimgdiv').children('img').attr('src','images/student-4.png');
            //     $('#userinfoSubmit').children('img').attr('src','images/next-grey.png');
            //     step++;
            // }
            // else if(step === 5) {
            //     selected = false;
            //     $('#matchimgdiv').children('img').attr('src','images/student-3.png');
            //     $('#userinfoSubmit').children('img').attr('src','images/next-grey.png');
            //     step++;
            // }
            // else if(step === 4) {
            //     //StoreUser();
            //     selected = false;
            //     $('#matchimgdiv').children('img').attr('src','images/student-2.png');
            //     $('#userinfoSubmit').children('img').attr('src','images/next-grey.png');
            //     step++;
            // }
            // else if(step === 3) {
            //     StoreUser();
            //     selected = false;
            //     $('#userinfoSubmit').children('img').attr('src','images/next-grey.png');
            //     $('#matchdescription').hide();
            //     $('#match').show();
            //     step++;
            // }
            $('.userinfo').each(function(i) {
                $(this).css({"background-color":"#faf6e4"});
                $(this).children('p').css({"color":"#5f5248"});
            })
        }
    });
    
    // store username and userType in local storage
    function StoreUser() {
        // check if the browser supports local storage
        // notice that you cannot test multiple accounts in one browser. Their data will overwrite each other.
        // use different browsers to test multiple accounts.
        if (typeof(Storage) !== 'undefined') {
            // if supported, store username
            localStorage.setItem('user', $('#user').text().toLowerCase());   
            console.log("input username is " + $('#user').text().toLowerCase());
            localStorage.setItem('postMade', 'NO');
            // check and store user type
            if ($('#user').text().toLowerCase().substring(0, 5) === "media") {
                localStorage.setItem('userType', "media");
                setCookie("userType", "media", 1);
            } else if ($('#user').text().toLowerCase().substring(0, 7) === "citizen") {
                localStorage.setItem('userType', "citizen");
                setCookie("userType", "citizen", 1);
            } else {
                console.log('Oops! Invalid userType.');
            }
        } else {
            console.log('Oops! No Web Storage support...');
        } 
    }
});


