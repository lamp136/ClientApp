var windows = [],
    page = 1,
    selectDatas = [];
mapInit();

function mapInit() {
    map = new BMap.Map("Bmap"); // 创建地图实例
    map.addControl(new BMap.NavigationControl({
        type: BMAP_NAVIGATION_CONTROL_LARGE
    })); //添加地图类型控件
    map.enableScrollWheelZoom(true); //开启鼠标滚轮缩放
    _storeMapData(stores);
}

function _storeMapData(data) {
    var points = [],
        s = '',
        minPrice = '<span><strong>----</strong></span>',
        limit = 6;
    var datas = data.slice((page - 1) * limit, (limit * page));
    $.each(datas, function(key, val) {
        console.log(val.city_id);
        var imageSrc = prefix + val['image'];
        if (val['min_price'] != '0.00') {
            minPrice = '<span>￥<strong>' + val['min_price'] + '</strong></span>万起';
        }
        s += '<li id="' + val['id'] + '" class="mui-clearfix"><a href="/cemetery/details/' + val['id'] + '.html"><img width="109px" height="59px" class="mui-pull-left" src="' + imageSrc + '"/></a><div lng="' + val['longitude'] + '" lat="' + val['latitude'] + '" data-id="' + val['id'] + '" class="mui-media-body cemetery_text right-space"><h5>' + val['name'] + '</h5><p>参考价' + minPrice + '</p></div></li>';
        var point = new BMap.Point(val['longitude'], val['latitude']);
        _label(point, val);
        points.push(point);
    });

    $('.store_list').append(s);
    var view = map.getViewport(points),
        level = view.zoom, // 缩放级别
        zoomCenter = view.center; // 中心位置
    map.centerAndZoom(zoomCenter, level);
}

$('.load_more').click(function() {
    page++;
    if(selectDatas != ''){
        _storeMapData(selectDatas);
    }else{
        _storeMapData(stores);
    }
});

function _label(pos, info) {
    var icon = new BMap.Icon("/public/static/home/images/site.png", new BMap.Size(30, 30)),
        marker = new BMap.Marker(pos, { icon: icon }), // 创建标注
        sContent = "<a style='width:200px;' target='_blank' href='/cemetery/details/" + info['id'] + ".html'><h4 style='margin:0 0 5px 0;padding:0.2em 0'>" + info['name'] + "</h4><img style='float:right;margin:4px' id='imgDemo' src='" + prefix + info['image'] + "' title='" + info['name'] + "'/><p style='margin:0;line-height:1.5;font-size:13px;text-indent:2em'>" + info['address'] + "</p></div></a>";
    var infoWindow = new BMap.InfoWindow(sContent);
    infoWindow.id = info.id;
    windows.push(infoWindow);
    marker.addEventListener('click', function() {
        mui('.funeral_box').scroll({ indicators: false }).scrollTo(0, 0);
        var top = $('.header').height() + $('#Bmap').height(),
            site = $('#' + info.id).offset().top,
            loc = site - top;
        mui('.funeral_box').scroll({ indicators: false }).scrollTo(0, -loc);
        map.openInfoWindow(infoWindow,
            pos
        );
    });
    setTimeout(function() {
        map.panTo(info.longitude, info.latitude);
    }, 500);
    map.addOverlay(marker);
}

function _hideBg(ele){
    var c = $('.menu_down');
    c.toggle();
    if(c.is(':hidden')){
        $('.menu_bg').hide();
        ele.removeClass('mui-icon-arrowup').addClass('mui-icon-arrowdown').css('color','#242323');
    }else{
        $('.menu_bg').show();
        ele.removeClass('mui-icon-arrowdown').addClass('mui-icon-arrowup').css('color','#fff');
    }
}

$(document).on('click', '.store_list .cemetery_text', function() {
    var that = $(this),
        id = that.data('id'),
        lng = that.attr('lng'),
        lat = that.attr('lat'),
        poi = new BMap.Point(lng, lat);
    $.each(windows, function(k, v) {
        if (id == v.id) {
            map.openInfoWindow(v,
                poi
            );
        }
    });
});

$('.select_city a').click(function(){
    _hideBg($('.city_down_btn span i'));
    page = 1;
    $('.store_list').empty();
    var city = $(this).attr('city'),
        datas = [];
    if(city != 0){
        $.each(stores,function(x,y){
            if(city == y.city_id){
                datas.push(y);
            }
        });
        selectDatas = datas;
        _storeMapData(datas);
    }else{
        _storeMapData(stores);
    }
});