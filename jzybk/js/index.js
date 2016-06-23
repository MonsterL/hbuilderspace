$(function(){
	//导航事件定义
	$(".nav_c").delegate('li', 'mouseover', function(event) {
		var $dom = $(this);
		if($dom.hasClass('active')) {
			$dom.find('.ej_nav').slideDown(200);
			return;
		}else {
			$dom.parent().children().removeClass('active');
			$dom.parent().find('.ej_nav').children().removeClass('active');
			$dom.parent().find('.ej_nav').slideUp(100);
			$dom.addClass('active');
			$dom.find('.ej_nav').slideDown(200);
		}
	});

	$(".nav_c").mouseleave(function(){
		$(this).find(".ej_nav").children().removeClass('active');
		$(this).find(".ej_nav").slideUp(100);
	});

	//二级菜单事件
	$(".ej_nav").delegate('div', 'mouseover', function(event) {
		var $dom = $(this);
		if($dom.hasClass('active')) {
			return;
		}else {
			$dom.parent().children().removeClass('active');
			$dom.addClass('active');
		}
	});

	//动态公告区
	// $(".gg .title").delegate('label', 'mouseover', function(event) {
	// 	var $dom = $(this);

	// 	if($dom.hasClass('active')) {
	// 		return;
	// 	}else {
	// 		var labelValue = $dom.attr("id");
	// 		$dom.parent().children().removeClass('active');
	// 		$dom.addClass('active');
	// 		$("#zxggcontent").hide();
	// 		$("#cpggcontent").hide();
	// 		switch(labelValue){
	// 			case "zxgg" :
	// 				$("#zxggcontent").show();
	// 				break;
	// 			case "cpgg":
	// 				$("#cpggcontent").show();
	// 				break;
	// 		}
	// 	}
	// });

	//功能区
	$(".gnq").delegate('div', 'mouseover', function(event) {
		var $dom = $(this);
		if($dom.hasClass('active')) {
			return;
		}else {
			$dom.parent().children().removeClass('active');
			$dom.addClass('active');
		}
	});

	//滚动公告
	$("#scrollnews").scrollable({
        width: "auto",
        height: 44,
        direction: "left",
        duration: 60000,
        scrollCount: 0,
        delay:0
    });

    //邮票展示
    // $("#marq0").scrollable({
    //     width: "auto",
    //     height: 210,
    //     direction: "left",
    //     duration: 14000,
    //     scrollCount: 0,
    //     delay:0
    // });

    //合作伙伴
    $("#marq1").scrollable({
        width: "auto",
        height: 82,
        direction: "left",
        duration: 70000,
        scrollCount: 0,
        delay:0
    });	

    //绑定head区域qq/weichat效果
    $(".logo").delegate("img", "click", function(){
        if($(this).attr("id") == "weichat"){
            $(".head_jzewm_container").show();
        }
    });

    //会员动态
    $("#hydt").scrollable({
        width: "auto",
        direction: "top",
        duration: 5000,
        scrollCount: 0,
        delay:0
    });
});