/* SL 实现和首页相关的JS 包括导航联动等 */
$(document).ready(function() {
    //浏览器版本
    var browser=navigator.appName 
    var b_version=navigator.appVersion 
    var version=b_version.split(";"); 
    var trim_Version=(version[1]||"").replace(/[ ]/g,"");

    //初始化导航
    var settings = [{
        image: 'images/nav/lxwm.png',
        heading: '',
        description: '',
        'class': 'img',
        id: 'lxwm'
    }, {
        image: 'images/nav/xzzq.png',
        heading: '',
        description: '',
        'class': 'img',
        id: 'xzzq'
    }, {
        image: 'images/nav/zcfg.png',
        heading: '',
        description: '',
        'class': 'img',
        id: 'zcfg'
    }, {
        image: 'images/nav/hydl.png',
        heading: '',
        description: '',
        'class': 'img',
        id: 'hydl'
    }, {
        image: 'images/nav/hyfw.png',
        heading: '',
        description: '',
        'class': 'img',
        id: 'hyfw'
    }, {
        image: 'images/nav/xxzx.png',
        heading: '',
        description: '',
        'class': 'img',
        id: 'xxzx'
    }, {
        image: 'images/nav/zxfw.png',
        heading: '',
        description: '',
        'class': 'img',
        id: 'zxfw'
    }, {
        image: 'images/nav/jzcj.png',
        heading: '',
        description: '',
        'class': 'img',
        id: 'jzcj'
    }, {
        image: 'images/nav/gywm.png',
        heading: '',
        description: '',
        'class': 'img',
        id: 'gywm'
    }, {
        image: 'images/nav/jzsy.png',
        heading: '',
        description: '',
        'class': 'img',
        id: 'jzsy'
    }];

    var options = {
        circle_radius: 400,
        animation_duration: 0.7,
        normal_feature_size: 100,
        highlighted_feature_size: 116,
        top_margin: 0,
        bottom_margin: 100,
        spacing: 40,
        min_padding: 10,
        heading_font_size: 30,
        description_font_size: 20,
        animation_mode: 'css',
        type: 'image',
        color: 'blue',
        border_width: 20,
        text_position: 'top'
    };

    var nav_info = {
        1: 'jzsy',
        2: 'gywm',
        3: 'jzcj',
        4: 'zxfw',
        5: 'xxzx',
        6: 'hyfw',
        7: 'hydl',
        8: 'zcfg',
        9: 'xzzq',
        10: 'lxwm'
    }

    //如果是ie9
    if(browser=="Microsoft Internet Explorer" && trim_Version=="MSIE9.0") {
        var nav_info_ie9 = targetInfo = {
            0 : [0, 0, {"right" : [1,2,3,4,5], "left" : [9,8,7,6],  "name" : "jzsy"}],
            1 : [-1, 9, {"right" : [2,3,4,5,6], "left" : [0,9,8,7], "name" : "gywm"}],
            2 : [-2, 8, {"right" : [3,4,5,6,7], "left" : [1,0,9,8], "name" : "cpfw"}],
            3 : [-3, 7, {"right" : [4,5,6,7,8], "left" : [2,1,0,9], "name" : "jypz"}],
            4 : [-4, 6, {"right" : [5,6,7,8,9], "left" : [3,2,1,0], "name" : "hyfw"}],
            5 : [-5, 5, {"right" : [6,7,8,9,0], "left" : [4,3,2,1], "name" : "xxzx"}],
            6 : [-6, 4, {"right" : [7,8,9,0,1], "left" : [5,4,3,2], "name" : "zcfg"}],
            7 : [-7, 3, {"right" : [8,9,0,1,2], "left" : [6,5,4,3], "name" : "xzzx"}],
            8 : [-8, 2, {"right" : [9,0,1,2,3], "left" : [7,6,5,4], "name" : "lxwm"}],
            9 : [-9, 1, {"right" : [0,1,2,3,4], "left" : [8,7,6,5], "name" : "yqlj"}]
        }

        //获取对象旋转的角度，根据css属性matrix转换成角度
        function getRotationDegrees(obj) {
            var matrix = obj.css("-webkit-transform") ||
            obj.css("-moz-transform") ||
            obj.css("-ms-transform")  ||
            obj.css("-o-transform")   ||
            obj.css("transform");
            if(matrix !== 'none') {
                var values = matrix.split('(')[1].split(')')[0].split(',');
                var a = values[0];
                var b = values[1];
                var angle = Math.round(Math.atan2(b, a) * (180/Math.PI));
            } else { var angle = 0; }
            
            //最后返回的角度区间是-180~180度之间
            if(angle>180) {
                return angle -=360
            }else if(angle<-180) {
                return angle +=360
            }else {
                return angle;
            }
            //return (angle < 0) ? angle +=360 : angle;
        }

        //旋转指定角度
        function _rotate(deg){
            $(".circle").animate({rotate: '+='+(deg) +'deg'}, 1000);
            $('.circle li img').animate({rotate: '+='+(-deg) +'deg'}, 1000);
        }

        function calcTop(){
            //获取当前top下标
            var deg = getRotationDegrees($(".circle"));
            var degRemainder = Number((deg/36)%10);

            for(var key in targetInfo) {
                var info = targetInfo[key];
                var remain = null;
                if(info.length) {
                    for(var i=0; i<info.length; i++) {
                        remain = info[i];
                        if(degRemainder == remain) {
                            return Number(key);
                        }
                    }
                }
            }

            return null;
        }

        function getDeg(currentTop, target) {
            var currentLeft =   targetInfo[currentTop][2].left;
            var currentRight =  targetInfo[currentTop][2].right;

            if($.inArray(target, currentLeft) != -1) {
                var index = $.inArray(target, currentLeft);

                return 36*(index+1);
            }else {
                var index = $.inArray(target, currentRight);

                return -36*(index+1);
            }   
        }

        function setTargetToTop(target) {
            if(target == 9) {
                currentNav = 10;
            }else {
                currentNav = target + 1;
            }
            
            var currentTopIndex = calcTop();
            var willDeg = getDeg(currentTopIndex, target);
            _rotate(willDeg);           
        }

        function goPrev() {
            var currentTopIndex = Number(calcTop());
            var target = 0;
            if(currentTopIndex == 0) {
                target = 9;
            }else {
                target = currentTopIndex - 1;
            }

            setTargetToTop(target);
            
            updateUI(); 
        }

        function goNext() {
            var currentTopIndex = Number(calcTop());
            var target = 0;
            if(currentTopIndex == 9) {
                target = 0;
            }else {
                target = currentTopIndex + 1;
            }

            setTargetToTop(target);

            updateUI(); 
        }
    }else {
        var fp = new FeaturePresenter($("#circle-element"), settings, options);
    }
    var $nav_1 = $(".nav_1");
    var $nav_2 = $(".nav_2");
    var currentNav = 1;

    updateUI();

    $(".feature-presenter-circle-container").css({
        "background-color": "transparent"
    });

    //创建左右两侧导航按钮
    var nav_3_htmlArr = [];
    nav_3_htmlArr.push("<div class='left_nav nav_btn'><</div>");
    nav_3_htmlArr.push("<div class='right_nav nav_btn'>></div>");

    $nav_2.append(nav_3_htmlArr.join(""));

    $(".left_nav").bind("click", function() {
        if (currentNav != 1) {
            currentNav -= 1;
        } else {
            currentNav = 10;
        }

        //ie9下旋转圆盘
        if(browser=="Microsoft Internet Explorer" && trim_Version=="MSIE9.0") {
            setTargetToTop(currentNav-1);
        }

        updateUI();
    });

    $(".right_nav").bind("click", function() {
        if (currentNav != 10) {
            currentNav += 1;
        } else {
            currentNav = 1;
        }

        //ie9下旋转圆盘
        if(browser=="Microsoft Internet Explorer" && trim_Version=="MSIE9.0") {
            setTargetToTop(currentNav-1);
        }

        updateUI();
    });

    //联动更新导航UI
    function updateUI(flag) {
        //如果flag为true 创建content区域

        if (!currentNav) {
            currentNav = 1;
        }

        var currentNavName = nav_info[currentNav];

        showNavMask();
        setTimeout(function() {
            hideNavMask();
        }, 800);

        //更新nav_1样式
        if ($nav_1.find(".active").attr("id")) {
            var oldNavName = $nav_1.find(".active").attr("id").split("_")[2];

            if (!flag && (currentNavName == oldNavName)) {
                return;
            }

            $nav_1.find("li").removeClass("active");

            //动画淡出
            switch (oldNavName) {
                case "jzsy":
                    $("#jzsy").animate({
                        "width": "0px",
                        "height": "0px"
                    }, "slow", function() {
                        $("#jzsy_content").remove();
                    });

                    break;
                case "gywm":
                    $("#zzjg").animate({
                        "width": "0px",
                        "height": "0px"
                    }, "slow");
                    $("#mtbd").animate({
                        "width": "0px",
                        "height": "0px"
                    }, "slow");
                    $("#zxjj").animate({
                        "width": "0px",
                        "height": "0px"
                    }, "slow");
                    $("#qywh").animate({
                        "width": "0px",
                        "height": "0px"
                    }, "slow");
                    $("#djs").animate({
                        "width": "0px",
                        "height": "0px"
                    }, "slow");
                    $("#jzxcp").animate({
                        "width": "0px",
                        "height": "0px"
                    }, "slow", function() {
                        $("#gywm_content").remove();
                    });

                    break;
                case "zxfw":
                    $("#jypz").animate({
                        "width": "0px",
                        "height": "0px"
                    }, "slow");
                    $("#jygz").animate({
                        "width": "0px",
                        "height": "0px"
                    }, "slow");
                    $("#glbf").animate({
                        "width": "0px",
                        "height": "0px"
                    }, "slow");
                    $("#fxjs").animate({
                        "width": "0px",
                        "height": "0px"
                    }, "slow", function() {
                        $("#zxfw_content").remove();
                    });
                    break;
                case "xxzx":
                    $("#hqsj").animate({
                        "width": "0px",
                        "height": "0px"
                    }, "slow");
                    $("#zxdt").animate({
                        "width": "0px",
                        "height": "0px"
                    }, "slow");
                    $("#zxgg").animate({
                        "width": "0px",
                        "height": "0px"
                    }, "slow");
                    $("#hydt").animate({
                        "width": "0px",
                        "height": "0px"
                    }, "slow");
                    $("#cjzx").animate({
                        "width": "0px",
                        "height": "0px"
                    }, "slow", function() {
                        $("#xxzx_content").remove();
                    });
                    break;

                case "hyfw":
                    $("#hymd").animate({
                        "width": "0px",
                        "height": "0px"
                    }, "slow");
                    $("#rhzn").animate({
                        "width": "0px",
                        "height": "0px"
                    }, "slow");
                    $("#rhsq").animate({
                        "width": "0px",
                        "height": "0px"
                    }, "slow");
                    $("#pxzx").animate({
                        "width": "0px",
                        "height": "0px"
                    }, "slow");
                    $("#hylb").animate({
                        "width": "0px",
                        "height": "0px"
                    }, "slow");
                    $("#fkly").animate({
                        "width": "0px",
                        "height": "0px"
                    }, "slow", function() {
                        $("#hyfw_content").remove();
                    });
                    break;
                case "hydl":
                    $("#hydl").animate({
                        "width": "0px",
                        "height": "0px"
                    }, "slow", function() {
                        $("#hydl_content").remove();
                    });
                    break;
                case "jzcj":
                    $("#cjjj").animate({
                        "width": "0px",
                        "height": "0px"
                    }, "slow");
                    $("#fwtx").animate({
                        "width": "0px",
                        "height": "0px"
                    }, "slow");
                    $("#sspz").animate({
                        "width": "0px",
                        "height": "0px"
                    }, "slow");
                    $("#hqsj").animate({
                        "width": "0px",
                        "height": "0px"
                    }, "slow", function() {
                        $("#jzcj_content").remove();
                    });
                    break;
                case "zcfg":
                    $("#gjzc").animate({
                        "width": "0px",
                        "height": "0px"
                    }, "slow");
                    $("#xgfg").animate({
                        "width": "0px",
                        "height": "0px"
                    }, "slow", function() {
                        $("#zcfg_content").remove();
                    });
                    break;
                case "xzzq":
                    $("#xzzq").animate({
                        "width": "0px",
                        "height": "0px"
                    }, "slow", function() {
                        $("#xzzq_content").remove();
                    });
                    break;
                case "lxwm":
                    $("#lxwm").animate({
                        "width": "0px",
                        "height": "0px"
                    }, "slow");
                    $("#zxns").animate({
                        "width": "0px",
                        "height": "0px"
                    }, "slow", function() {
                        $("#lxwm_content").remove();
                    });
                    break;
            }

            //取消oldCurrentNav样式
            $nav_2.find("*[src='images/nav/" + oldNavName + "_active.png']").attr("src", "images/nav/" + oldNavName + ".png");
        }

        $nav_1.find("#nav_1_" + currentNavName).addClass("active");

        //更新nav_2 + content 内容样式
        switch (currentNav) {
            case 1:
                $nav_2.find("*[src='images/nav/jzsy.png']").trigger("click");

                //更新top图标按钮
                $nav_2.find("*[src='images/nav/jzsy.png']").attr("src", "images/nav/jzsy_active.png");

                //创建content区域
                var contentHtml = [];
                contentHtml.push("  <div id='jzsy_content' class='content'>           ");
                contentHtml.push("      <img id='jzsy' src='images/ejcd/jzsy_jzsy.png'>");
                contentHtml.push("  </div>                          ");

                $nav_2.append(contentHtml.join(""));

                //动画渐入效果
                $("#jzsy").css({
                    "position": "absolute",
                    "top": "20px",
                    "left": "118px"
                });

                $("#jzsy").show();
                $("#jzsy").animate({
                    "width": "228px",
                    "height": "158px"
                }, "slow", "linear");


                break;
            case 2:
                $nav_2.find("*[src='images/nav/gywm.png']").trigger("click");

                //更新top图标按钮
                $nav_2.find("*[src='images/nav/gywm.png']").attr("src", "images/nav/gywm_active.png");

                //创建content区域
                var contentHtml = [];
                contentHtml.push("  <div id='gywm_content' class='content'>                               ");
                contentHtml.push("      <a target='_blank' href='html/about_zzjg.aspx'><img id='zzjg' src='images/ejcd/gywm_zzjg.png'></a> ");
                contentHtml.push("      <a target='_blank' href='html/about_mtbd.aspx'><img id='mtbd' src='images/ejcd/gywm_mtbd.png'></a>      ");
                contentHtml.push("      <a target='_blank' href='html/about.aspx'><img id='zxjj' src='images/ejcd/gywm_zxjj.png'></a>      ");
                contentHtml.push("      <a target='_blank' href='html/about_qywh.aspx'><img id='qywh' src='images/ejcd/gywm_qywh.png'></a>      ");
                contentHtml.push("      <a target='_blank' href='html/about_dsj.aspx'><img id='djs' src='images/ejcd/gywm_djs.png'></a>        ");
                contentHtml.push("      <a target='_blank' href='html/about_xcp.aspx'><img id='jzxcp' src='images/ejcd/gywm_jzxcp.png'></a>    ");
                contentHtml.push("  </div>                                              ");

                $nav_2.append(contentHtml.join(""));

                //动画渐入效果
                $("#zzjg").css({
                    "position": "absolute",
                    "top": "-10px",
                    "left": "75px"
                });

                $("#mtbd").css({
                    "position": "absolute",
                    "top": "-10px",
                    "left": "200px"
                });

                $("#zxjj").css({
                    "position": "absolute",
                    "top": "100px",
                    "left": "-40px"
                });

                $("#qywh").css({
                    "position": "absolute",
                    "top": "100px",
                    "left": "110px"
                });

                $("#djs").css({
                    "position": "absolute",
                    "top": "100px",
                    "left": "260px"
                });

                $("#jzxcp").css({
                    "position": "absolute",
                    "top": "100px",
                    "left": "410px"
                });

                $("#zzjg").show();
                $("#jzxcp").show();

                $("#zzjg").animate({
                    "width": "100px",
                    "height": "100px"
                }, "slow");
                $("#jzxcp").animate({
                    "width": "100px",
                    "height": "100px"
                }, "slow", function() {
                    $("#zxjj").show();
                    $("#qywh").show();
                    $("#djs").show();
                    $("#mtbd").show();
                    $("#zxjj").animate({
                        "width": "140px",
                        "height": "95px"
                    }, "slow");
                    $("#qywh").animate({
                        "width": "140px",
                        "height": "95px"
                    }, "slow");
                    $("#djs").animate({
                        "width": "140px",
                        "height": "95px"
                    }, "slow");
                    $("#mtbd").animate({
                        "width": "140px",
                        "height": "95px"
                    }, "slow");
                });

                break;
            case 3:
                $nav_2.find("*[src='images/nav/jzcj.png']").trigger("click");

                //更新top图标按钮
                $nav_2.find("*[src='images/nav/jzcj.png']").attr("src", "images/nav/jzcj_active.png");

                //创建content区域
                var contentHtml = [];
                contentHtml.push("  <div id='jzcj_content' class='content'>           ");
                contentHtml.push("      <a target='_blank' href='html/jzcj.aspx'><img id='cjjj' src='images/ejcd/jzcj_cjjj.png'></a>");
                contentHtml.push("      <a target='_blank' href='html/jzcj_fwtx.aspx'><img id='fwtx' src='images/ejcd/jzcj_fwtx.png'></a>");
                contentHtml.push("      <a target='_blank' href='html/jzcj_info1.aspx?nid=2397&stype=2'><img id='sspz' src='images/ejcd/jzcj_sspz.png'></a>");
                contentHtml.push("      <a target='_blank' href='html/cjwt.html'><img id='hqsj' src='images/ejcd/jzcj_hqsj.png'></a>");
                contentHtml.push("  </div>                          ");

                $nav_2.append(contentHtml.join(""));

                //动画渐入效果
                $("#cjjj").css({
                    "position": "absolute",
                    "top": "-20px",
                    "left": "150px"
                });

                $("#fwtx").css({
                    "position": "absolute",
                    "top": "100px",
                    "left": "-10px"
                });

                $("#sspz").css({
                    "position": "absolute",
                    "top": "100px",
                    "left": "150px"
                });

                $("#hqsj").css({
                    "position": "absolute",
                    "top": "100px",
                    "left": "310px"
                });

                $("#cjjj").show();
                $("#sspz").show();

                $("#cjjj").animate({
                    "width": "140px",
                    "height": "95px"
                }, "slow");
                $("#sspz").animate({
                    "width": "140px",
                    "height": "95px"
                }, "slow", function() {
                    $("#fwtx").show();
                    $("#hqsj").show();
                    $("#fwtx").animate({
                       "width": "140px",
                        "height": "95px"
                    }, "slow");
                    $("#hqsj").animate({
                        "width": "140px",
                        "height": "95px"
                    }, "slow");
                });

                break;
            case 4:
                $nav_2.find("*[src='images/nav/zxfw.png']").trigger("click");

                //更新top图标按钮
                $nav_2.find("*[src='images/nav/zxfw.png']").attr("src", "images/nav/zxfw_active.png");

                //创建content区域
                var contentHtml = [];
                contentHtml.push("  <div id='zxfw_content' class='content'>           ");
                contentHtml.push("      <a target='_blank' href='html/zxfw_jypz.aspx'><img id='jypz' src='images/ejcd/zxfw_jypz.png'></a>");
                contentHtml.push("      <a target='_blank' href='html/zxfw.aspx'><img id='jygz' src='images/ejcd/zxfw_jygz.png'></a>");
                contentHtml.push("      <a target='_blank' href='html/zxfw_glbf.aspx'><img id='glbf' src='images/ejcd/zxfw_glbf.png'></a>");
                contentHtml.push("      <a target='_blank' href='html/zxfw_fxjs.aspx'><img id='fxjs' src='images/ejcd/zxfw_fxjs.png'></a>");
                contentHtml.push("  </div>                          ");

                $nav_2.append(contentHtml.join(""));

                //动画渐入效果
                $("#jypz").css({
                    "position": "absolute",
                    "top": "-20px",
                    "left": "180px"
                });

                $("#jygz").css({
                    "position": "absolute",
                    "top": "50px",
                    "left": "0px"
                });

                $("#glbf").css({
                    "position": "absolute",
                    "top": "100px",
                    "left": "160px"
                });

                $("#fxjs").css({
                    "position": "absolute",
                    "top": "50px",
                    "left": "320px"
                });

                $("#jypz").show();
                $("#jygz").show();
                $("#jypz").animate({
                    "width": "100px",
                    "height": "100px"
                }, "slow");
                $("#jygz").animate({
                    "width": "140px",
                    "height": "95px"
                }, "slow", function() {
                    $("#glbf").show();
                    $("#fxjs").show();
                    $("#glbf").animate({
                        "width": "140px",
                    "height": "95px"
                    }, "slow");
                    $("#fxjs").animate({
                        "width": "140px",
                        "height": "95px"
                    }, "slow");
                });
                break;
            case 5:
                $nav_2.find("*[src='images/nav/xxzx.png']").trigger("click");

                //更新top图标按钮
                $nav_2.find("*[src='images/nav/xxzx.png']").attr("src", "images/nav/xxzx_active.png");

                //创建content区域
                var contentHtml = [];
                contentHtml.push("  <div id='xxzx_content' class='content'>           ");
                contentHtml.push("      <a target='_blank' href='html/xx.aspx'><img id='hqsj' src='images/ejcd/xxzx_hqsj.png'></a>");
                contentHtml.push("      <a target='_blank' href='html/xx_zxgg.aspx'><img id='zxgg' src='images/ejcd/xxzx_zxgg.png'></a>");
                contentHtml.push("      <a target='_blank' href='html/xx_hydt.aspx'><img id='hydt' src='images/ejcd/xxzx_hydt.png'></a>");
                contentHtml.push("      <a target='_blank' href='html/xx_zxdt.aspx'><img id='zxdt' src='images/ejcd/xxzx_zxdt.png'></a>");
                contentHtml.push("      <a target='_blank' href='html/xx_cjzx.aspx'><img id='cjzx' src='images/ejcd/xxzx_cjzx.png'></a>");
                contentHtml.push("  </div>                          ");

                $nav_2.append(contentHtml.join(""));

                //动画渐入效果
                $("#hqsj").css({
                    "position": "absolute",
                    "top": "-10px",
                    "left": "140px"
                });

                $("#zxgg").css({
                    "position": "absolute",
                    "top": "80px",
                    "left": "-30px"
                });

                $("#hydt").css({
                    "position": "absolute",
                    "top": "100px",
                    "left": "120px"
                });

                $("#zxdt").css({
                    "position": "absolute",
                    "top": "0px",
                    "left": "270px"
                });

                $("#cjzx").css({
                    "position": "absolute",
                    "top": "100px",
                    "left": "270px"
                });

                $("#hqsj").show();
                $("#zxgg").show();
                $("#hqsj").animate({
                    "width": "100px",
                    "height": "100px"
                }, "slow");
                $("#zxgg").animate({
                    "width": "140px",
                    "height": "95px"
                }, "slow", function() {
                    $("#hydt").show();
                    $("#zxdt").show();
                    $("#cjzx").show();
                    $("#hydt").animate({
                        "width": "140px",
                        "height": "95px"
                    }, "slow");
                    $("#zxdt").animate({
                        "width": "140px",
                        "height": "95px"
                    }, "slow");
                    $("#cjzx").animate({
                        "width": "140px",
                        "height": "95px"
                    }, "slow");
                });

                break;
            case 6:
                $nav_2.find("*[src='images/nav/hyfw.png']").trigger("click");

                //更新top图标按钮
                $nav_2.find("*[src='images/nav/hyfw.png']").attr("src", "images/nav/hyfw_active.png");

                //创建content区域
                var contentHtml = [];
                contentHtml.push("  <div id='hyfw_content' class='content'>           ");
                contentHtml.push("      <a target='_blank' href='html/hyfw_hymd.aspx'><img id='hymd' src='images/ejcd/hyfw_hymd.png'></a>");
                contentHtml.push("      <a target='_blank' href='html/px.html'><img id='pxzx' src='images/ejcd/hyfw_pxzx.png'></a>");
                contentHtml.push("      <a target='_blank' href='html/hyfw.aspx'><img id='rhzn' src='images/ejcd/hyfw_rhzn.png'></a>");
                contentHtml.push("      <a target='_blank' href='html/hyfw_rhsq.aspx'><img id='rhsq' src='images/ejcd/hyfw_rhsq.png'></a>");
                //contentHtml.push("      <a href='html/hyfw.html'><img id='hylb' src='images/ejcd/hyfw_hylb.png'></a>");
                contentHtml.push("      <a target='_blank' href='html/hyfw_lyfk.aspx'><img id='fkly' src='images/ejcd/hyfw_fkly.png'></a>");
                contentHtml.push("  </div>                          ");

                $nav_2.append(contentHtml.join(""));

                //动画渐入效果
                $("#hymd").css({
                    "position": "absolute",
                    "top": "5px",
                    "left": "175px"
                });

                $("#pxzx").css({
                    "position": "absolute",
                    "top": "0px",
                    "left": "45px"
                });

                $("#rhzn").css({
                    "position": "absolute",
                    "top": "105px",
                    "left": "25px"
                });

                $("#rhsq").css({
                    "position": "absolute",
                    "top": "105px",
                    "left": "175px"
                });

                // $("#hylb").css({
                //     "position": "absolute",
                //     "top": "30px",
                //     "left": "285px"
                // });

                $("#fkly").css({
                    "position": "absolute",
                    "top": "110px",
                    "left": "320px"
                });


                $("#hymd").show();
                $("#rhzn").show();
                $("#pxzx").show();
                $("#hymd").animate({
                    "width": "140px",
                    "height": "95px"
                }, "slow");
                 $("#pxzx").animate({
                    "width": "100px",
                    "height": "100px"
                }, "slow");
                $("#rhzn").animate({
                    "width": "140px",
                    "height": "95px"
                }, "slow", function() {
                    $("#rhsq").show();
                    $("#hylb").show();
                    $("#fkly").show();
                    $("#rhsq").animate({
                        "width": "140px",
                        "height": "95px"
                    }, "slow");
                    $("#hylb").animate({
                       "width": "140px",
                        "height": "95px"
                    }, "slow");
                    $("#fkly").animate({
                        "width": "100px",
                        "height": "100px"
                    }, "slow");
                });

                break;
            case 7:
                $nav_2.find("*[src='images/nav/hydl.png']").trigger("click");

                //更新top图标按钮
                $nav_2.find("*[src='images/nav/hydl.png']").attr("src", "images/nav/hydl_active.png");

                //创建content区域
                var contentHtml = [];
                contentHtml.push("  <div id='hydl_content' class='content'>           ");
                contentHtml.push("      <a target='_blank' href='html/hy.aspx'><img id='hydl' src='images/ejcd/hydl_hydl.png'></a>");
                contentHtml.push("  </div>                          ");

                $nav_2.append(contentHtml.join(""));

                //动画渐入效果
                $("#hydl").css({
                    "position": "absolute",
                    "top": "20px",
                    "left": "120px"
                });

                $("#hydl").show();
                $("#hydl").animate({
                    "width": "226px",
                    "height": "156px"
                }, "slow");

                break;

            case 8:
                $nav_2.find("*[src='images/nav/zcfg.png']").trigger("click");

                //更新top图标按钮
                $nav_2.find("*[src='images/nav/zcfg.png']").attr("src", "images/nav/zcfg_active.png");

                //创建content区域
                var contentHtml = [];
                contentHtml.push("  <div id='zcfg_content' class='content'>           ");
                contentHtml.push("      <a target='_blank' href='html/zcfg.aspx'><img id='gjzc' src='images/ejcd/zcfg_gjzc.png'></a>");
                contentHtml.push("      <a target='_blank' href='html/zcfg_xgfg.aspx'><img id='xgfg' src='images/ejcd/zcfg_xgfg.png'></a>");
                contentHtml.push("  </div>                          ");

                $nav_2.append(contentHtml.join(""));

                //动画渐入效果
                $("#gjzc").css({
                    "position": "absolute",
                    "top": "20px",
                    "left": "80px"
                });

                $("#xgfg").css({
                    "position": "absolute",
                    "top": "80px",
                    "left": "250px"
                });

                $("#gjzc").show();
                $("#gjzc").animate({
                    "width": "160px",
                    "height": "110px"
                }, "slow", "linear", function() {
                    $("#xgfg").show();
                    $("#xgfg").animate({
                        "width": "160px",
                        "height": "110px"
                    }, "slow", "linear");
                });

                break;
            case 9:
                $nav_2.find("*[src='images/nav/xzzq.png']").trigger("click");

                //更新top图标按钮
                $nav_2.find("*[src='images/nav/xzzq.png']").attr("src", "images/nav/xzzq_active.png");

                //创建content区域
                var contentHtml = [];
                contentHtml.push("  <div id='xzzq_content' class='content'>           ");
                contentHtml.push("      <a target='_blank' href='html/xzzq.aspx'><img id='xzzq' src='images/ejcd/xzzq_xzzq.png'></a>");
                contentHtml.push("  </div>                          ");

                $nav_2.append(contentHtml.join(""));

                //动画渐入效果
                $("#xzzq").css({
                    "position": "absolute",
                    "top": "10px",
                    "left": "150px"
                });

                $("#xzzq").show();
                $("#xzzq").animate({
                    "width": "177px",
                    "height": "177px"
                }, "slow", "linear");

                break;
            case 10:
                $nav_2.find("*[src='images/nav/lxwm.png']").trigger("click");

                //更新top图标按钮
                $nav_2.find("*[src='images/nav/lxwm.png']").attr("src", "images/nav/lxwm_active.png");

                //创建content区域
                var contentHtml = [];
                contentHtml.push("  <div id='lxwm_content' class='content'>           ");
                contentHtml.push("      <a target='_blank' href='html/lxwm.aspx'><img id='lxwm' src='images/ejcd/lxwm_lxwm.png'></a>");
                contentHtml.push("      <a target='_blank' href='html/lxwm_zxns.aspx'><img id='zxns' src='images/ejcd/lxwm_zxns.png'></a>");
                contentHtml.push("  </div>                          ");

                $nav_2.append(contentHtml.join(""));

                //动画渐入效果
                $("#lxwm").css({
                    "position": "absolute",
                    "top": "20px",
                    "left": "60px"
                });

                $("#zxns").css({
                    "position": "absolute",
                    "top": "80px",
                    "left": "250px"
                });

                $("#lxwm").show();
                $("#zxns").show();
                $("#lxwm").animate({
                    "width": "176px",
                    "height": "123px"
                }, "slow");
                $("#zxns").animate({
                    "width": "176px",
                    "height": "123px"
                }, "slow");

                break;
        }

        $(".content").mouseenter(function() {
            timeout = true;
        });

        $(".content").mouseleave(function() {
            timeout = false;
        });
    }


    $nav_1.delegate("li", "click", function(e) {
        var $dom = $(this);
        var domid = $dom.attr("id");
        var currentNavName = domid.split("_")[2];

        for (var key in nav_info) {
            if (currentNavName == nav_info[key]) {

                currentNav = Number(key);

                //ie9下旋转圆盘
                if(browser=="Microsoft Internet Explorer" && trim_Version=="MSIE9.0") {
                    setTargetToTop(currentNav-1);
                }

                updateUI();
            }
        }

        //阻止冒泡
        e.stopPropagation();
    });

    $nav_2.delegate("img", "click", function(e) {
        var imgSrc = e.target.currentSrc || $(e.target).attr("src");
        var srcArr = [];
        if (imgSrc) {
            srcArr = imgSrc.split("\/");
        }


        if (srcArr.length) {
            //imgName例值yqlj.png
            var imgName = srcArr[srcArr.length - 1];
            var currentNavName = imgName.split(".")[0];

            for (var key in nav_info) {
                if (currentNavName == nav_info[key]) {
                    if (currentNav != Number(key)) {
                        currentNav = Number(key);

                        //ie9下旋转圆盘
                        if(browser=="Microsoft Internet Explorer" && trim_Version=="MSIE9.0") {
                            setTargetToTop(currentNav-1);
                        }

                        updateUI();
                    }
                }
            }
        }

        //阻止冒泡
        e.stopPropagation();
    });

    $(".feature-presenter").bind("click", function(e) {
        //e.stopPropagation();
        //e.preventDefault();
    });

    $(window).resize(function() {
        $(".feature-presenter-circle-container").css({
            "background-color": "transparent"
        });

        //创建左右两侧导航按钮
        var nav_3_htmlArr = [];
        nav_3_htmlArr.push("<div class='left_nav nav_btn'><</div>");
        nav_3_htmlArr.push("<div class='right_nav nav_btn'>></div>");

        $nav_2.append(nav_3_htmlArr.join(""));

        $(".left_nav").bind("click", function() {
            if (currentNav != 1) {
                currentNav -= 1;
            } else {
                currentNav = 10;
            }

            //ie9下旋转圆盘
            if(browser=="Microsoft Internet Explorer" && trim_Version=="MSIE9.0") {
                setTargetToTop(currentNav-1);
            }

            updateUI(true);
        });

        $(".right_nav").bind("click", function() {
            if (currentNav != 10) {
                currentNav += 1;
            } else {
                currentNav = 1;
            }

            //ie9下旋转圆盘
            if(browser=="Microsoft Internet Explorer" && trim_Version=="MSIE9.0") {
                setTargetToTop(currentNav-1);
            }

            updateUI(true);
        });

        isShowGif();

        updateUI(true);
    });

    //通过递归调用setTimeout来模拟setInterval
    var timeout = false; //启动及关闭按钮 如鼠标是否在制定区域
    var restart = false; //是否更新过UI
    function time() {
        //重置定时任务
        if(restart) {
            setTimeout(time, 6000);
            return;
        }

        if (timeout) {
            setTimeout(time, 10000);
            return;
        }

        //定时任务主体
        if (currentNav == 10) {
            currentNav = 1;
        } else {
            currentNav += 1;
        }

        //ie9下旋转圆盘
        if(browser=="Microsoft Internet Explorer" && trim_Version=="MSIE9.0") {
            setTargetToTop(currentNav-1);
        }

        updateUI();

        setTimeout(time, 8000); //time是指本身,延时递归调用自己,100为间隔调用时间,单位毫秒  
    }

    setTimeout(time, 7000);

    $(".feature-presenter").mouseenter(function() {
        timeout = true;
    });

    $(".nav_btn").mouseenter(function() {
        timeout = true;
    });

    $(".nav_1").mouseenter(function() {
        timeout = true;
    });

    $(".content").mouseenter(function() {
        timeout = true;
    });

    $(".feature-presenter").mouseleave(function() {
        timeout = false;
    });

    $(".nav_btn").mouseleave(function() {
        timeout = false;
    });

    $(".nav_1").mouseleave(function() {
        timeout = false;
    });

    $(".content").mouseleave(function() {
        timeout = false;
    });

    //触发导航区域的单机事件时，1s内不允许点击
    function showNavMask() {
        //3s内不自动转动
        restart = true;

        $(".navmask").show();
    }

    function hideNavMask() {
        restart = false;

        $(".navmask").hide();
    }

    //绑定遮罩层隐藏方法
    $(".dtgg .mask").bind("mouseleave", function() {
        //$(this).slideUp(); 
        $(this).hide();
    });

    var eleFront = null;
    var eleBack = null;

    //绑定tab切换效果
    $(".topnav").delegate('label', 'click', function(event) {
        var $dom = $(this);
        var labelValue = $dom.text();

        //记录前置元素
        var toplabel = $(".topnav").find(".active_tn").text().trim();
        var leftlabel = $(".leftnav").find(".active_ln").text().trim();

        if (toplabel == "九州铜") {
            if (leftlabel == "分时图") {
                eleFront = $("#xhtfst iframe");
            } else {
                eleFront = $("#xhtkxt iframe");
            }
        } else if (toplabel == "九州银") {
            if (leftlabel == "分时图") {
                eleFront = $("#xhbyfst iframe");
            } else {
                eleFront = $("#xhbykxt iframe");
            }
        } else if (toplabel == "九州燃油") {
            if (leftlabel == "分时图") {
                eleFront = $("#93qyfst iframe");
            } else {
                eleFront = $("#93qykxt iframe");
            }
        } else if (toplabel == "九州油") {
            if (leftlabel == "分时图") {
                eleFront = $("#jzyfst iframe");
            } else {
                eleFront = $("#jzykxt iframe");
            }
        } else if (toplabel == "九州豆油") {
            if (leftlabel == "分时图") {
                eleFront = $("#jzryfst iframe");
            } else {
                eleFront = $("#jzrykxt iframe");
            }
        }else {
            eleFront = $("#xhtfst iframe");
        }

        $(".topnav").find(".active_tn").removeClass("active_tn");
        $(".leftnav").find(".active_ln").removeClass("active_ln");

        $dom.addClass("active_tn");
        $(".fskxt").eq(0).addClass('active_ln');

        //记录后置元素
        var toplabel = $(".topnav").find(".active_tn").text().trim();
        var leftlabel = $(".leftnav").find(".active_ln").text().trim();

        if (toplabel == "九州铜") {
            if (leftlabel == "分时图") {
                eleBack = $("#xhtfst iframe");
            } else {
                eleBack = $("#xhtkxt iframe");
            }
        } else if (toplabel == "九州银") {
            if (leftlabel == "分时图") {
                eleBack = $("#xhbyfst iframe");
            } else {
                eleBack = $("#xhbykxt iframe");
            }
        } else if (toplabel == "九州燃油") {
            if (leftlabel == "分时图") {
                eleBack = $("#93qyfst iframe");
            } else {
                eleBack = $("#93qykxt iframe");
            }
        } else if (toplabel == "九州油") {
            if (leftlabel == "分时图") {
                eleBack = $("#jzyfst iframe");
            } else {
                eleBack = $("#jzykxt iframe");
            }
        } else if (toplabel == "九州豆油") {
            if (leftlabel == "分时图") {
                eleBack = $("#jzryfst iframe");
            } else {
                eleBack = $("#jzrykxt iframe");
            }
        } else {
            return;
        }

        eleFront && eleFront.addClass("out").removeClass("in");
        eleFront.parent().hide();
        eleBack && eleBack.addClass("in").removeClass("out");
        eleBack.parent().show();
    });

    $(".topnav").find("label").eq(0).trigger("click");

    //绑定分时图 K线图切换
    $(".leftnav").delegate('div', 'click', function(event) {
        var $dom = $(this)

        //记录前置元素
        var toplabel = $(".topnav").find(".active_tn").text().trim();
        var leftlabel = $(".leftnav").find(".active_ln").text().trim();

        if (toplabel == "九州铜") {
            if (leftlabel == "分时图") {
                eleFront = $("#xhtfst iframe");
            } else {
                eleFront = $("#xhtkxt iframe");
            }
        } else if (toplabel == "九州银") {
            if (leftlabel == "分时图") {
                eleFront = $("#xhbyfst iframe");
            } else {
                eleFront = $("#xhbykxt iframe");
            }
        } else if (toplabel == "九州燃油") {
            if (leftlabel == "分时图") {
                eleFront = $("#93qyfst iframe");
            } else {
                eleFront = $("#93qykxt iframe");
            }
        } else if (toplabel == "九州油") {
            if (leftlabel == "分时图") {
                eleFront = $("#jzyfst iframe");
            } else {
                eleFront = $("#jzykxt iframe");
            }
        } else if (toplabel == "九州豆油") {
            if (leftlabel == "分时图") {
                eleFront = $("#jzryfst iframe");
            } else {
                eleFront = $("#jzrykxt iframe");
            }
        } else {
            eleFront = $("#xhtfst iframe");
        }

        $(".leftnav").find(".active_ln").removeClass("active_ln");
        $dom.addClass("active_ln");

        //记录后置元素
        var toplabel = $(".topnav").find(".active_tn").text().trim();
        var leftlabel = $(".leftnav").find(".active_ln").text().trim();

        if (toplabel == "九州铜") {
            if (leftlabel == "分时图") {
                eleBack = $("#xhtfst iframe");
            } else {
                eleBack = $("#xhtkxt iframe");
            }
        } else if (toplabel == "九州银") {
            if (leftlabel == "分时图") {
                eleBack = $("#xhbyfst iframe");
            } else {
                eleBack = $("#xhbykxt iframe");
            }
        } else if (toplabel == "九州燃油") {
            if (leftlabel == "分时图") {
                eleBack = $("#93qyfst iframe");
            } else {
                eleBack = $("#93qykxt iframe");
            }
        } else if (toplabel == "九州油") {
            if (leftlabel == "分时图") {
                eleBack = $("#jzyfst iframe");
            } else {
                eleBack = $("#jzykxt iframe");
            }
        } else if (toplabel == "九州豆油") {
            if (leftlabel == "分时图") {
                eleBack = $("#jzryfst iframe");
            } else {
                eleBack = $("#jzrykxt iframe");
            }
        } else {
            return;
        }

        eleFront && eleFront.addClass("out").removeClass("in");
        eleFront.parent().hide();
        eleBack && eleBack.addClass("in").removeClass("out");
        eleBack.parent().show();
    }); $("#jzryfst").show();

    //绑定视频事件
    $(".spxc").bind('click', function(event) {
        var $videoDom = $(".xcvideo");
        var video = $videoDom.find("iframe");
        var $btn = $(this);
        var viewWidth = $(document).width() < $('body').width() ? $(document).width() : $('body').width();
        var btnLeft = $btn.offset().left;
        var remainWidth = viewWidth - btnLeft;

        if ($videoDom.width() > 0) {
            //隐藏
            $videoDom.animate({
                "width": 0,
                "right": 0
            });
            video.css({
                "width" : "0px",
                "height" : "0px"
            });
        } else {
            //显示
            if (remainWidth > 330) {
                $videoDom.animate({
                    "width": 300,
                    "right": -300
                }, 1000, function(){
                    
                });

                video.animate({
                    "width" : "270",
                    "height" : "220",
                    "margin-top" : "5px"
                }, 1000);
            } else {
                $videoDom.animate({
                    "width": 300,
                    "right": -(remainWidth - 40)
                }, 1000);

                video.animate({
                    "width" : "270",
                    "height" : "220",
                    "margin-top" : "5px"
                }, 1000); 
            }            
        }
    });

    isShowGif();

    $("#scrollNews").scrollable({
        direction: "top",
        height: "45",
        scrollCount: 1
    });

    $("#marq1").scrollable({
        width: "auto",
        height: 75,
        direction: "left",
        duration: 60000,
        scrollCount: 0
    });
      $(".gdhq").scrollable({
          direction: "top",
          height: "190",
          scrollCount: 0,
          duration: 8000,
          delay: 0
      });
    //绑定九州服务模块的事件
    $(".sp-row").bind("mouseleave", function(){
        $(this).find('img').removeClass("pulse");
    });

    //九州产金模块翻转效果
    $('.jzcjmk .jzcj').find('a>div').mouseenter(function () {
        $('.jzcjmk .jzcj').find('a>div').removeClass('flipInX');
        $(this).addClass('animated flipInX');
    });

    //绑定head区域qq/weichat效果
    $(".logo").delegate("img", "click", function(){
        if($(this).attr("id") == "weichat"){
            $(".head_jzewm_container").show();
        }
    });
});

//设置遮罩层的隐藏显示
function showMask(obj) {
    if (!obj) {
        return;
    }

    var $dom = $(obj);

    //$dom.parent().next().slideDown("fast");
    $dom.parent().next().show();
}


function isShowGif() {
    //如果屏幕过小 防止转盘和导航重叠 不显示转盘
    var screenWidth = $(document).width() < $('body').width() ? $(document).width() : $('body').width();

    if (screenWidth < 1600) {
        $(".navleft").hide();
        $(".navright").hide();
    } else {
        $(".navleft").show();
        $(".navright").show();
    }
}