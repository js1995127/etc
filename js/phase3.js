$(document).ready(function() {

    setInterval(function(){
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
    
    //could get the value from thing that got selected
    $('.userinfo').click(function() {
        if (selected === false) {
            selected = true;
            selection_to_post = $(this).children('p').text();
            $(this).css({"background-color":"#5f5248"})
            $(this).children('p').css({"color":"#fff"});
            $('#userinfoSubmit').children('img').attr('src','images/next-color.png');
        } else if (selected === true) {
            selection_to_post = $(this).children('p').text();
            $(this).closest('a').siblings().children('div').css({"background-color":"#3B75B3"})
            $(this).closest('a').siblings().children('div').children('p').css({"color":"#fff"});
            $(this).css({"background-color":"#5f5248"});
            $(this).children('p').css({"color":"#fff"});
        }
    });

    $('.picture_info').click(function() {
        if (selected === false) {
            selected = true;
            selection_to_post = $(this).children('img').attr('src').split('/').pop();
            $(this).children('img').css("opacity", 0.5);
            $('#userinfoSubmit').children('img').attr('src','images/next-color.png');
        } else if (selected === true) {
            selection_to_post = $(this).children('img').attr('src').split('/').pop();
            $(".picture_info").find("img").css("opacity", 1);
            $(this).children('img').css("opacity", 0.5);
        }
    });

    $('#userinfoSubmit').children('img').attr('src','images/next-grey.png');
    var selected = false;
    var step = 0;
    calculation = 0;
    $('#userinfoSubmit').click(function() {
         if (step === 0) {
            selected = false;
            countStore();
            $('#userinfoSubmit').children('img').attr('src','images/next-grey.png');
            $('#title').hide();
            $('#hashtag').show();
            $('#regtitle').html("Choose Your Hashtags");
            step++; 
        } else if (step === 1) {
            selected = false;
            countStore();
            $('#userinfoSubmit').children('img').attr('src','images/next-grey.png');
            $('#hashtag').hide();
            $('#photo').show();
            $('#regtitle').html("Choose A Photo");
            step++;
        } else if (step === 2) {
            selected = false;
            countStore();
            $('#userinfoSubmit').children('img').attr('src','images/next-color.png');
            $('#photo').hide();
            $('#res').show();
            $('#regtitle').html("Result"); 
            step++;                 
             $.ajax({
                url: '/',
                type: 'POST',
                data: JSON.stringify({
                    'username': teamName,
                    'step': step 
                }), 
                dataType: 'json',
                cache: false,
                contentType: 'application/json;charset=UTF-8',
                success: function(state) {}
                })

        } else if (step === 3) {
            selected = false;
            $('#userinfoSubmit').children('img').attr('src','images/next-grey.png');
            $(".picture_info").find("img").css("opacity", 1);
            $('.userinfo').css({"background-color":"#3B75B3"});
            $('#res').hide();
            $('#title').show();
            $('#regtitle').html("Choose Your Title");
            step = 0; 
        }       
    });
    
    function countStore() {
         var str = String(selection_to_post)
         str = str.substr(str.length - 3, str.length)
         var title_of_news = 0;
         var hashtags = 0;
         var img = 0;
        if (step === 0) {
            if (str === 'day') {
                title_of_news = title_of_news + 0.1;
            } else if  (str === 'go?') {
                title_of_news = title_of_news + 1;
            } else if (str === 'ons') {
                title_of_news = title_of_news + 1;
            } else if (str === 'ime') {
                title_of_news = title_of_news + 2;
            } else if (str === 'ds?') {
                title_of_news = title_of_news + 2;
            } else if (str === 'OAT') {
                title_of_news = title_of_news + 2;
            } else if (str === 're!') {
                title_of_news = title_of_news + 2;
            } else if (str === 'us!') {
                title_of_news = title_of_news + 2;
            } else if (str === 'es!') {
                title_of_news = title_of_news + 2;
            } else if (str === 'ob!') {
                title_of_news = title_of_news + 2;
            } else if (str === 'RS!') {
                title_of_news = title_of_news + 2;
            } else if (str === ' it') {
                title_of_news = title_of_news + 2;
            } else if (str === 'ath') {
                title_of_news = title_of_news + 2;
            } else if (str === 'ING') {
                title_of_news = title_of_news + 2;
            } else if (str === 'ers') {
                title_of_news = title_of_news + 2;
            } else if (str === 'ket') {
                title_of_news = title_of_news + 2;
            } else if (str === ' in') {
                title_of_news = title_of_news + 2;
            } else if (str === 'ase') {
                title_of_news = title_of_news + 2;
            } else if (str === 'aph') {
                title_of_news = title_of_news + 2;
            }
            calculation = calculation + (Math.pow(title_of_news, 3) * 3);
        } else if (step === 1) {
            if (str === 'ute') {
                hashtags = hashtags + 0.1;
            } else if  (str === 'LOL') {
                hashtags = hashtags + 0.1;
            } else if (str === 'dal') {
                hashtags = hashtags + 0.1;
            } else if (str === 'ger') {
                hashtags = hashtags + 0.1;
            } else if (str === 'Sad') {
                hashtags = hashtags + 1;
            } else if (str === 'ill') {
                hashtags = hashtags + 2;
            } else if (str === 'ats') {
                hashtags = hashtags + 2;
            } else if (str === 'www') {
                hashtags = hashtags + 2;
            } else if (str === 'obs') {
                hashtags = hashtags + 2;
            } else if (str === 'ing') {
                hashtags = hashtags + 2;
            } 
            calculation = calculation + (Math.pow(hashtags, 3) * 2);
        } else if (step === 2) {
            if (String(selection_to_post) === 'image_1.jpg') {
                img = 0.1;
                img_selected = 1;
            } else if (String(selection_to_post) === 'image_2.jpg') {
                img = 0.1;
                img_selected = 2;
            } else if (String(selection_to_post) === 'image_3.jpg') {
                img = 1;
                img_selected = 3;
            } else if (String(selection_to_post) === 'image_4.jpg') {
                img = 2
                img_selected = 4;
            }
            console.log(img_selected);
            calculation = calculation + (Math.pow(img, 3) * 3);
        }
       
    }
});


