var timerMenuHide = "";
//var defaultSelectedMenuId = "menu1";
var selectedIndex = 1;
var menus_to_be_displayed = 4;
var bgFlag = true;
var tot_menus = 0;
window.addEventListener('load', function() {
    setTimeout(function() {
      document.getElementById('dock-container').classList.add('showmenu');
    }, 300);
  });
  
$(document).ready(function () {
  tot_menus = $("#dock ul li").length;
    console.log("tot_menus ul li" + tot_menus);
  var dock_ulli_width = $("#dock ul li").width();
  console.log("Dock menu item width: " + (dock_ulli_width + 12));
   console.log("item width: " + dock_ulli_width );
  var tot_menus_count = $("#dock ul li").length;
  $("#dock ul").width(
    (dock_ulli_width + 12) * tot_menus_count
  );
  if (tot_menus < menus_to_be_displayed) {
    $("#main_menu_ul").css({ display: "inline-block", position: "static" });
  }

if (tot_menus  > menus_to_be_displayed) {
    tot_menus += 2;
    
  }

  // Adjustment logic (usually not needed unless there's animation or scroll buffer)
  // if (tot_menus < menus_to_be_displayed) {
  //   tot_menus += 2;
  // } else if (tot_menus  > menus_to_be_displayed) {
  //   tot_menus += 1.3;
    
  // }

  var adjustedWidth = dock_ulli_width * tot_menus;
  $("#dock ul").width(adjustedWidth);
  console.log("Adjusted #dock ul width with buffer: " + adjustedWidth);

  //$("#dock ul li div img").after('<p><img src=' + guiType + '/images/menu-cover.png/></p>');
});

var timerMenuHide = "";
function startMenuHideTimer() {
  timerMenuHide = setTimeout(function () {
    hideMenu(0);
  }, 20000);
}
function stoptMenuHideTimer() {
  if (timerMenuHide != "") {
    clearTimeout(timerMenuHide);
    timerMenuHide = "";
  }
}

var rightArrWasVisible = false;
var leftArrWasVisible = false;
function showMenu(animatedTime) {
  $("#dock-container").stop();
  is_menu_shown = false;
  is_menu_shown_anim_started = true;
  $("#dock-container").show();

  $("#dock-container").animate({ bottom: "196px" }, animatedTime, function () {
    is_menu_shown = true;
    is_menu_shown_anim_started = false;
    stoptMenuHideTimer();
    startMenuHideTimer();
  });
  if (rightArrWasVisible) {
    $("#right_arrow").show();
  }
  if (leftArrWasVisible) {
    $("#left_arrow").show();
  }
}
function hideMenu(animatedTime) {
  is_menu_shown = false;
  // $("#dock-container").animate(
  //   { bottom: "-250px" },
  //   animatedTime,
  //   hideMenuAnimComplete
  // );
  if ($("#right_arrow").is(":visible")) {
    rightArrWasVisible = true;
    $("#right_arrow").hide();
  } else {
    rightArrWasVisible = false;
  }
  if ($("#left_arrow").is(":visible")) {
    leftArrWasVisible = true;
    $("#left_arrow").hide();
  } else {
    leftArrWasVisible = false;
  }
  //var tmpid = last_selected_prev_li_id+1;
  //alert(tmpid);
  //$("#"+tmpid).removeClass("hover");
}
function hideMenuAnimComplete() {
  $("#dock-container").hide();
}

last_selected_prev_li_id = "";
last_selected_index = "";

var menus_to_be_hiden_onscroll = 1;
var scroll_left_array = new Array();
var last_left = 0;
var hidden_menus = 0;
var left_scroll_start_index = 5;
var hidden_menus_steps_array = new Array();
var right_scroll_started = false;
var menu_transition_started = false;
var mod_last_selected_li_menu = "";
var width_li_menu = "";
var is_menu_shown = false;
var is_menu_shown_anim_started = false;
$(function () {
  startMenuHideTimer();
  showMenu(0);
  if (defaultSelectedMenuId == 1) {
    width_li_menu = $("#dock ul li:first-child").width();
    selectedMenuHighlight($("#dock ul li:first-child"));
    //selectedMenuHighlight($("#dock ul li[select='true']"));

    //Show hide left-right arrow - Start
    $("#left_arrow").hide();
    if ($("#dock ul li").length > menus_to_be_displayed) {
      $("#right_arrow").show();
    } else {
      $("#right_arrow").hide();
    }
    //Show hide left-right arrow - End
  } else {
    $("#dock ul")
      .find("li")
      .each(function () {
        var menuId = $(this).find("div").attr("item"); //alert(menuId);

        if (menuId == defaultSelectedMenuId) {
          selectedIndex = parseInt($(this).attr("id"));
          //console.log("width_li_menu: " + width_li_menu);
          width_li_menu = $(this).width();
          selectedMenuHighlight($(this));

          mod_last_selected_li_menu = $(this);
        }
      });

    if (selectedIndex >= left_scroll_start_index) {
      mod_menu_to_be_selected = getMenuElementByMenuIndex(selectedIndex);
      startLeftScroll(mod_menu_to_be_selected, true);
    }
    //Show hide left-right arrow - Start
    else {
      $("#left_arrow").hide();
    }
    if (tot_menus <= menus_to_be_displayed) {
      $("#left_arrow").hide();
      $("#right_arrow").hide();
    }
    //Show hide left-right arrow - End
  }

  if (defaultSelectedMenuId != undefined && defaultSelectedMenuId.length == 2) {
    hideMenu(0);
  }
  /***************left right key press menu selection end***********************/
});

function goToPage(pg) {
  if ($(".backurl").attr("page-position") == "index") {
    var backcontentType = $(".backurl").attr("content-type");
    if (backcontentType == "url") {
      var pg = $(".backurl").attr("single_click_url");
      window.parent.location.href = pg;
    }
  } else {
    if (pg.indexOf("/") == -1) {
      pg = "/leelablacktvcms/" + pg;
    }
    window.location.href = pg;
  }
}
function nextPrevMenuHighlight(mod_menu_to_be_selected) {
  var mod_nxt_menu_to_be_highlighted = $("#dock ul li").get(
    $("#dock ul li").index(mod_menu_to_be_selected) + 1
  );
  $(mod_nxt_menu_to_be_highlighted)
    .find(".menu-active-icon").addClass("mainmenu-highlight-small");
  if ($("#dock ul li").index(mod_menu_to_be_selected) > 0) {
    var mod_prev_menu_to_be_highlighted = $("#dock ul li").get(
      $("#dock ul li").index(mod_menu_to_be_selected) - 1
    );
    $(mod_prev_menu_to_be_highlighted)
    .find(".menu-active-icon").addClass("mainmenu-highlight-small");
  }
}

function selectedMenuHighlight(mod_menu_to_be_selected) {
  /*
	if($("#dock ul li").length > (menus_to_be_displayed-2))
	{
		var mod_menu_to_show_hide = $("#dock ul li").get((menus_to_be_displayed-2));
		if($("#dock ul li").index(mod_menu_to_be_selected) == 0)
		{
			$(mod_menu_to_show_hide).css({"visibility": "hidden"});	
		}
		else
		{
			$(mod_menu_to_show_hide).css({"visibility": "visible"});	
		}
	}*/
  resetAllMenuClasses();
  //$(mod_menu_to_be_selected).find("span").css({"display": "block"});
    $(mod_menu_to_be_selected).attr("class", "active-li");
  $(mod_menu_to_be_selected).find(".menu-active-icon").addClass("mainmenu-highlight");
 
  $(mod_menu_to_be_selected).find("p").attr("class", "activedock");
  var hoverAction = $(mod_menu_to_be_selected).find("div").attr("hover-action");

  if (hoverAction != "null") {
    langCode = $(mod_menu_to_be_selected).find("div").attr("item_id");
    eval(hoverAction);
  }

  mod_last_selected_li_menu = mod_menu_to_be_selected;
  nextPrevMenuHighlight(mod_menu_to_be_selected);
}
function getMenuIndexByMenuElement(menu) {
  return $("#dock ul li").index(menu);
}
function getMenuElementByMenuIndex(menuIndex) {
  return $("#dock ul li").get(menuIndex);
}
function resetAllMenuClasses() {
  $("#dock ul li").each(function () {
     $(this).attr( "class", "" );
    $(this).find("span").css({ display: "block" });
    $(this).find(".menu-active-icon").removeClass("mainmenu-highlight-small");
    $(this).find("p").attr("class", "");
  });
}
function getMenuCount() {
  return $("#dock ul li").length;
}
function startLeftScroll(current_selected_menu, isFirstScroll) {
  if (
    getMenuIndexByMenuElement(current_selected_menu) ==
      hidden_menus + menus_to_be_displayed - 1 || //for left scroll
    isFirstScroll
  ) {
    console.log("Total:", tot_menus, 
            "Hidden:", hidden_menus, 
            "To Show:", menus_to_be_displayed, 
            "Adjusted Scroll:", tmp_left,
          "itemWidth" + itemWidth);
  var itemWidth = $("#dock ul li").outerWidth(true); // includes margin/padding
    var tmp_left = 0;
    var transition = 1;
    
    if (!isFirstScroll) {
      var thresholdValue =
        tot_menus - (hidden_menus + menus_to_be_hiden_onscroll + 2);
      if (thresholdValue > menus_to_be_displayed) {
        tmp_left = 245 * (hidden_menus + menus_to_be_hiden_onscroll);
        hidden_menus = hidden_menus + menus_to_be_hiden_onscroll;
        hidden_menus_steps_array.push(menus_to_be_hiden_onscroll);
      } else {
        var menus_to_be_adjusted =  thresholdValue - menus_to_be_displayed;
        var tmp_menus_to_be_hidden_onscroll =
          menus_to_be_hiden_onscroll + menus_to_be_adjusted;
          var menuItemCount = $("#dock ul li").length 
           // ✅ Prevent over-scroll
        // if ((hidden_menus + tmp_menus_to_be_hidden_onscroll) > menuItemCount - menus_to_be_displayed) {
        //   tmp_menus_to_be_hidden_onscroll = menuItemCount - menus_to_be_displayed - hidden_menus;
        // }

  // var remainingMenus = tot_menus - hidden_menus - menus_to_be_displayed;
  //   var tmp_menus_to_be_hidden_onscroll = Math.min(
  //     menus_to_be_hiden_onscroll,
  //     remainingMenus
  //   );



        if (tmp_menus_to_be_hidden_onscroll > 0) {

          console.log("menuItemCount " + menuItemCount )



// Clamp to prevent overscroll

// var max_scroll_left =(menuItemCount - (tot_menus - menus_to_be_displayed));
// console.log("max_scroll_left " + max_scroll_left  )
// if (tmp_left > max_scroll_left) {
//   tmp_left = max_scroll_left - (hidden_menus + tmp_menus_to_be_hidden_onscroll);
// }else {
//   tmp_left = 245 * (hidden_menus + tmp_menus_to_be_hidden_onscroll);
// }
          
          // hidden_menus = hidden_menus + tmp_menus_to_be_hidden_onscroll;
          // hidden_menus_steps_array.push(tmp_menus_to_be_hidden_onscroll);


// Step 1: Calculate estimated scroll distance
tmp_left = 245 * (hidden_menus + tmp_menus_to_be_hidden_onscroll);

  // Step 2: Get total width of all items and width of the dock container
  // var itemWidth = $("#dock ul li").outerWidth(true); // includes margin/padding
  // var totalMenuWidth = $("#dock ul li").length * itemWidth; // total item width
  // var visibleContainerWidth = $("#dock").width();

  // // Step 3: Clamp scroll to prevent right-side gap
  // var maxScrollLeft = totalMenuWidth - visibleContainerWidth ;
  // console.log("maxScrollLeft " + maxScrollLeft  )
  // if (tmp_left > maxScrollLeft) {
  //   tmp_left = maxScrollLeft;
  // }
//   else{
// tmp_left = 245 * (hidden_menus + tmp_menus_to_be_hidden_onscroll);
//   }

  // Step 4: Update hidden_menus and steps
    
  hidden_menus += tmp_menus_to_be_hidden_onscroll;
  hidden_menus_steps_array.push(tmp_menus_to_be_hidden_onscroll);



        }
      }
    } else {
      transition = 0; //they wanted it instantly
      var cnt_menus_to_be_hidden_onscroll =
        getMenuIndexByMenuElement(current_selected_menu) -
        menus_to_be_hiden_onscroll;
      var maxMenuToScroll = tot_menus - (menus_to_be_displayed + 2);
      if (cnt_menus_to_be_hidden_onscroll > maxMenuToScroll) {
        cnt_menus_to_be_hidden_onscroll = maxMenuToScroll;
      }

      //alert("cnt_menus_to_be_hidden_onscroll = " + cnt_menus_to_be_hidden_onscroll);

      tmp_left = 245 * cnt_menus_to_be_hidden_onscroll;
      hidden_menus = hidden_menus + cnt_menus_to_be_hidden_onscroll;

      var noOfPush = Math.floor(cnt_menus_to_be_hidden_onscroll / 2);
      if (cnt_menus_to_be_hidden_onscroll % 2 > 0) {
        hidden_menus_steps_array.push(1);
      }
      for (i = 0; i < noOfPush; i++) {
        hidden_menus_steps_array.push(menus_to_be_hiden_onscroll);
      }
    }
    //Show hide left-right arrow - Start
    if (hidden_menus > 0) {
      $("#left_arrow").show();
    }
    if (tot_menus == hidden_menus + menus_to_be_displayed ) {
      $("#right_arrow").hide();
    }
    //Show hide left-right arrow - End




    if (tmp_left > 0) {
        console.log("Animating menu to the left: " + tmp_left)
      menu_transition_started = true;
      $("#main_menu_ul").animate(
       
        { left: "-" + tmp_left + "px" },
        transition,
        function () {
          menu_transition_started = false;
        }
      
      );
       
    }
  }
}
function startRightScroll(current_selected_menu) {
  if (
    getMenuIndexByMenuElement(current_selected_menu) == hidden_menus + 1 - 1 &&
    hidden_menus > 0
  ) {
    //for right scroll
    console.log("right scroll starts");
    //if(hidden_menus_steps_array.length>0 && (menu_transition_started == false))
    if (hidden_menus_steps_array.length > 0) {
      right_scroll_started = true;
       var itemWidth = $("#dock ul li").outerWidth(true); // Dynamic width
      var tmp_pop = hidden_menus_steps_array.pop();
      console.log("hidden_menus_steps_array.pop(): " + tmp_pop);
       hidden_menus = hidden_menus - tmp_pop;
      // tmp_left = 245 * (hidden_menus - tmp_pop);
       var tmp_left = itemWidth * hidden_menus;
      //tmp_left = (width_li_menu+5)*(hidden_menus-tmp_pop);
      //console.log("tmp_left: " + tmp_left);
      //$('#main_menu_ul').animate({'left': '-'+tmp_left+'px'},2000);

  // ✅ Clamp scroll so it doesn't underflow
      if (tmp_left < 0) {
        tmp_left = 0;
      }

      menu_transition_started = true;
      $("#main_menu_ul").animate(
        { left: "-" + tmp_left + "px" },
        1,
        function () {
          menu_transition_started = false;
        }
      );
      hidden_menus = hidden_menus - tmp_pop;
    }
    //console.log("hidden_menus after right scroll starts: " + hidden_menus);
  }

  //Show hide left-right arrow - Start
  if (hidden_menus == 0) {
    $("#left_arrow").hide();
  }
  if (tot_menus > hidden_menus + menus_to_be_displayed + 2) {
    $("#right_arrow").show();
  }
  //Show hide left-right arrow - End
}




/*function loadImage(name) {
  var fullImagePath = "images/" + name;
  preload([fullImagePath]);
  $("body").attr("backgroundname", name);
  $('#bg-container').css('background-image','url("' + fullImagePath +'")');
	setTimeout(function () {
		document.body.style.backgroundImage = `url('${fullImagePath}')`;
	 return false;
	}, 1000);
}*/

function loadImage(name) {
  bgFlag = false;
  var fullImagePath = "images/" + name;
  fetch(fullImagePath, { method: 'HEAD' })
    .then(response => {
      if (response.ok) {
        var img = new Image();
        img.src = fullImagePath;
        $("body").attr("backgroundname", name);
        $('#bg-container').css('background-image', 'url("' + fullImagePath + '")');
        setTimeout(function () {
          document.body.style.backgroundImage = `url('${fullImagePath}')`;
		  bgFlag = true;
        }, 700);
      } else {
		bgFlag = true;
        console.error("Image not found: " , fullImagePath);
      }
    })
    .catch(error => {
      console.error("Error fetching image:", error);
    });
}

/*function loadVideo(name,video)
{	
	var fullImagePath = "images/" + name;
	$('body').css('background-image','url("' + fullImagePath +'")');
	var fullVideoPath = "videos/" + video;
	var myVideoPlayer = document.getElementById("cmsvideo");
	var vodSource = myVideoPlayer.getElementsByTagName('source');
	$('.vodplayer').css('display','block');
	$('#cmsvideo').css('display','block');

	vodSource[0].src = fullVideoPath;
	myVideoPlayer.load();
	myVideoPlayer.loop = true;
	myVideoPlayer.play();	
};*/
/**********************start callback method from stb_common.js*****************************/
// function playAudio() {
//   var audio = document.getElementById("background_audio");
//   audio.play();
// }
function callbackRCUpArrow() {
  /*
	if($("#dock ul li").length > (menus_to_be_displayed-2))
	{
		var mod_menu_to_show_hide = $("#dock ul li").get((menus_to_be_displayed-2));
		$(mod_menu_to_show_hide).css({"visibility": "visible"});	
	}*/
  stoptMenuHideTimer();
  startMenuHideTimer();

  if (menu_transition_started) {
    return;
  }
  if (!is_menu_shown) {
    if (!is_menu_shown_anim_started) {
      showMenu(0);
    }
    return;
  }
  //playAudio();
  //resetAllMenuClasses();
  //mod_last_selected_li_menu = "";

  // hidden_menus = 0;
  // var tmp_left = 0;
// $('#main_menu_ul').animate({'left': '-'+tmp_left+'px'},0);
}
function callbackRCDownArrow() {
  /*if($("#dock ul li").length > (menus_to_be_displayed-2))
	{
		var mod_menu_to_show_hide = $("#dock ul li").get((menus_to_be_displayed-2));
		$(mod_menu_to_show_hide).css({"visibility": "visible"});	
	}*/
  stoptMenuHideTimer();
  startMenuHideTimer();

  if (menu_transition_started) {
    return;
  }
  if (!is_menu_shown) {
    if (!is_menu_shown_anim_started) {
      showMenu(0);
    }
    return;
  }
  //playAudio();
  //resetAllMenuClasses();
  //mod_last_selected_li_menu = "";

  //hidden_menus = 0;
  //var tmp_left = 0;
  //$('#main_menu_ul').animate({'left': '-'+tmp_left+'px'},0);
}
function callbackRCLeftArrow() {
if(bgFlag && $("#booking-modal-body").attr("class") != "show" ){
  stoptMenuHideTimer();
  startMenuHideTimer();

  if (menu_transition_started) {
    return;
  }
  if (!is_menu_shown) {
    if (!is_menu_shown_anim_started) {
      showMenu(0);
    }
    return;
  }

  var mod_last_selected_li_index = "";
  var mod_menu_to_be_selected = "";
  if (mod_last_selected_li_menu != "") {
    mod_last_selected_li_index = getMenuIndexByMenuElement(
      mod_last_selected_li_menu
    );
    if (mod_last_selected_li_index > 0) {
      mod_menu_to_be_selected = getMenuElementByMenuIndex(
        mod_last_selected_li_index - 1
      );
      selectedMenuHighlight(mod_menu_to_be_selected);

      //startLeftRightScroll(mod_menu_to_be_selected);
      startRightScroll(mod_menu_to_be_selected);
    }
  } else if (getMenuCount() > 0) {
    mod_menu_to_be_selected = getMenuElementByMenuIndex(0);
    selectedMenuHighlight(mod_menu_to_be_selected);

    //startLeftRightScroll(mod_menu_to_be_selected);
    startRightScroll(mod_menu_to_be_selected);
    
  }
  //playAudio();
  }
}
function callbackRCRightArrow() {
if(bgFlag && $("#booking-modal-body").attr("class") != "show" ){
  stoptMenuHideTimer();
  startMenuHideTimer();

  if (menu_transition_started) {
    return;
  }
  if (!is_menu_shown) {
    if (!is_menu_shown_anim_started) {
      showMenu(0);
    }
    return;
  }

  var mod_last_selected_li_index = "";
  var mod_menu_to_be_selected = "";
  if (mod_last_selected_li_menu != "") {
    mod_last_selected_li_index = getMenuIndexByMenuElement(
      mod_last_selected_li_menu
    );
    if (mod_last_selected_li_index < getMenuCount() - 1) {
      mod_menu_to_be_selected = getMenuElementByMenuIndex(
        mod_last_selected_li_index + 1
      );
      selectedMenuHighlight(mod_menu_to_be_selected);

      //startLeftRightScroll(mod_menu_to_be_selected);
      startLeftScroll(mod_menu_to_be_selected, false);
    }
  } else if (getMenuCount() > 0) {
    mod_menu_to_be_selected = getMenuElementByMenuIndex(0);
    selectedMenuHighlight(mod_menu_to_be_selected);

    //startLeftRightScroll(mod_menu_to_be_selected);
    startLeftScroll(mod_menu_to_be_selected, false);
  }
  //playAudio();
  }
}
/*function callbackRCOK()
{
	if(!is_menu_shown)
	{
		if(!is_menu_shown_anim_started)
		{
			showMenu(0);
		}
	}
	else
	{
		if(mod_last_selected_li_menu != "")
		{
			var pg = $(mod_last_selected_li_menu).find("div").attr("single_click_url");
			goToPage(pg);
		}
	}
}*/

function callbackRCOK() {
  if (bgFlag && $("#booking-modal-body").attr("class") != "show") {
    if (!is_menu_shown) {
      if (!is_menu_shown_anim_started) {
        showMenu(0);
      }
    } else {
      if (mod_last_selected_li_menu != "") {
        contentType = $(mod_last_selected_li_menu)
          .find("div")
          .attr("content-type");
        var contentName = $(mod_last_selected_li_menu)
          .find("div")
          .attr("single_click_url");
        var contentVideoName = $(mod_last_selected_li_menu)
          .find("div")
          .attr("single_click_videourl");
        var contentTitle = $(mod_last_selected_li_menu)
          .find("div")
          .prev()
          .text();
        var serviceStatus = $(mod_last_selected_li_menu).attr("serviceStatus");

        $(".booking-title").text(contentTitle);
        serviceTypeId = $(mod_last_selected_li_menu).attr("serviceType");
        serviceItemId = $(mod_last_selected_li_menu).attr("serviceItem");
        serviceName = $(mod_last_selected_li_menu).attr("servicename");

        if (contentType == "url") {
          var pg = $(mod_last_selected_li_menu)
            .find("div")
            .attr("single_click_url");
          goToPage(pg);
        } else if (contentType == "image") {
          var bodyBackround = $("body").attr("backgroundname");

          if (contentName != bodyBackround) {
            loadImage(contentName);
          } else if (serviceStatus == "on") {
            callbackRCBookingConfirm();
          }
        }
        /*else
			    {
				    //alert("This is a video name = " + contentName);
				    loadVideo(contentName,contentVideoName);
				    tvSetInitialVolume();
			    }*/
      }
    }
    return false;
  }
  if (bgFlag && $("#booking-modal-body").attr("class") == "show") {
    callbackRCBookingConfirm();
  }
  //playAudio();
}

let bookingTimeout = null;


// function callbackRCBack() {
//   if ($("#booking-modal-body").attr("class") != "show") {
//     var backcontentType = $(".backurl").attr("content-type");
//     if (backcontentType == "url") {
//       var pg = $(".backurl").attr("single_click_url");
//       goToPage(pg);
//     }
//   }
//   // if ($("#booking-modal-body").attr("class") == "show") {
//   //   callbackRCBookingCancel();
//   // }
// }

function callbackRCBack() {
  const isBookingModalShown = $("#booking-modal-body").hasClass("show");

  if (isBookingModalShown) {
    //console.log("callbackRCBookingCancel");
    callbackRCBookingCancel();
     if (timerMenuHide) {
          clearTimeout(timerMenuHide);
      }
  } else {
    const backContentType = $(".backurl").attr("content-type");
    if (backContentType === "url") {
      const pg = $(".backurl").attr("single_click_url");
      if (typeof goToPage === "function") {
        goToPage(pg);
      } else {
        //console.error("❌ goToPage function not defined");
      }
    }
  }
}



function callbackRCBookingConfirm() {
  startMenuHideTimer(false);
  stoptMenuHideTimer();

  if ($("#booking-modal-body").attr("class") != "show") {
    $("#booking-modal-body").addClass("show");
    $("#booking-success").show();
    //return false;
  }


  // ✅ Clear previous timeout if any
  if (bookingTimeout !== null) {
    clearTimeout(bookingTimeout);
    bookingTimeout = null;
  }


  if ($("#booking-modal-body").attr("class") == "show") {
    setTimeout(function () {
      $(".booking-text").hide();
      $(".booking-buttons").hide();
      $("#booking-success").show();
      $.ajax({
        url:
          "/tv/book-general-service.do?service-name=" +
          serviceName +
          "&service-type-id=" +
          serviceTypeId +
          "&service-item-id=" +
          serviceItemId,
        type: "GET",
        success: function (data) {
          $("#booking-success").show();
        },
      });
    }, 500);
    // Second timeout for hiding modal (store this one)
    bookingTimeout = setTimeout(function () {
      $("#booking-modal-body").removeClass("show");
      $(".booking-text").show();

      $(".booking-buttons").show();
      $("#booking-success").hide();
      return false;
    }, 5000);
    return false;
  }
}
function callbackRCBookingCancel() {
  $("#booking-modal-body").removeClass("show");
  return false;
}
/*function callbackRCMenu()
{
	window.parent.location.href = "/tv/menu.do";
}

function callbackRCHome()
{
	callbackRCMenu();
}*/
function androidtoweb()
 {
 
callbackRCBack();
 return "child";
 }
/**********************end callback method from stb_common.js*****************************/
var Console = {
  isDebugEnabled: false,
};
Console.Log = function (msg) {
  if (document.getElementById("log") == null) {
    $("body").before(
      "<div id='log' style='position:fixed; background-color: #b0c4de; left:500px; top:200px; width: 400px; height: 200px; border: 3px solid #8AC007; z-index: 10000; color:#0000FF' />"
    );
  }
  document.getElementById("log").innerHTML = msg;
};
