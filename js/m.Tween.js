// JavaScript source code
var Tween = {
    linear: function (t, b, c, d) {
        return c * t / d + b;
    },
    easeIn: function (t, b, c, d) {
        return c * (t /= d) * t + b;
    },
    easeOut: function (t, b, c, d) {
        return -c * (t /= d) * (t - 2) + b;
    },
    easeBoth: function (t, b, c, d) {
        if ((t /= d / 2) < 1) {
            return c / 2 * t * t + b;
        }
        return -c / 2 * ((--t) * (t - 2) - 1) + b;
    },
    easeInStrong: function (t, b, c, d) {
        return c * (t /= d) * t * t * t + b;
    },
    easeOutStrong: function (t, b, c, d) {
        return -c * ((t = t / d - 1) * t * t * t - 1) + b;
    },
    easeBothStrong: function (t, b, c, d) {
        if ((t /= d / 2) < 1) {
            return c / 2 * t * t * t * t + b;
        }
        return -c / 2 * ((t -= 2) * t * t * t - 2) + b;
    },
    elasticIn: function (t, b, c, d, a, p) {
        if (t === 0) {
            return b;
        }
        if ((t /= d) == 1) {
            return b + c;
        }
        if (!p) {
            p = d * 0.3;
        }
        if (!a || a < Math.abs(c)) {
            a = c;
            var s = p / 4;
        } else {
            var s = p / (2 * Math.PI) * Math.asin(c / a);
        }
        return -(a * Math.pow(2, 10 * (t -= 1)) * Math.sin((t * d - s) * (2 * Math.PI) / p)) + b;
    },
    elasticOut: function (t, b, c, d, a, p) {
        if (t === 0) {
            return b;
        }
        if ((t /= d) == 1) {
            return b + c;
        }
        if (!p) {
            p = d * 0.3;
        }
        if (!a || a < Math.abs(c)) {
            a = c;
            var s = p / 4;
        } else {
            var s = p / (2 * Math.PI) * Math.asin(c / a);
        }
        return a * Math.pow(2, -10 * t) * Math.sin((t * d - s) * (2 * Math.PI) / p) + c + b;
    },
    elasticBoth: function (t, b, c, d, a, p) {
        if (t === 0) {
            return b;
        }
        if ((t /= d / 2) == 2) {
            return b + c;
        }
        if (!p) {
            p = d * (0.3 * 1.5);
        }
        if (!a || a < Math.abs(c)) {
            a = c;
            var s = p / 4;
        }
        else {
            var s = p / (2 * Math.PI) * Math.asin(c / a);
        }
        if (t < 1) {
            return -0.5 * (a * Math.pow(2, 10 * (t -= 1)) *
					Math.sin((t * d - s) * (2 * Math.PI) / p)) + b;
        }
        return a * Math.pow(2, -10 * (t -= 1)) *
				Math.sin((t * d - s) * (2 * Math.PI) / p) * 0.5 + c + b;
    },
    backIn: function (t, b, c, d, s) {
        if (typeof s == 'undefined') {
            s = 1.70158;
        }
        return c * (t /= d) * t * ((s + 1) * t - s) + b;
    },
    backOut: function (t, b, c, d, s) {
        if (typeof s == 'undefined') {
            s = 2.70158;  //�����ľ���
        }
        return c * ((t = t / d - 1) * t * ((s + 1) * t + s) + 1) + b;
    },
    backBoth: function (t, b, c, d, s) {
        if (typeof s == 'undefined') {
            s = 1.70158;
        }
        if ((t /= d / 2) < 1) {
            return c / 2 * (t * t * (((s *= (1.525)) + 1) * t - s)) + b;
        }
        return c / 2 * ((t -= 2) * t * (((s *= (1.525)) + 1) * t + s) + 2) + b;
    },
    bounceIn: function (t, b, c, d) {
        return c - Tween['bounceOut'](d - t, 0, c, d) + b;
    },
    bounceOut: function (t, b, c, d) {
        if ((t /= d) < (1 / 2.75)) {
            return c * (7.5625 * t * t) + b;
        } else if (t < (2 / 2.75)) {
            return c * (7.5625 * (t -= (1.5 / 2.75)) * t + 0.75) + b;
        } else if (t < (2.5 / 2.75)) {
            return c * (7.5625 * (t -= (2.25 / 2.75)) * t + 0.9375) + b;
        }
        return c * (7.5625 * (t -= (2.625 / 2.75)) * t + 0.984375) + b;
    },
    bounceBoth: function (t, b, c, d) {
        if (t < d / 2) {
            return Tween['bounceIn'](t * 2, 0, c, d) * 0.5 + b;
        }
        return Tween['bounceOut'](t * 2 - d, 0, c, d) * 0.5 + c * 0.5 + b;
    }
};

//css��ʽ�Ļ�ȡ�͸�ֵ
function css(obj, attr, val) {
    if (attr == "scale" || attr == "scaleX"          
	|| attr == "scaleY" || attr == "scaleZ"
	|| attr == "rotateX" || attr == "rotateY"
	|| attr == "rotateZ" || attr == "rotate"
	|| attr == "skewX" || attr == "skewY"
	|| attr == "translateX" || attr == "translateY"
	|| attr == "translateZ") {
        return cssTransform(obj, attr, val);            //�����õ���transform���Ծ�ת��cssTransform������
    }

    if (arguments.length == 2) {               //��ʵ��Ϊ2����û�д���val����ʾ��ȡ���Զ�Ӧ��ֵ
        var val = getComputedStyle(obj)[attr]||obj.currentStyle[attr];
        if (attr == "opacity") {
            val = Math.round(val * 100);
        }
        return parseFloat(val);
    } else {               //��ʱ���������Ե�ֵ
        if (attr == 'opacity') {
            obj.style.opacity = val / 100;
        } else {
            obj.style[attr] = val + 'px';
        }
    }
}
//�˶�����
function MTween(init) {
    var t = 0;
    var b = {};
    var c = {}
    var d = init.time / 20;             //��Ϊ����Ķ�ʱ����20ms����һ�β���1ms�����Խ�ʱ����С20ms��
    for (var s in init.target) {
        b[s] = css(init.el, s);           //��ȡÿһ��Ҫ�ı�����Եĳ�ʼֵ
        c[s] = init.target[s] - b[s];     //Ŀ��ֵ-��ʼֵ������ÿ������Ҫ�ı����
    }
    clearInterval(init.el.timer);

    init.el.timer = setInterval(function () {
        t++;
        if (t>d) {
            clearInterval(init.el.timer);
            init.callBack && init.callBack.call(init.el);  //������ɺ�Ļص�����
        } else {
            init.callIn && init.callIn.call(init.el);
            for (var s in b) {
               
                var val = Number((Tween[init.type](t, b[s], c[s], d)).toFixed(2));  //toFixed(2),������ֵС��λ����Ϊ2λ
                css(init.el, s, val);                   //��ʵʱ�ı��ֵ��Ӹ�����
            }
        }
    }, 20)
}

//����transform����
function cssTransform(obj, attr, val) {
    if (!obj.transform) {               //�����Բ����ڣ��ʹ���
        obj.transform = {};
    }
    if (typeof val == "undefined") {     //��û�д����������(������ֵ)
        if (typeof obj.transform[attr] === "undefined") {      //��transform��attr������ֵ�����ڣ��򷵻�һ��ֵ��ʾ��ʼֵ
            switch (attr) {
                case "scale":             //�������Ų����ڣ��ͷ���100(��ֹС��)����ʾ������
                case "scaleX":
                case "scaleY":
                case "scaleZ":
                    obj.transform[attr] = 100;
                    break;
                default:
                    obj.transform[attr] = 0;    //������������ֵ���ͷ���0
            }
        }
        return obj.transform[attr]
    }
    else                                  //����
    {
        obj.transform[attr] = val;             //��Ҫ���õ�ֵ����������
        var transformVal = "";
        for (var s in obj.transform) {          //����������������
            switch (s) {
                case "scale":
                case "scaleX":
                case "scaleY":
                case "scaleZ":
                    transformVal += " " + s + "(" + (obj.transform[s] / 100) + ")";
                    break;
                case "rotate":
                case "rotateX":
                case "rotateY":
                case "rotateZ":
                case "skewX":
                case "skewY":
                    transformVal += " " + s + "(" + obj.transform[s] + "deg)";
                    break;
                default:
                    transformVal += " " + s + "(" + obj.transform[s] + "px)";
            }
        }
        obj.style.WebkitTransform = obj.style.transform = transformVal;
    }
}
