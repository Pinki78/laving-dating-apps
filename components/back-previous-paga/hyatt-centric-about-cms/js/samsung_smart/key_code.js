/**
 *@file            TVKeyValue.js
 *@brief         TV key 값을 저장한 파일
 *@author      삼성 SDS, ESDM개발, 김성태선임
 *@date         2009.02.18
 */
if (this.Common == null) {
    this.Common = new Object();
}
if (this.Common.API == null) {
    this.Common.API = new Object();
}

Common.API.TVKeyValue = function(){    
    var $THIS$ = this;
    
    this.KEY_TOOLS     = 75;
    this.KEY_MUTE      = 27;          this.RC_MUTE             = 27;
    this.KEY_RETURN    = 88;          this.RC_BACK             = 88;
    this.KEY_UP        = 29460;       this.RC_UP_ARROW         = 29460;
    this.KEY_DOWN      = 29461;       this.RC_DOWN_ARROW       = 29461;
    this.KEY_LEFT      = 4;           this.RC_LEFT_ARROW       = 4;
    this.KEY_RIGHT     = 5;           this.RC_RIGHT_ARROW      = 5;
    this.KEY_WHEELDOWN = 29469;
    this.KEY_WHEELUP   = 29468;
    this.KEY_ENTER     = 29443;       this.RC_OK               = 29443;
    this.KEY_INFO      = 31;          this.RC_GUIDE            = 31
    this.KEY_EXIT      = 45;
    this.KEY_RED       = 108;         this.RC_TELETEXT_RED     = 108;
    this.KEY_GREEN     = 20;          this.RC_TELETEXT_GREEN   = 20;
    this.KEY_YELLOW    = 21;          this.RC_TELETEXT_YELLOW  = 21;
    this.KEY_BLUE      = 22;          this.RC_TELETEXT_BLUE    = 22;
    this.KEY_INFOLINK  = 147;
    this.KEY_RW        = 69;          this.KEY_RW              = 69;     
    this.KEY_PAUSE     = 74;          this.KEY_PAUSE           = 74;
    this.KEY_FF        = 72;          this.RC_FAST_FORWARD     = 72;
    this.KEY_PLAY      = 71;          this.RC_STOP_PLAY        = 71;
    this.KEY_STOP      = 70;          this.RC_STOP_PLAY        = 70; 
    
    this.KEY_0 = 17;      this.RC_0 = 17;
    this.KEY_1 = 101;     this.RC_1 = 101;
    this.KEY_2 = 98;      this.RC_2 = 98;
    this.KEY_3 = 6;       this.RC_3 = 6;
    this.KEY_4 = 8;       this.RC_4 = 8;
    this.KEY_5 = 9;       this.RC_5 = 9;
    this.KEY_6 = 10;      this.RC_6 = 10;
    this.KEY_7 = 12;      this.RC_7 = 12;
    this.KEY_8 = 13;      this.RC_8 = 13; 
    this.KEY_9 = 14;      this.RC_9 = 14;    
    this.KEY_EMPTY = 0;
    
    this.KEY_PRECH   = 259;
    this.KEY_SOURCE  = 222;
    this.KEY_CHLIST  = 84;
    this.KEY_MENU    = 262;
    this.KEY_WLINK   = 115;
    this.KEY_CC      = 118;
    this.KEY_CONTENT = 261;
    this.KEY_FAVCH   = 256;
    this.KEY_REC     = 192;
    this.KEY_EMODE   = 148;
    this.KEY_DMA     = 260;
    
    this.KEY_PANEL_CH_UP    = 105;
    this.KEY_PANEL_CH_DOWN  = 106;
    this.KEY_PANEL_VOL_UP   = 203;
    this.KEY_PANEL_VOL_DOWN = 204;
    this.KEY_PANEL_ENTER    = 309;
    this.KEY_PANEL_SOURCE   = 612;
    this.KEY_PANEL_MENU     = 613;
    this.KEY_PANEL_POWER    = 614;
	
	// Added by ck1.seo@samsung.com
	// For all key regist
	// 3 April 2009
	this.KEY_POWER     = 76;
	this.KEY_TV        = 77;
	this.KEY_VOL_UP    = 7;
	this.KEY_VOL_DOWN  = 11;
	this.KEY_CH_UP     = 68;
	this.KEY_CH_DOWN   = 65;
	this.KEY_TTX_MIX   = 650;
	this.KEY_GUIDE     = 651;
	this.KEY_SUBTITLE  = 652;
	this.KEY_ASPECT    = 653;
	this.KEY_DOLBY_SRR = 654;
	this.KEY_MTS       = 655;
	
	// add by Debajyoti
	// 09 July 2015
	this.KEY_HOME      = 1118;	
	this.KEY_TV        = 1027;
	
}

var keyCode  = new Common.API.TVKeyValue();