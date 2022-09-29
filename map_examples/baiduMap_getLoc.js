function waploading(act, text) {
  if ($.trim(act) == "") act = "show";
  if ($.trim(text) == "") text = "正在加载中...";
  if (act == "show") {
    if ($(".page-loading-container").length == 0) {
      $("body").append(
        [
          '<div class="page-loading-container">',
          '<div><div class="loadEffect">',
          "<span></span>",
          "<span></span>",
          "<span></span>",
          "<span></span>",
          "<span></span>",
          "<span></span>",
          "<span></span>",
          "<span></span>",
          '</div><span id="loading_text">' + text + "</span></div>",
          "</div>",
        ].join("")
      );
    } else {
      $("#loading_text").html(text);
      $(".page-loading-container").show();
    }
  } else {
    $(".page-loading-container").hide();
  }
}

function wapalert(msg, ok, callback) {
  msg = msg ? msg : "操作成功!";
  ok = ok ? ok : "确定";
  if ($("#wapat").length <= 0) {
    $("body").append(
      '<div id="wapat"><div class="wapat-inner">' +
        '<div class="wapat-title"></div><div class="wapat-btn-box">' +
        '<div class="wapat-btn wapat-btn-ok"></div></div></div></div>'
    );
  }
  $(".wapat-title").html(msg);
  $(".wapat-btn-ok")
    .html(ok)
    .off("click")
    .on("click", function () {
      $("#wapat").hide();
      callback ? callback() : "";
    });
  $("#wapat").show();
}

class getLocation {
  constructor() {
    this.info = {};
  }
  mapInit() {
    var self = this;
    waploading("", "获取地理位置中（Getting the location）...");
    self.loadBMap("0hYGiH3Ob5ZhV0eWzrGVXCD3bEdBCi6L", function () {
      if (navigator.geolocation) {
        try {
          var geolocation = new BMap.Geolocation();
          var gc = new BMap.Geocoder();
          console.log("start");
          geolocation.getCurrentPosition(
            function (p) {
              // 创建地理编码实例
              if (this.getStatus() == BMAP_STATUS_SUCCESS) {
                if (p.accuracy == null) {
                  //用户点击拒绝
                  waploading("hide");
                  wapalert("没有权限");
                  self.info.geo_api_info = JSON.stringify({
                    status: 1,
                    result: "用户点击拒绝",
                  });
                  return false;
                } else {
                  //用户点击允许
                  if (p != null) {
                    var pt = p.point; //经纬度

                    $.ajax({
                      url: "https://api.map.baidu.com/reverse_geocoding/v3/?output=json&coordtype=wgs84ll",
                      dataType: "jsonp",
                      type: "GET",
                      data: {
                        ak: "0hYGiH3Ob5ZhV0eWzrGVXCD3bEdBCi6L",
                        location: pt.lat + "," + pt.lng,
                      },
                      success: function (res) {
                        waploading("hide");
                        if (res.status == 0) {
                          var country = res.result.addressComponent.country; //国家
                          var city = res.result.addressComponent.city; //城市

                          if ($.trim(country) === "" && $.trim(city) === "") {
                            wapalert(
                              "获取位置信息失败（Failed to get the location）"
                            );
                            self.info.geo_api_info = JSON.stringify({
                              status: 1,
                              result: "获取位置信息失败",
                            });
                          } else {
                            self.info.geo_api_info = JSON.stringify(res.result);
                            self.info.country = country;
                            self.info.city = city;
                            self.info.address = res.result.formatted_address;
                            $("input").val(self.info.address);
                          }
                        } else {
                          wapalert(
                            "获取位置信息失败（Failed to get the location）"
                          );
                        }
                      },
                      error: function () {
                        waploading("hide");
                        wapalert(
                          "获取位置信息失败（Failed to get the location）"
                        );
                        self.info.geo_api_info = JSON.stringify({
                          status: 1,
                          result: "获取位置信息失败",
                        });
                      },
                    });
                  } else {
                    waploading("hide");
                    wapalert("获取位置信息失败（Failed to get the location）");
                    self.info.geo_api_info = JSON.stringify({
                      status: 1,
                      result: "未获取到经纬度",
                    });
                  }
                }
              } else if (this.getStatus() == BMAP_STATUS_CITY_LIST) {
                waploading("hide");
                wapalert("暂时获取不到位置信息（Cannot get the location）");
                self.info.geo_api_info = JSON.stringify({
                  status: 1,
                  result: "获取不到位置信息",
                });
              } else if (this.getStatus() == BMAP_STATUS_UNKNOWN_LOCATION) {
                waploading("hide");
                wapalert("位置结果未知（Location result unknown）");
                self.info.geo_api_info = JSON.stringify({
                  status: 1,
                  result: "位置结果未知",
                });
              } else if (this.getStatus() == BMAP_STATUS_UNKNOWN_ROUTE) {
                waploading("hide");
                wapalert("导航结果未知（Navigation result unknown）");
                self.info.geo_api_info = JSON.stringify({
                  status: 1,
                  result: "导航结果未知",
                });
              } else if (this.getStatus() == BMAP_STATUS_INVALID_KEY) {
                waploading("hide");
                wapalert("非法密钥（Invalid key）");
                self.info.geo_api_info = JSON.stringify({
                  status: 1,
                  result: "非法密钥",
                });
              } else if (this.getStatus() == BMAP_STATUS_INVALID_REQUEST) {
                waploading("hide");
                wapalert("非法请求（Invalid request）");
                self.info.geo_api_info = JSON.stringify({
                  status: 1,
                  result: "非法请求",
                });
              } else if (this.getStatus() == BMAP_STATUS_PERMISSION_DENIED) {
                waploading("hide");
                wapalert("没有权限（Permission denied）");
                self.info.geo_api_info = JSON.stringify({
                  status: 1,
                  result: "没有权限",
                });
              } else if (this.getStatus() == BMAP_STATUS_SERVICE_UNAVAILABLE) {
                waploading("hide");
                wapalert("服务不可用（Service unavailable）");
                self.info.geo_api_info = JSON.stringify({
                  status: 1,
                  result: "服务不可用",
                });
              } else if (this.getStatus() == BMAP_STATUS_TIMEOUT) {
                waploading("hide");
                wapalert("获取定位超时（Timeout to get the location）");
                self.info.geo_api_info = JSON.stringify({
                  status: 1,
                  result: "获取定位超时",
                });
              }
            },
            function (err) {
              waploading("hide");
              wapalert("无法获取位置信息（Failed to get the location）");
              self.info.geo_api_info = JSON.stringify({
                status: 1,
                result: "无法获取位置信息",
                err: err,
              });
            },
            {
              enableHighAcuracy: true,
              maximumAge: 0,
            }
          );
        } catch (err) {
          console.log(err);
          waploading("hide");
          wapalert("无法获取当前地理位置（Fail to get your geolocation）");
          self.info.geo_api_info = JSON.stringify({
            status: 1,
            result: "无法获取当前地理位置",
          });
        }
      } else {
        waploading("hide");
        wapalert(
          "浏览器不支持定位（This browser does not support location services）"
        );
        self.info.geo_api_info = JSON.stringify({
          status: 1,
          result: "浏览器不支持定位",
        });
        return false;
      }
    });
  }

  loadBMap(ak, callback) {
    if (typeof BMap !== "undefined") {
      callback();
      return true;
    }
    var script = document.createElement("script");
    script.type = "text/javascript";
    script.src =
      "https://api.map.baidu.com/api?v=3.0&ak=" +
      ak +
      "&callback=onBMapCallback";
    document.head.appendChild(script);
    script.onload = function () {
      var tmp = function () {
        if (
          typeof BMap !== "undefined" &&
          typeof BMap.Geolocation != "undefined"
        ) {
          callback();
        } else {
          setTimeout(tmp, 2000);
        }
      };
      tmp();
    };
  }
}

var myMap = new getLocation();

$("input").click(() => {
  myMap.mapInit();
});
