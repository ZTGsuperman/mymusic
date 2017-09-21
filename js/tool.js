// JavaScript source code
function client() {
    return {
        h: document.documentElement.clientHeight,
        w: document.documentElement.clientWidth,
    }
}
//获取id
function id(obj) {
    return document.getElementById(obj);
}
//事件添加
function addEvent(obj, Evt, fn) {
    if (obj.addEventListener) {
        obj.addEventListener(Evt, fn, false);
    } else {
        obj.attachEvent("on" + Evt, function () {
            fn.call(obj);
        })
    }
}
//添加class
function addClass(obj, className) {
    var allClass = obj.className.split(" ")
    if (!obj.className) {
        obj.className = className;
    }
    for (var i = 0; i < allClass.length; i++) {
        if (allClass[i] == className) return;
        obj.className += " " + className;
    }
}
//移除class
function removeClass(obj, className) {
    var allClass = obj.className.split(" ")
    if (!obj.className) { return; }
    for (var i = 0; i < allClass.length; i++) {
        if (allClass[i] == className) {
            allClass.splice(i, 1);
            obj.className = allClass.join(' ');
            break;
        }
    }
}
//获取属性值
function getStyle(obj, arr) {
    return obj.currentStyle ? obj.currentStyle[arr] : getComputedStyle(obj)[arr];
}









function ajax(method, url, data, success) {
	var xhr = null;
	try {
		xhr = new XMLHttpRequest();
	} catch (e) {
		xhr = new ActiveXObject('Microsoft.XMLHTTP');
	}
	
	if (method == 'get' && data) {
		url += '?' + data;
	}
	
	xhr.open(method,url,true);
	if (method == 'get') {
		xhr.send();
	} else {
		xhr.setRequestHeader('content-type', 'application/x-www-form-urlencoded');
		xhr.send(data);
	}
	
	xhr.onreadystatechange = function() {
		
		if ( xhr.readyState == 4 ) {
			if ( xhr.status == 200 ) {
				success && success(xhr.responseText);
			} else {
				alert('出错了,Err：' + xhr.status);
			}
		}
		
	}
}