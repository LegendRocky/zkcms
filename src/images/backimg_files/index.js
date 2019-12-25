// JavaScript Document

$(function () {


$navMobile = jQuery("#navMobile"),
	$navA = $navMobile.find("a"),
	$mSubnav = $navMobile.find(".msubnav");
var menu = {
    trigger: ".pmenuBtn",
    trigger2: ".menuclose",
    init: function () {
        menu.bind();
    },
    bind: function () {
        $(document).on("click", menu.trigger, menu.openNav);
        $(document).on("click", menu.trigger2, menu.openNav);
    },
    openNav: function () {
        if ($("body").is(".open")) {
            $("body").removeClass("open");
            $(".menu-handler").removeClass("active");
        } else {
            $("body").addClass("open");
            $(".menu-handler").addClass("active");
        }
    }
};

jQuery(function () {
    menu.init();
    jQuery("#navMobile>dd>p>a").bind("click", function (e) {
        var hjcur = $(this);
        var hjDD = $(this).parents("p").parents("dd");
        if (hjDD.find(".msubnav").size() > 0) {
            if (hjcur.hasClass("cur")) {
                hjDD.find(".msubnav").stop(false, false).slideUp();
                hjcur.removeClass("cur");
            } else {
                $navA.removeClass("cur");
                $mSubnav.stop(false, false).slideUp();
                hjDD.find(".msubnav").stop(false, false).slideDown();
                hjcur.addClass("cur");
                e.preventDefault();
            }
        }
    });

 
});

jQuery("#navMobile .msubnav a").click(function (e) {
    var hash = jQuery(this).attr("href").split("#")[1];
    if (hash && jQuery("#" + hash).length == 1) {
        e.preventDefault();
        setScroll("#" + hash);
        $("body").removeClass("open");
        $(".menu-handler").removeClass("active");
    }
});

//nav
$(".zkNav li").hover(function(){
	  $(this).addClass("active");
	  $(this).find(".sub").stop(true,true).slideDown(300);
  }, 
 function(){
	  $(this).removeClass("active");
	  $(this).find(".sub").stop(true,true).slideUp(300);
});


//banner
var swiper = new Swiper('.zkBanner', {
  //effect: 'fade',
  //loop: true,
  autoplay: {
	delay: 4500,
	disableOnInteraction: false,
  },
  pagination: {
	el: '.swiper-pagination',
	clickable: true,
  },
});


//设备展示
var swiper = new Swiper('.zkEqui-list-box', {
  slidesPerView: 3,
  slidesPerGroup: 3,
  spaceBetween: 25,
  autoplay: {
	delay: 5500,
	disableOnInteraction: false,
  },
  navigation: {
	nextEl: '.swiper-button-next',
	prevEl: '.swiper-button-prev',
  },
  breakpoints: {
	768: {
	  slidesPerView: 2,
	  slidesPerGroup: 2,
	  spaceBetween: 20,
	},
	480: {
	  slidesPerView:1,
	  slidesPerGroup: 1,
	  spaceBetween: 0,
	}
  }
});


//专家团队
var swiper = new Swiper('.zkExperts-list-box', {
  observer:true,//修改swiper自己或子元素时，自动初始化swiper
  observeParents:true,//修改swiper的父元素时，自动初始化swiper
  slidesPerView: 4,
  slidesPerGroup: 4,
  spaceBetween: 30,
  autoplay: {
	delay: 5000,
	disableOnInteraction: false,
  },
  navigation: {
	nextEl: '.swiper-button-next',
	prevEl: '.swiper-button-prev',
  },
  breakpoints: {
	768: {
	  slidesPerView: 2,
	  slidesPerGroup: 2,
	  spaceBetween: 20,
	},
	480: {
	  slidesPerView:1,
	  slidesPerGroup: 1,
	  spaceBetween: 0,
	}
  }
});


//内页概况
var swiper = new Swiper('.pabout-figure', {
  slidesPerView: 2,
  slidesPerGroup: 2,
  spaceBetween: 33,
  pagination: {
	el: '.swiper-pagination',
	clickable: true,
  },
   autoplay: {
	delay: 5000,
	disableOnInteraction: false,
  },
  breakpoints: {
	480: {
	  slidesPerView:1,
	  slidesPerGroup: 1,
	  spaceBetween: 0,
	}
  }
});


//内页新闻中心
var swiper = new Swiper('.pnews-line', {
  slidesPerView: 3,
  slidesPerGroup: 3,
  spaceBetween: 25,
  pagination: {
	el: '.swiper-pagination',
	clickable: true,
  },
  breakpoints: {
	768: {
	  slidesPerView: 2,
	  slidesPerGroup: 2,
	  spaceBetween: 20,
	},
	480: {
	  slidesPerView:1,
	  slidesPerGroup: 1,
	  spaceBetween: 0,
	}
  }
});

//科室设置-详情
var swiper = new Swiper('.pdepart-detaInfo-figure', {
 autoplay: {
	delay: 5000,
	disableOnInteraction: false,
  },
  pagination: {
	el: '.swiper-pagination',
	clickable: true,
  },
});

//科室详情-科室医生
var swiper = new Swiper('.pdepart-detaDoctor-list', {
  slidesPerView: 6,
  slidesPerGroup: 6,
  spaceBetween: 40,
  navigation: {
	nextEl: '.swiper-button-next',
	prevEl: '.swiper-button-prev',
  },
  breakpoints: {
	768: {
	  slidesPerView: 4,
	  slidesPerGroup: 4,
	  spaceBetween: 25,
	},
	640: {
	  slidesPerView: 3,
	  slidesPerGroup: 3,
	  spaceBetween: 15,
	},
	480: {
	  slidesPerView: 2,
	  spaceBetween: 10,
	}
  }
});


    //医院荣誉弹出
$(".phonor-list li").click(function () {
    if ($(this).attr('mid') != 360&&$(this).attr('mid') != 417) {
        $(".phonor-popup").css({ "display": "table" });

        var img = $(this).find('img').attr('src');
        var id = $(this).attr('id');
        var mid = $(this).attr('mid');
        $('.phonor-popup #big_pic_img').attr("src", img);
        $('.phonor-popup #big_pic_title').html($(this).find('.tit').html());

        $('.phonor-popup').find('.prev').data('id', id);
        $('.phonor-popup').find('.next').data('id', id);
        $('.phonor-popup').find('.prev').data('mid', mid);
        $('.phonor-popup').find('.next').data('mid', mid);
    }
});
$(".phonor-popup-iboxt .close").click(function () {
    $(".phonor-popup").css({ "display": "none" });
});

    //下一张
$('.next').on('click', function () {
    var id = $(this).data("id");
    var mid = $(this).data('mid');
    $.ajax({
        type: "post",
        url: "project.aspx/big_img_list",
        contentType: "application/json",
        dataType: "json",
        data: "{id:'" + id + "',type:'next',mid:'" + mid + "'}",
        success: function (data) {
            if (data.d != null && $.trim(data.d) != '') {
                var obj = eval('(' + data.d + ')');
                $('.phonor-popup #big_pic_img').attr("src", obj.msg[0].project4);
                $('.phonor-popup #big_pic_title').html(obj.msg[0].project1);
                $('.phonor-popup').find('.prev').data('id', obj.msg[0].project0);
                $('.phonor-popup').find('.next').data('id', obj.msg[0].project0);
                $('.phonor-popup').find('.prev').data('mid', obj.msg[0].project8);
                $('.phonor-popup').find('.next').data('mid', obj.msg[0].project8);
            } else {
                layer.msg("没有下一张了！", { icon: 7 });
                return false;
            }
        }
    });
});

    //上一张
$('.prev').on('click', function () {
    var id = $(this).data("id");
    var mid = $(this).data('mid');
    $.ajax({
        type: "post",
        url: "project.aspx/big_img_list",
        contentType: "application/json",
        dataType: "json",
        data: "{id:'" + id + "',type:'prev',mid:'" + mid + "'}",
        success: function (data) {
            if (data.d != null && $.trim(data.d) != '') {
                var obj = eval('(' + data.d + ')');
                $('.phonor-popup #big_pic_img').attr("src", obj.msg[0].project4);
                $('.phonor-popup #big_pic_title').html(obj.msg[0].project1);
                $('.phonor-popup').find('.prev').data('id', obj.msg[0].project0);
                $('.phonor-popup').find('.next').data('id', obj.msg[0].project0);
                $('.phonor-popup').find('.prev').data('mid', obj.msg[0].project8);
                $('.phonor-popup').find('.next').data('mid', obj.msg[0].project8);
            } else {
                layer.msg("没有上一张了！", { icon: 7 });
                return false;
            }
        }
    });
});


//新闻中心tab切换
$(".zkNews-tab li").click(function() {
	var num = $(this).index();
	$(".zkNews-tab li").removeClass("active");
	$(this).addClass("active");
	$(".zkNews-list ul").hide().eq(num).show()
});

//科室导航tab切换
$(".zkDepart-tab li").hover(function() {
	var num = $(this).index();
	$(".zkDepart-tab li").removeClass("active");
	$(this).addClass("active");
	$(".zkDepart-list .de-item").hide().eq(num).show()
});

//专家团队tab切换
$(".zkExperts-tab li").click(function() {
	var num = $(this).index();
	$(".zkExperts-tab li").removeClass("active");
	$(this).addClass("active");
	$(".zkExperts-list-switch").hide().eq(num).show()
});

//内页专家团队tab切换
$(".fenlei li").click(function() {
	var num = $(this).index();
	$(".fenlei li").removeClass("active");
	$(this).addClass("active");
	$(".keshi").hide().eq(num).show()
});


});


//顶部固定
var a=0;
function e() {
   var e = $(window).scrollTop();
   e > a ? $(".sxHead").addClass("topFix") : $(".sxHead").removeClass("topFix");
}
$(window).scroll(e),
e()




