$(document).ready(function() {



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
                if (state['cleared']) {
                    localStorage.setItem('private_headlines', '');
                    localStorage.setItem('public_headlines', '');
                    localStorage.setItem('postMade', 'NO');
                    window.open('http://objection-1994.appspot.com/side', "_self");
                }
            }
        });
    }, 1000);

    var selected = true;
    var selection_to_post;
    var step = 3;
    $('.userinfo').click(function() {
        console.log(selected);
        if (selected === false) {
            selected = true;
            selection_to_post = $(this).children('p').text();
            $(this).css({"background-color":"#5f5248"})
            $(this).children('p').css({"color":"#faf6e4"});
            $('#userinfoSubmit').children('img').attr('src','../images/next-color.png');
        } else if (selected === true) {
            selection_to_post = $(this).children('p').text();
            $(this).closest('a').siblings().children('div').css({"background-color":"#faf6e4"})
            $(this).closest('a').siblings().children('div').children('p').css({"color":"#5f5248"});
            $(this).css({"background-color":"#5f5248"});
            $(this).children('p').css({"color":"#faf6e4"});
        }
    });

    $('#userinfoSubmit').click(function() {
        if(selected === true) {
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
            if(step === 8) {
                //StoreUser();
                $('#regtitle').show();
                $('#match').hide();
                $('#submitbtn').hide();
                $('#regtitle').html("Selected");
                //window.location.href = 'side';
            }
            else if(step === 7) {
                selected = false;
                $('#matchimgdiv').children('img').attr('src','../images/student-5.png');
                $('#userinfoSubmit').children('img').attr('src','../images/next-grey.png');
                step++;
            }
            else if(step === 6) {
                selected = false;
                $('#matchimgdiv').children('img').attr('src','../images/student-4.png');
                $('#userinfoSubmit').children('img').attr('src','../images/next-grey.png');
                step++;
            }
            else if(step === 5) {
                selected = false;
                $('#matchimgdiv').children('img').attr('src','../images/student-3.png');
                $('#userinfoSubmit').children('img').attr('src','../images/next-grey.png');
                step++;
            }
            else if(step === 4) {
                //StoreUser();
                selected = false;
                $('#matchimgdiv').children('img').attr('src','../images/student-2.png');
                $('#userinfoSubmit').children('img').attr('src','../images/next-grey.png');
                step++;
            }
            else if(step === 3) {
                //StoreUser();
                selected = false;
                $('#userinfoSubmit').children('img').attr('src','../images/next-grey.png');
                $('#matchdescription').hide();
                $('#match').show();
                $('.userinfo').each(function(i) {
                    $(this).css({"width":"100%", "border-radius":"0"});
                })
                step++;
            }
            $('.userinfo').each(function(i) {
                $(this).css({"background-color":"#faf6e4"});
                $(this).children('p').css({"color":"#5f5248"});
            })
        }
    });
});
