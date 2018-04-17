$(document).ready(function() {

    
    
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

    var selected = false;
    var step = 0;
    $('#userinfoSubmit').click(function() {
         if (step === 0) {
            selected = false;
            // countStore();
            $('#userinfoSubmit').children('img').attr('src','images/next-grey.png');
            $('#title').hide();
            $('#hashtag').show();
            $('#regtitle').html("Choose Your Hashtags");
            step++; 
        } else if (step === 1) {
            // countStore();
            selected = false;
            $('#userinfoSubmit').children('img').attr('src','images/next-grey.png');
            $('#hashtag').hide();
            $('#photo').show();
            $('#regtitle').html("Choose A Photo");
            step++;
        } else if (step === 2) {
            selected = false;
            $('#userinfoSubmit').children('img').attr('src','images/next-color.png');
            $('#photo').hide();
            $('#res').show();
            $('#regtitle').html("Result"); 
            step++;                 
        } else if (step === 3) {
            selected = false;
            $('#userinfoSubmit').children('img').attr('src','images/next-color.png');
            $(".picture_info").find("img").css("opacity", 1);
            $('.userinfo').css({"background-color":"#3B75B3"});
            $('#res').hide();
            $('#title').show();
            $('#regtitle').html("Choose Your Title");
            step = 0; 
        }       
    });
    
    function countStore() {
         var str = String(selection_to_post).substring(0,3);
         var title_of_news = 0;
         var hashtags = 0;
         var source = 0;
         var img = 0;
        if (step === -1) {
            if (str === 'Dip') {
                title_of_news = title_of_news + 0.1;
            } else if  (str === 'Pro') {
                title_of_news = title_of_news + 1;
            } else if (str === 'Sec') {
                title_of_news = title_of_news + 1;
            } else if (str === 'Stu') {
                title_of_news = title_of_news + 2;
            } else if (str === 'Tal') {
                title_of_news = title_of_news + 2;
            } else if (str === 'Fir') {
                title_of_news = title_of_news + 2;
            } 
            console.log(title_of_news); 
            calculation = calculation + (Math.pow(title_of_news, 3) * 3);
        } else if (step === 0) {
            if (str === '#De') {
                hashtags = hashtags + 0.1;
            } else if  (str === '#No') {
                hashtags = hashtags + 0.1;
            } else if (str === '#Pe') {
                hashtags = hashtags + 0.1;
            } else if (str === '#Se') {
                hashtags = hashtags + 0.1;
            } else if (str === '#It') {
                hashtags = hashtags + 1;
            } else if (str === '#Im') {
                hashtags = hashtags + 2;
            } else if (str === '#Sh') {
                hashtags = hashtags + 2;
            } else if (str === '#No') {
                hashtags = hashtags + 2;
            } else if (str === '#Fi') {
                hashtags = hashtags + 2;
            } else if (str === '#Ap') {
                hashtags = hashtags + 2;
            } else if (str === '#Mo') {
                hashtags = hashtags + 2;
            } else if (str === '#Tr') {
                hashtags = hashtags + 2;
            }
            console.log(hashtags);
            calculation = calculation + (Math.pow(hashtags, 3) * 2);
        } else if (step === 1) {
            if (str === 'Tee') {
                target_audience = 1;
            } else if (str === 'You') {
                target_audience = 2;
            } else if (str === 'Mid') {
                target_audience = 3;
            } else if (str === 'Sen') {
                target_audience = 4;
            }
            console.log(target_audience);
        } else if (step === 3) {
            if (str === 'hea') {
                source = 0.1;
                source_option = 1;
            } else if (str === 'fak') {
                source = 1;
                source_option = 2;
            } else if (str === 'eag') {
                source = 2;
                source_option = 3;
            } 
            console.log(source);
            calculation = calculation + (Math.pow(source, 3) * 2);
        } else if (step === 4) {
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


