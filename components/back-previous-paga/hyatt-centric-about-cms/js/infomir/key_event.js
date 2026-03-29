/* Handlers to determine behavior on various key presses */

function keyHandler(e)
{
    //netscape.security.PrivilegeManager.enablePrivilege("UniversalXPConnect");
    var rtn = eventPrepare(e, false, '');
    
    var pressedKey = e.code;
   /* alert("pressedKey :" + pressedKey + ", " + e.code); */
   
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
		case keyCode.RC_EXIT:
			callbackRCMenu();
			break;
		case keyCode.RC_BACK:
			callbackRCBack();			
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
		    
		case keyCode.RC_TV:		  
            callbackRCTvDirectTune();
            break;
			
		default:
			break;
    }
	return rtn;
}

// This sample code taken from infomir js library
function eventPrepare ( event, stopBubble, label ) 
{
	// prevent double invoke
	if ( event.code !== undefined ) { return true; }
	
	// determine real key code
	event.code = event.keyCode || event.which;
	
	// filter phantoms
	if ( event.code === 0 ) { return false; }
	
	// apply key modifiers
	if ( event.shiftKey ) { event.code += 1000; }
	if ( event.altKey ) { event.code += 2000; }
	
	// stop deprecated usb event
	if ( event.code === KEYS.USB_MOUNTED || event.code === KEYS.USB_UNMOUNTED ) { return false; }
	
	// stop bubbling if necessary
	//if ( stopBubble !== false ) { event.stopPropagation(); }
	
	// debug
	//echo(event.code + '\t' + event.shiftKey + '\t' + event.ctrlKey + '\t' + event.altKey + '\t' + event.srcElement.id + '\t' + event.target.id + '\t' + (label || ''), 'keyDown [code/shift/ctrl/alt/src/target]');
	return true;
}


document.addEventListener('keydown', keyHandler);

/**********start callback methods region**************************/
function callbackRCGuide()
{	
}
function callbackRCPowerSwitch()
{		
    window.parent.callbackRCPowerSwitch();
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
	window.parent.callbackRCMenu();
}
function callbackRCBack()
{	

}
function callbackRCHome()
{
	window.parent.callbackRCHome();
}

function callbackRCTvDirectTune()
{
        window.parent.callbackRCTvDirectTune();
}
/**********end callback methods region**************************/
