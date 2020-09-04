!function(){"use strict";angular.module("csport",["ngAnimate","ngCookies","ngTouch","ngSanitize","ngMessages","ngAria","ngResource","ui.router","ui.bootstrap","angular-redactor","ui.bootstrap.datetimepicker","angularMoment","ksSwiper","ui-notification"])}(),function(){"use strict";function t(){function t(){}var a={restrict:"E",templateUrl:"app/components/navbars/outer/navbar.html",controller:t,controllerAs:"vm",bindToController:!0};return a}angular.module("csport").directive("navbarOuter",t)}(),function(){"use strict";function t(){function t(){}var a={restrict:"E",templateUrl:"app/components/navbars/inner/navbar.html",controller:t,controllerAs:"vm",bindToController:!0};return a}angular.module("csport").directive("navbarInner",t)}(),function(){"use strict";function t(){}angular.module("csport").directive("mlController",t)}(),function(){"use strict";function t(){function t(t,a){var e=this;e.posts=[],t.request("/post/top","GET").then(function(t){e.posts=t},function(t){a.debug(t)})}t.$inject=["send","$log"];var a={restrict:"E",templateUrl:"app/components/swiper/swiper.html",controller:t,controllerAs:"SS"};return a}angular.module("csport").directive("swiper",t)}(),function(){"use strict";function t(t,a,e){var n="";n+="dev"===e.env?e.dev.host+"/api":e.app.host+"/api";var o=function(e,o,s,r){if(a.debug("********Request*********"),s?a.debug("%s %s %s",e,o,s):a.debug("%s %s",e,o),o||(o="GET"),!r)return t({url:n+e,method:o,withCredentials:!0,data:s,cache:!1}).then(function(t){return a.debug("------Response-------\n%s",e,t.data),t.data});if(r){var i=new FormData;a.debug("data",s);for(var l in s)i.append(l,s[l]);return a.debug("fd",i),t({url:n+e,method:o,data:i,headers:{"Content-Type":void 0},transformRequest:angular.identity}).then(function(t){return t.data})}};return{request:o}}t.$inject=["$http","$log","config"],angular.module("csport").service("send",t)}(),function(){"use strict";angular.module("csport").filter("limitHtml",function(){return function(t,a){var e=String(t).replace(/<[^>]+>/gm,"");return e.length>a?e.substr(0,a-1):e}}).filter("timeFilter",function(){return function(t){var a=Math.floor(t/1e3),e=Math.floor(a/86400),n=Math.floor(a%86400/3600),o=Math.floor(a%86400%3600/60),s="";return e>0&&(s+=e>1?e+"d ":e+"d "),n>0&&(s+=n>1?n+"h ":n+"h "),1>e&&o>=0&&(s+=o>1?o+"m ":o+"m "),s}})}(),function(){"use strict";function t(t,a,e){var n=this;n.post={},t.request("/post/"+e.id,"GET").then(function(t){n.post=t},function(t){a.debug(t)})}t.$inject=["send","$log","$stateParams"],angular.module("csport").controller("PostController",t)}(),function(){"use strict";function t(){function t(t,a,e){var n=this;n.matches=[],t.request("/match/list","GET").then(function(t){n.matches=t,angular.forEach(n.matches,function(t,a){var o=e(),s=e(t.date);n.matches[a].timeLeft=o.diff(s)})},function(t){a.debug(t)})}t.$inject=["send","$log","moment"];var a={restrict:"E",templateUrl:"app/components/match/match.html",controller:t,controllerAs:"Mlist"};return a}angular.module("csport").directive("match",t)}(),function(){"use strict";function t(t,a,e){var n=this;n.posts=[],n.tours=[],n.popular=[],n.get=function(t){return n.posts[t].content},a.request("/post","GET").then(function(t){n.posts=t},function(t){e.debug(t)}),a.request("/tournament","GET").then(function(t){n.tours=t},function(t){e.debug(t)}),a.request("/post/popular","GET").then(function(t){n.popular=t},function(t){e.debug(t)})}t.$inject=["config","send","$log"],angular.module("csport").controller("HomeController",t)}(),function(){"use strict";function t(t,a){var e=this;"dev"===a.env?e.imagePrefix=a.dev.host+"/api/images/":e.imagePrefix=a.app.host+"/api/images/"}t.$inject=["$log","config"],angular.module("csport").controller("MainController",t)}(),function(){"use strict";function t(t,a,e){var n;n=a.$on("$stateChangeError",function(){e.go("login")}),t.debug("runBlock end")}t.$inject=["$log","$rootScope","$state"],angular.module("csport").run(t)}(),function(){"use strict";function t(t,a,e){t.state("main",{url:"/","abstract":!0,templateUrl:"app/main/main.html",controller:"MainController",controllerAs:"main"}).state("main.home",{url:"",templateUrl:"app/components/homepage/homepage.html",controller:"HomeController",controllerAs:"home"}).state("main.post",{url:"post/:id",templateUrl:"app/components/post/post.html",controller:"PostController",controllerAs:"post"}),a.otherwise("/"),e.html5Mode(!0)}t.$inject=["$stateProvider","$urlRouterProvider","$locationProvider"],angular.module("csport").config(t)}(),function(){"use strict";var t={app:{host:"http://52.34.105.69"},dev:{host:"http://localhost:8081"},env:"app"},a={userRoles:["guest","user","admin"]};angular.module("csport").constant("config",t).constant("appConfig",a)}(),function(){"use strict";function t(t,a,e){a.imageResizeable=!0,a.imageLink=!1,a.imageEditable=!1,a.visual=!0,a.buttons=["formatting","bold","italic","deleted","unorderedlist","orderedlist","outdent","indent","image","video","file","table","link","alignment","horizontalrule"],e.setOptions({delay:3e3,startTop:20,startRight:10,verticalSpacing:20,horizontalSpacing:20,positionX:"center",positionY:"top"}),t.debugEnabled(!0)}t.$inject=["$logProvider","redactorOptions","NotificationProvider"],angular.module("csport").config(t)}(),angular.module("csport").run(["$templateCache",function(t){t.put("app/main/main.html","<div class=mainwrap><navbar-outer></navbar-outer><div class=\"container bodywrap\"><div class=contentwrap><navbar-inner></navbar-inner><div ui-view></div></div></div></div><!-- <img src='/assets/images/logo.png' class='logo-image'> -->"),t.put("app/components/homepage/homepage.html",'<header class=heading><div class="row mr0 ml0"><div class="col-md-9 pl0"><swiper></swiper></div><div class="col-md-3 pr0"><match></match></div></div></header><div class="row mr0 ml0 mt20"><div class="col-md-6 content_white"><div class=starter-template ng-repeat="post in home.posts | limitTo: 5"><h2><a href=/post/{{post.id}}>{{post.title}} </a></h2><img ng-if=post.pic class=wFull src="{{ main.imagePrefix + post.pic}}"><p class=m ng-bind-html="post.content | limitHtml: 350"></p><a class="btn btn-primary yellow_button" href=/post/{{post.id}}>READMORE</a></div></div><div class=col-md-3><div class=tournament_list><h5 class=tournament_list_head>Тэмцээнүүд</h5><table><tbody><tr ng-repeat="tour in home.tours"><td style="padding-left: 0px; padding-right: 0px; margin-bottom: 5px; margin-top: 5px"><a href=/tournament/{{tour.id}}><img ng-if=tour.logo src="{{ main.imagePrefix + tour.logo}}" style="width: 100%"></a><hr class=bottom_line></td></tr></tbody></table></div></div><div class="col-md-3 pr0"><div class=content_darkgray><h5 class=content_darkgray_head>Үр дүн</h5><table class=table><tbody><tr><td><a href=/match/{{match.id}}><span class=team_name>Tournament #1</span></a></td></tr><tr><td><a href=/match/{{match.id}}><span class=team_name>Tournament #2</span></a></td></tr></tbody></table></div><div class=content_blue><h5 class=content_blue_head>Их уншсан</h5><table><tbody><tr ng-repeat="read in home.popular"><td style="font-size: 13px"><a href=/post/{{read.post.id}}><img ng-if=read.post.pic src="{{ main.imagePrefix + read.post.pic}}" style="height: 50px; float: left; margin-right: 10px"> </a>{{read.post.title}}<hr></td></tr></tbody></table></div></div></div>'),t.put("app/components/match/match.html",'<div class=content_darkgray><h5 class=content_darkgray_head>Хуваарь</h5><table class="table pl0"><tbody><tr ng-repeat="match in Mlist.matches"><td class="pl0 pr0"><a href=/match/{{match.id}}><span class=team_name>{{match.fTeam.title}}</span> <span class="vs pl5 pr5">VS </span><span class=team_name2>{{match.sTeam.title}}</span> </a><span class=status>{{ match.timeLeft | timeFilter }}</span></td></tr></tbody></table></div>'),t.put("app/components/post/post.html",'<div class="row mr0 ml0"><div class="col-md-9 content_white"><div class=starter-template><h2>{{post.post.title}}</h2><img ng-if=post.post.pic class=wFull src="{{ main.imagePrefix + post.post.pic}}"><p ng-bind-html=post.post.content></p><hr></div></div></div>'),t.put("app/components/swiper/swiper.html",'<ks-swiper-container swiper=swiper ng-if=SS.posts.length slides-per-view=1 slides-per-column=1 space-between=0 pagination-is-active=true pagination-clickable=false show-nav-buttons=false autoplay autoplaydisableoninteraction=false initial-slide=0 direction=horizontal speed=15000 override-parameters="{ \'loop\': \'true\'\n                        }"><ks-swiper-slide class=swiper-slide ng-repeat="post in SS.posts"><div ng-if=post.pic style="background-image:url( {{main.imagePrefix + post.pic}} )" class=new><div class=showcase-caption><h4><a class=Slider-Heading href=/post/{{post.id}}>{{post.title}}</a></h4><p class=Slider-Content ng-bind-html="post.content | limitHtml: 350"></p></div></div></ks-swiper-slide></ks-swiper-container>'),t.put("app/components/match/matches/matches.html",""),t.put("app/components/navbars/inner/navbar.html","<div class=\"navbar navbar-default navbar-custom2\"><div class=navbar-header><div class=\"collapse navbar-collapse\"><!-- <div class=\"navbar-header\">\n        <a class=\"navbar-brand\" style='color: #777777' href=\"#\">eSport News</a>\n      </div> --><ul class=\"nav navbar-nav\"><li class=active><a href=/ >Нүүр хуудас</a></li><li><a href=/ >Мэдээ</a></li><li><a href=/matches>Видео</a></li><li><a href=/tournaments>Тэмцээн</a></li><li><a href=/matches>Тоглолт</a></li></ul></div></div><!-- <div class=\"col-md-2 pull-right contact-link\">\n    <ul class='nav navbar-nav'>\n      <li> <a href='https://www.facebook.com/cybercsports' target=\"_blank\"> <img class='contact-icons' src='/assets/images/icons/facebook.png'> </a></li>\n      <li> <img class='contact-icons' src='/assets/images/icons/twitter.png'> </li>\n      <li> <img class='contact-icons' src='/assets/images/icons/youtube.png'> </li>\n    </ul>\n  </div> --></div>"),t.put("app/components/navbars/outer/navbar.html",'<div id=menu class="navbar navbar-default navbar-custom"><div class=navbar-header><div class="collapse navbar-collapse"><ul class="nav navbar-nav"><li><a href=/ >Home</a></li><li><a href=/category/dota>DotA2</a></li><li><a href=/category/csgo>CSGO</a></li><!-- <li><a href="#">Team MongolZ</a></li> --><!-- <li class="dropdown">\n          <a href="#" class="dropdown-toggle" data-toggle="dropdown" role="button" aria-haspopup="true" aria-expanded="false">Dropdown <span class="caret"></span></a>\n          <ul class="dropdown-menu">\n            <li><a href="#">Action</a></li>\n            <li><a href="#">Another action</a></li>\n            <li><a href="#">Something else here</a></li>\n            <li role="separator" class="divider"></li>\n            <li class="dropdown-header">Nav header</li>\n            <li><a href="#">Separated link</a></li>\n            <li><a href="#">One more separated link</a></li>\n          </ul>\n        </li> --></ul></div></div><div class="col-md-3 pull-right"><form class=navbar-form role=search><div class=input-group><input type=text class=form-control placeholder=Search name=srch-term id=srch-term><div class=input-group-btn><button class="btn btn-default search-button" type=submit><i class="glyphicon glyphicon-search"></i></button></div></div></form></div></div>')}]);
//# sourceMappingURL=../maps/scripts/app-56bc40997a.js.map