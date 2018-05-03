    $(document).ready(function() {

        var title_round_2 = [
        "Despite initial setbacks, nuclear treaty makes progress",
        "Defense Department allegedly urging U.S. to cease talks",
        "17 reasons why weapons deals don’t work out",
        "Evidence shows alarming increase in overseas missile construction",
        "Our government is keeping us in the DARK",
        ]

        var title_round_3 = [
        "Treaty on the verge of passing",
        "U.S. Defense Secretary spotted storming out of talks",
        "Peace talk coverage drops: here’s why that’s scary",
        "Strange contrails spotted over Pacific; is the end nigh",
        "They’ve broken our cease-fire; now, we break them"
        ]

        var title_map = new Map();
        title_map.set("Plans for peace talks underway", 0.1);
        title_map.set("Prospects for de-escalation of nuclear tensions look increasingly bleak", 1);
        title_map.set("Studies show: missiles will eventually reach our shores", 2);
        title_map.set("More foreign missile tests reported", 1);
        title_map.set("Fire away, fire away: the time for patience is over", 2);
        title_map.set(title_round_2[0], 0.1);
        title_map.set(title_round_2[1], 1);
        title_map.set(title_round_2[2], 1);
        title_map.set(title_round_2[3], 1);
        title_map.set(title_round_2[4], 2);
        title_map.set(title_round_3[0], 0.1);
        title_map.set(title_round_3[1], 1);
        title_map.set(title_round_3[2], 1);
        title_map.set(title_round_3[3], 2);
        title_map.set(title_round_3[4], 2);


        var selected = false;
        var selection_to_post;
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

        var title_selection;

        $('.userinfo_title').click(function() {
            if (selected === false) {
                selected = true;
                title_selection = $(this).children('p').text();
                $(this).css({"background-color":"#5f5248"})
                $(this).children('p').css({"color":"#fff"});
                $('#userinfoSubmit').children('img').attr('src','images/next-color.png');
            } else if (selected === true) {
                title_selection = $(this).children('p').text();
                $(this).closest('a').siblings().children('div').css({"background-color":"#3B75B3"})
                $(this).closest('a').siblings().children('div').children('p').css({"color":"#fff"});
                $(this).css({"background-color":"#5f5248"});
                $(this).children('p').css({"color":"#fff"});
            }
        });

        var hashtag_selection;

        $('.userinfo_hashtag').click(function() {
            if (selected === false) {
                selected = true;
                hashtag_selection = $(this).children('p').text();
                $(this).css({"background-color":"#5f5248"})
                $(this).children('p').css({"color":"#fff"});
                $('#userinfoSubmit').children('img').attr('src','images/next-color.png');
            } else if (selected === true) {
                hashtag_selection = $(this).children('p').text();
                $(this).closest('a').siblings().children('div').css({"background-color":"#3B75B3"})
                $(this).closest('a').siblings().children('div').children('p').css({"color":"#fff"});
                $(this).css({"background-color":"#5f5248"});
                $(this).children('p').css({"color":"#fff"});
            }
        });

        var picture_selection;

        $('.picture_info').click(function() {
            if (selected === false) {
                selected = true;
                picture_selection = $(this).children('img').attr('src').split('/').pop();
                $(this).children('img').css("opacity", 0.5);
                $('#userinfoSubmit').children('img').attr('src','images/next-color.png');
            } else if (selected === true) {
                picture_selection = $(this).children('img').attr('src').split('/').pop();
                $(".picture_info").find("img").css("opacity", 1);
                $(this).children('img').css("opacity", 0.5);
            }
        });

        var picture_source_selection;

        $('.picture_info_source').click(function() {
            if (selected === false) {
                selected = true;
                picture_source_selection = $(this).children('img').attr('src').split('/').pop();
                $(this).children('img').css("opacity", 0.5);
                $('#userinfoSubmit').children('img').attr('src','images/next-color.png');
            } else if (selected === true) {
                picture_source_selection = $(this).children('img').attr('src').split('/').pop();
                $(".picture_info_source").find("img").css("opacity", 1);
                $(this).children('img').css("opacity", 0.5);
            }
        });



        window.onbeforeunload = function() { return "Are you sure you want to leave?"; }

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
        var source_score;
        var img_score;
        var target_audience_option;
        var img_selected; 
        var hashtag_score;
        var source_option;
        var title_score;
        var calculation = 0; 
        var final_score = 0;
        var step = -5; 
        var round = 1;
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
                    console.log("get in here")
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
                     success: function(state) {
                         if (state['error'] === 'true') {
                            $('#erro').remove();
                            $('#teamName').append('<div id="erro" style="text-align: center; font-size:12px; color:#FE1717;">Username Already Existed. Please Use A Different Username</div>');
                            $('#erro').fadeOut(3000);
                       } else {
                        $('#teamName').hide();
                        $('#userinfoSubmit').children('img').attr('src','images/next.png'); 
                        $('#personName').show();  
                        $(".person_name_span").text(String(teamName));
                        $('#regtitle').html("Welcome");
                        step++;
                       }
                    }
                    });
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
                selected = false;
                count_title_score();
                $('#userinfoSubmit').children('img').attr('src','images/next-grey.png');
                $('#title').hide();
                $('#hashtag').show();
                $('#regtitle').html("Choose Your Hashtag");
                step++; 
            } else if(step === 0) {
                selected = false;
                count_hashtag_score();
                $('#userinfoSubmit').children('img').attr('src','images/next-grey.png');
                $('#hashtag').hide();
                $('#age').show();
                $('#regtitle').html("Target Audience");
                step++;
            } else if(step === 1) {          
                selected = false;
                count_audience_score()
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
                selected = false;
                count_source_score()
                $('#userinfoSubmit').children('img').attr('src','images/next-grey.png');
                $('#source').hide();
                $('#photo').show();
                $('#regtitle').html("Choose A Photo");
                step++;
            } else if (step === 4) {
                $('#photo').hide();
                posting();
            }
        }  else if (step === 5) {
            $('#image').remove();
            $('#media_page > p').remove();
            $('#userinfoSubmit').find('img').attr('src','images/CreatNewPost.png');
            var ratio = title_score +  hashtag_score + source_score + img_score;
            if (target_audience_option === 1) {
                var view1 = (ratio * (300000 * 0.05 * 2) * 1.03 * 0.2);
                var view2 = (ratio * (300000 * 0.1 * 1) * 1.03 * 0.26);
                var view3 = (ratio * (300000 * 0.6 * 1) * 1.03 * 0.33);
                var view4 = (ratio * (300000 * 0.25 * 1) * 1.03 * 0.21);
                point = (view1 + view2 + view3 + view4).toFixed();
            } else if (target_audience_option === 2) {
                var view1 = (ratio * (300000 * 0.05 * 1) * 1.07 * 0.2);
                var view2 = (ratio * (300000 * 0.1 * 2) * 1.07 * 0.26);
                var view3 = (ratio * (300000 * 0.6 * 1) * 1.07 * 0.33);
                var view4 = (ratio * (300000 * 0.25 * 1) * 1.07 * 0.21);
                point = (view1 + view2 + view3 + view4).toFixed();
            } else if (target_audience_option === 3) {
                var view1 = (ratio * (300000 * 0.05 * 1) * 0.91 * 0.2);
                var view2 = (ratio * (300000 * 0.1 * 1) * 0.91 * 0.26);
                var view3 = (ratio * (300000 * 0.6 * 2) * 0.91 * 0.33);
                var view4 = (ratio * (300000 * 0.25 * 1) * 0.91 * 0.21);
                point = (view1 + view2 + view3 + view4).toFixed();
            } else if (target_audience_option === 4) {
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
            if (round === 3) {
                $('#userinfoSubmit').hide();
                $('#last_page_reminding').show();
            }
            //pass the data to the server by using ajax 
            $.ajax({
                url: '/',
                type: 'POST',
                data: JSON.stringify({
                    'point': point, 
                    'username': teamName, 
                    'title': title_selection, 
                    'hashtag' : hashtag_selection,
                    'img' : picture_selection,
                    'source' : picture_source_selection,
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
            } else if (step === 6) {
                backToSelection();
            }       
        });

    var interval = setInterval(function() {
            $.ajax({
                url: '/status',
                type: 'POST',
                dataType: 'json',
                cache: false,
                contentType: 'application/json;charset=UTF-8',
                success: function(state) {
                    if (state['state'] === 'true') {
                        localStorage.setItem('point', final_score);
                        localStorage.setItem('username', teamName);
                        clearInterval(interval);
                        window.location.href = '/phase3';
                    } else {
                        console.log('Some Guests Are Still Playing Phase 1');
                    }
                }
            });
        }, 1000)

    var photo_case = true;


    function posting() {
        if (photo_case) {
            count_photo_score(); 
            photo_case = false; 
        }     
        selected = false;
        $('#userinfoSubmit').children('img').attr('src','images/next-color.png');
        $('#media_page').show();
        if (source_option === 2) {
            $('#media_page').find('img:first').attr('src', 'images/fake.png');
            $('#username').text('The OutSider');
            $('#username_description').text('A Self-Published News Site');
        } else if (source_option === 3) {
            $('#media_page').find('img:first').attr('src', 'images/eagle.png')
            $('#username').text('DeptOfDefence');
            $('#username_description').text('A Fake Version of Offical Account');
        } else if(source_option === 1){
            $('#media_page').find('img:first').attr('src', 'images/head.png')
            $('#username').text(teamName);
            $('#username_description').text('Your Personal Account');
        }
        $('#hashtag_selected').text(String(hashtag_selection));
        $('#title_selected').text(String(title_selection));

        $('#regtitle').text("Overview: Click to Edit!");

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

    var back_page_case = 1;
    $('#userinfoSubmit_modify').click(function() {
        step--;
        if (back_page_case === 1) {
            count_source_score();
            $('#source').hide();
            posting();
        } else if (back_page_case === 2) {
            hashtag_selected = selection_to_post;
            count_hashtag_score();
            $('#hashtag').hide();
            posting();
        } else if (back_page_case === 3) {
            title_selected = selection_to_post;
            count_title_score();
            $('#title').hide();
            posting();
        } else{
            $('#photo').hide();
            count_photo_score();
            posting();
        }
        $('#userinfoSubmit_modify').hide();
        $('#userinfoSubmit').show();
    })
        

    $('#media_page').find('img:first').click(function(){
        $('#media_page').hide();
        $('#source').show();
        $(".picture_info").find("img").css("opacity", 1);
        $('#regtitle').text("Choose Your Source");
        $('#userinfoSubmit').hide();
        $('#userinfoSubmit_modify').show();
        back_page_case = 1;
        selected = true;
    })

    $('#hashtag_selected').click(function(){
        $('#media_page').hide();
        $('#hashtag').show();
        $('#regtitle').text("Choose Your Hashtag");
        $('#userinfoSubmit').hide();
        $('#userinfoSubmit_modify').show();
        back_page_case = 2;
        selected = true;
    })

    $('#title_selected').click(function(){
        $('#media_page').hide();
        $('#title').show();
        $('#regtitle').text("Chosse Your Title");
        $('#userinfoSubmit').hide();
        $('#userinfoSubmit_modify').show();
        back_page_case = 3;
        selected = true;

    })

    $("#second_part").children('img').click(function(){
        $('#media_page').hide();
        $('#photo').show();
        $('#regtitle').text("Choose A Photo");
        $('#userinfoSubmit').hide();
        $('#userinfoSubmit_modify').show();
        back_page_case = 4;
        selected = true;
    })

    function backToSelection() {
        photo_case = true;
        round++
        hashtags_selected = undefined;
        title_selected = undefined;  
        selection_to_post = undefined;
        img_selected = undefined; 
        calculation = 0; 
        target_audience = 0;
        point = 0;
        step = -1;
        $(".picture_info").find("img").css("opacity", 1);
        $(".picture_info_source").find("img").css("opacity", 1);
        $('img:last-child', '#res').remove();
        $('#res > h1').empty();
        $('#res > h2').empty();
        $('#res > h3').empty();
        $('.userinfo').css({"background-color":"#3B75B3"});
        $('.userinfo_title').css({"background-color":"#3B75B3"});
        $('.userinfo_hashtag').css({"background-color":"#3B75B3"});
        $('#res').hide();
        $('#title').show();
        if (round === 2) {
            $('#title .userinfo').each(function(index){
                $(this).children('p').text(title_round_2[index])
            })
        } else if (round === 3) {
            $('#title .userinfo').each(function(index){
                $(this).children('p').text(title_round_3[index])
            })
        }
        $('#regtitle').html("Choose Your Title");
        $('#userinfoSubmit').children('img').attr('src','images/next-grey.png');
        $('.posted_content').remove();
    };

    function count_title_score() {
         var str_title = String(title_selection);
         title_of_news = title_map.get(str_title);
         console.log(title_of_news)
         title_score = Math.pow(title_of_news, 3) * 3;
    }

    function count_hashtag_score() {
        var str = String(hashtag_selection).substring(0,3);
        if (str === '#De') {
                hashtag_score = 0.1;
            } else if  (str === '#No') {
                hashtag_score = 0.1;
            } else if (str === '#Pe') {
                hashtag_score = 0.1;
            } else if (str === '#Se') {
                hashtag_score = 0.1;
            } else if (str === '#It') {
                hashtag_score = 1;
            } else if (str === '#Im') {
                hashtag_score = 2;
            } else if (str === '#Sh') {
                hashtag_score = 2;
            } else if (str === '#No') {
                hashtag_score = 2;
            } else if (str === '#Fi') {
                hashtag_score = 2;
            } else if (str === '#Ap') {
                hashtag_score = 2;
            } else if (str === '#Mo') {
                hashtag_score = 2;
            } else if (str === '#Tr') {
                hashtag_score = 2;
            }
            console.log(hashtag_score)
            hashtag_score = Math.pow(hashtag_score, 3) * 2;
    }

    function count_source_score() {
        var str = String(picture_source_selection).substring(0,3);
        if (str === 'hea') {
                source_score = 0.1;
                source_option = 1;
            } else if (str === 'fak') {
                source_score = 1;
                source_option = 2;
            } else if (str === 'eag') {
                source_score = 2;
                source_option = 3;
            }
            console.log(source_score)
            source_score = Math.pow(source_score, 3) * 2;
            
    }

    function count_photo_score() {
        var photo_title = String(picture_selection);
        if (photo_title === 'image_' + ((round - 1) * 4  + 1) + '.jpg') {
                img_score = 0.1;
                img_selected = 1;
            } else if (photo_title === 'image_' + ((round - 1) * 4 + 2) + '.jpg') {
                img_score = 0.1;
                img_selected = 2;
            } else if (photo_title=== 'image_' + ((round - 1) * 4  + 3) + '.jpg') {
                img_score = 1;
                img_selected = 3;
            } else if (photo_title === 'image_' + ((round - 1) * 4 + 4) + '.jpg') {
                img_score = 2
                img_selected = 4;
        }
        console.log(img_score)
        img_score = Math.pow(img_score, 3) * 3;
        
    }

    function count_audience_score() {
        var str = String(selection_to_post).substring(0,3);
         if (step === 1) {
            if (str === 'Tee') {
                target_audience_option = 1;
            } else if (str === 'You') {
                target_audience_option = 2;
            } else if (str === 'Mid') {
                target_audience_option = 3;
            } else if (str === 'Sen') {
                target_audience_option = 4;
            }
        }
    }

    });


