
$(function () {
    var flag = true;
    $("#sspz").bind('click', function (event) {
        //判断展开状态
        if (flag) {
            $(this).find(".ejmenu").show();
            $(this).find(".ejmenu").animate({ height: '552px' });
            flag = false;
        } else {
            $(this).find(".ejmenu").animate({ height: '0px' }, function () {
                $(this).hide();
            });
            flag = true;
        }
    });
});
