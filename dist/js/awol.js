 var defaults = {
 	speed: 300,
 	showDelay: 0,
 	hideDelay: 0,
 	singleOpen: true,
 	clickEffect: true
 };

      var color;

 $(document).ready(function () {
     function getCookie(name) {
               var arr,reg = new RegExp("(^| )" + name + "=([^;]*)(;|$)");
               if (arr = document.cookie.match(reg))
                   return unescape(arr[2]);
               else
                   return null;
        }
   //实现点击动画效果
   function	ClickEffect(){
   	var ink, d, x, y;
   	$("#demo-list").find("a").click(
   		function(e) {
   			$(".ink").remove();
   			if ($(this).children(".ink").length === 0) {
   				$(this).prepend("<span class='ink'></span>")
   			}
   			ink = $(this).find(".ink");
   			ink.removeClass("animate-ink");
   			if (!ink.height() && !ink.width()) {
   				d = Math.max($(this).outerWidth(), $(this).outerHeight());
   				ink.css({
   					height: d,
   					width: d
   				})
   			}
   			x = e.pageX - $(this).offset().left - ink.width() / 2;
   			y = e.pageY - $(this).offset().top - ink.height() / 2;
   			ink.css({
   				top: y + 'px',
   				left: x + 'px'
   			}).addClass("animate-ink")
   		});
   };
   //这里实现点击下拉或者直接跳转
   $("#jquery-accordion-menu").children("ul").find('li').click(function(e){

   	if ($("#jquery-accordion-menu").find(".submenu").length > 0) {
   		$("#jquery-accordion-menu").find(".submenu").siblings("a").append("<span class='submenu-indicator'>+</span>");
   	}
   	   e.stopPropagation();
   	    e.preventDefault();
   	if ($(this).children(".submenu").length > 0) {
   		if ($(this).children(".submenu").css("display") == "none") {
   			$(this).children(".submenu").delay(defaults.showDelay).slideDown(defaults.speed);
   			$(this).children(".submenu").siblings("a").addClass("submenu-indicator-minus");
   			if (defaults.singleOpen) {
   				$(this).siblings().children(".submenu").slideUp(defaults.speed);
   				$(this).siblings().children(".submenu").siblings("a").removeClass("submenu-indicator-minus");
   			}
   			return false;
   		} else 
   		{
   			$(this).children(".submenu").delay(defaults.hideDelay).slideUp(defaults.speed);
   		}
   		if ($(this).children(".submenu").siblings("a").hasClass("submenu-indicator-minus")) {
   			$(this).children(".submenu").siblings("a").removeClass("submenu-indicator-minus")
   		}

   	}
    });

    var courseInfo=getCookie("totalCourse");
    if(courseInfo!=null)
    {
        var c_json = JSON.parse(courseInfo);
        for(var i in c_json)
        {
            var id = c_json[i].Id;
            var master = c_json[i].Degree;
            if(id!=null||id.length>0){
               switch(master){
               case "1":
                  levelnum(id);$("#"+id).find("div:eq(0)").append("<img data-toggle='tooltip' data-placement='right' data-original-title='您现在1级' style='width:10%;height:2.5%;' src='../assets/img/color/"+color+"1.png'/><a style='display:none' value='1'>1</a>");break;
               case "2":
                  levelnum(id);$("#"+id).find("div:eq(0)").append("<img data-toggle='tooltip' data-placement='right' data-original-title='您现在2级' style='width:20%;height:2.5%;' src='../assets/img/color/"+color+"2.png'/><a style='display:none' value='2'>2</a>");break;
               case "3":
                  levelnum(id);$("#"+id).find("div:eq(0)").append("<img data-toggle='tooltip' data-placement='right' data-original-title='您现在3级' style='width:30%;height:2.5%;' src='../assets/img/color/"+color+"3.png'/><a style='display:none' value='3'>3</a>");break;
               case "4":
                  levelnum(id);$("#"+id).find("div:eq(0)").append("<img data-toggle='tooltip' data-placement='right' data-original-title='您现在4级' style='width:40%;height:2.5%;' src='../assets/img/color/"+color+"4.png'/><a style='display:none' value='4'>4</a>");break;
               }
            }
            
        }
        //console.log($(".level2").length);
        var secondlevel = $(".level2");
        for(var t in secondlevel){
              console.log(secondlevel[t]);
              //console.log(secondlevel[t].("a")[0].val());
              
        }
        //console.log()
    }

    function levelnum(id){
      var test = $("#"+id+" a");
      if(test.length>0)
      {
         var value=$("#"+id+" a")[0].innerText;
         var num=value.split(".").length;
         if(num==2){
            $("#"+id).find("div:eq(0)").attr("style","color:#FFFFFF ;margin-left:35px");
            $("#"+id).find("a:eq(0)").attr("style","padding-bottom:0px");
            color="blue";
         }
         if(num==3){
            $("#"+id).find("div:eq(0)").attr("style","color:#FFFFFF ;margin-left:50px");
            $("#"+id).find("a:eq(0)").attr("style","padding-bottom:0px");
            color="yellow";
         }
      }
      return
    }


});