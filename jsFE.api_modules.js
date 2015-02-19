/*
JS-часть фреймворка ForEach
API-модули
Автор Mightymind
URL //azbn.ru/js/jsfe/jsFE.api_modules.js
*/

// ru.wikipedia.org
jsFE.api.wikipedia={
	config:{url:'//ru.wikipedia.org/w/api.php',format:'json'},
	resp:{},
	call:function(params,fnc){
		this._callback=fnc;
		jsFE.f.include(this.config.url+'?format='+this.config.format+'&callback=jsFE.api.wikipedia.callback'+jsFE.f.obj2param(params));
		},
	callback:function(data){this.resp=data;this._callback();},
	_callback:function(){}
	};


// yandex.ru
jsFE.api.suggest_yandex={
	config:{
		url:'//suggest.yandex.ru/suggest-ya.cgi/',
		format:'json'
		},
	resp:{},
	call:function(params,fnc){
		window.jQuery17201719547926913947_1380715915785=fnc;
		jsFE.f.include(this.config.url+'?v=4&fact=1&wiz=TrWth&uil=ru&callback=jQuery17201719547926913947_1380715915785&&pos=7&yu=960718521380717844&srv=morda_ru&lr=10&_=1380721597914'+jsFE.f.obj2param(params));
		}
	};


// map.yandex.ru
jsFE.api.suggest_yamaps={
	config:{
		url:'//suggest-maps.yandex.ru/suggest-geo',
		format:'json'
		},
	resp:{},
	call:function(params,fnc){
		window.jQuery17201719547926913947_1380715915785=fnc;
		jsFE.f.include(this.config.url+'?callback=jQuery17201719547926913947_1380715915785&_=1302005670080&lang=ru-RU&search_type=all&spn=2.399139%2C0.624969&fullpath=1&v=5&highlight=1&sep=1'+jsFE.f.obj2param(params));
		}
	};