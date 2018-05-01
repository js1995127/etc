$(document).ready(function() {
    
    // get username from phase1 by using localstorage
    var followers = localStorage.getItem('point');
    // var username = localStorage.getItem('username')
    var hashtag_heat_increase = 0
    var hashtag = ''

    $('.carousel-item').click(function() {
        if (selected === false) {
            selected = true;
            selection_to_post = $(this).children('img').attr('src').split('/').pop();
            selection_to_post = selection_to_post.substring(0, selection_to_post.lastIndexOf('.'));
            $(this).children('img').css("opacity", 0.5);
            $('#userinfoSubmit').children('img').attr('src','images/next-color.png');
        } else if (selected === true) {
            selection_to_post = $(this).children('img').attr('src').split('/').pop();
            selection_to_post = selection_to_post.substring(0, selection_to_post.lastIndexOf('.'));
            $(".carousel-item").find("img").css("opacity", 1);
            $(this).children('img').css("opacity", 0.5);
        }
    });

    $('#userinfoSubmit').find('img').attr('src','images/LetsDoIt.png');
    $('#regtitle').html("Oops");
    var selected = false;
    var step = 0;
    $('#userinfoSubmit').click(function() {
        if (step === 0) {
            $('#instruction').hide();
            $('#hashtag').show();
            $('#userinfoSubmit').children('img').attr('src','images/next-grey.png');
            $('#regtitle').html("Choose Your Posts");          
            step++;
        }
     if (selected === true) {    
       if (step === 1) {
            selected = false;
            countStore();
            step++; 
            hashtag_heat_increase = hashtag_heat_increase * 0.1 * followers / 10;
            setTimeout(function() {
                $.ajax({
                url: '/update_hashtag',
                type: 'POST',
                data: JSON.stringify({
                    'hashtag_heat_increase' :hashtag_heat_increase,
                    'hashtag': hashtag,
                    // 'username': username
                }), 
                dataType: 'json',
                cache: false,
                contentType: 'application/json;charset=UTF-8',
                success: function(state) {
                    console.log("update");
                }
                });
            }, 3000);            
            }
        } 
        if (step === 2) {           
            $('#hashtag').hide();
            $('#loadingPage').show();
            $('#regtitle').html("Posting");
            $('#userinfoSubmit').hide();
            loadingPage();
        }
        })     
 
    function loadingPage() {
        setTimeout(function(){
            $('#loadingPage').hide();
            $('#hashtag').show();
            $('#userinfoSubmit').children('img').attr('src','images/next-grey.png');
            $(".carousel-item").find("img").css("opacity", 1);
            $('#userinfoSubmit').show();
            $('#regtitle').html("Choose Your Hashtags"); 
            step = 0;
        },5000);
    }
    
    function countStore() {
        var str = String(selection_to_post) 
        console.log(str);    
        if (step === 1) {        
            if (str === "visascare") {
                hashtag = "#VisaScare"
            } else if(str == "yourethelier"){
                hashtag = "#YoureTheLiar"
            } else if(str == "bevigilant") {
                hashtag = "#BeVigilant"
            } else if(str == "justatheory") {
                hashtag = "#JustATheory"
            } else if(str == "justice") {
                hashtag = "#Justice"
            } 
            hashtag_heat_increase = 0.9 + (Math.random() * 20) / 10;
        } 
    }
});


