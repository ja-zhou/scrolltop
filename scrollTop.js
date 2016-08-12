//利用焦点进行纵向滚动的例子
//周屹涵（20160810）zhouyihansky@163.com

//使用方法：需要设定ul为position:absolute;top:0;
//重新New一个实例传入对应参数
//例如:
// new scrollTop({

//         "view" : $('.viewheight'),//视口对象  
//         "oul" : $('#j_play'),//滚动ul对象
//         "olis":$('#j_play li'),//li对象
//         "_a": $('#j_play a'),//a标签
//         "pleyer" : $('#video'),//播放视频对象
//     });


//html形式：视口元素>ul>li>a



;(function($,win){
    function scrollTop(G){
        this._init(G);
    };

//原形上面添加_init方法
    $.extend(scrollTop.prototype,{
         _init:function(G){
            var self = this;
            self.G= {
                "view" : "",//视口对象  
                "oul" : "", //滚动ul对象
                "olis":"" ,//li对象
                "_a": "",//a标签
                "pleyer" : "",//播放视频对象
         };
        $.extend(true, self.G, G||{});

                window.onload = function(){
                    var n = Math.floor(G.view.outerWidth()/G.olis.outerWidth(true))
                    G._a.eq(0).focus();
                    G.oul[0].style.height = Math.ceil(G.olis.length/n)*liHight+( G.viewheight-liHight)+'px';//计算ul高度
                    var liHight = G.olis.outerHeight(true);
                    var viewheight = G.view.outerHeight();

                    //keydown事件
                    G._a.on('keydown',function(event){

                        var index = $(this).parents('li').index();      //获得li的索引值
                        var _index = Math.floor(index+1);
                        var keys=event.keyCode; //键值
                        var len = $(this).parents('ul').find('li').length;//获得li的数量
                        var ldfa = len - n;

                        if( keys == 40 && index< len-n){//下键滚动
                            var m = Math.ceil(_index/n)*liHight ;
                            var _this =Math.floor( index+n) ;
                            var next = G._a.eq(_this);
                            next.focusWithoutScrolling(G.view);
                            var sl = -m+'px';
                            $(this).parents('ul').css("top", sl);
                            event.preventDefault(); 
                            return false;   
                        };
                        if( keys == 40 && index>=ldfa && index<len ){//最后几项按下键焦点到最后一个上面
                            if(Math.ceil(_index/n)!=Math.ceil(len/n)){
                                var m = Math.ceil(_index/n)*liHight ;
                                var _last = G._a.eq(len-1);
                                _last.focusWithoutScrolling(G.view);
                                var sl = -m+'px';
                                $(this).parents('ul').css("top", sl);
                                event.preventDefault(); 
                                return false;
                            }else{
                                event.preventDefault(); 
                                return false;                       
                                };
                        };
                        if( keys == 38 && _index>n){        //上键滚动          
                            var _this = Math.floor(index-n) ;               
                            var next = G._a.eq(_this);
                            var m;
                            if (_index%n==0){
                                m = (Math.floor(_index/n)-1)*liHight;//与每排层列数量相等取摸为零时
                            }else{
                                m = Math.floor(_index/n)*liHight;
                            }
                                                        
                            next.focusWithoutScrolling(G.view);
                            var sl;
                            if(m==0 ){
                                sl = 0;//最上面一排处理
                            }else{
                                sl = liHight-m+'px';
                            };
                            
                            $(this).parents('ul').css("top", sl);   
                            event.preventDefault(); 
                            return false;   
                        };
                        if( keys == 39 && _index%n==0 ){        //按右键换行         
                            var _this = Math.floor(index+1) ;               
                            var next = G._a.eq(_this);
                            var m =Math.floor(_index/n)*liHight;
                            next.focusWithoutScrolling(G.view);
                            var sl = -m+'px';
                            $(this).parents('ul').css("top", sl);
                            event.preventDefault(); 
                            return false;                       
                        };

                    });

                    //点击播放

                    G._a.each(function(event) {                   
                        $(this).click(function(event){                      
                            var $href=$(this).attr('title');
                            $(this).focus();
                            G.pleyer.show();
                            G.pleyer.css('-webkit-transform','scale(1)').attr('src',$href);                   
                            G.pleyer[0].play();                       
                            event.preventDefault(); 
                            return false;                       
                        });
                    });


                $.fn.focusWithoutScrolling = function(el) {//注册工具函数，防止切换焦点时滚动视口
                        var x = el.scrollLeft(), y = el.scrollTop();
                        this.focus();
                        el.scrollTop(y).scrollLeft(x);
                        return this;
                    };

                };
            }
         

        });//原型init结尾
    
    win.scrollTop = scrollTop;
})(jQuery,window);