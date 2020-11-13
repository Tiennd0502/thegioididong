$(document).ready(function () {
  var sync1 = $("#sync1");
  var sync2 = $("#sync2");
  sync1.owlCarousel({
    nav:true,
    items:1,
    dots:false,
    autoplayHoverPause: true,
    autoplay:true,
    autoplayTimeout :5000,
    rewind:true,
    startPosition: 0,
    responsiveRefreshRate : 200,
  }).on('changed.owl.carousel', syncPosition)
  .on("click", ".owl-nav", function (el) {
    // body...
  });

  // $(".home-banner").mouseenter( function () {  
  //   $("#sync1 .owl-nav").removeClass("disabled");
  // }).mouseleave( function () {
  //   $("#sync1 .owl-nav").addClass("disabled");
  // })

  $(".home-banner").mouseenter(function () {
    $("#sync1 .owl-nav > *").css("display","block");
  }).mouseleave(function(){
    $("#sync1 .owl-nav > *").css("display","none");
  })

  $(".banner").mouseenter(function () {
    $(".banner .owl-nav > *").css("display","block");
  }).mouseleave(function(){
    $(".banner .owl-nav > *").css("display","none");
  })

  sync2.on('initialized.owl.carousel', function () {
      sync2.find(".owl-item").eq(0).addClass("synced");
    }).owlCarousel({
      nav:false,
      items:5,
      dots:false,
      slideBy: 5,
      rewind:true,
      responsiveRefreshRate : 100,
    }).on("click", ".owl-item", function(el){
      el.preventDefault();
      var number = $(this).index();
      sync1.data('owl.carousel').to(number, 300, true);

    });

  function syncPosition(el){
    var count = el.item.count - 1;
    // var current = Math.round(el.item.index - (el.item.count/2));
    //console.log("current before if: " + el.item.index);
    var current = el.item.index;
    // if(current < 0) {
    //   current = count;
    // }
    // if(current > count) {
    //   current = 0;
    // }
    // console.log("current afrer if: " + current);

    $("#sync2")
      .find(".owl-item")
      .removeClass("synced")
      .eq(current)
      .addClass("synced");

    if($("#sync2").data("owl.carousel") !== undefined){
      var lenghtOption = sync2.find('.owl-item').length;
      var listObj = sync2.find('.owl-item.active');
      var listIndex = [];
      for (var i = 0; i < 5; i++) {
        listIndex[i] = listObj.eq(i).index();
      };
      center(current,listIndex,lenghtOption);
    }
  }

  function center (number,array,end) {
    var found = false;
    var num = number;
    var listIndex = array;
    for (var i in listIndex) {
      if(num === listIndex[i] ){
        var found = true;
      }
    }
    if(found === false){
      if(num > listIndex[listIndex.length-1]){
        if(num === 7){
          sync2.data('owl.carousel').to(end - listIndex.length, 100, true);
        }else{
          sync2.data('owl.carousel').to(num - listIndex.length + 2, 100, true);
        }
        // console.log("current out ListIndex: th1");
      }else{
        if(num - 1 === -1){
          num = 0;

        }
        sync2.data('owl.carousel').to(num , 100, true);
       // console.log("current out ListIndex: th2");
      }
    } else if(num === listIndex[listIndex.length-1]){
      // console.log("current == ListIndex end");
      if (num === end - 1) {
        sync2.data('owl.carousel').to(listIndex[1] - 1 , 100, true);
      }else{
        sync2.data('owl.carousel').to(listIndex[1] , 100, true);
      };
      
    } else if(num === listIndex[0]){
      if (num === 0) {
        sync2.data('owl.carousel').to(0, 100, true);
      }else{
        sync2.data('owl.carousel').to(num-1, 100, true);
      };
      // console.log("current == ListIndex star");
    }else{
      // console.log("k làm gì cả");
    }
  }

  // carousel prd
  $("#owl-promo, .acc, .swatch, .fwatch, #owl-promo-old, #owl-laptop,.slide-product").owlCarousel({
    items:5,
    nav:true,
    dots:false,
    slideBy: 5,
    rewind:true,
    responsiveRefreshRate : 200,
  });
  // // slide owl-home
  $("#owl-home, #owl-detail").owlCarousel({
    items:1,
    nav:true,
    dots:true,
    rewind:true,
    autoplayHoverPause: true,
    autoplay:true,
    autoplayTimeout :5000,
    responsiveRefreshRate : 200,
  });

  $(".owl-watch").owlCarousel({
    items:4,
    nav:true,
    dots:false,
    rewind:true,
    responsiveRefreshRate : 200,
  });
  $(".owl-watch-couple").owlCarousel({
    items:3,
    nav:true,
    dots:false,
    rewind:true,
    responsiveRefreshRate : 200,
  });

  $("#owl-detail").mouseenter(function () {
    $("#owl-detail .owl-nav").css("display","block");
  }).mouseleave(function () {
    $("#owl-detail .owl-nav").css("display","none");
  })
  


  //  show filter-feature
  $(".js-filter-feature").click(function () {
    $(".js-content-sort").css("display","none");
    $(this).next().slideToggle(500,"linear");
  });

  //close content-feature
  $(".closefeature").click(function(){
    $(this).parent().slideUp(500,"linear");
  });
  //  show filter-feature- more
  $(".filter-feature-more").click(function(){
    $(this).css("display","none");
    $(this).next().slideToggle(500,"linear");
  });

  //mobile-sort
  $(".filter-trademark > a").click(function() {
    if ($(this).hasClass('check')) {
      $(this).removeClass("check");
      console.log("xóa");
    }else{
      $(this).addClass("check");
       console.log("thêm");
    };
  });

  $(".js-sort").click(function () {
    $(".js-content-feature").css("display","none");
    $(this).next().slideToggle(500,"linear");
  });

  $(".js-closefilter").click(function () {
    $(this).parent().slideUp(500,"linear");
  });

  //shơ nội dung khi chọn trong vipservices
  $(".js-show-vipservices").change(function () {
    var show_more = $(this).parent().parent().next();
    $(show_more).slideToggle(500,"linear");
  });
  //  chọn màu sản phẩm (detail)
  $(".js-chosse-color").change(function () {
    var option = $(this).parent().parent().parent();
    if($(this).prop("checked") == true){
      $(option).addClass("check");
    }else{
      $(option).removeClass("check");
    }
  });
  // xem thêm bài viết trong detail
  $(".js-read-more").click(function () {
    $(this).prev().css("height","auto");
    $(this).css("display","none");
  });
  // chọn màu khi đặt hàng
  $(".js-cart-color").click(function () {
    if($(this).next().css("display") == "none") {
      $(this).next().css("display","block");
    }else{
      $(this).next().css("display","none");
    }
  });
  //  thay đỏi kết quae sau khi chọn màu đặt hàng
  // $(".js-color-item").click(function () {
    
  // });
  // số lượng(quantity) khi order
  $(".js-change-quantity").click(function () {
    var current = $(this).attr("change");
    switch(current){
      case "abate" : {
        var quantity = $(this).next().text();
        if(quantity == "1"){
          $(this).next().text(1);
        }else if(quantity == "2"){
          $(this).next().text(Number(quantity) - 1);
          $(this).removeClass("active");
        }else{
          $(this).next().text(Number(quantity) - 1);
          $(this).addClass("active");
        }
        break;
      }
      case "augment" : {
        var quantity = $(this).prev().text();
        if(quantity == "5"){
          $(this).prev().text(5);
        }else{
          $(this).prev().text(Number(quantity) + 1);
          $(this).prev().prev().addClass("active");
        }
        break;
      }
    }
  });
  // add text counpon-code
  $("#js-text-code").click(function(){
    $(this).next().slideToggle(500,"linear");
  });

  // cart address
  $(".js-change-address").change(function(){
    var checked = $(this).prop("checked");
    var name = $(this).attr("data-name");
    $(".js-received-market").toggle(0,"linear");
    $(".js-delivery-address").toggle(0,"linear");
  });

  // phụ kiện show -accessorys
  $(".js-view-more-accessorys").click(function(){
    $(".js-show-accessory").show();
    $(".js-view-more-accessorys").hide();
  });

  // Laptop news-post
  $(".js-show-content").click(function () {
    $(".js-show-content").removeClass("tab-active");
    $(this).addClass("tab-active");
    var obj = $(this).attr("data-id");
    if(obj == "1"){
      $(".js-video").show();
      $(".js-news").hide();
      $(".js-tutorial").hide();
    }else if(obj == "2"){
      $(".js-news").show();
      $(".js-video").hide();
      $(".js-tutorial").hide();
    }else if(obj == "3"){
      $(".js-tutorial").show();
      $(".js-video").hide();
      $(".js-news").hide();
    }
  });

  //  tabs in fwatch
  $(".tab-watch button").click(function () {
    if (!$(this).hasClass('current')) {
      $(".tab-watch button").removeClass('current');
      $(this).addClass("current");
      $(".tab-watch + div a b").text($(this).text());
      $(".navigat ~ .contents").removeClass('current');
      $("#" + $(this).data("tab")).addClass("current");
    }
  })



  // show footer link
  var toggle = false;
  $("#showmore").click(function(){
    var links = document.getElementsByClassName("footer-link");
    var i = 0;
    if (!toggle) {
      for (i = 0; i < links.length ; i++) {
        links[i].style.display= "block";
      }
      toggle = true;
      this.innerHTML= "Ẩn bớt " + '<i class="fa fa-caret-up"></i>';
      
    }else{
       for (i = 0; i < links.length ; i++) {
        links[i].style.display= "none";
      }
      toggle = false;
      this.innerHTML= "Xem thêm "+ '<i class="fa fa-caret-down"></i>';
    }
  });

  // view-more-mobile
  $("#trademark-more").click(function(){
    $(this).remove();
    $(".name-trandemark").show();
    $(".filter-trademark a:nth-child(8)").css("border-top","1px solid #eee");
  });



  // dánh giá
  $(".show-input").click(function () {
    var nameClass = $(this).attr("class");
    if (nameClass === "show-input") {
      $(this).addClass("closebtt");
      $(this).text("Đóng lại");
      $(".input").fadeIn();
    }else{
      $(this).removeClass("closebtt");
      $(this).text("Gửi đánh giá của bạn");
      $(".input").fadeOut();
    }
  })



  $("#s1, #s2, #s3, #s4, #s5").mouseenter(function(){
    var evaluate = ["Không thích", "Tạm được", "Bình thường", "Rất tốt", "Tuyệt vời quá"];
    $(this).prevAll().addClass('voted');
    $(this).addClass('voted');
    $(this).nextAll().removeClass('voted')
    var index = $(this).index();
    $(".lsStar").removeClass("hide");
    $(".lsStar").text(evaluate[index]);   
  }).mouseleave(function () {
    var evaluate = ["Không thích", "Tạm được", "Bình thường", "Rất tốt", "Tuyệt vời quá"];
    var value = $("#hdfStar").val();
    if ( value != 0) {
      for (var i = 1; i < 6 ; i++) {
        if (i <= value) {
          $("#s"+ i).addClass("voted");
        }else{
          $("#s"+ i).removeClass("voted");
        }
      }
      $(".lsStar").text(evaluate[value - 1]);   
    }else{
      $(this).parent().children().removeClass('voted');
      $(".lsStar").addClass("hide");
    };
  }).click(function () {
    var currentIndex = $(this).index();
    $("#hdfStar").val(currentIndex + 1);
    $(".write-comment.hide").removeClass("hide");
  })

  $(".write > textarea").keyup(function() {
    var countTxt = $(this).val().length;
    if(countTxt != 0 && countTxt < 80){
      $(".ckeckWrite").text(countTxt + " ký tự (tối thiểu 80)")
    }else{
      $(".ckeckWrite").text("");
    }
  });


});