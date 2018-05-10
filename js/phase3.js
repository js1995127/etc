$(document).ready(function() {
    

    var imageURLs1 = [
           "images/justatheory.png"
         , "images/justatheory2.png"
         , "images/justatheory3.png"
      ];
    var imageURLs2 = [
           "images/bevigilant.png"
         , "images/bevigilant2.png"
         , "images/bevigilant3.png"
      ];
    var imageURLs3 = [
           "images/justice.png"
         , "images/justice2.png"
         , "images/justice3.png"
      ];
    var imageURLs4 = [
           "images/visascare.png"
         , "images/visascare2.png"
         , "images/visascare3.png"
      ];
    var imageURLs5 = [
           "images/youretheliar.png"
         , "images/youretheliar2.png"
         , "images/youretheliar3.png"
      ];

    var followers = localStorage.getItem('point');
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

      function getImageTag(index) {
        var img = ""; 
        if (index === 1) {
            var randomIndex = Math.floor(Math.random() * imageURLs1.length);
            img = imageURLs1[randomIndex];    
        } else if (index === 2) {
            var randomIndex = Math.floor(Math.random() * imageURLs2.length);
            img = imageURLs2[randomIndex];
        } else if (index === 3) {
            var randomIndex = Math.floor(Math.random() * imageURLs3.length);
            img = imageURLs3[randomIndex];
        } else if (index === 4) {
            var randomIndex = Math.floor(Math.random() * imageURLs4.length);
            img = imageURLs4[randomIndex];
        } else if (index === 5) {
   
            var randomIndex = Math.floor(Math.random() * imageURLs5.length);
            img = imageURLs5[randomIndex];
        }
        $('.carousel-item').eq(index - 1).children('img').attr('src',img);   
    } 
    
    $('.carousel-inner .carousel-item').each(function(index){
        getImageTag(index + 1);
    })

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
            hashtag_heat_increase = hashtag_heat_increase.toFixed();
            setTimeout(function() {
                $.ajax({
                url: '/update_hashtag',
                type: 'POST',
                data: JSON.stringify({
                    'hashtag_heat_increase' :hashtag_heat_increase,
                    'hashtag': hashtag,
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
            $('#hash_heat_increase').show();
            $('#hash_heat_increase').text(hashtag_heat_increase + " of your " + followers + " follower re-woofed this Story");
            $('#regtitle').html("Posting");
            $('#userinfoSubmit').hide();
            $('.carousel-inner .carousel-item').each(function(index){
                getImageTag(index + 1);
            })
            loadingPage();
        }
        })     
 
    function loadingPage() {
        setTimeout(function(){
            $('#loadingPage').hide();
            $('#hash_heat_increase').hide();
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
        if (step === 1) {        
            if (str === "visascare") {
                hashtag = "#VisaScare"
			} else if(str == "visascare2"){
                hashtag = "#VisaScare"
			} else if(str == "visascare3"){
                hashtag = "#VisaScare"
			} else if(str == "youretheliar"){
                hashtag = "#YoureTheLiar"
			} else if(str == "youretheliar2"){
                hashtag = "#YoureTheLiar"
            } else if(str == "youretheliar3"){
                hashtag = "#YoureTheLiar"
            } else if(str == "bevigilant") {
                hashtag = "#BeVigilant"
			} else if(str == "bevigilant2") {
                hashtag = "#BeVigilant"
			} else if(str == "bevigilant3") {
                hashtag = "#BeVigilant"
            } else if(str == "justatheory") {
                hashtag = "#JustATheory"
			} else if(str == "justatheory2") {
                hashtag = "#JustATheory"
			} else if(str == "justatheory3") {
                hashtag = "#JustATheory"
            } else if(str == "justice") {
                hashtag = "#Justice"
			} else if(str == "justice2") {
                hashtag = "#Justice"
			} else if(str == "justice3") {
                hashtag = "#Justice"
            } 
            hashtag_heat_increase = 0.9 + (Math.random() * 20) / 10;
        } 
    }
});


