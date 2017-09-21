// JavaScript source code
function client() {
    return {
        h: document.documentElement.clientHeight,
        w: document.documentElement.clientWidth,
    }
}
//��ȡid
function id(obj) {
    return document.getElementById(obj);
}
//�¼����
function addEvent(obj, Evt, fn) {
    if (obj.addEventListener) {
        obj.addEventListener(Evt, fn, false);
    } else {
        obj.attachEvent("on" + Evt, function () {
            fn.call(obj);
        })
    }
}
//���class
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
//�Ƴ�class
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
//��ȡ����ֵ
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
				alert('������,Err��' + xhr.status);
			}
		}
		
	}
}