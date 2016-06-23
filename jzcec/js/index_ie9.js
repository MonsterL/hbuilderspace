/* SL 在IE9下执行的JS */
$(document).ready(function(){
	//九州服务模块相关
    $(".hyzx").animate({scale: 1,opacity:1}, 3000);
    $(".jzcj").animate({scale: 1,opacity:1}, 3000);
    $(".cjwt").animate({scale: 1,opacity:1}, 3000);
    $(".pxzx").animate({scale: 1,opacity:1}, 3000);
    $(".hycx").animate({scale: 1,opacity:1}, 3000);
    $(".hysq").animate({scale: 1,opacity:1}, 3000);
    $(".xxfk").animate({scale: 1,opacity:1}, 3000);

    $(".sp-row").find("img").mouseenter(function(){
    	$(this).animate({width:"112px",height:"112px"},500);
    });

    $(".sp-row").find("img").mouseleave(function(){
    	$(this).animate({width:"105px",height:"105px"},300);
    });

    //产金要闻、会员动态、财经资讯、政策法规下图片效果
    $(".hydt").find(".imgcontainer img").mouseenter(function(){
    	$(this).animate({width:"260px",height:"145px"},500);
    });

    $(".hydt").find(".imgcontainer img").mouseleave(function(){
    	$(this).animate({width:"242px",height:"119px"},300);
    });

    //九州产金
    $('.jzcj').find('div').mouseenter(function(){

        $(this).css({
	    	"filter" : "alpha(opacity=0)",
	    	"opacity" : "0"
	    });

	    $(this).animate({
	    	"filter" : "alpha(opacity=100)",
	    	"opacity" : "1"
	    });
    });
});