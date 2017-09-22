

var mv = {};
mv.app = {};
mv.tool = {};


window.onload = function () {
    var shade = document.getElementById('shade');
    mv.tool.shade()
  
    mv.app.musicList();
    mv.app.main();

}

mv.app.main=function () {
    var prog = document.querySelector('.prog-rec');   //获取进度条
    var moveDot = prog.getElementsByTagName('a')[1];  //进度条的点
    var clip = prog.querySelector('.clip');        //已播放的区域
    var btnOff = document.querySelectorAll("#btnOff");   //暂停或播放按钮
    var myMusic = document.getElementById('myMusic'); //音乐链接标签
    var endTime = document.querySelector(".endTime"); // 音乐总时间
    var starTime = document.querySelector(".startTime"); //音乐已播放时间

    var musicVoice = document.querySelector(".songWord")
    var voiceRec = musicVoice.querySelector('.voice-rec');
    var voiceClip = voiceRec.querySelector('.clip');
    var voiceLogo = musicVoice.querySelector('#voiceLogo');
    var voiceDot = voiceRec.querySelector('.move-dot');

    var mFace = document.querySelector(".music-face");   //播放界面
    var goBack = mFace.querySelector(".goBack");

    var musicW = document.querySelector('.music_list')   //歌曲列表
    var footer = document.getElementsByTagName('footer')[0];
    var musicImg = footer.querySelector('.musicImg')
    var musicName = footer.querySelector('.musicName')
    var footerAut = footer.querySelector('.footer_aut')
    var point = document.querySelector('.point');

    var proC = clip.offsetHeight;           //进度条的宽度
    var vioC = voiceRec.offsetHeight;
  
    var timer = null;
    //暂停按钮事件
    for (var i = 0; i < btnOff.length; i++) {
        btnOff[i].addEventListener("touchstart", startSong)
    }
 
    function startSong() {

        if (myMusic.paused) {
            myMusic.play();
            for (var i = 0; i < btnOff.length; i++) {
                btnOff[i].classList.remove('fa-play');
                btnOff[i].classList.add('fa-pause');
            }
            timer = setInterval(getStartTime, 1000);
        } else {
            myMusic.pause();
            for (var i = 0; i < btnOff.length; i++) {
                btnOff[i].classList.remove('fa-pause')
                btnOff[i].classList.add('fa-play');
            }
           clearInterval(timer);
        }
          
    }

    //歌曲切换
    Changebtn()
    var sIndex = 0;
    function Changebtn() {
        var oPrev = document.querySelector('#prev');
        var oNext = document.querySelector('#next');
                                      //这里的变量有问题，是全局变量，不好，带改进(想办法用原型)
        addEvent(oPrev, "touchstart", function () {
            sIndex--;
            console.log(sIndex)
             changeMusic(' ', sIndex);
        })
        addEvent(oNext, "touchstart", function () {
            sIndex++;
             changeMusic(' ', sIndex)
        })
    }
       
    //改变border的颜色
    borderColor(0)
    function borderColor(index) {
        oLi = musicW.getElementsByTagName('li');
        
        for (var i = 0; i< oLi.length; i++) {
            oLi[i].style.borderColor = 'transparent transparent #ccc transparent'
        }
        oLi[index].style.borderColor = 'transparent transparent #ccc #28abe1'
    }

    //改变链接
    function changeMusic(name, index) {
        var num = null;
      //  console.log(index)
        if (index != ' ') {
            num = index;
        }
        if (name != ' ') {
            for (var j = 0; j < mList.length; j++) {
                if (mList[j].name == name) {
                    num = j;
                }
            }
        }
       
        if (num < 0) {
            num = mList.length-1;
        }else if(num>mList.length-1){
            num = 0;
        }
       
        var src = "music/" + mList[num].name + ".mp3";
      
        myMusic.src = src;
        startSong();
        getWord(mList[num].word);
      changMusicName(mList[num].name, mList[num].title, mList[num].singer);

       borderColor(num)
    }
   
    //对歌结束时间的设置
    function getEndTime() { 
       //console.log(myMusic.duration);
        endTime.innerHTML = changTime(myMusic.duration);
    }
    function getStartTime() {
        getEndTime()
        if (myMusic.ended) {         //当播放完时，清空定时器，并把按钮变为暂停
            clearInterval(timer);
            for (var i = 0; i < btnOff.length; i++) {
                btnOff[i].classList.remove('fa-pause')
                btnOff[i].classList.add('fa-play');
            }
                sIndex++;            //自动播放下一曲
                changeMusic(' ', sIndex);
        }
        starTime.innerHTML = changTime(myMusic.currentTime);
        var scale = (myMusic.currentTime / myMusic.duration).toFixed(3);
        moveDot.style.left = scale * prog.offsetWidth+ 'px';
        clip.style.clip = "rect(0px," + moveDot.offsetLeft + "px,"+proC+"px ,0px)";
    }
    function changTime(iNum) {
        iNum = parseInt(iNum);
        var iM = getZero(Math.floor(iNum / 60));
        var iS = getZero(Math.floor(iNum % 60));
        return iM + ':' + iS;
    }
    //若是个位数则在前面补零
    function getZero(num) {
        if (num <= 9) {
            return '0' + num;
        } else {
            return '' + num;
        }
    }


    //调节音量
    setVieo()
    function setVieo() {
        drag(voiceDot, "voice");
        addEvent(voiceLogo, "touchstart", function (ev) {
            if (myMusic.muted) {                         //设置静音切换
                addClass(voiceLogo, "fa-volume-up");
                removeClass(voiceLogo, "fa fa-volume-off");
                myMusic.muted = false;
            } else {
                removeClass(voiceLogo, "fa-volume-up");
                addClass(voiceLogo, "fa-volume-off");
                myMusic.muted = true;
            }
            ev.stopPropagation();
        })
    }

    //调节音量
    setVieo()
    function setVieo() {
        drag(voiceDot, "voice");
        addEvent(voiceLogo, "touchstart", function (ev) {
            if (myMusic.muted) {                         //设置静音切换
                addClass(voiceLogo, "fa-volume-up");
                removeClass(voiceLogo, "fa fa-volume-off");
                myMusic.muted = false;
            } else {
                removeClass(voiceLogo, "fa-volume-up");
                addClass(voiceLogo, "fa-volume-off");
                myMusic.muted = true;
            }
            ev.stopPropagation();
        })
    }
    //获取进度条 
    getProg()
    function getProg() {
        drag(moveDot, "prog");

        addEvent(moveDot, "touchstart", function () {    //移动点的阴影
            moveDot.style.boxShadow = "0 0 1px 1px #c6c6c6"
        })
        addEvent(moveDot, "touchend", function () {
            moveDot.style.boxShadow = "0 0 0px 0px #c6c6c6"
        })
    }
   
    //对进度条和音量拖拽
    function drag(obj, arr) {
        var disX = 0;
        addEvent(obj, "touchstart", function (ev) {
                var e = ev || window.event;
                disX = e.changedTouches[0].pageX - obj.offsetLeft;

                addEvent(obj, "touchmove", function (ev) {
                        var e = ev || window.event;
                        var l = e.changedTouches[0].pageX - disX;
                        if (l < 0) {
                            l = 0;
                        } else if (l > obj.parentNode.offsetWidth) {
                            l = obj.parentNode.offsetWidth
                        }
                        obj.style.left = l + 'px';
                        var scale = (obj.offsetLeft / obj.parentNode.offsetWidth).toFixed(2);

                        if (arr && arr === "prog") {    //当拖动的是进度条时
                            myMusic.currentTime = scale * myMusic.duration;
                            myMusic.pause();
                            clip.style.clip = "rect(0px," + obj.offsetLeft + "px," + proC + "px ,0px)";
                        }
                        else if (arr && arr === "voice") {   //当拖动的是声音时 
                            voiceClip.style.clip = "rect(0px," +obj.offsetLeft + "px," + vioC + "px ,0px)";
                            myMusic.volume = scale;        //音量
                            voiceDot.style.display = "block";
                        }
                })
                addEvent(obj, "touchend", function () {
                     obj.ontouchstart = null;
                      obj.ontouchend = null;
                    if (arr && arr === "prog") {
                        if (myMusic.ended) {
                            myMusic.pause()
                        } else {
                            startSong();
                        }
                    }
                })
                ev.stopPropagation();
        })
     }

    //单击音量和进度条跳转
    schedule(voiceRec, 'voice')
    schedule(prog, 'prog')
    function schedule(obj ,arr) {
        var objW = obj.offsetWidth;
        var scale = 0;
        obj.addEventListener('touchend', function (ev) {
            var touch= ev || window.event;
            var pageX = touch.changedTouches[0].pageX

            var disX = pageX - obj.offsetLeft;

            scale = (disX / objW).toFixed(2);

            if (arr && arr === "prog") {    //当拖动的是进度条时
                myMusic.currentTime = scale * myMusic.duration;
                moveDot.style.left = disX +'px';
                clip.style.clip = "rect(0px," +disX + "px," + proC + "px ,0px)";
            }
            else if (arr && arr === "voice") {   //当拖动的是声音时 
                voiceClip.style.clip = "rect(0px," + disX + "px," + vioC + "px ,0px)";
                voiceDot.style.left = disX+'px';
                myMusic.volume = scale;        //音量

            }
        })

    }


    //获取歌词
       function getWord(word) {
               var songWord = mFace.querySelector(".songWord");
               var wordWrap = songWord.querySelector(".word-wrap")
               ajax("get", "music/word/"+word+".txt", 1, function (data) {

                   var lrc = data.split("[");
                   var html = "";
                   for (var i = 0; i < lrc.length; i++) {
                       var arr = lrc[i].split("]");
                       var times = arr[0].split(".");
                       var time = times[0].split(":");
                       var ms = time[0] * 60 + time[1] * 1;
                       if (arr[1]) {
                           html += "<p id=" + ms + ">" + arr[1] + "</p>";
                       }
                   }
                   wordWrap.innerHTML = html;
                   var oP = wordWrap.getElementsByTagName("p");
                   var opT = 0;
                   addEvent(myMusic, "timeupdate", function () {
                       var curTime = parseInt(this.currentTime);
                       if (document.getElementById(curTime)) {
                           for (var i = 0; i < oP.length; i++) {
                               oP[i].style.color = "#fff";
                           }
                           document.getElementById(curTime).style.color = "#48dada";
                           opT = document.getElementById(curTime).offsetTop;
                           css(wordWrap, "translateY",-opT+80)
                       }
                   })
                 })
           }


    //更新歌名和歌曲头像
    function changMusicName(mName,mHad,aut) {                    //更新歌名
               var faceH = mFace.querySelector(".face-header")    //播放界面的
               var author = faceH.getElementsByTagName("em")[0];
               var bName = faceH.getElementsByTagName("h3")[0];

               footerAut.innerHTML = author.innerHTML = aut;
               musicName.innerHTML = bName.innerHTML = mName;

               musicImg.src = 'music/musicTitle/' + mHad + ''
           }

    //单击列表
   
    var isClick = false;
    var isSecond = '';
    var isStart = false;
    function touchLi() {
        var oLi = musicW.getElementsByTagName('li');
        var mLength = oLi.length;
        for (var i = 0; i < mLength; i++) {
            oLi[i].addEventListener('touchstart', function (e) {
                if (isStart) {
                    var name = this.getElementsByTagName('strong')[0].innerHTML;
                    sIndex = this.index;
                    borderColor(this.index);
                    console.log(this.index+','+isSecond)
                   if (this.index === isSecond) {
                       css(musicW, 'rotateY', 90)
                       css(musicW, 'opacity', 0)
                       css(mFace, 'translateX', 0);
                       footer.style.display = 'none';
                       point.style.display = 'none';
                       setTimeout(function () {
                           musicW.style.display = 'none'
                       }, 1000)

                   }
                   if (isSecond === '' || (this.index != isSecond)) {
                       changeMusic(name, this.index);
                       isSecond = this.index;
                   }
                }
            })
           
        }
    }

    
    //滑屏
    mv.tool.myScroll({
        el:musicW,
        dir: 'y',
        end:function (arr) {
            isStart = arr;
            touchLi()
        }
    })

    goBack.addEventListener("touchstart", function () {
        musicW.style.display = 'block';
        footer.style.display = 'block';
        point.style.display = 'block';
        
        setTimeout(function () {
            css(musicW, 'rotateY', 0)
            css(musicW, 'opacity', 100)
            css(mFace, 'translateX', mFace.offsetWidth)
        }, 30)
      
    })

  
}
 

//生成歌曲列表
mv.app.musicList=function(){

    var musicList = document.querySelector('.music_list')
    var oUl = musicList.getElementsByTagName('ul')[0];

    for (var i = 0; i < mList.length; i++) {
        var li = document.createElement('li');
        li.index = i;
        var strong = document.createElement('strong');
        var span = document.createElement('span');

        strong.innerHTML = mList[i].name;
        span.innerHTML = mList[i].singer;
        addClass(strong, 'name');
        addClass(span, 'songer');

        li.appendChild(strong);
        li.appendChild(span);
        oUl.appendChild(li)
    }
   

    mv.tool.myScroll({
        el: musicList,
        dir: 'y',
    })

}

mv.tool.myScroll=function(init) {

    var swiper = init.el.children[0];
    var startPoint = {};
    var startEl = {};
    var lastPoint = {};
    var dir = init.dir;
    var max = {
        x: parseInt(css(init.el,"width") - css(swiper,"width")),
        y: parseInt(css(init.el,"height") - css(swiper,"height"))
    };

    var translate = {
        x: "translateX",
        y: "translateY"
    };
    var isMove = {
        x: false,
        y: false
    };

    var offset = {
        x: 'offsetWidth',
        y:'offsetHeight',
    }
    var isFrist = true;//记录这是第一次滑动 

    // css(swiper,"translateX",0);
    // css(swiper,"translateY",0);
    css(swiper,translate[dir],0);
    init.el.addEventListener('touchstart', function(e) {
        init.start&&init.start();
        var touch = e.changedTouches[0]

        startPoint = {
            x: Math.round(touch.pageX),
            y: Math.round(touch.pageY)
        };
        lastPoint= {
            x: startPoint.x,
            y: startPoint.y
        };
        startEl = {
            x: css(swiper,"translateX"),
            y: css(swiper,"translateY")
        };

        max = {
            x: parseInt(css(init.el,"width") - css(swiper,"width")),
            y: parseInt(css(init.el,"height") - css(swiper,"height"))
        }
        return false
    });
    init.el.addEventListener('touchmove', function (e) {
        init.move && init.move();
        var touch = e.changedTouches[0];
        var nowPoint = {
            x: Math.round(touch.pageX),
            y: Math.round(touch.pageY)
        }
        
        var dis = {
            x: nowPoint.x - startPoint.x,
            y: nowPoint.y - startPoint.y
        }
        /* 这个判断只在我手指按下时，第一次move时才会执行 */
        if(Math.abs(dis.x) - Math.abs(dis.y) > 2 && isFrist){
            isMove.x = true;
            isFrist = false;
        } else if(Math.abs(dis.y) - Math.abs(dis.x) > 2 && isFrist){
            isMove.y = true;
            isFrist = false;
        }
        var target = {};
        target[dir] = dis[dir] + startEl[dir];
        isMove[dir]&&css(swiper,translate[dir],target[dir]);
        lastPoint.x = nowPoint.x;
        lastPoint.y = nowPoint.y;
    });

    init.el.addEventListener('touchend', function (e) {
        var isStart = false;
        if (lastPoint.x == startPoint.x && lastPoint.y == startPoint.y) {
            isStart = true;
        }
        var now = css(swiper, translate[dir]);
        if(now < max[dir]){
            now =  max[dir];
        } else if(now > 0){
            now = 0;
        }
        var target = {};
        target[translate[dir]] = now;
      
        MTween({
            el: swiper,
            target:target,
            type: "easeOut",
            time: 300
        });
        isMove = {
            x: false,
            y: false
        }
        isFrist = true;
        init.end && init.end(isStart);
    });

}

mv.tool.load = function (loading,loadend) {
    var music=[];
    var num = 0;
   
    for(var i=0;i<mList.length;i++){
        music.push('music/' + mList[i].name + '.mp3');
    }

  //  var length=isAll? music.length:1

    load()
    function load() {
        var auto = new Audio();
        auto.src = music[num];
        auto.preload='none';
        auto.addEventListener('loadstart', function () {
            if (num > music.length - 1) {
                loadend && loadend();
            } else {
                load()
               
                loading && loading(num + 1, music.length)
            }
            num++;
        })
    }

}

mv.tool.shade = function () {
    var shade = document.getElementById('shade');   //提示框
    var hitW = shade.querySelector('.hitW');
    var myHit = shade.querySelector('.myHit');
    var select = shade.querySelector('#select');

  
 
    var selectW = css(select, 'width');
     css(select,'width',0)

     select.style.display = 'block';
     setTimeout(function () {
         css(select, 'width', selectW)
         css(select, 'translateX', 0)
     }, 30)

     select.addEventListener('webkitTransitionEnd', function () {
            css(myHit,'opacity',100)
     })


    //单击按钮；
     var yes = myHit.querySelector('.yes');

     var isClick = false;
     yes.addEventListener('touchstart', function () {
         addClass(yes, 'active');
         isClick = true;
         setTimeout(function () {
             clickFn()
         }, 300)
     })

    
     function clickFn() {
         if (isClick) {
             css(myHit, 'opacity',0);
             css(select, 'width', 0);
             css(select, 'opacity', 0);
           setTimeout(function(){
               select.style.display = 'none';
               myHit.style.display = 'none';
               css(shade,'opacity',0)
               mv.tool.load(loading,loadend);
           },1000)
           
         }
     }
     
     function loading(num, length) {
        
     }

     function loadend() {
         setTimeout(function () {
             shade.style.display = 'none'
         }, 500)
     }

}