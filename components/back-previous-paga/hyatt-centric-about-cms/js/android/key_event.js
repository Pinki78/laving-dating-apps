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
			
		case keyCode.RC_PLAY_END:		   
        	callbackRCStop();
		    break;	
			
		case keyCode.RC_FAST_FORWARD:
			callbackRCFastForward();
			break;
			
		case keyCode.RC_FAST_BACKWARD:
			callbackRCFastRewind();
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
		case keyCode.RC_EXIT:
			callbackRCMenu();
			break;
			
		case keyCode.RC_BACK:
		case keyCode.RC_AN_BACK:
			callbackRCBack();
			return false;
			break;	
			
		case keyCode.RC_HOME:
			callbackRCHome();
			break;
			
		case keyCode.RC_0 :
		    callbackNumericKey(0);
		    break;
		  
        case keyCode.RC_1 :
        	callbackNumericKey(1);
		    break;     
		    
        case keyCode.RC_2 :
            callbackNumericKey(2);
		    break;
		    
		case keyCode.RC_3 :
            callbackNumericKey(3);
		    break; 
		   
		case keyCode.RC_4 :
            callbackNumericKey(4);
		    break;
		    
		case keyCode.RC_5 :
            callbackNumericKey(5);
		    break;

		case keyCode.RC_6 :
            callbackNumericKey(6);
		    break;

		case keyCode.RC_7 :
            callbackNumericKey(7);
		    break;

		case keyCode.RC_8 :
            callbackNumericKey(8);
		    break;

		case keyCode.RC_9 :
            callbackNumericKey(9);
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
function callbackRCVolumeUp()
{	
}
function callbackRCVolumeDown()
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
function callbackRCStop()
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

}
function callbackRCHome()
{
	window.location.href = "http://portal.zenith/tv/menu.do";	
}
/**********end callback methods region**************************/
