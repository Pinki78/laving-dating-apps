/* Handlers to determine behavior on various key presses */

function keyHandler(event)
{    
     var pressedKey = event.keyCode;
     
    //Console.Log("Pressed Key" + pressedKey);
	//document.getElementById("keyMess").innerHTML = pressedKey + " pressed CMS";
    switch (pressedKey)
    {
        case keyCode.KEY_GUIDE:             
			 callbackRCGuide();
             break;
             
		case keyCode.KEY_POWER:	
			callbackRCPowerSwitch();
			break;
			
        case keyCode.KEY_CH_UP:    
        case 33:                                 // for browser support only 
			 callbackRCChannelUp();
             break;
             
        case keyCode.KEY_CH_DOWN: 
        case 34:                                 // for browser support only 
			 callbackRCChannelDown();
             break;
             
        case keyCode.KEY_VOL_UP:	    	
			 callbackRCVolumeUp();
			 break;
			
        case keyCode.KEY_VOL_DOWN:			
			 callbackRCVolumeDown();
			 break;
			
        case keyCode.KEY_MUTE:			
			 callbackRCMute();
			 break;
			
        case keyCode.KEY_PAUSE:			
			 callbackRCPauseOn();
			 break;
			
        case keyCode.KEY_PLAY:			
			 callbackRCPauseOff();
			 break;
        	
        case keyCode.KEY_UP:
        case 38:                                    // for browser support only 
			 callbackRCUpArrow();
			 break;
			
        case keyCode.KEY_DOWN:
        case 40:                                     // for browser support only 
			 callbackRCDownArrow();
			 break;
			  
		case keyCode.KEY_LEFT:
		case 37:                                     // for browser support only 
			 callbackRCLeftArrow();
			 break;
			
		case keyCode.KEY_RIGHT: 
		case 39:                                     // for browser support only 
			 callbackRCRightArrow();
			 break;
							
        case keyCode.KEY_ENTER:  
        //case 13:                                     // for browser support only           
			 callbackRCOK();
             break;
             
		case keyCode.KEY_RED:
			callbackRCTeletextRed();
			break;
			
		case keyCode.KEY_GREEN:
			callbackRCTeletextGreen();
			break;
			
		case keyCode.KEY_YELLOW:
			callbackRCTeletextYellow();
			break;
			
		case keyCode.KEY_BLUE:
			callbackRCTeletextBlue();
			break;
			
		case keyCode.KEY_MENU:
			callbackRCMenu();
			break;
			
		case keyCode.KEY_RETURN:
			callbackRCBack();
			return false;
			
	    case keyCode.KEY_HOME:
			callbackRCHome();
			break;
		
		case keyCode.KEY_0 :
		    callbackNumericKey(0);
		    break;
		  
        case keyCode.KEY_1 :
        	callbackNumericKey(1);
		    break;     
		    
        case keyCode.KEY_2 :
            callbackNumericKey(2);
		    break;
		    
		case keyCode.KEY_3 :
            callbackNumericKey(3);
		    break; 
		   
		case keyCode.KEY_4 :
            callbackNumericKey(4);
		    break;
		    
		case keyCode.KEY_5 :
            callbackNumericKey(5);
		    break;

		case keyCode.KEY_6 :
            callbackNumericKey(6);
		    break;

		case keyCode.KEY_7 :
            callbackNumericKey(7);
		    break;

		case keyCode.KEY_8 :
            callbackNumericKey(8);
		    break;

		case keyCode.KEY_9 :
            callbackNumericKey(9);
		    break;
		
		case keyCode.KEY_EXIT:
		    return false;
		    
		case keyCode.KEY_SOURCE:
		    callbackRCSource();
            return false;
            
        case keyCode.KEY_TV:
            callbackRCTvDirectTune();
                							
		default:
			break;
    }
	return true;
}

document.onkeydown = keyHandler;

/**********start callback methods region**************************/
function callbackRCGuide()
{	
}
function callbackRCPowerSwitch()
{	
	window.parent.StbCommonController.tvPowerToggle();	
}
function callbackRCChannelUp()
{	
}
function callbackRCChannelDown()
{	
}

function callbackRCVolumeUp()
{	
   window.parent.StbCommonController.volumeUp();
}

function callbackRCVolumeDown()
{	
   window.parent.StbCommonController.volumeDown();
}

function callbackRCMute()
{	
   window.parent.StbCommonController.volumeMute();
}

function callbackRCVolumeSet(vol)
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
	//window.parent.StbCommonController.loadUrl("http://portal.zenith/tv/menu.do");
	window.parent.callbackRCMenu();
}
function callbackRCBack()
{	
	//window.parent.StbCommonController.loadUrl("http://portal.zenith/tv/menu.do");
	window.parent.callbackRCMenu();
}

function callbackRCHome()
{
	//window.parent.StbCommonController.loadUrl("http://portal.zenith/tv/menu.do");
	window.parent.callbackRCHome();
}

function callbackRCTvDirectTune()
{
	//window.parent.StbCommonController.loadUrl("http://portal.zenith/tv/direct-play-tvchannel.do");
	window.parent.callbackRCTvDirectTune();
}

function callbackRCSource()
{   
}

function callbackNumericKey(number)
{

}
/**********end callback methods region**************************/
