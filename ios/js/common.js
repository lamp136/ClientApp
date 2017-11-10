/**
 * 字符串去空格
 * @param  {string} str 待处理字符串
 * @return {string}
 */
var _trimStr = function(str) {
    return str.replace(/(^\s*)|(\s*$)/g, "");
}

/**
 * 获取验证码
 * @param  {object} data      获取验证码手机号
 * @param  {object} btn       点击按钮
 * @param  {object} codeInput 验证码输入框
 */
var _verifyCode = function(data,btn,url){
	var count = 60;
	 mui.ajax(url,{
        data:data,
        dataType:'json',//服务器返回json格式数据
        type:'post',//HTTP请求类型 
        async: false,
        timeout:5000,//超时时间设置为5秒；                
        success:function(result){     
        	if (result) {
	            if (result['code'] == 1) {
	                var resend = setInterval(function() {
	                    count--;
	                    if (count > 0) {
	                        btn.innerHTML = count + "秒后重新获取";	                        
	                    } else {
	                        clearInterval(resend);
	                        btn.innerHTML = "获取验证码";
	                        btn.removeAttribute('disabled');
	                    }
	                }, 1000);
	                btn.setAttribute('disabled', true);
	            } else {
	                mui.toast('获取验证码失败',{ duration:'short', type:'div' }) 
	            }
	        }
        },
        error:function(xhr,type,errorThrown){
            //异常处理；
            mui.toast('连接超时!请重试',{ duration:'long', type:'div' }); 
            console.log(type); 
        }
    });   
}   

/**
 * 验证账号唯一性
 * @param  {string} data    手机号
 */
var _checkUser = function(mobile){
	var url = serverUrl+"/ClientApp/checkUser";
	var flag = false;
	 mui.ajax(url,{
        data:{
        	mobile:mobile
        },
        dataType:'json',//服务器返回json格式数据
        type:'post',//HTTP请求类型 
        async: false,
        timeout:5000,//超时时间设置为5秒；                
        success:function(result){ 
        	if(result.flag == 0){       		
			    flag = true;
        	}
        },
        error:function(xhr,type,errorThrown){
            //异常处理；
            mui.toast('连接超时!请重试',{ duration:'long', type:'div' }); 
            console.log(type); 
        }      
    });
    return flag;
}

/**
 * 省市联动
 */
var _province = function(){
	var url = serverUrl+"/ClientApp/getProvince";
	var provinceData = '';
	 mui.ajax(url,{
        data:{
        	
        },
        dataType:'json',//服务器返回json格式数据
        type:'post',//HTTP请求类型 
        async: false,
        timeout:5000,//超时时间设置为5秒；                
        success:function(result){ 
        	if(result){       		
			    provinceData = result;
        	}
        },
        error:function(xhr,type,errorThrown){
            //异常处理；
            mui.toast('连接超时!请重试',{ duration:'long', type:'div' }); 
            console.log(type); 
        }      
    });
    return provinceData;
}

/**
 * 获取站点信息
 */
var _serviceSite = function(){
	var url = serverUrl+"/ClientApp/serviceSite";
	var siteData = '';
	 mui.ajax(url,{
        data:{
        	
        },
        dataType:'json',//服务器返回json格式数据
        type:'post',//HTTP请求类型 
        async: false,
        timeout:5000,//超时时间设置为5秒；                
        success:function(result){ 
        	if(result){       		
			    siteData = result;
        	}else{
        		mui.toast('连接超时!请重试',{ duration:'long', type:'div' });
        	}
        },
        error:function(xhr,type,errorThrown){
            //异常处理；
            mui.toast('连接超时!请重试',{ duration:'long', type:'div' }); 
            console.log(type); 
        }      
    });
    return siteData;
}
