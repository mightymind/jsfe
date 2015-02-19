/*
JS-часть фреймворка ForEach
Версия 0.5a
Автор Mightymind
URL http://azbn.ru/js/jsfe/jsFE.js
Создание 2013/09/25
Изменение 2015/02/19 08:25
*/
var jsFE={

/* --- Конфигурация ---*/
config:{
	api_modules_url:'//azbn.ru/js/jsfe/jsFE.api_modules.js'
	},

/* --- Инициализация настроек ---*/
init:function(params){ // app_key,api_modules
	this.api.azbn.config.app_key=params.app_key;
	if(params.api_modules>0) {
		this.f.include(this.config.api_modules_url);
		}
	},

/* --- Локальное хранилище ---*/
ls:{
	set:function(id,value) {localStorage.setItem(id,value);},
	get:function(id) {return localStorage.getItem(id);},
	remove:function(id) {localStorage.removeItem(id);},
	clear:function() {localStorage.clear();},
	obj2s:function(id,obj2save) {this.set(id,JSON.stringify(obj2save));},
	s2obj:function(id) {return JSON.parse(this.get(id));}
	},

/* --- Хранилище сессии ---*/
ss:{
	set:function(id,value) {sessionStorage.setItem(id,value);},
	get:function(id) {return sessionStorage.getItem(id);},
	remove:function(id) {sessionStorage.removeItem(id);},
	clear:function() {sessionStorage.clear();},
	obj2s:function(id,obj2save) {this.set(id,JSON.stringify(obj2save));},
	s2obj:function(id) {return JSON.parse(this.get(id));}
	},

/* --- Геопозиционирование ---*/
geo:{
	geolocation:false,
	error:{code:0,text:''},
	position:{latitude:0,longitude:0},
	geo_pos:0,
	_lat:function() {
		return jsFE.ss.get('jsfe.geo.latitude');
		},
	_long:function() {
		return jsFE.ss.get('jsfe.geo.longitude');
		},
	search:function(params,fnc) {
		if (navigator.geolocation) {
			window.jsfe_geo_callback=fnc;
			
			var savePos=function(position) {
				jsFE.ss.set('jsfe.geo.latitude',position.coords.latitude);
				jsFE.ss.set('jsfe.geo.longitude',position.coords.longitude);
				jsFE.ss.set('jsfe.geo.geolocation',1);
				jsFE.ss.set('jsfe.geo.error_code',0);
				jsFE.ss.set('jsfe.geo.error_text','Нет ошибок');
				window.jsfe_geo_callback();
				};
				
			var saveErr=function(error) {
				jsFE.ss.set('jsfe.geo.latitude',0);
				jsFE.ss.set('jsfe.geo.longitude',0);
				jsFE.ss.set('jsfe.geo.geolocation',0);
				var errors = {1: 'Пользователь не разрешает определение месторасположения',2: 'Перебои с сетью или нет связи со спутником',3: 'На вычисление координат пользователя уходит слишком много времени'};
				jsFE.ss.set('jsfe.geo.error_code',error.code);
				jsFE.ss.set('jsfe.geo.error_text',errors[error.code]);
				};		
			
			this.geo_pos=navigator.geolocation.watchPosition( // navigator.geolocation.getCurrentPosition
				savePos, // функция вывода координат
				saveErr, // функция обрабатывающая ошибки
				{enableHighAccuracy:true,timeout:Infinity,maximumAge:60000}
				);
			} else {
				jsFE.ss.set('jsfe.geo.latitude',0);
				jsFE.ss.set('jsfe.geo.longitude',0);
				jsFE.ss.set('jsfe.geo.geolocation',0);
				jsFE.ss.set('jsfe.geo.error_code',-1);
				jsFE.ss.set('jsfe.geo.error_text','Функция геопозиционирования не поддерживается в браузере');
				}
		},
	clear:function() {
		navigator.geolocation.clearWatch(this.geo_pos);
		this.geo_pos=0;
		}
	},

/* --- Функции ---*/
f:{
	byTag:function(tag) {return document.getElementsByTagName(tag);},
	byId:function(id) {return document.getElementById(id);},
	include:function(url){
		var inc;
		//void(inc.setAttribute('class', 'included-script'));
		void(inc=document.body.appendChild(document.createElement('script')));
		void(inc.language='javascript');void(inc.type='text/javascript');void(inc.src=url);
		},
	script2head:function(url){
		var head = document.getElementsByTagName('head')[0];
		if (!head) {return;} else {var script=document.createElement('script');script.type='text/javascript';script.src=url;head.appendChild(script);}
		},
	nl2br:function(str) {return str.replace(/([^>])\n/g, '$1<br/>');},
	tpl:function(str,tpls){var _str='';for(var key in tpls) {_str=str.replace(key, tpls[key]);}return _str;},
	strip_tags:function(str){return str.replace(/<\/?[^>]+>/gi, '');},
	obj2param:function(obj){var param_str='';for(var key in obj) {param_str=param_str+'&'+key+'='+obj[key];}return param_str;}
	},

/* --- APIs ---*/
api:{
	// azbn.ru
	azbn:{
		config:{url:'//azbn.ru/api/call/jsonp/',app_key:'public'},
		resp:{},
		call:function(params,fnc){
			this._callback=fnc;
			jsFE.f.include(this.config.url+'?app_key='+this.config.app_key+'&callback=jsFE.api.azbn.callback'+jsFE.f.obj2param(params));
			},
		callback:function(data){this.resp=data;this._callback();},
		_callback:function(){}
		}
	}
}