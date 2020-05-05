define(["jquery", "jquery-cookie"], function($){
    
    //加载已经加入购物车的商品
    //cookie 只存储 商品id和数量
    //实际上我们需要获得更多的商品具体信息

    //goodsCarList.json 数据源 里面是 买购物车中商品的人还买了  下面的信息

    //list.html页中的商品数据源 是goodsList.json
    
    //注意点 ajax无法同时加载两个数据源 找出加入购物车的商品数据(详情)

    //new Promise 处理两次按照顺序加载数据




    function loadCarData(){
        //清空上一次的数据
        $("#J_cartListBody .item-box").html("");


        new Promise(function(resolve,reject){
            $.ajax({
                url:"../data/goodsCarList.json",
                success:function(obj){
                    resolve(obj.data);
                },
                error:function(msg){
                    reject(msg);
                }
            }) 
        })
        .then(function(arr1){
            // console.log(arr1);
            return new Promise(function(resolve,reject){
                $.ajax({
                    url:"../data/goodsList2.json",
                    success:function(arr2){
                        //将两份数据合拼
                        var newArr=arr1.concat(arr2);
                        resolve(newArr);
                    },
                    error:function(msg){
                        reject(msg);
                    } 
                })
            })
        })
        .then(function(arr){
            // console.log(arr)
            // arr 所有商品的信息 我们需要在页面上加载购物车的数据
            // 通过已经加入购物车的商品找出这些数据那些已经被加载到购物车里了
            // 1.在购物车中将所有的数据拿到

            var cookieStr=$.cookie("goods");
            if(cookieStr){
                var cookieArr=JSON.parse(cookieStr);
                // console.log(cookieArr);

                var newArr=[];
                for(var i =0; i<cookieArr.length;i++){
                    for(var j=0; j<arr.length; j++){
                        if(cookieArr[i].id==arr[j].product_id || cookieArr[i].id ==arr[j].goodsid){
                            arr[j].num=cookieArr[i].num;
                            //设置商品的id
                            arr[j].id=arr[j].product_id ? arr[j].product_id  : arr[j].goodsid;

                            newArr.push(arr[j]);
                        }
                    }
                }

                console.log(newArr);
                //newArr 存储的都是购物车中加载商品，商品的信息,数量,id


                for(var i=0; i<newArr.length;i++){
                    var node=$(`<div class="item-table J_cartGoods" data-info="{ commodity_id:'${newArr[i].commodityid}', gettype:'buy', itemid:'2192300031_0_buy', num:'1'} ">  
                    
                    
                    <div class="item-row clearfix" id="${newArr[i].id}"> 
                        <div class="col col-check">  
                            <i class="iconfont icon-checkbox icon-checkbox-selected J_itemCheckbox" data-itemid="2192300031_0_buy" data-status="1">√</i>  
                        </div> 
                        <div class="col col-img">  
                            <a href="//item.mi.com/${newArr[i].id}.html" target="_blank"> 
                                <img alt="" src="${newArr[i].image}?thumb=1&amp;w=80&amp;h=80" width="80" height="80"> 
                            </a>  
                        </div> 
                        <div class="col col-name">  
                            <div class="tags">   
                            </div>     
                            <div class="tags">  
                            </div>   
                            <h3 class="name">  
                                <a href="//item.mi.com/${newArr[i].id}.html" target="_blank"> 
                                ${newArr[i].name}
                                </a>  
                            </h3>        
                        </div> 
                        <div class="col col-price"> 
                            ${newArr[i].price}元
                            <p class="pre-info">  </p> 
                        </div> 
                        <div class="col col-num">  
                            <div class="change-goods-num clearfix J_changeGoodsNum"> 
                                <a href="javascript:void(0)" class="J_minus">
                                    <i class="iconfont"></i>
                                </a> 
                                <input tyep="text" name="2192300031_0_buy" value="${newArr[i].num}" data-num="1" data-buylimit="20" autocomplete="off" class="goods-num J_goodsNum" "=""> 
                                <a href="javascript:void(0)" class="J_plus"><i class="iconfont"></i></a>   
                            </div>  
                        </div> 
                        <div class="col col-total"> 
                                ${(newArr[i].price *newArr[i].num).toFixed(1) }元 
                            <p class="pre-info">  </p> 
                        </div> 
                        <div class="col col-action"> 
                            <a id="${newArr[i].id}_0_buy" data-msg="确定删除吗？" href="javascript:void(0);" title="删除" class="del J_delGoods"><i class="iconfont"></i></a> 
                        </div> 
                    </div> 
            </div>`);
                    node.appendTo("#J_cartListBody .item-box");
                }

                isCheckAll();  //购物车加载页面后计算一次商品数量，价格
            }
        })
    }
    
    
    
    function download(){
        $.ajax({
            url: "../data/goodsCarList.json",
            success: function(obj){
                var arr = obj.data;
                for(var i = 0; i < arr.length; i++){
                    $(`<li class="J_xm-recommend-list span4">    
                    <dl> 
                        <dt> 
                            <a href="#"> 
                                <img src="${arr[i].image}" srcset="//i1.mifile.cn/a1/pms_1551867177.2478190!280x280.jpg  2x" alt="${arr[i].name}"> 
                            </a> 
                        </dt> 
                        <dd class="xm-recommend-name"> 
                            <a href="#"> 
                                ${arr[i].name}
                            </a> 
                        </dd> 
                        <dd class="xm-recommend-price">${arr[i].price}元</dd> 
                        <dd class="xm-recommend-tips">   ${arr[i].comments}人好评    
                            <a class="btn btn-small btn-line-primary J_xm-recommend-btn" href="#" style="display: none;" id = "${arr[i].goodsid}">加入购物车</a>  
                        </dd> 
                        <dd class="xm-recommend-notice">

                        </dd> 
                    </dl>  
                </li>
                `).appendTo($("#J_miRecommendBox .xm-recommend ul.row"))
                }
            },
            error: function(msg){
                console.log(msg);
            }
        })
    }

    function cartHover(){
        $("#J_miRecommendBox .xm-recommend ul.row").on("mouseenter", ".J_xm-recommend-list", function(){
            $(this).find(".xm-recommend-tips a").css("display", "block");
        })
        $("#J_miRecommendBox .xm-recommend ul.row").on("mouseleave", ".J_xm-recommend-list", function(){
            $(this).find(".xm-recommend-tips a").css("display", "none");
        })

        //添加加入购物车操作
        $("#J_miRecommendBox .xm-recommend ul.row").on("click", ".J_xm-recommend-list a.btn", function(){
            //获取当前的商品列表
            var id = this.id;
            //进行购物车操作   goods键，json格式字符串为值
            //1、先去判断cookie中是否存在商品信息
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



            isCheckAll();  //点击加入购物车按钮时也得重新计算商品数量，价格
            loadCarData();
            return false;
        })

        
    }



    //全选按钮(可直接找到)  单选按钮(通过事件委托) 添加点击

    function checkFunc(){
        //全选
        $("#J_cartBox .list-head .col-check").find("i").click(function(){
            //还得获取每一个商品单个选项框

            var allChecks = $("#J_cartListBody").find(".item-row .col-check").find("i");
            
            if($(this).hasClass("icon-checkbox-selected")){
                $(this).add(allChecks).removeClass("icon-checkbox-selected");
            }else{
                $(this).add(allChecks).addClass("icon-checkbox-selected");
            }

            isCheckAll();  //点击全选按钮计算商品数量，价格
        })


        //给每一个商品的复选框设置点击
        $("#J_cartListBody  ").on("click"," .item-row  .col-check  i",function(){
            
            if($(this).hasClass("icon-checkbox-selected")){
                $(this).removeClass("icon-checkbox-selected");
            }else{
                $(this).addClass("icon-checkbox-selected");
            }

            isCheckAll();  //点击单选按钮计算商品数量，价格
        })

    } 

    //判断有多少个被选中
    function isCheckAll(){
        //每一个row都是一个商品行
        var allChecks = $("#J_cartListBody").find(".item-row ");
        
        var isAll=true;  //假设是否都选中
        var total =0;  //计算总数
        var count=0; //记录被选中的数量  单选框中被选中的数量
        var totalCount=0; //记录总数

        // console.log( $("#J_cartListBody").find(".item-row"))

        allChecks.each(function(index,item){
            if(!$(item).find(" .col-check i").hasClass("icon-checkbox-selected")){
                //说明有存在单选框(有存在该商品)没有被选中
                isAll=false;
            }else{
                total +=parseFloat($(item).find(".col-price").html().trim()) * parseFloat($(this).find(".col-num input").val());
                
                //被选中的商品的数量
                count+= parseInt($(this).find(".col-num input").val());
            }


            //计算 所有 加入购物车的商品的数量 在循环之外
            totalCount += parseInt($(this).find(".col-num input").val());
        })

        //设置在页面上

        $(" #J_cartTotalNum ").html(count);
        $(" #J_selTotalNum ").html(totalCount);
        $(" #J_cartTotalPrice").html(total);

        //需要设置的地方
        /*
        isCheckAll();  //点击单选按钮计算商品数量，价格
        isCheckAll();  //点击全选按钮计算商品数量，价格
        isCheckAll();  //点击加入购物车按钮时也得重新计算商品数量，价格
        isCheckAll();  //购物车加载页面后计算一次商品数量，价格
        */


        //判断当前是否是全选
        if(isAll){
            $("#J_cartBox .list-head .col-check").find("i").addClass("icon-checkbox-selected");           
        }else{
            $("#J_cartBox .list-head .col-check").find("i").removeClass("icon-checkbox-selected");           
        }
    }

    //给页面上的商品添加删除或数量增减的操作

    function changeCars(){

        //给每一个删除按钮添加事件
        $("#J_cartListBody").on("click",".col-action .J_delGoods",function(){
            
            var id=$(this).closest(".item-row").remove().attr("id");
            // alert(id);  <div class="item-row clearfix" id="2171100009"> 


            //在cookie中删除指定的id商品

            var cookieStr=$.cookie("goods");
            var cookieArr=JSON.parse(cookieStr);
            for(var i=0;i<cookieArr.length;i++){
                if(id==cookieArr[i].id){
                    //删除数据
                    cookieArr.splice(i,1);
                    break;
                }
            }

            cookieArr.length==0 ? $.cookie("goods",null) : $.cookie("goods",JSON.stringify(cookieArr),{expires:7});
            isCheckAll();
            
            
            return false; //阻止a标签的默认行为
        })


        //给加和减法添加点击事件

        $("#J_cartListBody").on("click",".J_minus,.J_plus",function(){
            
            //找到所在商品id
            var id=$(this).closest(".item-row").attr("id");
            
            alert(id);
            //在cookie中 增加 减少 指定的id商品

            var cookieStr=$.cookie("goods");
            var cookieArr=JSON.parse(cookieStr);
            
            for(var i=0; i<cookieArr.length;i++){
                if(cookieArr[i].id ==id){

                    //说明用户找到该商品
                    if(this.className == "J_minus"){
                        cookieArr[i].num == 1 ?  cookieArr[i].num == 1 :cookieArr[i].num--; 
                    }else{
                        cookieArr[i].num++;
                        //后续可以添加一个封顶操作
                    }

                    break;
                }
            }

            //更新页面的商品  
            $(this).siblings("input").val( cookieArr[i].num);
            

            //更新页面上单个商品的价格和总价

            //取出单价 通过加减号去寻找
            var price=parseFloat($(this).closest(".col-num").siblings(".col-price").html().trim());


            //计算小计
            $(this).closest(".col-num").siblings(".col-total").html( (price * cookieArr[i].num).toFixed(1) +"元");


            //最后更改数据存储到cookie
            $.cookie("goods",JSON.stringify(cookieArr),{expires:7});
            
            
            //重新计算一次总计
            isCheckAll();
            return false; // 阻止默认行为
        })

    }

    return {
        download: download,
        cartHover: cartHover,
        loadCarData:loadCarData,
        checkFunc:checkFunc,
        changeCars:changeCars
    }
})