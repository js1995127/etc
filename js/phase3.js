$(document).ready(function() {
    
    // get username from phase1 by using localstorage
    var followers = localStorage.getItem('point');
   
    var average_news_point = 0;
    var transRatio = 0.1
    var hashtag_heat_increase = 0
    var hashtag = ''

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
            hashtag = selection_to_post
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
            console.log('average_news_point' + average_news_point);
            hashtag_heat_increase =  (followers * transRatio * average_news_point / 2).toFixed();
              console.log('hashtag_heat_increase' + hashtag_heat_increase); 
            $('#res span').text('(' + hashtag + ')');
            $('#res').append('<h2>' + String(hashtag_heat_increase) + '<h2/>');
            step++; 
                        
             $.ajax({
                url: '/update_hashtag',
                type: 'POST',
                data: JSON.stringify({
                    'hashtag_heat_increase' :hashtag_heat_increase,
                    'hashtag': hashtag
                }), 
                dataType: 'json',
                cache: false,
                contentType: 'application/json;charset=UTF-8',
                success: function(state) {}
                })

        } else if (step === 3) {
            selected = false;
            $('#res > h2').remove();
            $('#res > span').text();
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
                title_of_news = title_of_news + 0.3;
            } else if (str === 'ons') {
                title_of_news = title_of_news + 0.2;
            } else if (str === 'ime') {
                title_of_news = title_of_news + 0.2;
            } else if (str === 'ds?') {
                title_of_news = title_of_news + 0.2;
            } else if (str === 'OAT') {
                title_of_news = title_of_news + 0.3;
            } else if (str === 're!') {
                title_of_news = title_of_news + 0.1;
            } else if (str === 'us!') {
                title_of_news = title_of_news + 0.3;
            } else if (str === 'es!') {
                title_of_news = title_of_news + 0.2;
            } else if (str === 'NOW') {
                title_of_news = title_of_news + 0.3;
            } else if (str === 'RS!') {
                title_of_news = title_of_news + 0.2;
            } else if (str === 'ook') {
                title_of_news = title_of_news + 0.1;
            } else if (str === 'ath') {
                title_of_news = title_of_news + 0.1;
            } else if (str === 'ING') {
                title_of_news = title_of_news + 0.2;
            } else if (str === 'ers') {
                title_of_news = title_of_news + 0.3;
            } else if (str === 'ket') {
                title_of_news = title_of_news + 0.3;
            } else if (str === ' in') {
                title_of_news = title_of_news + 0.2;
            } else if (str === 'ion') {
                title_of_news = title_of_news + 0.3;
            } else if (str === 'why') {
                title_of_news = title_of_news + 0.2;
            } else if (str === 'an!') {
                title_of_news = title_of_news + 0.2;
            }
            title_of_news = title_of_news * 0.5 * 3
             } else if (step === 1) {
            if (str === 'ute') {
                hashtags = hashtags + 1;
            } else if  (str === 'LOL') {
                hashtags = hashtags + 1;
            } else if (str === 'dal') {
                hashtags = hashtags + 3;
            } else if (str === 'est') {
                hashtags = hashtags + 2;
            } else if (str === 'Sad') {
                hashtags = hashtags + 3;
            } else if (str === 'ill') {
                hashtags = hashtags + 2;
            } else if (str === 'ats') {
                hashtags = hashtags + 1;
            } else if (str === 'www') {
                hashtags = hashtags + 1;
            } else if (str === 'obs') {
                hashtags = hashtags + 2;
            } else if (str === 'ing') {
                hashtags = hashtags + 2;
            } else if (str === 'USA') {
                hashtags = hashtags + 2;
            } else if (str === 'eMe') {
                hashtags = hashtags + 2;
            } else if (str === 'nly') {
                hashtags = hashtags + 2;
            } else if (str ===  'ess') {
                hashtags = hashtags + 3;
            } 
        } else if (step === 2) {
            if (String(selection_to_post) === 'image_14.png') {
                img = 0.1;
                img_selected = 1;
            } else if (String(selection_to_post) === 'image_17.png') {
                img = 0.1;
                img_selected = 2;
            } else if (String(selection_to_post) === 'image_5.png') {
                img = 0.3;
                img_selected = 3;
            } else if (String(selection_to_post) === 'image_16.png') {
                img = 0.1
                img_selected = 4;
            } else if (String(selection_to_post) === 'image_6.png') {
                img = 0.1
                img_selected = 5;
            } else if (String(selection_to_post) === 'image_7.png') {
                img = 0.2
                img_selected = 6;
            } else if (String(selection_to_post) === 'image_8.png') {
                img = 0.3
                img_selected = 7;
            } else if (String(selection_to_post) === 'image_15.png') {
                img = 0.3
                img_selected = 8;
            } else if (String(selection_to_post) === 'image_9.png') {
                img = 0.1
                img_selected = 9;
            } else if (String(selection_to_post) === 'image_10.png') {
                img = 0.1
                img_selected = 10;
            } else if (String(selection_to_post) === 'image_11.png') {
                img = 0.1
                img_selected = 11;
            } else if (String(selection_to_post) === 'image_12.png') {
                img = 0.1
                img_selected = 12;
            } else if (String(selection_to_post) === 'image_13.png') {
                img = 0.2
                img_selected = 13;
            } else if (String(selection_to_post) === 'image_18.png') {
                img = 0.1
                img_selected = 14;
            } 
            img = img * 0.5 * 3 ;
            average_news_point = (img + title_of_news);
        }   
    }
});


