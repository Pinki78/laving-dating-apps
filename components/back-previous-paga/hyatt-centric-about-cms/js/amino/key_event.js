/* Handlers to determine behavior on various key presses */

function keyHandler(e)
{
 	var rtn = true;
    var pressedKey = e.which;

    if (document.all)    { e = window.event; }
    if (document.layers) { pressedKey = e.which; }
    if (document.all)    { pressedKey = e.keyCode; }

 	if (pressedKey == 0)
	{
		/* Control code seen. Probable keyboard arrow key */
		pressedKey = e.keyCode;
	}

    
    switch (pressedKey)
    {
        case keyCode.RC_GUIDE:             
			 callbackRCGuide();
             break;
             
		case keyCode.RC_POWER_SWITCH:
			callbackRCPowerSwitch();
			break;
			
        case keyCode.RC_CHANNEL_UP:            
			 callbackRCChannelUp();
             break;
             
        case keyCode.RC_CHANNEL_DOWN:            
			 callbackRCChannelDown();
             break;
             
        case keyCode.RC_VOLUME_UP:	    	
			callbackRCVolumeUp();
			break;
			
         case keyCode.RC_VOLUME_DOWN:			
			callbackRCVolumeDown();
			break;
			
        case keyCode.RC_MUTE:			
			callbackRCMute();
			break;
			
        case keyCode.RC_PAUSE_ON:			
			callbackRCPauseOn();
			break;
			
        case keyCode.RC_PAUSE_OFF:			
			callbackRCPauseOff();
			break;
			
        case keyCode.RC_UP_ARROW_SMALL:			
			callbackRCSmallArrowUp();
			break;
			
        case keyCode.RC_DOWN_ARROW_SMALL:			
			callbackRCSmallArrowDown();
			break;  
			      
        case keyCode.RC_UP_ARROW:
			callbackRCUpArrow();
			break;
			
        case keyCode.RC_DOWN_ARROW:
			callbackRCDownArrow();
			break;  
			
		case keyCode.RC_LEFT_ARROW:
			callbackRCLeftArrow();
			break;
			
		case keyCode.RC_RIGHT_ARROW:
			callbackRCRightArrow();
			break;	
			
        case keyCode.RC_OK:             
			 callbackRCOK();
             break;
             
		case keyCode.RC_TELETEXT_RED:
			callbackRCTeletextRed();
			break;
			
		case keyCode.RC_TELETEXT_GREEN:
			callbackRCTeletextGreen();
			break;
			
		case keyCode.RC_TELETEXT_YELLOW:
			callbackRCTeletextYellow();
			break;
			
		case keyCode.RC_TELETEXT_BLUE:
			callbackRCTeletextBlue();
			break;
			
		case keyCode.RC_MENU:		
			callbackRCMenu();
			break;
			
		case keyCode.RC_BACK:	
			callbackRCBack();
			break;
			
		case keyCode.RC_PVR:		
            callbackRCPvr();
            break;
            
        case keyCode.RC_FAST_FORWARD:
            callbackRCFastForward();
            break;	
            
        case keyCode.RC_FAST_BACKWARD:
            callbackRCFastRewind();
            break;	
            
        case keyCode.RC_PLAY_FIRST:
		    callbackRCPlayToFirst();
		    break;					
		    
        case keyCode.RC_PLAY_END:
		    callbackRCPlayToEnd();
		    break;	
        case keyCode.RC_STOP_PLAY:
        	rtn = callbackRCStop();
	    	if(rtn == undefined)
	    	{
				rtn = true;
	    	}
        	break;       			
		default:
			break;
    }
	return rtn;
}

document.onkeydown = keyHandler;

/**********start callback methods region**************************/
function callbackRCGuide()
{	
}
function callbackRCPowerSwitch()
{		
}
function callbackRCChannelUp()
{	
}
function callbackRCChannelDown()
{	
}
function callbackRCVolumeSet(vol)
{	
}
function callbackRCMute()
{	
}
function callbackRCPauseOn()
{	
}
function callbackRCPauseOff()
{	
}
function callbackRCSmallArrowUp()
{	
}
function callbackRCSmallArrowDown()
{	
}
function callbackRCUpArrow()
{
}
function callbackRCDownArrow()
{
}
function callbackRCLeftArrow()
{
}
function callbackRCRightArrow()
{
}
function callbackRCOK()
{
}
function callbackRCTeletextRed()
{
}
function callbackRCTeletextGreen()
{
}
function callbackRCTeletextYellow()
{
}
function callbackRCTeletextBlue()
{
}
function callbackRCMenu()
{	
	window.location.href = "http://portal.zenith/tv/menu.do";
}
function callbackRCBack()
{
	window.parent.location.href = "http://portal.zenith/tv/menu.do";	
}
function callbackRCPvr()
{
    window.parent.location.href = "http://portal.zenith/tv/direct-play-tvchannel.do";
}
function callbackRCPlayToFirst()
{
}
function callbackRCPlayToEnd()
{
}
function callbackRCStop()
{
}
/*function callbackRCVolumeUp()
{
	window.parent.callbackRCVolumeUp();
}
function callbackRCVolumeDown()
{
	window.parent.callbackRCVolumeDown();
}*/
var DEFAULT_VOLUME     = 30;
var DEFAULT_VOLUME_GAP = 1;
function callbackRCVolumeUp()
{
         // mute state will be off if vol up pressed
         if( AudioControl.GetMute() )
         {
             callbackRCMute();
         }
   
         if(AudioControl.GetVolume( ) < AudioControl.GetMaxVolume( ))
         {
            AudioControl.SetVolume( AudioControl.GetVolume( ) + DEFAULT_VOLUME_GAP );
            currentVol = currentVol + DEFAULT_VOLUME_GAP;
            showVolBar();
            
         }

}

function callbackRCVolumeDown()
{   
         if(AudioControl.GetVolume( ) > AudioControl.GetMinVolume( ))
         {
             AudioControl.SetVolume( AudioControl.GetVolume( ) - DEFAULT_VOLUME_GAP );
             currentVol = currentVol - DEFAULT_VOLUME_GAP ;
             showVolBar();
         }
}

function callbackRCMute()
{
    var mute = AudioControl.GetMute();
    AudioControl.SetMute( !mute );
    
    if(mute == 0)
    {       
    
       var muteDiv = document.createElement("div");
	   
	   muteDiv.id="muteDiv";
	   muteDiv.setAttribute("id","muteDiv");
	   muteDiv.setAttribute("float","left");
	   muteDiv.setAttribute("z-index",9999);
	   
	   muteDiv.style.position = "absolute";
	   muteDiv.style.top      = "575px";
	   muteDiv.style.left     = "75px";
	   muteDiv.style.height   = "40px";
	   muteDiv.style.width    = "80px";
	   //muteDiv.style.border   = "0px solid yellow";
	   
	   muteDiv.innerHTML="<img src='/tv/common/images/mute.png' height='38px' width='62px'/>";
	   	
	   document.body.appendChild(muteDiv);	
    }        
    else
    {
        var muteDivObj = document.getElementById("muteDiv");
	    if(muteDivObj)
	    {	 
	       document.body.removeChild(muteDivObj);
	    }
    }
 
             
}
/**********end callback methods region**************************/
var soundBarParentDiv = "undefined";
var currentVol        = DEFAULT_VOLUME;
var pageSBarInterval  = "undefined";

function showVolBar()
{
	if(soundBarParentDiv == "undefined")
	{
		soundBarParentDiv = document.createElement("div");
		soundBarParentDiv.id="soundBarParentDiv";
		soundBarParentDiv.setAttribute("id","soundBarParentDiv");
		soundBarParentDiv.setAttribute("class","sound-barback");

		var soundBoxDiv = document.createElement("div");
		soundBoxDiv.id = "soundBoxDiv";
		soundBoxDiv.setAttribute("id","soundBoxDiv");
		soundBoxDiv.setAttribute("class","sound-box");
		soundBoxDiv.innerHTML = "<img src='/tv/common/images/sound.png' alt='' />";

		var soundBarDiv = document.createElement("div");
		soundBarDiv.setAttribute("class","sound-bar");

		var vlBarDiv = document.createElement("div");
		vlBarDiv.setAttribute("id","soundVlBar");
		vlBarDiv.setAttribute("class","vl-bar");
		vlBarDiv.style.height = currentVol + "%";
	
		var vlBarBackDiv = document.createElement("div");
		vlBarBackDiv.setAttribute("id","soundVlBarBack");
		vlBarBackDiv.setAttribute("class","vl-barback");
	
		var vlBarCountDiv = document.createElement("div");
		vlBarCountDiv.setAttribute("id","vlBarCountDiv");
		vlBarCountDiv.setAttribute("class","vl-count");
		vlBarCountDiv.innerHTML = currentVol;

		soundBarDiv.appendChild(vlBarDiv);
		soundBarDiv.appendChild(vlBarBackDiv);

		soundBarParentDiv.appendChild(soundBoxDiv);
		soundBarParentDiv.appendChild(soundBarDiv);
		soundBarParentDiv.appendChild(vlBarCountDiv);
	
		document.body.appendChild(soundBarParentDiv);

		document.getElementById('soundBarParentDiv').style.display="none";
	}
	else
	{
		if(pageSBarInterval != "undefined")
		{
			window.clearTimeout(pageSBarInterval);
			pageSBarInterval = "undefined";
		}
		document.getElementById('soundBarParentDiv').style.display="block";
		document.getElementById('soundVlBar').style.height= currentVol + "%";
		document.getElementById('vlBarCountDiv').innerHTML = currentVol;
		//alert("display block");
		pageSBarInterval = window.setTimeout(function(){
			//alert("going to display none");
			document.getElementById('soundBarParentDiv').style.display="none";
			pageSBarInterval = "undefined";
		},5000);
	}

}

