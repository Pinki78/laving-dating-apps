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

	////ASTB.DebugString("Keyboard - " + pressedKey);
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
		case keyCode.RC_HOME:
			callbackRCHome();
			break;
		case keyCode.RC_BACK:
			callbackRCBack();
			e.preventDefault();
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
	window.location.href = "http://192.168.82.1/tv/menu.do";
}
function callbackRCBack()
{	
}
function callbackRCHome()
{
	window.parent.location.href = "http://192.168.82.1/tv/menu.do";	
}
/**********end callback methods region**************************/
