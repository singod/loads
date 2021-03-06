/**
 * 简单封装异步或同步加载资源
 */
window.loads = window.loads || function(_urls,callMyFun,async){
	var _lds = {
		js:function(_url,callback){
			var _scipt = document.createElement("script");
			_scipt.setAttribute("type", "text/javascript");
			_scipt.setAttribute("src", _url);
			document.getElementsByTagName("head")[0].appendChild(_scipt);
			if (navigator.userAgent.indexOf("IE") >= 0) {
				_scipt.onreadystatechange = function() {
					if (_scipt && (_scipt.readyState == "loaded" || _scipt.readyState == "complete")) {
						_scipt.onreadystatechange = null;
						callback ? callback() : '';
					}
				};
			} else {
				_scipt.onload = function() {
					_scipt.onload = null;
					console.log('js加载完成')
					callback ? callback() : '';
				};
			}
		},
		css:function(_url,callback){
			var _head = document.getElementsByTagName('head')[0],
				_link = document.createElement('link');
				_link.setAttribute("type", "text/css");
				_link.setAttribute("rel", "stylesheet");
				_link.setAttribute("href", _url);
				_head.appendChild(_link);
				
				_link.onload = function() {
					_head.onload = null;
					console.log('css加载完成')
					callback ? callback() : '';
				};
		}
	};
	var index = 0,asyncNum = 0;
	if(_urls && _urls.length > 0){
		load(_urls[index]);
	}
	function load(_url){
		_lds[_url.indexOf('css!') == 0 ? "css":"js"]((function(_url){
			return _url.replace(/css!|js!/g,'');
		})(_url),function(){
			if(!async){
				++index == _urls.length ? callMyFun():load(_urls[index])
			}else{
				if(++asyncNum == _urls.length){
					callMyFun();		
				}
			}
		});
		if(async && ++index != _urls.length){
			 load(_urls[index])
		}
	}
}
