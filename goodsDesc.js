define(['jquery', "jquery-cookie"], function($){
    function download(){
        var product_id = valueByName(location.search, "product_id");
        $.ajax({
			method: "get",
			url: "../data/goodsList.json",
			success: function(arr){
				//找到当前页面要加载的详情页面数据
                var goodsMsg = arr.find(item => item.data.product_id == product_id);
                
				console.log(goodsMsg);
				var node = $(` <!-- 导航 -->
                <div id = 'J_proHeader' data-name="${goodsMsg.data.name}">
                    <!-- xm-product-box nav-bar-hidden nav_fix 设置浮动到顶部 -->
                    <div class = 'xm-product-box'>
                        <div id = 'J_headNav' class = 'nav-bar'>
                            <div class = 'container J_navSwitch'>
                                <h2 class = 'J_proName'>${goodsMsg.data.name}</h2>
                                <div class = 'con'>
                                    <div class = 'left'>
                                        <span class = 'separator'>|</span>
                                        <a href="${goodsMsg.data.tab_info.left[0].url}">${goodsMsg.data.tab_info.left[0].title}</a>
                                    </div>
                                    <div class = 'right'>
                                        <a href="${goodsMsg.data.tab_info.right[0].url}">${goodsMsg.data.tab_info.right[0].title}</a>
                                        <span class = 'separator'>|</span>
                                        <a href="${goodsMsg.data.tab_info.right[1].url}">${goodsMsg.data.tab_info.right[1].title}</a>
                                        <span class = 'separator'>|</span>
                                        <a href="${goodsMsg.data.tab_info.right[2].url}">${goodsMsg.data.tab_info.right[2].title}</a>
                                        <span class = 'separator'>|</span>
                                        <a href="#">用户评价</a>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="xm-product-box nav-bar-hidden" id="J_fixNarBar"> 
                        <div class="nav-bar"> 
							<div class = 'container J_navSwitch'>
							<h2 class = 'J_proName'>${goodsMsg.data.name}</h2>
							<div class = 'con'>
								<div class = 'left'>
									<span class = 'separator'>|</span>
									<a href="${goodsMsg.data.tab_info.left[0].url}">${goodsMsg.data.tab_info.left[0].title}</a>
								</div>
								<div class = 'right'>
									<a href="${goodsMsg.data.tab_info.right[0].url}">${goodsMsg.data.tab_info.right[0].title}</a>
									<span class = 'separator'>|</span>
									<a href="${goodsMsg.data.tab_info.right[1].url}">${goodsMsg.data.tab_info.right[1].title}</a>
									<span class = 'separator'>|</span>
									<a href="${goodsMsg.data.tab_info.right[2].url}">${goodsMsg.data.tab_info.right[2].title}</a>
									<span class = 'separator'>|</span>
									<a href="#">用户评价</a>
								</div>
							</div>
						</div>
                        </div>
                    </div>
                </div>
                <!-- 商品详情数据展示 -->
                <div class = 'xm-buyBox' id = 'J_buyBox'>
                    <div class = 'box clearfix'>
                        <div class = 'login-notic J_notic'>
                            <!-- 未登陆提示 -->
                            <div class = 'container'>
                                为方便您购买，请提前登录 
                                <a href="#" class="J_proLogin">立即登陆</a>
                                <a href="#" class = 'iconfont J_proLoginClose'></a>
                            </div>
                        </div>
                        <!-- 商品数据 -->
                        <div class = 'pro-choose-main container clearfix'>
                            <div class = 'pro-view span10'>
                                <!-- 左侧轮播图 未加载数据显示的图片 -->
                                <div class = 'J_imgload imgload hide'></div>
                                <!-- img-con fix 设置图片浮动 -->
                                <div id = 'J_img' class = 'img-con' style = ' margin: 0px;'>
                                    <div class = 'ui-wrapper' style="max-width: 100%;">
                                        <!-- 图片 -->
                                        <div class = 'ui-viewport' style="width: 100%; overflow: hidden; position: relative; height: 560px;">
                                            <div id = 'J_sliderView' class = 'sliderWrap' style = 'width: auto; position: relative;'>
                                                
                                            </div>
                                        </div>
                                        <!-- 显示第几张图片的下标 -->
                                        <div class = 'ui-controls ui-has-pager ui-has-controls-direction'>
                                            <div class = 'ui-pager ui-default-pager'>
                                                
                                            </div>
                                            <div class = 'ui-controls-direction'>
                                                <a class="ui-prev" href="">上一张</a>
                                                <a class="ui-next" href="">下一张</a>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div class = 'pro-info span10'>
                                <!-- 标题 -->
                                <h1 class = 'pro-title J_proName'>
                                    <span class = 'img'></span>
                                    <span class = 'name'>${goodsMsg.data.name}</span>
                                </h1>
                                <!-- 提示 -->
								<p class = 'sale-desc' id = 'J_desc'>
                                    ${goodsMsg.data.product_desc_ext}
                                </p>
                                <div class = 'loading J_load hide'>
                                    <div class = 'loader'></div>
                                </div>
                                <!-- 主体 -->
                                <div class = 'J_main'>
                                    <!-- 经营主题 -->
                                    <p class = 'aftersale-company' id = 'J_aftersaleCompany' type = '1' desc = 'null'>小米自营</p>
                                    <!-- 价格 -->
                                    <div class = 'pro-price J_proPrice'>
                                        <span class = 'price'>
											${goodsMsg.data.list[0].price_max}元
                                            <del>${goodsMsg.data.list[0].market_price_max}元</del>
                                        </span>
                                        <span class="seckill-notic hide"><em></em><i></i><span><span></span></span></span>
                                    </div>
                                    <!-- 预售提示倒计时 -->
                                    <div class="pro-time hide J_proOrder">
                                        <div class = 'pro-time-head'>
                                            <span class = 'pro-order-count J_orderCount hide'></span>
                                            <span class = 'time J_orderTime'></span>
                                        </div>
                                        <div class = 'pro-time-con'>
                                            <span class = 'pro-time-price'>
                                                ￥
                                                <em class = 'J_orderPrice'></em>
                                            </span>
                                        </div>
                                    </div>
                                    <!-- 常态秒杀倒计时 -->
                                    <div class = 'pro-time J_proSeckill'>
                                        <div class="pro-time-head">
                                            <em class="seckill-icon"></em> 
                                            <i>秒杀</i>
                                            <span class="time J_seckillTime">距结束 03 时 24 分 46 秒</span>
                                       </div>
                                        <div class = 'pro-time-con'>
                                            <span class = 'pro-time-price'>
                                                ￥
                                                <em class = 'J_seckillPrice'>${goodsMsg.data.list[0].price_min}</em>
                                                <del>
                                                    ￥
                                                    <em class = 'J_seckillPriceDel'>${goodsMsg.data.list[0].market_price_min}</em>
                                                </del>
                                            </span>
                                        </div>
                                    </div>
                                    <!-- 分仓地址 -->
                                    <div class = 'J_addressWrap address-wrap'>
                                        <div class = 'user-default-address' id = 'J_userDefaultAddress'>
                                            <i class = 'iconfont iconfont-location'></i>
                                            <div>
                                                <div class = 'address-info'>
                                                    <span class="item">山东</span>
                                                    <span class="item">济南市</span>
                                                    <span class="item">历下区</span>
                                                    <span class="item">趵突泉街道</span>
                                                </div>
                                                <span class="switch-choose-regions" id="J_switchChooseRegions"> 修改 </span>
                                            </div>
                                            <div class="product-status active" id="J_productStatus"> 
                                                <span class="sale">有现货</span> 
                                            </div>
                                        </div>
                                    </div>
                                     <!-- 小米意外保护 -->
                                        <div class = 'pro-choose list-choose list-choose-small J_service' data-index="0" data-multi="false">
                                            <div class = 'step-title'>
                                                选择小米提供的意外保护
                                                <a href="https://api.jr.mi.com/activity/accidentIns/?from=mishop&insuranceSku=24802" target="_blank">了解意外保护 ></a> 
                                            </div>
                                            <ul>
                                                <li class="clearfix" data-oriprice="179.00" data-price="179.00" data-name="意外保障服务" data-bargain_id="2192100029" data-id="2192100029" data-source="common"> 
                                                    <i class="iconfont icon-checkbox">
                                                        <em>√</em>
                                                    </i> 
                                                    <img src="//i1.mifile.cn/a1/pms_1558617128.57794462.png?width=50&amp;height=50"> 
                                                    <div> 
                                                        <span class="name"> 意外保障服务 </span> 
                                                        <p class="desc">手机意外碎屏/进水/碾压等损坏</p>  
                                                        <p class="agreement"> 
                                                            <i class="iconfont icon-checkbox J_read">
                                                                <em>√</em>
                                                            </i> 我已阅读  
                                                            <a href="https://api.jr.mi.com/insurance/document/phone_accidentIns.html?insuranceSku=24802&amp;couponFrom=rule" target="_blank">
                                                                服务条款
                                                                <span>|</span>
                                                            </a>  
                                                            <a href="https://api.jr.mi.com/insurance/document/phone_accidentIns.html?insuranceSku=24802&amp;couponFrom=question" target="_blank">
                                                                常见问题
                                                            </a>  
                                                        </p>  
                                                        <span class="price">  179元  </span> 
                                                    </div> 
                                                </li>
                                                <li class="clearfix" data-oriprice="99.00" data-price="99.00" data-name="碎屏保障服务" data-bargain_id="2192100030" data-id="2192100030" data-source="common"> 
                                                    <i class="iconfont icon-checkbox">
                                                        <em>√</em>
                                                    </i> 
                                                    <img src="//i1.mifile.cn/a1/pms_1558617981.89919461.png?width=50&amp;height=50"> 
                                                    <div> 
                                                        <span class="name"> 碎屏保障服务    </span> 
                                                        <p class="desc">手机意外碎屏</p>  
                                                        <p class="agreement"> 
                                                            <i class="iconfont icon-checkbox J_read"><em>√</em></i> 
                                                            我已阅读  
                                                            <a href="https://api.jr.mi.com/insurance/document/phone_accidentIns.html?insuranceSku=24803&amp;couponFrom=rule" target="_blank">
                                                                服务条款
                                                                <span>|</span>
                                                            </a>  
                                                            <a href="https://api.jr.mi.com/insurance/document/phone_accidentIns.html?insuranceSku=24803&amp;couponFrom=question" target="_blank">
                                                                常见问题
                                                            </a>  
                                                        </p>  
                                                        <span class="price">  99元  </span> 
                                                    </div> 
                                                </li>
                                            </ul>
                                        </div>
                                        <!-- 小米延长保修 -->
                                        <div class="pro-choose list-choose list-choose-small J_service" data-index="1" data-multi="false">
                                            <div class = 'step-title'>
                                                选择小米提供的延长保修 
                                                <a href="https://api.jr.mi.com/activity/accidentIns/?from=mishop&insuranceSku=24806" target="_blank">了解延长保修 ></a>
                                            </div>
                                            <ul>
                                                <li class="clearfix" data-oriprice="49.00" data-price="34.3" data-name="延长保修服务" data-bargain_id="2192100031" data-id="2192100031" data-source="common"> 
                                                    <i class="iconfont icon-checkbox"><em>√</em></i> 
                                                    <img src="//i1.mifile.cn/a1/pms_1558618318.5427285.png?width=50&amp;height=50"> 
                                                    <div> <span class="name"> 延长保修服务  <em>已省14.7元</em>  </span> 
                                                        <p class="desc">厂保延一年，性能故障免费维修</p>  
                                                        <p class="agreement"> 
                                                            <i class="iconfont icon-checkbox J_read"><em>√</em></i> 
                                                            我已阅读  
                                                            <a href="https://api.jr.mi.com/insurance/document/phone_accidentIns.html?insuranceSku=24806&amp;couponFrom=rule" target="_blank">服务条款<span>|</span></a>  
                                                            <a href="https://api.jr.mi.com/insurance/document/phone_accidentIns.html?insuranceSku=24806&amp;couponFrom=question" target="_blank">常见问题</a>  
                                                        </p>  
                                                        <span class="price">  34.3元 
                                                            <del>49元</del>  
                                                        </span> 
                                                    </div> 
                                                </li>
                                                
                                            </ul>
                                        </div>
                                        <!-- 已经选择产品 -->
                                        <div class = 'pro-list' id = 'J_proList'>
                                            <ul>
                                                <li>${goodsMsg.data.name} ${goodsMsg.data.list[0].value}  
                                                    <del>${goodsMsg.data.list[0].market_price_min}元</del>  
                                                    <span>  ${goodsMsg.data.list[0].price_min} 元 </span> 
                                                </li>
                                                <li class="totlePrice" data-name="seckill">   
                                                    秒杀价   ：${goodsMsg.data.list[0].price_min}元  
                                                </li>
                                            </ul>
                                        </div>
                                        <!-- 购买按钮 -->
                                        <ul class="btn-wrap clearfix" id="J_buyBtnBox">     
                                            <li>  
                                                <a href="javascript:void(0);" data-href="//order.mi.com/site/login?redirectUrl=https://item.mi.com/product/10000150.html" class="btn btn-primary btn-biglarge J_login" id = "${goodsMsg.data.product_id}">加入购物车</a>  
                                            </li>   
                                            <li>  
                                                <a href="goodsCar.html" class="btn-gray btn-like btn-biglarge"> 
                                                    <i class="iconfont default"></i>查看购物车 
                                                </a>  
                                            </li>
                                        </ul>
                                        <div class="pro-policy" id="J_policy">   
                                            <a href="javascript:void(0);" title="">  
                                                <span class="support">  
                                                    <i class="iconfont"></i>  
                                                    <em>小米自营</em> 
                                                </span> 
                                            </a>   
                                            <a href="javascript:void(0);" title="由小米发货">  
                                                <span class="support">  
                                                    <i class="iconfont"></i>  
                                                    <em>小米发货</em> 
                                                </span> 
                                            </a>   
                                            <a href="javascript:void(0);" title=""> 
                                                <span class="support">  
                                                    <i class="iconfont"></i>  
                                                    <em>7天无理由退货</em> 
                                                </span> 
                                            </a>   
                                            <a href="javascript:void(0);" title="由小米发货的商品，单笔满150元免运费;
                                            由第三方商家发货的商品，免运费;
                                            特殊商品需要单独收取运费，具体以实际结算金额为准；优惠券等不能抵扣运费金额;如需无理由退货，用户将承担该商品的退货物流费用;">  
                                                <span class="support">  
                                                    <i class="iconfont"></i>  
                                                    <em>运费说明</em> 
                                                </span> 
                                            </a> 
                                        </div>

                                    </div>
                                </div>
                            </div>
                        </div>
                        <!-- 预售流程 -->
                        <div class="pro-infomation" id="J_proInfo">
                                <div class="pro-book-flow container hide" id="J_bookFlow">
                                    <span class="book-name">预售流程</span>
                                    <ul class="clearfix">
                                        <li class="item01">
                                            <span class="icon icon1"></span>
                                            <div>
                                                <span class="item-name">1.支付预付款</span>
                                                <span class="item-infor"></span>
                                            </div>
                                        </li>
                                        <li class="item02">
                                            <span class="icon icon2"></span>
                                            <div>
                                                <span class="item-name">2.支付尾款 <em>（在我的订单完成）</em></span>
                                                <span class="item-infor"></span>
                                            </div>
                                        </li>
                                        <li class="item03">
                                            <span class="icon icon3"></span>
                                            <div>
                                                <span class="item-name">3.商品发货</span>
                                                <span class="item-infor"></span>
                                            </div>
                                        </li>
                                    </ul>
                                </div>
                                <div class="infor-con" id="J_infoBox"> 
                                    <div class="section-box active "> 
                                        <div class="section-info  is-visible preload">   
                                            <h3 class="container">价格说明   </h3>   
                                            <div class="con" style="height: 189px;">  
                                                <div data-src="//cdn.cnbj1.fds.api.mi-img.com/mi-mall/a482afa34053b1b32ece1023475af7fb.jpeg" class="pic J_img done" style="background: url(&quot;//cdn.cnbj1.fds.api.mi-img.com/mi-mall/a482afa34053b1b32ece1023475af7fb.jpeg&quot;) 50% 0px / auto 100% no-repeat;">
                                                </div> 
                                            </div>           
                                        </div> 
                                    </div> 
                                </div>
                            </div>
                    </div>
                </div>`)
                node.insertAfter("#app div .header");
                
                //找到详情页加载的图片
                var aImages = goodsMsg.data.list[0].list[0].goods.images;
                if(aImages.length == 1){
                    $(`<img class = 'slider done' 
                        src="${aImages[0]}" 
                        style="float: none; list-style: none; position: absolute; width: 560px; z-index: 0; display: block;" 
                        alt=""/>`).appendTo(node.find("#J_sliderView"));

                    //隐藏上一张、下一张操作(两个按钮)
                    node.find(".ui-controls").hide();
                }else{
                    for(var i = 0; i < aImages.length; i++){
                        $(`<div class = 'ui-pager-item'>
                                <a href="#" data-slide-index = "0" class = 'ui-pager-link ${i == 0 ? "active" : ""}'>1</a>
                           </div>`).appendTo(node.find(".ui-pager"));

                        $(`<img class = 'slider done' 
                        src="${aImages[i]}" 
                        style="float: none; list-style: none; position: absolute; width: 560px; z-index: 0; display: ${i == 0 ? "block" : "none"};" 
                        alt=""/>`).appendTo(node.find("#J_sliderView"));
                    }
                }
                
                                               
				
			},
			error: function(msg){
				console.log(msg);
			}
		})
    }

    //name1=value1&name2=value2&name3=value3 
	function valueByName(search, name){
		var start = search.indexOf(name + "=");
		if(start == -1){
			return null;
		}else{
			var end = search.indexOf("&", start);
			if(end == -1){
				end = search.length;
			}
			//提取出想要键值对 name=value
			var str = search.substring(start, end);
			var arr = str.split("=");
			return arr[1];
		}
	}
	
	//悬浮在顶部
	function fixTop(){
		$(window).scroll(function(){
			// document.title = $(window).scrollTop();
			//当当前的滚动高度为205的时候，顶部悬浮
			if($(window).scrollTop() >= 205 && $(window).scrollTop() <= 915){
				$("#J_fixNarBar").addClass("nav_fix");
				$("#J_img").addClass("fix");
				$("#J_img").css("marginTop", 0)

			}else if($(window).scrollTop() >= 915){
				$("#J_img").removeClass("fix");
				$("#J_img").css("marginTop", 725)
			}else{
				$("#J_fixNarBar").removeClass("nav_fix");
				$("#J_img").removeClass("fix");
				$("#J_img").css("marginTop", 0);
			}

			//1376
		})
    }
    
    //添加轮播效果
    function banner(){
        //点击下方的小块，切换图片
        var iNow = 0; //默认让第一张图片显示
        var aBtns = null; //获取所有的小块
        var aImgs = null; //获取所有的图片
        var timer = null;  

        //点击按钮完成切换 事件委托完成
        $("#app div").on("click", ".ui-controls .ui-pager .ui-pager-item a", function(){
            //注意这里获取的是当前点击的a标签父节点的下标
            iNow = $(this).parent().index();
            tab();
            
            //阻止冒泡和默认行为
            return false;
        })

        //自动进行切换
        timer = setInterval(function(){
            iNow++;
            tab();
        }, 3000);

        //添加鼠标移入移出
        $("#app div").on("mouseenter", "#J_img", function(){
            clearInterval(timer);
        })

        $("#app div").on("mouseleave", "#J_img", function(){
            timer = setInterval(function(){
                iNow++;
                tab();
            }, 3000);
        })

        //添加上一张和下一张画面切换
        $("#app div").on("click", ".ui-prev,.ui-next", function(){
            if(this.className == 'ui-prev'){
                iNow--;
                if(iNow == -1){
                    iNow = 4;
                }
            }else{
                iNow++;
            }
            tab();
            return false;
        })


        

        //切换方法
        function tab(){
            if(!aImgs){
                aImgs = $("#J_img").find("img");
            }
            if(!aBtns){
                aBtns = $("#J_img").find(".ui-controls .ui-pager .ui-pager-item a");
            }

            if(aImgs.size() == 1){
                clearInterval(timer);
            }else{
                if(iNow == 5){
                    iNow = 0;
                }
                
                aBtns.removeClass("active").eq(iNow).addClass('active');
                aImgs.hide().eq(iNow).show();
            }
            
        }

    }

    //添加点击加入购物车操作
    $("#app div").on("click", ".J_login", function(){
        //获取当前的商品列表
        var id = this.id;
        //进行购物车操作   goods键，json格式字符串为值
        //1、先去判断cookie中是否存在商品信息  假设键名叫goods
        var first = $.cookie("goods") == null ? true : false;

        //2、如果是第一次添加
        if(first){
            //直接创建cookie
            var cookieStr = `[{"id":${id},"num":1}]`;
            $.cookie("goods", cookieStr, {
                expires: 7
            })
        }else{
            var same = false; //假设没有添加过
            //3、如果不是第一次添加，判断之前是否添加过
            var cookieStr = $.cookie("goods");
            //取出来本身就是json格式字符串需要解析
            var cookieArr = JSON.parse(cookieStr);
            for(var i = 0; i < cookieArr.length; i++){
                if(cookieArr[i].id == id){
                    //如果之前添加过，数量+1
                    cookieArr[i].num++;
                    same = true;
                    break;
                }
            }

            if(!same){
                //如果没有添加过，新增商品数据
                var obj = {id:id, num:1};
                cookieArr.push(obj);
            }

            //最后，存回cookie中
            $.cookie("goods", JSON.stringify(cookieArr), {
                expires: 7
            })
        }

        alert($.cookie("goods"));
    })

    
    return {
		download: download,
        fixTop: fixTop,
        banner: banner
    }
})