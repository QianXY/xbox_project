 var defaults = {
 	speed: 300,
 	showDelay: 0,
 	hideDelay: 0,
 	singleOpen: true,
 	clickEffect: true
 };

      var color;
      function setCookie(cname, cvalue, exdays) {
                  var d = new Date();
                  d.setTime(d.getTime() + (exdays * 24 * 60 * 60 * 1000));
                  var expires = null; //"expires=" + d.toUTCString();
                  this.document.cookie = cname + "=" + cvalue + "; " + expires;
            }

 $(document).ready(function () {
     function getCookie(name) {
               var arr,reg = new RegExp("(^| )" + name + "=([^;]*)(;|$)");
               if (arr = document.cookie.match(reg))
                   return unescape(arr[2]);
               else
                   return null;
        }

        function setcurrentlevelid(currentlevelid){
          var userid=getCookie("userid");
          $.post("http://xboxweb.azurewebsites.net/api/user/updatecurrentlevel",{Id:userid,CurrentlevelId:currentlevelid}, function(data,status){
                            if(data=="success"){
                            }
                    });
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



    //下面是根据用户学习进度来判断当前所处章节的实现部分，是整个菜单最难最精华的部分
    var courseInfo=getCookie("totalCourse");
    if(courseInfo!=null)
    {
        var c_json = JSON.parse(courseInfo);
        for(var i in c_json)
        {
            var id = c_json[i].Id;
            var master = parseInt(c_json[i].Degree);
            if(id!=null||id.length>0){
               

            if(id!=""){
              levelnum(id);
              $("#"+id).find("div:eq(0)").append('<div class="progress progress-striped active" style="width:80%"><div data-toggle="tooltip" data-placement="right" data-original-title="'+master+'%" class="progress-bar progress-bar-'+color+'" role="progressbar" aria-valuenow="10" aria-valuemin="0" aria-valuemax="100" style="width: '+master+'%;"></div></div><a style="display:none" value="'+master+'">'+master+'</a>');
            }
            }
            
        }
        var secondlevel = $(".level2");
        var sumlevel1=0;
        var sum1=0;
        var sumlevel2=0;
        var sum2=0;

                  //对于每个三级节点
                  $(".level2").each(function(index) {
                    sum1=0;
                    sumlevel1=0;
                    if ($(this).find(".submenu").length > 0) {
                      $(this).find("a[style='display:none']").each(function(){//获得该节点下的a标签的值
                        sumlevel1+=parseInt(this.attributes[1].value);//同一个二级节点下的所有三级节点的值相加获得总和
                      });
                      $(this).find("ul>li").each(function(){
                        sum1++;//同一个二级节点下的所有三级节点的总个数
                      });
                      sumlevel1=(sumlevel1/sum1).toFixed(2);//该二级节点的进度值
                      if(!isNaN(sumlevel1)&&sumlevel1!=0){
                        $(this).find("div:eq(0)").attr("style","margin-left:35px;margin-top:40px");
                        $(this).find("a:eq(0)").attr("style","padding-bottom:0px");
                        
                        $(this).find("div:eq(0)").append('<div class="progress progress-striped active"style="width:80%"><div data-toggle="tooltip" data-placement="right" data-original-title="'+sumlevel1+'%" class="progress-bar progress-bar-info" role="progressbar" aria-valuenow="60" aria-valuemin="0" aria-valuemax="100" style="width: '+sumlevel1+'%;"></div></div><a style="display:none" value="'+sumlevel1+'">'+sumlevel1+'</a>');
                      }
                    }
                  });

                  //对于每一个二级节点
                  $(".level1").each(function(index) {
                    sum2=0;
                    sumlevel2=0;
                      $(this).find(".level2").each(function(){
                      if($(this).children("div:eq(0)").find("a").length>0)
                      {
                        var cash=$(this).children("div:eq(0)")[0].innerText;
                        sumlevel2+=parseInt(cash);//同一个一级节点下的所有二级节点的值相加的总和
                      }
                      });

                      $(this).find(">ul>li").each(function(){
                        sum2++;//同一个一级节点下的所有二级节点的个数
                      });

                      sumlevel2=(sumlevel2/sum2).toFixed(2);//该一级节点的进度值
                      console.log("sumlevel2="+sumlevel2);

                      if(sumlevel2>=0&&sumlevel2<5){
                        $(this).find("a:eq(0)").append("<img style='float:right;margin-right:15px;width:10%;height:4%;' src='../assets/img/award/award0.png'/><a style='display:none' value='3'>3</a>");
                      }
                      else{
                        if(sumlevel2>=5&&sumlevel2<=15){
                          $(this).find("a:eq(0)").append("<img style='float:right;margin-right:15px;width:10%;height:4%;' src='../assets/img/award/award1.png'/><a style='display:none' value='3'>3</a>");
                        }
                        else{
                          $(this).find("a:eq(0)").append("<img style='float:right;margin-right:15px;width:10%;height:4%;' src='../assets/img/award/award2.png'/><a style='display:none' value='3'>3</a>");
                        }
                      }
                  });


                  var block_status = 0;//该值为1的时候，之后所有的节点都要加上block_click
                  $(".level2").each(function () //对每一个二级节点做遍历
                  {
                          var t = $(this).children("div:eq(0)").children("a[style='display:none']")//获取子节点下的a标签
                          if (t.length > 0) //如果该a标签有值，则说明该二级节不是子节点
                          {
                              if (parseInt(t[0].text) == undefined || parseInt(t[0].text) <= 20) //非子节点的二级节点，未定义或进度小于20
                              {
                                  var ul = $(this).find("ul");
                                  if ($(this).find("ul").length == 0) {//找到该二级节点下面的ul标签
                                    if(block_status==0)
                                    {
                                      //ul标签下的第一个li标签就是当前所处章节
                                      block_status = 1;
                                      setCookie("currentlevel", $(this).find("li:eq(0) a:eq(0)").context.children[0].text);
                                      setCookie("currentlevelid", $(this).attr("id"));
                                      setCookie("CourseNowName", $(this).find("li:eq(0) a:eq(0)").context.children[0].text);
                                      setCookie("CourseNow", $(this).attr("id"));
                                      
                                      $("#currentinfo").empty();
                                      $("#currentinfo").append($(this).find("li:eq(0) a:eq(0)").context.children[0].text);
                                    }
                                  }
                                  else {//如果该二级节点下面没有ul标签，则它本身就是当前所处章节
                                      $(this).find("li").each(function (index) {
                                          var t1 = $(this);
                                          var t = $(this).find("div:eq(0)")[0].children[1];
                                          if (t == undefined || parseInt(t.text) <= 20) {
                                              if (block_status == 0) {
                                                  var title = $(this).find("li:eq(0) a:eq(0)").context.children[0].text;
                                                  title = title.substring(0, title.length);
                                                  setCookie("currentlevel", title);
                                                  setCookie("currentlevelid", $(this).attr("id"));
                                                  setCookie("CourseNowName", title);
                                                  setCookie("CourseNow", $(this).attr("id"));
                                                  if(t==undefined)
                                                  {
                                                    var testid=$(this).attr("id");
                                                    $("#"+testid).find("div:eq(0)").attr("style","margin-left:50px;margin-top:40px");
                                                    $("#"+testid).find("a:eq(0)").attr("style","padding-bottom:0");
                                                    $("#"+testid).find("div:eq(0)").append('<div class="progress progress-striped active" style="width:80%"><div data-toggle="tooltip" data-placement="right" data-original-title="'+0+'%" class="progress-bar progress-bar-warning" role="progressbar" aria-valuenow="0" aria-valuemin="0" aria-valuemax="100" style="width: '+0+'%;"></div></div><a style="display:none" value="'+0+'">'+0+'</a>');
                                                  }
                                                  $("#currentinfo").empty();
                                                  $("#currentinfo").append(title);
                                                  block_status = 1;//之后的所有节点都是不可点击的
                                              }
                                              else {
                                                  if(t!=undefined)
                                                  {}
                                                  else
                                                  {
                                                    $(this).addClass("block_click");
                                                    $(this).find("a:eq(0)").attr("style", "color:gray");
                                                  }
                                              }
                                          }
                                          else {
                                          }
                                      });
                                  }
                              }
                                  //非子节点的二级节点，进度值大于20，做子节点遍历
                              else 
                              {
                                  $(this).find("li").each(function (index) {
                                      var t1 = $(this);
                                      var t = $(this).find("div:eq(0)")[0].children[1];
                                      if (t == undefined || parseInt(t.text) <= 20) {//找到二级节点下的进度值小于20的三级节点
                                          if (block_status == 0) {
                                              var title = $(this).find("li:eq(0) a:eq(0)").context.children[0].text;
                                              title = title.substring(0, title.length);
                                              setCookie("currentlevel", title);
                                              setCookie("currentlevelid", $(this).attr("id"));
                                              setCookie("CourseNowName", title);
                                              setCookie("CourseNow", $(this).attr("id"));
                                              if(t==undefined)
                                              {
                                                var testid=$(this).attr("id");
                                                $("#"+testid).find("div:eq(0)").attr("style","margin-left:50px;margin-top:40px");
                                                $("#"+testid).find("a:eq(0)").attr("style","padding-bottom:0");
                                                $("#"+testid).find("div:eq(0)").append('<div class="progress progress-striped active" style="width:80%"><div data-toggle="tooltip" data-placement="right" data-original-title="'+0+'%" class="progress-bar progress-bar-warning" role="progressbar" aria-valuenow="0" aria-valuemin="0" aria-valuemax="100" style="width: '+0+'%;"></div></div><a style="display:none" value="'+0+'">'+0+'</a>');
                                              }
                                              $("#currentinfo").empty();
                                              $("#currentinfo").append(title);
                                              block_status = 1;
                                          }
                                          else {
                                              $(this).addClass("block_click");
                                              $(this).find("a:eq(0)").attr("style", "color:gray");
                                          }
                                      }
                                      else {
                                      }
                                  });
                              }
                          }
                              //else的话，节点里全都灭了,注意，cookie里设置是全灭的第一个三级
                          else {
                              if (block_status == 0) {
                                  if ($(this).find("ul").length == 0) {
                                      var title = $(this).find("li:eq(0) a:eq(0)").context.children[0].text;
                                      title = title.substring(0, title.length);
                                      setCookie("currentlevel", title);
                                      setCookie("currentlevelid", $(this).attr("id"));
                                      setCookie("CourseNowName", title);
                                      setCookie("CourseNow", $(this).attr("id"));

                                        var testid=$(this).attr("id");
                                        $("#"+testid).find("div:eq(0)").attr("style","margin-left:35px;margin-top:40px");
                                        $("#"+testid).find("a:eq(0)").attr("style","padding-bottom:0");
                                        $("#"+testid).find("div:eq(0)").append('<div class="progress progress-striped active" style="width:80%"><div data-toggle="tooltip" data-placement="right" data-original-title="'+0+'%" class="progress-bar progress-bar-blue" role="progressbar" aria-valuenow="0" aria-valuemin="0" aria-valuemax="100" style="width: '+0+'%;"></div></div><a style="display:none" value="'+0+'">'+0+'</a>');
                                        
                                      $("#currentinfo").empty();
                                      $("#currentinfo").append(title);
                                      block_status = 1;
                                  }
                                  else {
                                      $(this).find("li").each(function () {
                                          if (block_status == 0) {
                                              var title = $(this).context.children[0].text;
                                              title = title.substring(0, title.length);
                                              setCookie("currentlevel", title);
                                              setCookie("currentlevelid", $(this).attr("id"));
                                              setCookie("CourseNowName", title);
                                              setCookie("CourseNow", $(this).attr("id"));
                                              if(t==undefined)
                                              {
                                                var testid=$(this).attr("id");
                                                $("#"+testid).find("div:eq(0)").attr("style","margin-left:50px;margin-top:40px");
                                                $("#"+testid).find("a:eq(0)").attr("style","padding-bottom:0");
                                                $("#"+testid).find("div:eq(0)").append('<div class="progress progress-striped active" style="width:80%"><div data-toggle="tooltip" data-placement="right" data-original-title="'+0+'%" class="progress-bar progress-bar-warning" role="progressbar" aria-valuenow="0" aria-valuemin="0" aria-valuemax="100" style="width: '+0+'%;"></div></div><a style="display:none" value="'+0+'">'+0+'</a>');
                                              }
                                              $("#currentinfo").empty();
                                              $("#currentinfo").append(title);
                                              block_status = 1;
                                          }
                                          else {
                                              $(this).addClass("block_click");
                                              $(this).find("a:eq(0)").attr("style", "color:gray");
                                          }
                                      });
                                  }
                                 
                              }
                              else {
                                  $(this).addClass("block_click");
                                  $(this).find("a:eq(0)").attr("style", "color:gray");
                                  $(this).find("li").each(function (index) {
                                    $(this).addClass("block_click");
                                    $(this).find("a:eq(0)").attr("style", "color:gray");
                                  });
                              }
                          }
                     
                  });
    }

    function levelnum(id){
      var test = $("#"+id+" a");
      if(test.length>0)
      {
         var value=$("#"+id+" a")[0].innerText;
         var num=value.split(".").length;
         if(num==2){
            $("#"+id).find("div:eq(0)").attr("style","margin-left:35px;margin-top:40px");
            $("#"+id).find("a:eq(0)").attr("style","padding-bottom:0px");
            color="info";
         }
         if(num==3){
            $("#"+id).find("div:eq(0)").attr("style","margin-left:50px;margin-top:40px");
            $("#"+id).find("a:eq(0)").attr("style","padding-bottom:0px");
            color="warning";
         }
      }
      return
    }


    var testid=getCookie("currentlevelid");
    setcurrentlevelid(testid);



});