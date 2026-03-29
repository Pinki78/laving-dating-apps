var currentUrl = window.location.href; // http://localhost/hotel-information/index_en.php


/*var pageNameWithExt = currentUrl.substring(currentUrl.indexOf("/") + 1,currentUrl.indexOf(".php") -1);
var cmsUptoFolderName = currentUrl.substring(currentUrl.indexOf("//") + 2 ,currentUrl.lastIndexOf("/"));
var cmsFolderName = cmsUptoFolderName.substring(cmsUptoFolderName.lastIndexOf("/") + 1,cmsUptoFolderName.length);
var pageName = pageNameWithExt.substring(0,pageNameWithExt.indexOf("_"));
$(document).ready(function(){
	$.ajax({
		type: 'GET',
	        url: '/tv/reporting/cmsitemclick.do?menuName=CMS&itemName=' + pageName,
	        cache: false,
	        success: function(data) {

	        },
	        error:function (xhr, ajaxOptions, thrownError){

	        }
	});
});
*/

var pageNameWithExt = currentUrl.substring(currentUrl.indexOf("//") + 2,currentUrl.indexOf(".php") );
var cmsFolderName = pageNameWithExt.substring(pageNameWithExt.indexOf("/") + 1, pageNameWithExt.lastIndexOf("/"));
var pageName = pageNameWithExt.substring(pageNameWithExt.lastIndexOf("/") + 1,pageNameWithExt.indexOf("_"));
//alert("pageNameWithExt :" + pageNameWithExt + ", pageName :" + pageName);
$(document).ready(function(){
	$.ajax({
		type: 'GET',
	        url: '/tv/reporting/cmsitemclick.do?menuName=CMS&itemName=' + pageName,
	        cache: false,
	        success: function(data) {

	        },
	        error:function (xhr, ajaxOptions, thrownError){

	        }
	});
});



