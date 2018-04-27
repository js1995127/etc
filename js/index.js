$(document).ready(function() {
    
    var title_round_2 = [
    "Despite initial setbacks, nuclear treaty appears to be making progress",
    "Defense Department urging U.S. to pull out of talks, employees claim",
    "17 reasons why weapons deals don’t work out",
    "Satellite images leaked, appear to show alarming increase in overseas ballistic missile construction",
    "There could be a strike any day now; are we going to just sit back and wait?",
    "Our government is keeping us in the dark: What do they know that we don’t?"
    ]

    var title_round_3 = [
    "Treaty undergoing review process, is now on the verge of passing",
    "U.S. Defense Secretary spotted storming out of talks",
    "We’re hearing less and less from the UN on peace talks: here’s why that’s scary",
    "More foreign missile tests reported; Mr. President, do something!",
    "Strange contrails spotted over Pacific; is the end nigh??",
    "They’ve broken our cease-fire; now, we break them"
    ]

    var title_map = new Map();
    title_map.set("Diplomats address recent spike in nuclear activity, plans for peace talks underway", 0.1);
    title_map.set("Prospects for de-escalation of nuclear tensions look increasingly bleak", 1);
    title_map.set("Secretary of Defense stuns presser: 'We gotta get them before they get us", 1);
    title_map.set("Studies show it’s only a matter of time before ballistic missiles reach our shores", 2);
    title_map.set("Talking won’t solve anything; what ever happened to a good old-fashioned American butt-kicking", 2);
    title_map.set("Fire away, fire away: the time for patience is over", 2);
    title_map.set(title_round_2[0], 0.1);
    title_map.set(title_round_2[1], 1);
    title_map.set(title_round_2[2], 1);
    title_map.set(title_round_2[3], 1);
    title_map.set(title_round_2[4], 2);
    title_map.set(title_round_2[5], 2);
    title_map.set(title_round_3[0], 0.1);
    title_map.set(title_round_3[1], 1);
    title_map.set(title_round_3[2], 1);
    title_map.set(title_round_3[3], 2);
    title_map.set(title_round_3[4], 2);
    title_map.set(title_round_3[5], 2);


    var selected = false;
    var selection_to_post;
    var step = -5;
    var point = 0;
    var hashtags_selected;
    var title_selected;  
    var round = 1;
    var final_score = 0; 
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
    var source_option = 1;
    $('#userinfoSubmit').click(function() {
        //This is new pages for our projects
        //This is page 1
        if (step === -5) {
            teamName = $('#team_infor').val();
            if (teamName.length === 0) {
                $('#erro').remove();
                $('#teamName').append('<div id="erro" style="text-align: center; font-size:18px; color:#FE1717;">Username Cannot Be Empty</div>');
                $('#erro').fadeOut(1500);   
            } else if (teamName.length > 10) {
                $('#erro').remove();
                $('#teamName').append('<div id="erro" style="text-align: center; font-size:18px; color:#FE1717;">Your Username Cannot Exceed 10 Characters</div>');
                $('#erro').fadeOut(1500); 
            } 
            else {
                // $.ajax({
                // url: '/',
                // type: 'POST',
                // data: JSON.stringify({
                // 'username': teamName,
                // 'step': step 
                //  }), 
                //  dataType: 'json',
                //  cache: false,
                //  contentType: 'application/json;charset=UTF-8',
                //  success: function(state) {
                //      if (state['error'] === 'true') {
                //         $('#erro').remove();
                //         $('#teamName').append('<div id="erro" style="text-align: center; font-size:12px; color:#FE1717;">Username Already Existed. Please Use A Different Username</div>');
                //         $('#erro').fadeOut(3000);
                //    } else {
                        $('#teamName').hide();
                        $('#userinfoSubmit').children('img').attr('src','images/next.png'); 
                        $('#personName').show();  
                        $(".person_name_span").text(String(teamName) + '!');
                        $('#regtitle').html("Welcome");
                        step++;
                //    }
                // }
                // });
            }                			        
        } else if (step === -4) {
            $('#personName').hide();
            $('#story_page').show();
            $('#regtitle').html("Breaking News");	 
            step++;
        } else if (step === -3) {
            $('#userinfoSubmit').find('img').attr('src','images/LetsDoIt.png');
            $('#story_page').hide();
            $('#intruction_page').show();
            $('#regtitle').html("Ready to Play");
            step++;
        } else if (step === -2) {
            $('#intruction_page').hide();
            $('#title').show();
            $('#regtitle').html("Choose Your Title");
            $('#userinfoSubmit').children('img').attr('src','images/next-grey.png');
            step++;
        } else if (step > -2 && step < 5 &&  selected === true) {
             if (step === -1) {
                console.log("get in");
                selected = false;
                countStore();
                $('#userinfoSubmit').children('img').attr('src','images/next-grey.png');
                $('#title').hide();
                $('#hashtag').show();
                $('#regtitle').html("Choose Your Hashtags");
                title_selected = selection_to_post;
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
                $('#regtitle').html("Choose Your Source");
                var count = 1;
                $('#photo .picture_info').each(function() {
                    $(this).children('img').attr('src', 'images/image_' + ((round - 1) * 4 + count) + '.jpg')
                    count++;
                });
                step = step + 2;
            } else if (step === 3) {
                countStore();
                selected = false;
                $('#userinfoSubmit').children('img').attr('src','images/next-grey.png');
                $('#source').hide();
                $('#photo').show();
                $('#regtitle').html("Choose A Photo");
                step++;
            } else if (step === 4) {
                countStore();
                selected = false;
                $('#userinfoSubmit').children('img').attr('src','images/next-color.png');
                $('#photo').hide();
                $('#media_page').show();
                if (source_option === 2) {
                    $('#media_page').find('img:first').attr('src', 'images/fake.png');
                    $('#username').text('The OutSider');
                    $('#username_description').text('A Self-Published News Site');
                } else if (source_option === 3) {
                    $('#media_page').find('img:first').attr('src', 'images/eagle.png')
                    $('#username').text('DeptOfDefence');
                    $('#username_description').text('A Fake Version of Offical Account');
                } else {
                    $('#media_page').find('img:first').attr('src', 'images/head.png')
                    $('#username').text(teamName);
                    $('#username_description').text('Your Personal Account');
                }
                $('#hashtag_selected').text(String(hashtags_selected));
                $('#title_selected').text(String(title_selected));

                $('#regtitle').text("Overview");

                if (img_selected === 1) {
                    $("#second_part").children('img').attr('src', 'images/image_' + ((round -  1) * 4 + 1) + '.jpg');
                } else if (img_selected === 2) {
                    $("#second_part").children('img').attr('src', 'images/image_' + ((round -  1) * 4 + 2) + '.jpg');
                } else if (img_selected === 3) {
                    $("#second_part").children('img').attr('src', 'images/image_' + ((round -  1) * 4 + 3) + '.jpg');
                } else if (img_selected === 4) {
                    $("#second_part").children('img').attr('src', 'images/image_' + ((round -  1) * 4 + 4) + '.jpg');
                }
                step++;
            }
        }  else if (step === 5) {
                $('#image').remove();
                $('#media_page > p').remove();
                $('#userinfoSubmit').find('img').attr('src','images/CreatNewPost.png');
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
                point = (Math.random() * (point * 0.1) + (point * 0.95)).toFixed();
                final_score = final_score + parseInt(point);
                $('#userinfoSubmit').children('img').attr('src','images/CreatNewPost.png');
                $('#media_page').hide();
                $('#res').show();
                $('#regtitle').html("Final Result");
                $('#res > h2').append(String(point) + " Followers");
                $('#res > h3').append(String(final_score) + " Followers");
                if (point < 500000) {
                    $('#res').append('<img src="images/less.png" style="width: 320px">');
                } else if (point < 500000 && point >= 5000000) {
                    $('#res').append('<img src="images/normal.png" style="width: 320px">');
                } else {
                    $('#res').append('<img src="images/more.png" style="width: 320px">');
                }
                console.log("Could get here")
                //pass the data to the server by using ajax 
                $.ajax({
                    url: '/',
                    type: 'POST',
                    data: JSON.stringify({
                        'point': point, 
                        'username': teamName, 
                        'title': title_selected, 
                        'hashtag' : hashtags_selected,
                        'img' : img_selected,
                        'source' : source_option,
                        'step': step,
                        'round': round
                    }), 
                    dataType: 'json',
                    cache: false,
                    contentType: 'application/json;charset=UTF-8',
                    success: function() {
                        console.log('GOT EM');
                    }
                });
                step++;
                if (round === 3) {
                    $('#res').append("You,ve made all 3 of your posts! Stick around to see what posts are trending on Woofer");
                    $('#userinfoSubmit').hide();
                    localStorage.setItem('point', final_score);
                    localStorage.setItem('username', teamName);
                    $('#play_again').hide();
                    var interval = setInterval(function() {
                        $.ajax({
                            url: '/status',
                            type: 'POST',
                            dataType: 'json',
                            cache: false,
                            contentType: 'application/json;charset=UTF-8',
                            success: function(state) {
                                if (state['state'] === 'true') {
                                    clearInterval(interval);
                                    window.location.href = '/phase3';
                                } else {
                                    console.log('Some Guests Are Still Playing Phase 1');
                                }
                            }
                        });
                    }, 1000)
                    //need to tell guest to Wait other players
                }
            } else if (step === 6) {
                console.log("suppose to go back")
                crete_new_post();
            }       
    });
    
    function crete_new_post() {
        round++
        hashtags_selected = undefined;
        title_selected = undefined;  
        selection_to_post = undefined;
        calculation = 0; 
        target_audience = 0;
        img_selected = undefined; 
        point = 0;
        step = -1;
        $(".picture_info").find("img").css("opacity", 1);
        $('img:last-child', '#res').remove();
        $('#res > h1').empty();
        $('#res > h2').empty();
        $('#res > h3').empty();
        $('.userinfo').css({"background-color":"#3B75B3"});
        $('#res').hide();
        $('#title').show();
        if (round === 2) {
            console.log($('#title .userinfo').length)
            $('#title .userinfo').each(function(index){
                $(this).children('p').text(title_round_2[index])
            })
        } else if (round === 3) {
            $('#title .userinfo').each(function(index){
                $(this).children('p').text(title_round_3[index])
            })
        }
        $('#userinfoSubmit').show();
        $('#regtitle').html("Choose Your Title");
        $('#userinfoSubmit').children('img').attr('src','images/next-grey.png');
        $('.posted_content').remove();
    }
        

    function countStore() {
        var str_title = String(selection_to_post);
        var str = String(selection_to_post).substring(0,3);
        var title_of_news = 0;
        var hashtags = 0;
        var source = 0;
        var img = 0;
        if (step === -1) {
            title_of_news = title_map.get(str_title);
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
            if (String(selection_to_post) === 'image_' + ((round - 1) * 4  + 1) + '.jpg') {
                img = 0.1;
                img_selected = 1;
            } else if (String(selection_to_post) === 'image_' + ((round - 1) * 4 + 2) + '.jpg') {
                img = 0.1;
                img_selected = 2;
            } else if (String(selection_to_post) === 'image_' + ((round - 1) * 4  + 3) + '.jpg') {
                img = 1;
                img_selected = 3;
            } else if (String(selection_to_post) === 'image_' + ((round - 1) * 4 + 4) + '.jpg') {
                img = 2
                img_selected = 4;
            }
            console.log(img_selected);
            calculation = calculation + (Math.pow(img, 3) * 3);
        }
       
    }

    // store username and userType in local storage
    // function StoreUser() {
    //     // check if the browser supports local storage
    //     // notice that you cannot test multiple accounts in one browser. Their data will overwrite each other.
    //     // use different browsers to test multiple accounts.
    //     if (typeof(Storage) !== 'undefined') {
    //         // if supported, store username
    //         localStorage.setItem('user', $('#user').text().toLowerCase());   
    //         console.log("input username is " + $('#user').text().toLowerCase());
    //         localStorage.setItem('postMade', 'NO');
    //         // check and store user type
    //         if ($('#user').text().toLowerCase().substring(0, 5) === "media") {
    //             localStorage.setItem('userType', "media");
    //             setCookie("userType", "media", 1);
    //         } else if ($('#user').text().toLowerCase().substring(0, 7) === "citizen") {
    //             localStorage.setItem('userType', "citizen");
    //             setCookie("userType", "citizen", 1);
    //         } else {
    //             console.log('Oops! Invalid userType.');
    //         }
    //     } else {
    //         console.log('Oops! No Web Storage support...');
    //     } 
    // }
});


