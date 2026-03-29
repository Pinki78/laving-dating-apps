var timerMenuHide = "";
var selectedIndex = 1;
var menus_to_be_displayed = 2;
var tot_menus = 0;
last_selected_prev_li_id = "";
last_selected_index = "";
var menus_to_be_hiden_onscroll = 1;
var scroll_left_array = new Array();
var last_left = 0;
var hidden_menus = 0;
var left_scroll_start_index = 1;
var hidden_menus_steps_array = new Array();
var right_scroll_started = false;
var menu_transition_started = false;
var mod_last_selected_li_menu = "";						
var width_li_menu = "";
var is_menu_shown = false;
var is_menu_shown_anim_started = false;
var menuSelectionLocked = false;
var rightArrWasVisible = false;
var leftArrWasVisible = false;
var timerMenuHide = "";


$(document).ready(function(){
	tot_menus = $("#dock ul li").length;
	var dock_ulli_width = $("#dock ul li").width();
	var tot_menus_count = $("#dock ul li").length;
	$("#dock ul").width((dock_ulli_width + menus_to_be_displayed) * tot_menus_count);
	if(tot_menus < menus_to_be_displayed)
	{
		$("#main_menu_ul").css({display:'inline-block',position:'static'});
	}
	if(tot_menus > menus_to_be_displayed)
	{
		$("#prevarrow").hide();
		tot_menus += 1;
	}
});
function startMenuHideTimer()
{
	timerMenuHide = setTimeout(
		function() {		 		
			hideMenu(0);
		},5000);
}
function stoptMenuHideTimer()
{
	if(timerMenuHide != "")
	{
		clearTimeout(timerMenuHide);
		timerMenuHide = "";
	}
}
function showMenu(animatedTime)
{		
	$('#dock-container').stop();
	is_menu_shown = false;
	is_menu_shown_anim_started = true;
	$("#dock-container").show();
	$('#dock-container').animate({'bottom': '165px'}, animatedTime, function(){
	  is_menu_shown = true;
	  is_menu_shown_anim_started = false;
	  stoptMenuHideTimer();
	  startMenuHideTimer();
   	});
	if(rightArrWasVisible)
	{
		$("#nextarrow").show();
	}
	if(leftArrWasVisible)
	{
		$("#prevarrow").show();
	}
}
function hideMenu(animatedTime)
{
	is_menu_shown = false;
	$("#dock-container").animate({'bottom': '165px'}, animatedTime, hideMenuAnimComplete);
	if($("#nextarrow").is(":visible"))
	{
		rightArrWasVisible = true;
		$("#nextarrow").hide();	
	}
	else
	{
		rightArrWasVisible = false;
	}
	if($("#prevarrow").is(":visible"))
	{
		leftArrWasVisible = true;
		$("#prevarrow").hide();
	}
	else
	{
		leftArrWasVisible = false;
	}			
}
function hideMenuAnimComplete()
{
	$("#dock-container").hide();
}

$(function(){				
	startMenuHideTimer();
	showMenu(0);
	if(defaultSelectedMenuId == 1)
	{
		width_li_menu = $("#dock ul li:first-child").width();
		selectedMenuHighlight($("#dock ul li:first-child")); 
		$("#prevarrow").hide();
		if($("#dock ul li").length > menus_to_be_displayed)
		{
			$("#nextarrow").show();
		}	
		else
		{
			$("#nextarrow").hide();
		}
	}
	else
	{
		$('#dock ul').find('li').each(
		function () 
		{                   
			var menuId = $(this).find("div").attr("item");
			if(menuId == defaultSelectedMenuId)
			{
				selectedIndex = parseInt($(this).attr("id"));
				width_li_menu = $(this).width();
				selectedMenuHighlight($(this));  

				mod_last_selected_li_menu = $(this);
			} 
		});
		if(selectedIndex >= left_scroll_start_index)
		{
					
			mod_menu_to_be_selected = getMenuElementByMenuIndex(selectedIndex);
			startLeftScroll(mod_menu_to_be_selected,true);
		}
		if(tot_menus <= menus_to_be_displayed)
		{
			$("#prevarrow").hide();
			$("#nextarrow").hide();
		}
	}
        if(defaultSelectedMenuId != undefined && defaultSelectedMenuId.length==1)
        {
           hideMenu(0);
	}
});
function goToPage(pg)
{
	if(pg.indexOf("/") == -1)
        {
            pg = "/wellness/" + pg;
        } 
	window.location.href = pg;
}
function nextPrevMenuHighlight(mod_menu_to_be_selected)
{
	var mod_nxt_menu_to_be_highlighted = $("#dock ul li").get(($("#dock ul li").index(mod_menu_to_be_selected))+1);
	$(mod_nxt_menu_to_be_highlighted).find("img").attr( "class", "mainmenu-highlight-small" );
	if($("#dock ul li").index(mod_menu_to_be_selected)>0)
	{
		var mod_prev_menu_to_be_highlighted = $("#dock ul li").get(($("#dock ul li").index(mod_menu_to_be_selected))-1);
		$(mod_prev_menu_to_be_highlighted).find("img").attr( "class", "mainmenu-highlight-small" );
	}
}
function selectedMenuHighlight(mod_menu_to_be_selected)
{
	resetAllMenuClasses();
	$(mod_menu_to_be_selected).find("img").attr( "class", "mainmenu-highlight" );
	$(mod_menu_to_be_selected).find("p").attr("class","activedock");
	var hoverAction = $(mod_menu_to_be_selected).find("div").attr("hover-action");
	if(hoverAction != 'null')
	{
		langCode = $(mod_menu_to_be_selected).find("div").attr("item_id");
		eval(hoverAction);
	}
	mod_last_selected_li_menu = mod_menu_to_be_selected;						
	nextPrevMenuHighlight(mod_menu_to_be_selected);	
}
function getMenuIndexByMenuElement(menu)
{
	 return $("#dock ul li").index(menu);
}
function getMenuElementByMenuIndex(menuIndex)
{
	return $("#dock ul li").get(menuIndex);
}
function resetAllMenuClasses()
{
	$("#dock ul li").each(function(){
		$(this).find("span").css({"display": "block"});
		$(this).find("img").attr( "class", "" );
		$(this).find("p").attr( "class", "" );
	});
}
function getMenuCount()
{
	return $("#dock ul li").length;
}
function loadImage(name)
{	
	var fullImagePath = "images/" + name;
	$('body').css('background-image','url("' + fullImagePath +'")');
};
function callbackRCRightArrow()
{
	stoptMenuHideTimer();
	startMenuHideTimer();
	if(!menuSelectionLocked)
	{
		if(menu_transition_started)
		{
			return;
		}
		if(!is_menu_shown)
		{							
			if(!is_menu_shown_anim_started)
			{
				showMenu(0);

			}
			return;
		}
		var mod_last_selected_li_index = "";
		var mod_menu_to_be_selected = "";
		if(mod_last_selected_li_menu != "")
		{
			mod_last_selected_li_index = getMenuIndexByMenuElement(mod_last_selected_li_menu);
			if(mod_last_selected_li_index<(getMenuCount()-1))
			{							
				mod_menu_to_be_selected = getMenuElementByMenuIndex(mod_last_selected_li_index+1);				 					$("#prevarrow").show();		
				$("#nextarrow").show();
				selectedMenuHighlight(mod_menu_to_be_selected);
				startLeftScroll(mod_menu_to_be_selected , false);
			}
			if(mod_last_selected_li_index == (getMenuCount()-2))
			{
				rightArrWasVisible = true;
				$("#nextarrow").hide();
			}
		}					
		else if(getMenuCount()>0)
		{
			mod_menu_to_be_selected = getMenuElementByMenuIndex(0);	
			selectedMenuHighlight(mod_menu_to_be_selected);				
			startLeftScroll(mod_menu_to_be_selected , false);
		}
		callbackRCOK();
	}
}
function callbackRCLeftArrow()
{
	stoptMenuHideTimer();
	startMenuHideTimer();
	if(!menuSelectionLocked)
	{
		if(menu_transition_started)
		{
			return;
		}
		if(!is_menu_shown)
		{							
			if(!is_menu_shown_anim_started)
			{
				showMenu(0);
			}
			return;
		}
		var mod_last_selected_li_index = "";
		var mod_menu_to_be_selected = "";
		if(mod_last_selected_li_menu != "")
		{
			mod_last_selected_li_index = getMenuIndexByMenuElement(mod_last_selected_li_menu);
			if(mod_last_selected_li_index>0)
			{
				mod_menu_to_be_selected = getMenuElementByMenuIndex(mod_last_selected_li_index-1);
				$("#prevarrow").show();
             			$("#nextarrow").show();
				selectedMenuHighlight(mod_menu_to_be_selected);
				startRightScroll(mod_menu_to_be_selected);
			}
			if(mod_last_selected_li_index==1)
			{
				leftArrWasVisible = true;
				$("#prevarrow").hide();
			}
		}
		else if(getMenuCount()>0)
		{
			mod_menu_to_be_selected = getMenuElementByMenuIndex(0);	
			selectedMenuHighlight(mod_menu_to_be_selected);									
			startRightScroll(mod_menu_to_be_selected);
		}
		callbackRCOK();
	}
}
function callbackRCUpArrow()
{
	stoptMenuHideTimer();
	startMenuHideTimer();
	if(menu_transition_started)
	{
		return;
	}
	if(!is_menu_shown)
	{							
		if(!is_menu_shown_anim_started)
		{
			showMenu(0);
		}
		return;
	}
}
function callbackRCDownArrow()
{
	stoptMenuHideTimer();
	startMenuHideTimer();
	if(menu_transition_started)
	{
		return;
	}
	if(!is_menu_shown)
	{							
		if(!is_menu_shown_anim_started)
		{
			showMenu(0);
		}
		return;
	}
}
function callbackRCOK()
{
	if(!menuSelectionLocked)
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
				contentType = $(mod_last_selected_li_menu).find("div").attr("content-type");
				var contentName = $(mod_last_selected_li_menu).find("div").attr("single_click_url");
				var contentVideoName = $(mod_last_selected_li_menu).find("div").attr("single_click_videourl");
				if(contentType == 'url'){
					var pg = $(mod_last_selected_li_menu).find("div").attr("single_click_url");
					goToPage(pg);
				}
				else if(contentType == 'image')
				{
					loadImage(contentName);
				}
			}
		}
	}
}
function startLeftScroll(current_selected_menu , isFirstScroll)
{			
	if((getMenuIndexByMenuElement(current_selected_menu) ==(((hidden_menus+menus_to_be_displayed)-1))) || isFirstScroll)
	{									
		var tmp_left = 0;
		var transition = 1;
		if(!isFirstScroll)
		{
			var thresholdValue = tot_menus - (hidden_menus + menus_to_be_hiden_onscroll + 1);
			if( thresholdValue > menus_to_be_displayed)
			{
				tmp_left = 135 * (hidden_menus + menus_to_be_hiden_onscroll);
				hidden_menus = hidden_menus+menus_to_be_hiden_onscroll;
				hidden_menus_steps_array.push(menus_to_be_hiden_onscroll);					 
			}
			else
			{
				var menus_to_be_adjusted = thresholdValue - menus_to_be_displayed;
				var tmp_menus_to_be_hidden_onscroll = menus_to_be_hiden_onscroll + menus_to_be_adjusted;
				if(tmp_menus_to_be_hidden_onscroll>0)
				{
					tmp_left = 135 * (hidden_menus + tmp_menus_to_be_hidden_onscroll);
					hidden_menus = hidden_menus+tmp_menus_to_be_hidden_onscroll;
					hidden_menus_steps_array.push(tmp_menus_to_be_hidden_onscroll);
				}					
			}
		}else
		{
			transition = 0;
			var cnt_menus_to_be_hidden_onscroll = getMenuIndexByMenuElement(current_selected_menu) - menus_to_be_hiden_onscroll;
			var maxMenuToScroll = tot_menus - (menus_to_be_displayed + 1);
			if(cnt_menus_to_be_hidden_onscroll > maxMenuToScroll)
			{
				cnt_menus_to_be_hidden_onscroll = maxMenuToScroll;
			}			
			tmp_left = 135 * (cnt_menus_to_be_hidden_onscroll);		
			hidden_menus = hidden_menus + cnt_menus_to_be_hidden_onscroll;
			var noOfPush = Math.floor(cnt_menus_to_be_hidden_onscroll /1);		
			if((cnt_menus_to_be_hidden_onscroll % 1) > 0)
			{
				hidden_menus_steps_array.push(1);			
			}			
			for(i = 0; i<noOfPush; i++)
			{
				hidden_menus_steps_array.push(menus_to_be_hiden_onscroll);
			}
		
		}
		if(tmp_left>0)
		{					
			menu_transition_started = true;
			$('#main_menu_ul').animate({'left': '-'+tmp_left+'px'},transition,function(){
				menu_transition_started = false;
			});
		}
	}
}
function startRightScroll(current_selected_menu)
{			
	if((getMenuIndexByMenuElement(current_selected_menu) ==(((hidden_menus+1)-1))) && (hidden_menus>0))
	{
		if(hidden_menus_steps_array.length>0)
		{
			right_scroll_started = true;
			var tmp_pop = hidden_menus_steps_array.pop();
			tmp_left = 135*(hidden_menus-tmp_pop);	
			menu_transition_started = true;
			$('#main_menu_ul').animate({'left': '-'+tmp_left+'px'},1,function(){
				menu_transition_started = false;
			});
			hidden_menus = hidden_menus-tmp_pop;
		}
	}
}
function callbackRCBack()
{
	var backcontentType = $(".backurl").attr("content-type");
	if(backcontentType == 'url'){
		var pg = $(".backurl").attr("single_click_url");
		goToPage(pg);
	}
}
function callbackRCMenu()
{
	window.parent.location.href = "/tv/menu.do";
}

function callbackRCHome()
{
	callbackRCMenu();
}
	
var Console = 
{
   isDebugEnabled : false 
}
Console.Log = function(msg)
{
   if(document.getElementById("log") == null)
   { 
       $("body").before("<div id='log' style='position:fixed; background-color: #b0c4de; left:500px; top:200px; width: 400px; height: 200px; border: 3px solid #8AC007; z-index: 10000; color:#0000FF' />");       
   }   
   document.getElementById("log").innerHTML = msg;    
     
}
