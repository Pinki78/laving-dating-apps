<!DOCTYPE html>

<html>
<head>
<title>:: IPTV Home Screen ::</title>
<meta charset="utf-8">
<link rel="preload" as="image" href="images/en-banquetsbg.jpg">
<script type="text/javascript" src="js/preloadimages.js">
preload([
	"images/menu.png",
	"images/menu-active.png",
	"images/menu-cover.png",
	"images/en-banquetsbg.jpg",
	"images/en-grandballroom.jpg",
	"images/grandballroom_menu.png",
	"images/en-meetings.jpg",
	"images/meetings_menu.png",
	"images/horizontal_navigate.png",
	"images/ok.png",
	"images/navigate2.png"
	
    ]);
</script>
<link href="css/style-fast_anim.css" rel="stylesheet" type="text/css">
<script type="text/javascript" src="js/jquery-1.8.3.js"></script>
<script type="text/javascript" src="js/cms-page-tracking.js"></script>
<?php 
	if(empty($_GET['browser-version'])){
?>
		<script type="text/javascript" src="js/<?php echo $_GET['stb-type'] ?>/key_code.js"></script>
		<script type="text/javascript" src="js/<?php echo $_GET['stb-type'] ?>/key_event.js"></script>
<?php
	}
	else
	{
?>
		<script type="text/javascript" src="js/<?php echo $_GET['stb-type']?>/key_code_<?php echo $_GET['browser-version']?>.js"></script>
		<script type="text/javascript" src="js/<?php echo $_GET['stb-type']?>/key_event.js"></script>
<?php
	}	
?>


<script type="text/javascript">
var defaultSelectedMenuId = "menu1";
</script>
<script type="text/javascript" src="js/tv-menu-fast_anim.js"></script><script type="text/javascript"></script>
<style>
body {
    background-image   : url(images/en-banquetsbg.jpg);
	background-size    : cover;                    
	background-repeat  : no-repeat;
	background-position: center center;           
}

#abc{
        position:absolute;
        top:250px;
        left:250px;
        width:200px;
        height:100px;
        color:white;
        border:1px solid white;
}
</style>

</head>
<body onLoad="javascript:this.focus();">
<!---audio--->
	<div class="audioplayer">
    <audio id="background_audio" autoplay loop>
      <source src="audio/bensound-sweet.mp3" type="audio/mpeg">
    </audio>
	</div>
<!--audio-->

	
  <div id="bg-container"></div>
<div id="dock-container">
  <div id="left_arrow" style="display:none;">
    <img  src="images/arrow_left.png" style="float:left;height:53px;width:49px"/>
  </div>
  <div id="dock">
    <div class="backurl" content-type="url" single_click_url="abouthotellanding_en.php?menu=menu3&stb-type=<?php echo $_GET['stb-type'] ?>&browser-version=<?php echo $_GET['browser-version']?>"></div>
    <ul id="main_menu_ul" style="cursor:pointer;">
      <li id="1" select="true"><span>Grand Ballroom - Celebrations</span>
        <div content-type="image" single_click_url="en-grandballroom.jpg" item="menu1"><img src="images/grandballroom_menu.png" /><p><img src="images/menu-cover.png" /></p></div>
      </li>
      <li id="2" select="false"><span>Meetings</span>
        <div content-type="image" single_click_url="en-meetings.jpg" item="menu2"><img src="images/meetings_menu.png" /><p><img src="images/menu-cover.png" /></p></div>
      </li>
      
      
    </ul>
  </div>
  <div id="right_arrow" style="display:none;">
    <img  src="images/arrow_right.png" style="float:right;height:53px;width:49px"/>
  </div>
  <!-- <div class="base">
	  <img alt="Base" src="itc-coimbatore-theme/images/menus/base.png">
  </div> -->
</div>
<!--Main Menu Section-->

<div class="pagebtm">
<img src="images/<?php echo $_GET['stb-type'] ?>/horizontal_navigate.png" alt="navigate" style=" margin-left:5px; vertical-align:middle;"/><span> To navigate</span>
<img src="images/<?php echo $_GET['stb-type'] ?>/ok.png" alt="HOME" style="vertical-align:middle; margin-right:2px; margin-left:15px;"  /><span> To select</span>
<img src="images/<?php echo $_GET['stb-type'] ?>/navigate2.png" alt="Back" style="vertical-align:middle; margin-right:2px; margin-left:15px;"/><span> To return</span>
</div>

</body>
</html>
