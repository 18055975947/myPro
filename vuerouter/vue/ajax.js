var comm = {
	Stringify : function(json) {		//传参进行改变
		var str = "";
		for (var i in json) {
			str += i + "=" + json[i] + "&";
		}
		return str.slice(0,-1);
	},
	ajax : function(type,url,params,callback,errback) {
		if (typeof params == "function") {		//不穿参数也不写参数位传给callback
			callback = params;
			params = "";
		}
		var xhr = "";
		if (XMLHttpRequest) {
			xhr = new XMLHttpRequest();
		} else {
			xhr = new ActiveXObject("Microsoft.XMLHTTP");
		}
		if ((type == "GET")||(type == "get")) {
			type = type.toLocaleLowerCase();
			xhr.open(type,url + "?" + this.Stringify(params),true);
			xhr.send();
		} else if ((type == "POST") || (type == "post")) {
			type = type.toLocaleLowerCase();
			xhr.open(type,url,true);
			xhr.setRequestHeader("Content-Type" , "application/x-www-form-urlencoded")
			xhr.send(this.Stringify(params));
		}
		xhr.onreadystatechange = function() {
			if (xhr.readyState == 4) {
				if (xhr.status == 200) {
					var data = xhr.responseText;
					// console.log(data);
					if (typeof xhr.responseText == "string" && (data != "")) {
						var str = xhr.responseText.slice(0,8);
						if (str == "callback") {    //  返回值是callback([])类型的
							eval(data);
							(function callback(data) {
								return data
							})()
						} else {
							callback(JSON.parse(xhr.responseText));//返回值是string类型的
						}
						
					} else {
						callback(xhr.responseText);		//返回其他类型的
					}
				} else if(errback) {
					errback(xhr.responseText);
				}
			}
		}
	}
}