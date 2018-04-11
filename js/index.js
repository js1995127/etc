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
    var point = 0;
    var hashtags_selected;
    var title_selected;  
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
        console.log(selection_to_post);
    });

    $('.picture_info').click(function() {
        if (selected === false) {
            selected = true;
            selection_to_post = $(this).children('img').attr('src').split('/').pop();
            // $(this).css({"background-color":"#5f5248"})
            $('#userinfoSubmit').children('img').attr('src','images/next-color.png');
        } else if (selected === true) {
             selection_to_post = $(this).children('img').attr('src').split('/').pop();
            // $(this).css({"background-color":"#5f5248"});
        }
        console.log(selection_to_post);
    });


    //initial state of the button
     $('#userinfoSubmit').children('img').attr('src','images/next-grey.png');
        //get the first letter of  username 
    $('#team_infor').on("input", function(e) {
        var temp = $(e.target).val();
        if (temp.length !== 0) {
            $('#userinfoSubmit').children('img').attr('src','images/next-color.png');
            var first_letter = temp[0];
            $('#first_letter').text(first_letter);
        } else {
            $('#userinfoSubmit').children('img').attr('src','images/next-grey.png');
        }  
    })


    //temp variable for store information for future use 
    var teamName;
    var point;
    var calculation = 0; 
    var target_audience = 0;
    var img_selected; 
    $('#userinfoSubmit').click(function() {
        //This is new pages for our projects
        //This is page 1
        console.log(step);
        if (step === -5) { 
            $('#teamName').hide();
            $('#personName').show();
            teamName = $('#team_infor').val();
            $(".person_name_span").append(' ' + String(teamName));
            $('#regtitle').html("");			
            step++;
        } else if (step === -4) {
            $('#personName').hide();
            $('#welcome_page').show();       
            $('#regtitle').html("Welcome");
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
            $('#userinfoSubmit').children('img').attr('src','images/next-grey.png');
            step++;
        } else if (step > -2 && step < 5 &&  selected === true) {
             if (step === -1) {
                selected = false;
                countStore();
                $('#userinfoSubmit').children('img').attr('src','images/next-grey.png');
                $('#title').hide();
                $('#hashtag').show();
                $('#regtitle').html("Choose Your Hashtags");
                title_selected = selection_to_post;
                console.log(title_selected);
                step++; 
            } else if(step === 0) {
                countStore();
                selected = false;
                $('#userinfoSubmit').children('img').attr('src','images/next-grey.png');
                $('#hashtag').hide();
                hashtags_selected = selection_to_post;
                $('#age').show();
                $('#regtitle').html("Target Audience");
                step++;
            } else if(step === 1) {
                countStore();
                selected = false;
                $('#userinfoSubmit').children('img').attr('src','images/next-grey.png');
                $('#age').hide();
                $('#source').show();
                $('.userinfo').each(function(i) {
                    $(this).css({"width":"85%"});
                })
                $('#regtitle').html("Choose Your Source");
                step = step + 2;
            } else if (step === 3) {
                countStore();
                selected = false;
                $('#userinfoSubmit').children('img').attr('src','images/next-grey.png');
                $('#source').hide();
                $('#photo').show();
                $('.userinfo').each(function(i) {
                    $(this).css({"width":"85%"});
                })
                $('#regtitle').html("Choose A Photo");
                step++;
            } else if (step === 4) {
                countStore();
                selected = false;
                $('#userinfoSubmit').children('img').attr('src','images/next-color.png');
                $('#photo').hide();
                $('#media_page').show();
                $('.userinfo').each(function(i) {
                    $(this).css({"width":"85%"});
                })
                $('#media_page').append('<p style="color:#03a9f4; font-weight:bold;margin-left: 12%;">' + String(hashtags_selected) + '<p/>');
                $('#media_page').append('<p style="font-weight:bold;margin-left: 12%;">' + String(title_selected) + '<p/>');
                 console.log(title_selected);
                $('#regtitle').html("FaceBook");
                if (img_selected == 1) {
                    $("#media_page").append('<div style="text-align: center;"><img src="images/image_1.jpg" style="text-align:center;height: 200px;"></div>');
                } else if (img_selected == 2) {
                    $("#media_page").append('<div style="text-align: center;"><img src="images/image_2.jpg" style="text-align:center;height: 200px;"></div>');
                } else if (img_selected == 3) {
                    $("#media_page").append('<div style="text-align: center;"><img src="images/image_3.jpg" style="text-align:center;height: 200px;"></div>');
                } else if (img_selected == 4) {
                    $("#media_page").append('<div style="text-align: center;"><img src="images/image_4.jpg" style="text-align:center;height: 200px;"></div>');
                } 
                step++;
            }
        }  else if (step === 5) {
                var ratio = calculation
                if (target_audience === 1) {
                    var view1 = (ratio * (300000 * 0.05 * 2) * 1.03 * 0.2);
                    var view2 = (ratio * (300000 * 0.1 * 1) * 1.03 * 0.26);
                    var view3 = (ratio * (300000 * 0.6 * 1) * 1.03 * 0.33);
                    var view4 = (ratio * (300000 * 0.25 * 1) * 1.03 * 0.21);
                    point = (view1 + view2 + view3 + view4).toFixed();
                } else if (target_audience === 2) {
                    var view1 = (ratio * (300000 * 0.05 * 1) * 1.07 * 0.2);
                    var view2 = (ratio * (300000 * 0.1 * 2) * 1.07 * 0.26);
                    var view3 = (ratio * (300000 * 0.6 * 1) * 1.07 * 0.33);
                    var view4 = (ratio * (300000 * 0.25 * 1) * 1.07 * 0.21);
                    point = (view1 + view2 + view3 + view4).toFixed();
                } else if (target_audience === 3) {
                    var view1 = (ratio * (300000 * 0.05 * 1) * 0.91 * 0.2);
                    var view2 = (ratio * (300000 * 0.1 * 1) * 0.91 * 0.26);
                    var view3 = (ratio * (300000 * 0.6 * 2) * 0.91 * 0.33);
                    var view4 = (ratio * (300000 * 0.25 * 1) * 0.91 * 0.21);
                    point = (view1 + view2 + view3 + view4).toFixed();
                } else if (target_audience === 4) {
                    var view1 = (ratio * (300000 * 0.05 * 1) * 1.02 * 0.2);
                    var view2 = (ratio * (300000 * 0.1 * 1) * 1.02 * 0.26);
                    var view3 = (ratio * (300000 * 0.6 * 1) * 1.02 * 0.33);
                    var view4 = (ratio * (300000 * 0.25 * 2) * 1.02 * 0.21);
                    point = (view1 + view2 + view3 + view4).toFixed();
                }
                $('#userinfoSubmit').children('img').attr('src','images/next-grey.png');
                $('#media_page').hide();
                $('#res').show();
                $('.userinfo').each(function(i) {
                    $(this).css({"width":"85%"});
                })
                $('#userinfoSubmit').hide();
                $('#regtitle').html("Final Result");
                $('#res').append('<h1>' + String(point) + '<h1/>');
                if (point < 150) {
                    $('#res').append('<img src="images/less.png" style="height: 100px">');
                } else if (point < 250 && point >= 150) {
                    $('#res').append('<img src="images/normal.png" style="height: 100px">');
                } else {
                    $('#res').append('<img src="images/more.png" style="height: 100px">');
                }
                //pass the data to the server by using ajax 
                $.ajax({
                    url: '/',
                    type: 'POST',
                    data: JSON.stringify({'point': point, 
                       'username': teamName}), 
                    dataType: 'json',
                    cache: false,
                    contentType: 'application/json;charset=UTF-8',
                    success: function() {
                        console.log('GOT EM');
                    }
                });
                step++;
            }       
        // } 
        // else if(selected === true) {
        //     var newusername = $(this).closest('div').children('p').text().toLowerCase();
        //     $.ajax({
        //         url: '/',
        //         type: 'POST',
        //         data: JSON.stringify({'step': step, 'selection': selection_to_post, 
        //            'username': newusername}),
        //         dataType: 'json',
        //         cache: false,
        //         contentType: 'application/json;charset=UTF-8',
        //         success: function() {
        //             console.log('GOT EM');
        //         }
        //     });
        //     $('.userinfo').each(function(i) {
        //         $(this).css({"background-color":"#3B75B3"});
        //         $(this).children('p').css({"color":"#757575"});
        //     }) 
        // }
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
            } 
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
        } else if (step === 3) {
            // console.log(str);
            if (str === 'Per') {
                source = 0.1;
            } else if (str === 'The') {
                source = 1;
            } else if (str === 'Dep') {
                source = 2;
            } 
            // console.log(source);
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


