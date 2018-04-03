$(document).ready(function() {

    'use strict';
    
    /////////////////////////// initialize TEAM LOGO/NAME
    function storeTeamNum() {
        $.ajax({
            url: '/read-state',
            type: 'POST',
            data: $('#username').text().toLowerCase(),
            dataType: 'json',
            cache: false,
            contentType: false,
            processData: false,
            success: function(state) {
                // set team logo and name on load of this page
                if (state['teamNumber'] == '2') {
                    $('#sideLogo').attr('src', 'images/logo money.png');
                    $('h2 span').html(state['thequestion']);
                } else if (state['teamNumber'] == '1') {
                    $('#sideLogo').attr('src', 'images/logo power.png');
                    $('h2 span').html(state['thequestion']);
                } else {
                    console.log("Opps! not a valid team number.");
                } 
            }
        });       
    }
    storeTeamNum();


    ////// test
    if (getCookie("userType") != null) {
        console.log(getCookie("userType"));
    }


    ///////////////////////// initialize MEDIA game page
    if (localStorage.getItem('userType') == 'media' || (getCookie("userType") != null && getCookie("userType") == 'media')) {
        console.log("render for media");
        // hide NEWSFEED block, hide TOP button if no post is made
        if (localStorage.getItem('postMade') == null ||localStorage.getItem('postMade') === 'NO') {
            console.log("postMade null or NO");
            $('[data-blocktitle="public"]').addClass('hide');
            $('[data-headlines="public"]').addClass('hide');
            $('#topButtonDiv').hide();
            $('[data-blocktitle="private"]').show();
            $('[data-headlines="private"]').show();
        }
        // hide YOURINBOX block, show NEWSFEED block if post is made
        if (localStorage.getItem('postMade') != null && localStorage.getItem('postMade') === 'YES') {
            console.log("postMade YES");
            hideInbox();
        }
    } else {
    ////////////////////////// initialize CITIZEN game page
        console.log("render for citizen");
        // always hide YOUR INBOX block (inbox headlines will not be generated for citizens)
        $('[data-blocktitle="private"]').hide();
        $('[data-headlines="private"]').hide();
        $('[data-headlines="public"]').show();
        $('[data-blocktitle="public"]').show();
        $('#topButtonDiv').show();
    }

    ////////////////////////// initialize CITIZEN game page
    // if (localStorage.getItem('userType') == 'citizen') {
    //     console.log("render for citizen");
    //     // always hide YOUR INBOX block (inbox headlines will not be generated for citizens)
    //     $('[data-blocktitle="private"]').hide();
    //     $('[data-headlines="private"]').hide();
    //     $('[data-headlines="public"]').show();
    //     $('[data-blocktitle="public"]').show();
    //     $('#topButtonDiv').show();
    // }


    ////////////////////////// PUBLIC headline format for CITIZENS
    var headline_part_1 = '\
        <div class="row" style="margin:0;">\
            <div class="col s3 m3 l3 votes" style="padding-left:0; font-size:5vmin">\
                <img src="images/Main pageagree box.png" alt="vote_background" />\
                <p>';  // insert vote number here
                
    var headline_part_2 = '</p>\
            </div>\
            <div class="col s7 m7 l7 headline" style="padding-left:0;">\
                <img src="images/Main pageinformation box.png" alt="headline_background" />\
                <p>';  // insert shared headline here

    var headline_part_3 = '</p>\
            </div>\
            <div class="col s2 m2 l2 sharebtn" style="padding-left:0; font-size:4vmin">\
                <a style="text-decoration:none; color:white; cursor: pointer;">\
                    <img src="images/like.png" alt="sharebtn_background" />\
                </a>\
            </div>\
       </div>';  // normal public headline
            
    var headline_part_4 = '</p>\
            </div>\
            <div class="col s2 m2 l2 sharebtn" style="padding-left:0; font-size:4vmin">\
                <a data-disabled="1" style="text-decoration:none; color:white; cursor: pointer;">\
                    <img src="images/disabled_like.png" alt="sharebtn_background" />\
                </a>\
            </div>\
       </div>';  // disabled public headline


    ////////////////////////// PUBLIC headline format for MEDIA
    var headline_part_5 = '\
        <div class="row" style="margin:0;">\
            <div class="col s3 m3 l3 fact">\
                <img src="images/Main page box.png" alt="reliability_background" />\
                <p>'; // insert REAL or FAKE
    
    var headline_part_6 = '</p>\
            </div>\
            <div class="col s9 m9 l9 mediaPubHeadline" style="padding-left:0;">\
                <img src="images/mediainfobox.png" alt="media_headline_background" />\
                <p>'; // normal public headline

    var headline_part_7 = '</p></div></div>'; 
   


    ////////////////////////// MEDIA clicks a(private headline) 
    // to open the post confirmation black block
    var headline_To_Post;
    var selectionNo;
    $('.headline a').click(function() {
        //headline_To_Post = $(this).closest('div').siblings().eq(1).children('p').eq(0).text();
        headline_To_Post = $(this).closest('div').children('p').text();
        selectionNo = $(this).closest('.row').children('.reliability').children('p').text();
        $('#confirmBlock').show();
        $('.newpopupbox span').html(selectionNo);
    });
    $('.headline img').click(function() {
        //headline_To_Post = $(this).closest('div').siblings().eq(1).children('p').eq(0).text();
        headline_To_Post = $(this).closest('div').children('p').text();
        selectionNo = $(this).closest('.row').children('.reliability').children('p').text();
        $('#confirmBlock').show();
        $('.newpopupbox span').html(selectionNo);
    });
    $('.headline p').click(function() {
        //headline_To_Post = $(this).closest('div').siblings().eq(1).children('p').eq(0).text();
        headline_To_Post = $(this).text();
        selectionNo = $(this).closest('.row').children('.reliability').children('p').text();
        $('#confirmBlock').show();
        $('.newpopupbox span').html(selectionNo);
    });

    ///////////////////////// MEDIA clicks BACK 
    // to close post confirmation black block (not disabling the post button)
    $('#back_button').click(function() {
        $('#confirmBlock').hide();
    });

    ///////////////////////// MEDIA clicks POST to share headline
    // update 'postMade' and layout
    $('#post_confirm_button').click(function() {
        if (headline_To_Post != null) {
            // update layout
            $('#confirmBlock').hide();
            hideInbox();

            console.log(headline_To_Post);
            incrementHeadline(headline_To_Post, $('#username').text().toLowerCase());
            // store the post headline in the local storage
            storePriHeadline(headline_To_Post); 
            localStorage.setItem('postMade', 'YES');
        }
    });

	// check private headline
    //checkPriHeadlines();

    setInterval(function() {
        $.ajax({
            url: '/read-state',
            type: 'POST',
            data: $('#username').text().toLowerCase(),
            dataType: 'json',
            cache: false,
            contentType: false,
            processData: false,
            success: function(state) {
                if (state['cleared']) {
                    $('[data-headlines="public"]').empty();
                    //$('[data-headlines="private"]').addClass('hide');
                    // clear local headline storage
            		localStorage.setItem('private_headlines', '');
           			localStorage.setItem('public_headlines', '');
                    localStorage.setItem('postMade', 'NO');
                    window.open('http://objection-1994.appspot.com/side', "_self");
                } else if(state['matched']) {
                     window.open('http://objection-1994.appspot.com/match_mentor', "_self");
                } else {
                    //$('[data-headlines="private"]').removeClass('hide');
                    // when state['cleared'] == false, check version to update current page(game.html)
                    if (localStorage.getItem('version') == null) {
                        localStorage.setItem('version', state['versioncontrol']);
                    } else {
                        if (localStorage.getItem('version') != state['versioncontrol']){
                            localStorage.setItem('version', state['versioncontrol']);
                            localStorage.setItem('private_headlines', '');
           			        localStorage.setItem('public_headlines', '');
                            localStorage.setItem('postMade', 'NO');
                            window.open('http://objection-1994.appspot.com/user?user=' + localStorage.getItem('user'), "_self");
                        }
                    }
                }
                var len = $('[data-headlines="public"]').children().length;
                //update new public headline
                for (var i in state['public_headlines']) {
                    var headline = state['public_headlines'][i];
                    if (i >= len && headline) {
                        //console.log(i);
                        //console.log(len);

                        ///////////////////////////// render headlines for CITIZEN
                        if (localStorage.getItem('userType') == 'citizen' || (getCookie("userType") != null && getCookie("userType") == 'citizen')) {
                            var headline_part_last = checkPubHeadline(headline);
                            var elem = headline_part_1 + 1 + headline_part_2 + headline + headline_part_last;
                            $('[data-headlines="public"]').append(elem);     
                            len += 1;
                            // add clickable feature to the new public headline    
                            $('[data-headlines="public"]>div:last .sharebtn a').click(function(event) {                     
                                if ($(this).data('disabled') === 1) {
                                } else {
                                    $(this).children('img').eq(0).attr('src', 'images/disabled_like.png');
                                    $(this).attr('data-disabled', '1'); 
                                    var headline = $(this).closest('div').siblings().eq(1).children('p').eq(0).text();
                                    incrementHeadline(headline, $('#username').text().toLowerCase());
                                    storePubHeadline(headline);
                                }
                            });
                        } else {
                            ////////////////////////// render headlines for MEDIA
                            //if (localStorage.getItem('userType') == 'media') {}
                            var fact;
                            //console.log(localStorage.getItem('private_headlines'));output is ["media44"]
                            if (localStorage.getItem('private_headlines').slice(2, -2) != headline && Math.random() > 0.7) {
                                fact = "?";
                            } else {
                                if (state['facts'][headline] !== "FAKE" && state['facts'][headline] != "REAL") {
                                    console.log("ERROR: The fact of real or fake is NULL.");
                                    console.log(state['facts'][headline]);
                                }
                                fact = state['facts'][headline];
                                //fact = state['facts']['this is a wrong headline']; // return "undefined"
                            }
                            var elem = headline_part_5 + fact + headline_part_6 + headline + headline_part_7;
                            //$('[data-headlines="public"]').append(elem); 
                            len += 1;
                        }
 
                    }
                }
            }
        });

        $.ajax({
            url: '/unity-read',
            type: 'GET',
            cache: false,    
            contentType: false,
            processData: false,
            success: function(state) {
                if (localStorage.getItem('userType') == 'citizen' || (getCookie("userType") != null && getCookie("userType") == 'citizen')) {
                    var stateObj = JSON.parse(state);
                    // update vote number for each public headline
                    $('[data-headlines="public"]').children().each(function(index){
                        $(this).children().eq(0).children('p').eq(0).html(stateObj['likes'][stateObj['public_headlines'][index]]);
                    });
                } 
            }
        });

    }, 1000);


    function incrementHeadline(headline,username) {
        var newHeadline = headline
        var newUsername = username
        $.ajax({
            url: '/increment-headline',
            type: 'POST',
            data: JSON.stringify({headline: newHeadline, 
                   username: newUsername}),
            //dataType: 'json',
            cache: false,
            contentType: 'application/json;charset=UTF-8',
            success: function() {
                console.log('GOT EM');
            }
        });
    }

    function hideInbox() {
        $('[data-blocktitle="private"]').hide();
        $('[data-headlines="private"]').hide();
        $('#topButtonDiv').show();
        $('[data-blocktitle="public"]').removeClass('hide');
        $('[data-headlines="public"]').removeClass('hide');
    }

    // store headline when a private headline is clicked for the first time
    function storePriHeadline(headline) {
    	// temporary array to store headlines for localstorage(permanent)
    	var privateHArray;
        if (localStorage.getItem("private_headlines") == null || localStorage.getItem("private_headlines") == '') {
    		privateHArray = new Array();
    		privateHArray[0] = headline;
    	} else {
    		privateHArray = JSON.parse(localStorage.getItem("private_headlines"));
    		privateHArray[privateHArray.length] = headline;
    	}
        localStorage.setItem("private_headlines", JSON.stringify(privateHArray));
        console.log(localStorage.getItem("private_headlines"));
    }

    // store headline when a public headline is clicked for the first time
    function storePubHeadline(headline) {
    	// temporary array to store headlines for localstorage(permanent)
    	var publicHArray;
    	if (localStorage.getItem("public_headlines") == null || localStorage.getItem("public_headlines") == '') {
    		publicHArray = new Array();
    		publicHArray[0] = headline;
    	} else {
    		publicHArray = JSON.parse(localStorage.getItem("public_headlines"));
    		publicHArray[publicHArray.length] = headline;
    	}
        localStorage.setItem("public_headlines", JSON.stringify(publicHArray));
    }

    //check whether the publc headline has been clicked before
    function checkPubHeadline(headline) {
        if (localStorage.getItem('public_headlines') != null && localStorage.getItem('public_headlines') != '') {
        	// parse value cannot be null
        	var publicHArray = JSON.parse(localStorage.getItem('public_headlines')); 
        	if (publicHArray != null) {
        		for (var i = 0; i < publicHArray.length; i++) {
        			if (headline == publicHArray[i]){
        				return headline_part_4;
        			}
        		}                   
        	}
        }  
        return headline_part_3;
    }

    // initial check for each private headline clickable or not
    function checkPriHeadlines() {
        var privateHeadline_Divs = $('[data-headlines="private"]').children();
        if (localStorage.getItem('private_headlines') != null && localStorage.getItem('private_headlines') != '') {
        	// parse value cannot be null
        	var clickedHeadlines = JSON.parse(localStorage.getItem('private_headlines')); 
        	if (clickedHeadlines != null) {
    			for (var d=0; d < privateHeadline_Divs.length; d++) {
        			var headline = $(privateHeadline_Divs[d]).find('p').eq(1).text();
        			for (var i in clickedHeadlines) {
        				// i is an index rather than a string
        				//console.log(clickedHeadlines[i]);
        				//console.log(headline);
            			if (headline == clickedHeadlines[i]) {
            				// clicked before: disable its button
            				var a = $(privateHeadline_Divs[d]).find('a').eq(0);
                			a.children('img').eq(0).attr('src', 'images/disabled_post.png');
                			a.attr('data-disabled', '1');
            			}
        			}
    			}
    		}
        }		
    }

});
