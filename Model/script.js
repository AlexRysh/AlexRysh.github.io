$(document).ready(function() {
    var ctrl = false;
    $(document).keydown(function(e){
        if(ctrl && (e.keyCode == 107 || e.keyCode == 109)) {
            return false;
        }
        if(e.keyCode == 17) {
            ctrl = true;
            $(document).bind('scroll', function() {
                if(ctrl) {
                    return false;
                }
            });
        }
    })

    $(document).keyup(function(e) {
        if(e.keyCode == 17) {
            ctrl = false;
            $(document).unbind('scroll');
        }
    });
});

adaptWindow = function(container){
		if(sessionStorage.getItem('firstLoadWidth')===null){
			sessionStorage.setItem('firstLoadWidth', window.innerWidth);
			sessionStorage.setItem('firstLoadHeight	', window.innerHeight);
		}
		windowChangeSize = function(){
		var client_w=document.body.clientWidth,
			client_h=document.body.clientHeight;
		if(sessionStorage.getItem('firstLoadWidth')==window.innerWidth||Math.round(window.innerWidth*100/sessionStorage.getItem('firstLoadWidth'))!=Math.round  (window.innerHeight*100/sessionStorage.getItem('firstLoadHeight'))){
			container.width(client_w);
			container.height(client_w*0.5859375);
			sessionStorage.setItem('adaptiveWidth', client_w);}
		else{container.width(sessionStorage.getItem('adaptiveWidth'));
			container.height(sessionStorage.getItem('adaptiveWidth')*0.5859375);}}
	$(window).ready(windowChangeSize);
	$(window).resize(windowChangeSize);
}
setFalse = function(thumblers){
	for (var i = thumblers.length - 1; i >= 0; i--) {
		 thumblers[i] = false;
	}
}
switchModel = function(switchCurrentValue, switchMaxValue, startAngle, rotateAngle, jqSwitch){
    	model = this;
    	model.switchCurrentValue = switchCurrentValue;
    	model.switchMaxValue = switchMaxValue;
    	model.startAngle = startAngle;
    	model.rotateAngle = rotateAngle;
    	model.jqSwitch = jqSwitch;
}
changeSwitchPosition = function(oSwitch, checkStatusFunc, event){
		if(event.which === 1) {
			if(oSwitch.switchCurrentValue > 0){
				oSwitch.switchCurrentValue -= 1;
				oSwitch.startAngle = oSwitch.startAngle-oSwitch.rotateAngle;
				oSwitch.jqSwitch.css({
					'-moz-transform': 'rotate('+oSwitch.startAngle+'deg)',
					'-ms-transform' : 'rotate('+oSwitch.startAngle+'deg)',
					'-webkit-transform': 'rotate('+oSwitch.startAngle+'deg)',
					'-o-transform': 'rotate('+oSwitch.startAngle+'deg)',
					'transform': 'rotate('+oSwitch.startAngle+'deg)'});
			}
		}
		else if(event.which === 3){

			if(oSwitch.switchCurrentValue < oSwitch.switchMaxValue){
				oSwitch.switchCurrentValue += 1;
				oSwitch.startAngle = oSwitch.startAngle + oSwitch.rotateAngle;
				oSwitch.jqSwitch.css({
					'-moz-transform': 'rotate('+oSwitch.startAngle+'deg)',
					'-ms-transform' : 'rotate('+oSwitch.startAngle+'deg)',
					'-webkit-transform': 'rotate('+oSwitch.startAngle+'deg)',
					'-o-transform': 'rotate('+oSwitch.startAngle+'deg)',
					'transform': 'rotate('+oSwitch.startAngle+'deg)'});
		 	}
		}
		else{alert('press left or right button');}
		checkStatusFunc();
};
appThumbler = false;
function block_1(sSelector){
	var b = this;
		b.model  = $(sSelector);
		b.thumblers = b.model.find('.thumbler__off');
		b.thumblersValue=[];
		b.thumblersValue.length = b.thumblers.length;
		b.switches = b.model.find('.switch');
		b.jqSwitch_1 = b.model.find('#switch1');
		b.jqSwitch_2 = b.model.find('#switch2');
		b.arrow = b.model.find('.arrow');
		b.model.on("contextmenu", false);
		b.arrowAngle = 0;
	var lightAVM = null;
		
		adaptWindow(b.model);
 		setFalse(b.thumblersValue);
 		$(window).keypress(function(e){
    	if(e.which == 50) {
          $('.wrapper_2').css({'display': 'block'});
          $('.wrapper_3').css({'display': 'block'});
          $('.wrapper').css({'display': 'none'});
		  b.checkAll();	
		}
		else if(e.which == 49){
	      $('.wrapper').css({'display': 'block'});
	      $('.wrapper_2').css({'display': 'none'});
	  	  $('.wrapper_3').css({'display': 'none'});
	  	  b.checkAll();}
});
		b.turn = function() {
			var jqThumbler = $(this);
				b.currentThum = b.thumblers.index(jqThumbler);
				if(jqThumbler.hasClass('thumbler__off')){
					jqThumbler.addClass('thumbler__on');
					jqThumbler.removeClass('thumbler__off');
					b.thumblersValue[b.currentThum] = true;}
				else{jqThumbler.addClass('thumbler__off');
					jqThumbler.removeClass('thumbler__on');
					b.thumblersValue[b.currentThum] = false;}
			b.checkAll();
		};

		b.arrowCreator = function(sec, min, hour, secAngle, minAngle, hourAngle, moveCondition){
			arrow = this;
			arrow.sec = sec;
			arrow.min = min;
			arrow.hour = hour;
			arrow.secAngle = secAngle;
			arrow.minAngle = minAngle;
			arrow.hourAngle = hourAngle;
			arrow.moveCondition = moveCondition;
		}
		b.rotateArrows = function(arrow){
		var condition = true;
			for (var i = arrow.moveCondition.length - 1; i >= 0; i--) {
				if(b.thumblersValue[arrow.moveCondition[i]] == true && appThumbler){}else{condition = false; break;}
			};
			if (condition){
				arrow.hourAngle += 0.1/12;
				arrow.minAngle += 0.1;
				arrow.secAngle += 6;
				arrow.sec.css({
					'-moz-transform': 'rotate('+arrow.secAngle+'deg)',
					'-ms-transform' : 'rotate('+arrow.secAngle+'deg)',
					'-webkit-transform': 'rotate('+arrow.secAngle+'deg)',
					'-o-transform': 'rotate('+arrow.secAngle+'deg)',
					'transform': 'rotate('+arrow.secAngle+'deg)'});
				arrow.min.css({
					'-moz-transform': 'rotate('+arrow.minAngle+'deg)',
					'-ms-transform' : 'rotate('+arrow.minAngle+'deg)',
					'-webkit-transform': 'rotate('+arrow.minAngle+'deg)',
					'-o-transform': 'rotate('+arrow.minAngle+'deg)',
					'transform': 'rotate('+arrow.minAngle+'deg)'});
				arrow.hour.css({
					'-moz-transform': 'rotate('+arrow.hourAngle+'deg)',
					'-ms-transform' : 'rotate('+arrow.hourAngle+'deg)',
					'-webkit-transform': 'rotate('+arrow.hourAngle+'deg)',
					'-o-transform': 'rotate('+arrow.hourAngle+'deg)',
					'transform': 'rotate('+arrow.hourAngle+'deg)'});}
		}

    	switch_1 = new switchModel(0, 7, 0, 30, b.model.find('#switch1'));
    	switch_2 = new switchModel(0, 8, -60, 30, b.model.find('#switch2'));

		b.rotateSwitch1=function(event){changeSwitchPosition(switch_1, b.checkAll, event)};
		b.rotateSwitch2 = function(event){changeSwitchPosition(switch_2, b.checkAll, event)};

		b.arrow1 = new b.arrowCreator(b.model.find('#secArrow1'), b.model.find('#minArrow1'), b.model.find('#hourArrow1'), 0, 0, 0, [11, 12]);
		b.arrow2 = new b.arrowCreator(b.model.find('#secArrow2'), b.model.find('#minArrow2'), b.model.find('#hourArrow2'), 0, 0, 0, [7, 8]);
		b.arrow3 = new b.arrowCreator(b.model.find('#secArrow3'), b.model.find('#minArrow3'), b.model.find('#hourArrow3'), 0, 0, 0, [9, 10]);

		b.rotateArrows_1 = function(){b.rotateArrows(b.arrow1)};
		b.rotateArrows_2 = function(){b.rotateArrows(b.arrow2)};
		b.rotateArrows_3 = function(){b.rotateArrows(b.arrow3)};


		b.checkAll = function() {
			if (appThumbler) {
				if (lightAVM === null){
				lightAVM=setTimeout(function(){b.model.find("#in5").css('background', 'rgb(247, 255, 165)'); console.log(Date.now())}, 5999)}
			}else{								
				b.model.find("#in5").css('background','rgb(230,230,230)');
				clearTimeout(lightAVM);
				lightAVM = null;
			};

			b.rotatePowerArrow = function() {
				b.arrowAngle = 27;
				b.changedArrowAngle = b.arrowAngle+Math.random()*6-4;
				b.arrow.css({
					'transition': '0.5s linear',
					'-moz-transform': 'rotate('+b.changedArrowAngle+'deg)',
					'-ms-transform' : 'rotate('+b.changedArrowAngle+'deg)',
					'-webkit-transform': 'rotate('+b.changedArrowAngle+'deg)',
					'-o-transform': 'rotate('+b.changedArrowAngle+'deg)',
					'transform': 'rotate('+b.changedArrowAngle+'deg)'});
			};
			if(appThumbler && b.thumblersValue[0] && b.thumblersValue[1]){b.model.find('#in8').css('background', 'rgb(247, 255, 165)');}
						else{b.model.find('#in8').css('background','rgb(230,230,230)');}
			if(appThumbler && b.thumblersValue[9] && b.thumblersValue[10]){b.model.find('#in6').css('background', 'rgb(247, 255, 165)');}
						else{b.model.find('#in6').css('background','rgb(230,230,230)');}
			if(appThumbler && b.thumblersValue[4] && b.thumblersValue[5] && b.thumblersValue[6]){b.model.find('#in3').css('background', 'rgb(247, 255, 165)');}
						else{b.model.find('#in3').css('background','rgb(230,230,230)');}
			if(appThumbler && b.thumblersValue[11] && b.thumblersValue[12]){b.model.find('#in7').css('background', 'rgb(247, 255, 165)');}
						else{b.model.find('#in7').css('background','rgb(230,230,230)'); }
			if(appThumbler && b.thumblersValue[7] && b.thumblersValue[8]){b.model.find('#in4').css('background', 'rgb(247, 255, 165)');}
						else{b.model.find('#in4	').css('background','rgb(230,230,230)');}
			if(appThumbler && b.thumblersValue[9] && b.thumblersValue[10] && (switch_2.switchCurrentValue !==0 ) && switch_1.switchCurrentValue === 2){
				b.rotatePowerArrow();}
			else if(appThumbler && b.thumblersValue[11] && b.thumblersValue[12] && (switch_2.switchCurrentValue <5 && switch_2.switchCurrentValue !==0) && switch_1.switchCurrentValue  === 4){
				b.rotatePowerArrow();}
			else{b.arrow.css({
					'-moz-transform': 'rotate(-45 deg)',
					'-ms-transform' : 'rotate(-45 deg)',
					'-webkit-transform': 'rotate(-45 deg)',
					'-o-transform': 'rotate(-45deg)',
					'transform': 'rotate(-45deg)'});
		}
	};
		$("body").find("#th15").click(function(){setTimeout(b.checkAll, 10)});

	setInterval(b.rotateArrows_1, 1000);
	setInterval(b.rotateArrows_2, 1000);
	setInterval(b.rotateArrows_3, 1000);

	b.thumblers.click(b.turn);

	b.jqSwitch_2.mousedown(b.rotateSwitch2);
	b.jqSwitch_1.mousedown(b.rotateSwitch1);
}
function block_2(sSelector){
	var b = this;
		b.model  = $(sSelector);
		b.model.on("contextmenu", false);
		b.clientHeight = window.innerHeight;
		b.clientWidth = window.innerWidth;
    	b.thumblers = b.model.find('.thumbler__off_2');
    	b.thumblersValue=[];
		b.thumblersValue.length = b.thumblers.length;
    	b.switch3 = b.model.find('#switch3');
    	b.specialThumblerValue = 3;
    	b.specialThumbler = b.model.find('.thumbler__off_special');
    	b.opticsThumbler = b.model.find('.thumbler_special_optics');
    	b.switch4 = b.model.find('#switch4');
    	b.switch5 = b.model.find('#switch5');
    	b.rot1 = b.model.find('#rot_1');
    	b.rot2 = b.model.find('#rot_2');
    	b.rot3 = b.model.find('#rot_3');
    	b.rot4 = b.model.find('#rot_4');
    	b.rot5 = b.model.find('#rot_5');
    	b.hw1 = b.model.find('#hw1');
    	b.hw2 = b.model.find('#hw2');
    	b.KButton = b.model.find(".k-button");
    	b.thumbler_hor = b.model.find(".thumbler_hor");
    	b.thumbler_hor_2 = b.model.find(".thumbler_hor_2");
    	b.arrowControl = b.model.find(".arrow_control");
    	b.indicatorsControl = b.model.find(".indicators_control");
    	b.AArrow  = b.model.find(".A_arrow");
    	b.thumbler_horValue = 0;
    	b.thumbler_hor_2Value = 3;
    	b.opticsThumblerValue = 3;
    	b.rot1Angle = 0;
 		b.rot2Angle = 0;
 		b.rot3Angle = 0;
 		b.rot4Angle = 0;
 		b.rot5Angle = 0;
 		b.hw1Angle = 0;
 		b.hw2Angle = 0;
 		b.scales = [];
 		b.scalesAngle = [];

 		for(i = 0; i < 16; i++){
 			b.scalesAngle[i] = 0;
 			b.scales.push($(".wrapper_3").find(".scale_"+(i+1)))
 		}

		adaptWindow(b.model);
 		setFalse(b.thumblersValue);
 	 	adaptWindow($(".wrapper_3"));
 	 	$(window).keypress(function(e){
    if(e.which == 50) {
          $('.wrapper_2').css({'display': 'block'});
          $('.wrapper_3').css({'display': 'block'});
          $('.wrapper').css({'display': 'none'});
		  b.checkAll();	
	}
	else if(e.which == 49){
	      $('.wrapper').css({'display': 'block'});
	      $('.wrapper_2').css({'display': 'none'});
	  	  $('.wrapper_3').css({'display': 'none'});
	  	  b.checkAll();	}
});

 	 	b.arrowControl.click(function(){
 	 		b.arrowControl.removeClass("arrow_control");
 	 		b.arrowControl.addClass("small_btn_on");
 	 		setTimeout(function(){
 	 			b.arrowControl.removeClass("small_btn_on");
 	 			b.arrowControl.addClass("arrow_control");
 	 		}, 500)
 	 	});

        b.indicatorsControl.mousedown(function () {	
            b.indicatorsControl.removeClass("indicators_control");
            b.indicatorsControl.addClass("small_btn_on_indicators");
            if(appThumbler){
            	b.model.find('.light_indicators').css({opacity : 1})
            }
            b.model.bind('mouseup',function(){
                b.indicatorsControl.removeClass("small_btn_on_indicators");
                b.indicatorsControl.addClass("indicators_control");
                b.model.find('.light_indicators').css({opacity : 0.4})
                b.model.unbind('mouseup');
            });
        });
 		 b.thumbler_hor_2.bind('mousedown', function(event){
			b.model.bind('mouseup',function(event){
				if(event.which === 1) {
					if(b.thumbler_hor_2.offset().top - event.pageY > -0.018*b.clientHeight && b.thumbler_hor_2.offset().left - event.pageX < 0.2*b.clientWidth){
						b.thumbler_hor_2Value = 4;
						b.thumbler_hor_2.css('backgroundImage', 'url(\'images/thum_4.png\')');
						b.model.unbind('mouseup');}
					else if(event.pageY - b.thumbler_hor_2.offset().top >= 0.065*b.clientHeight && b.thumbler_hor_2.offset().left - event.pageX < 0.2*b.clientWidth){
						b.thumbler_hor_2Value = 1;
						b.thumbler_hor_2.css('backgroundImage', 'url(\'images/thum_1.png\')');
						b.model.unbind('mouseup');}
					else if(b.thumbler_hor_2.offset().left - event.pageX >= -0.014*b.clientWidth && event.pageY - b.thumbler_hor_2.offset().top <= b.clientHeight*0.08){b.thumbler_hor_2Value = 2;
						b.thumbler_hor_2.css('backgroundImage', 'url(\'images/thum_2.png\')');
						b.model.unbind('mouseup');}
					else{}
			setTimeout(function(){b.thumbler_hor_2.css('backgroundImage', 'url(\'images/thum_3.png\')');}, 900);
				}
		    	});
			b.checkAll();
		})
		b.opticsThumbler.bind('mousedown', function(event){
			b.model.bind('mouseup',function(event){
				if(event.which === 1) {
					if(b.opticsThumbler.offset().top - event.pageY > -0.023*b.clientHeight && b.opticsThumbler.offset().left - event.pageX < 0.2*b.clientWidth){
						b.opticsThumblerValue = 4;
						b.opticsThumbler.css('backgroundImage', 'url(\'images/thum_4.png\')');
						b.model.unbind('mouseup');}
					else if(event.pageY - b.opticsThumbler.offset().top >= 0.07*b.clientHeight && b.opticsThumbler.offset().left - event.pageX < 0.2*b.clientWidth){
						b.opticsThumblerValue = 1;
						b.opticsThumbler.css('backgroundImage', 'url(\'images/thum_1.png\')');
						b.model.unbind('mouseup');}
					else{
						b.opticsThumblerValue = 3;
						b.opticsThumbler.css('backgroundImage', 'url(\'images/thum_3.png\')');
						b.model.unbind('mouseup');}
				}
		    	});
		b.checkAll();
	})
			b.model.find("#th21").bind('mousedown', function(event){
			b.model.bind('mouseup',function(event){
				if(event.which === 1) {
					if(b.model.find("#th21").offset().top - event.pageY > -0.023*b.clientHeight && b.model.find("#th21").offset().left - event.pageX < 0.2*b.clientWidth){
						b.opticsThumblerValue = 4;
						b.model.find("#th21").css('backgroundImage', 'url(\'images/thum_4.png\')');
						b.model.unbind('mouseup');}
					else if(event.pageY - b.model.find("#th21").offset().top >= 0.07*b.clientHeight && b.model.find("#th21").offset().left - event.pageX < 0.2*b.clientWidth){
						b.opticsThumblerValue = 1;
						b.model.find("#th21").css('backgroundImage', 'url(\'images/thum_1.png\')');
						b.model.unbind('mouseup');}
					else{
						b.opticsThumblerValue = 3;
						b.model.find("#th21").css('backgroundImage', 'url(\'images/thum_3.png\')');
						b.model.unbind('mouseup');}
				}
		    	});
		b.checkAll();
	})

	b.thumbler_hor.bind('mousedown', function(event){
		b.model.bind('mouseup',function(event){
			if(event.which === 1) {
					if(b.thumbler_hor.offset().left - event.pageX >= -0.008*b.clientWidth){
						b.thumbler_horValue = 1;
						b.thumbler_hor.removeClass("thumbler_hor_off thumbler_hor_pos2");
						b.thumbler_hor.addClass("thumbler_hor_pos1")
						b.model.unbind('mouseup');
					}
					else if(event.pageX - b.thumbler_hor.offset().left >= 0.032*b.clientWidth){
						b.thumbler_horValue = 2;
						b.thumbler_hor.removeClass("thumbler_hor_off thumbler_hor_pos1");
						b.thumbler_hor.addClass("thumbler_hor_pos2");
						b.model.unbind('mouseup');
					}
					else{
						b.thumbler_horValue = 0;
						b.thumbler_hor.removeClass("thumbler_hor_pos2 thumbler_hor_pos1");
						b.thumbler_hor.addClass("thumbler_hor_off");}
						b.model.unbind('mouseup');
			}
		  });
		b.checkAll();
	})
 		b.KButton.mousedown(function(){
 			jqKButton=$(this);
 			jqKButton.toggleClass("k-button_clicked");
 			b.model.bind("mouseup", function(){
 				setTimeout(function(){
 				jqKButton.toggleClass("k-button_clicked")}, 200)
 				b.model.unbind("mouseup");
 			});
 		});

 		b.changeRot1Position = function(event){
 		spin1 = setInterval(function(){
		if(event.which === 1) {
			b.rot1Angle -= 1;
				b.rot1.css({
					'-moz-transform': 'rotate('+b.rot1Angle+'deg)',
					'-ms-transform' : 'rotate('+b.rot1Angle+'deg)',
					'-webkit-transform': 'rotate('+b.rot1Angle+'deg)',
					'-o-transform': 'rotate('+b.rot1Angle + 'deg)',
					'transform': 'rotate('+b.rot1Angle + 'deg)'});
			}
		else if(event.which === 3){
			b.rot1Angle += 1;
				b.rot1.css({
					'-moz-transform': 'rotate('+b.rot1Angle+'deg)',
					'-ms-transform' : 'rotate('+b.rot1Angle+'deg)',
					'-webkit-transform': 'rotate('+b.rot1Angle+'deg)',
					'-o-transform': 'rotate('+b.rot1Angle+'deg)',
					'transform': 'rotate('+b.rot1Angle+'deg)'});
		 	}
		else{alert('press left or right button');}}, 6);
		document.onmouseup = function(){clearInterval(window.spin1)};
	};
	b.changeRot2Position = function(event){
 		spin2 = setInterval(function(){
		if(event.which === 1) {
			b.rot2Angle -= 1;
				b.rot2.css({
					'-moz-transform': 'rotate('+b.rot2Angle+'deg)',
					'-ms-transform' : 'rotate('+b.rot2Angle+'deg)',
					'-webkit-transform': 'rotate('+b.rot2Angle+'deg)',
					'-o-transform': 'rotate('+b.rot2Angle + 'deg)',
					'transform': 'rotate('+b.rot2Angle + 'deg)'});
			}
		else if(event.which === 3){
			b.rot2Angle += 1;
				b.rot2.css({
					'-moz-transform': 'rotate('+b.rot2Angle+'deg)',
					'-ms-transform' : 'rotate('+b.rot2Angle+'deg)',
					'-webkit-transform': 'rotate('+b.rot2Angle+'deg)',
					'-o-transform': 'rotate('+b.rot2Angle+'deg)',
					'transform': 'rotate('+b.rot2Angle+'deg)'});
		 	}
		else{alert('press left or right button');}}, 6);
		document.onmouseup = function(){clearInterval(window.spin2)};
	};
	b.changeRot3Position = function(event){
 		spin3 = setInterval(function(){
		if(event.which === 1) {
			if (b.scalesAngle[3] > 0) {
				b.scalesAngle[2] -=1;
				b.scalesAngle[3] -=0.1;
				b.scales[3].css({'-moz-transform': 'rotate('+b.scalesAngle[3] + 'deg)',
					'-ms-transform' : 'rotate('+b.scalesAngle[3] + 'deg)',
					'-webkit-transform': 'rotate('+b.scalesAngle[3] + 'deg)',
					'-o-transform': 'rotate('+b.scalesAngle[3] + 'deg)',
					'transform': 'rotate('+b.scalesAngle[3] + 'deg)'});
				b.scales[2].css({
					'-moz-transform': 'rotate('+b.scalesAngle[2] + 'deg)',
					'-ms-transform' : 'rotate('+b.scalesAngle[2] + 'deg)',
					'-webkit-transform': 'rotate('+b.scalesAngle[2] + 'deg)',
					'-o-transform': 'rotate('+b.scalesAngle[2] + 'deg)',
					'transform': 'rotate('+b.scalesAngle[2] + 'deg)'});}
				if(b.scalesAngle[9] > 0){
				b.scalesAngle[8] -=2.9988889;
				b.scalesAngle[9] -=0.1;
				b.scales[8].css({'-moz-transform': 'rotate('+b.scalesAngle[8] + 'deg)',
					'-ms-transform' : 'rotate('+b.scalesAngle[8] + 'deg)',
					'-webkit-transform': 'rotate('+b.scalesAngle[8] + 'deg)',
					'-o-transform': 'rotate('+b.scalesAngle[8] + 'deg)',
					'transform': 'rotate('+b.scalesAngle[8] + 'deg)'});
				b.scales[9].css({'-moz-transform': 'rotate('+b.scalesAngle[9] + 'deg)',
					'-ms-transform' : 'rotate('+b.scalesAngle[9] + 'deg)',
					'-webkit-transform': 'rotate('+b.scalesAngle[9] + 'deg)',
					'-o-transform': 'rotate('+b.scalesAngle[9] + 'deg)',
					'transform': 'rotate('+b.scalesAngle[9] + 'deg)'});
				}
				if(b.scalesAngle[3] > 0 || b.scalesAngle[9] > 0){
					b.rot3Angle -= 1;
					b.rot3.css({
					'-moz-transform': 'rotate('+b.rot3Angle+'deg)',
					'-ms-transform' : 'rotate('+b.rot3Angle+'deg)',
					'-webkit-transform': 'rotate('+b.rot3Angle+'deg)',
					'-o-transform': 'rotate('+b.rot3Angle + 'deg)',
					'transform': 'rotate('+b.rot3Angle + 'deg)'});}
			}
		else if(event.which === 3){
			if (b.scalesAngle[3] < 180) {
				b.scalesAngle[2] += 1;
				b.scalesAngle[3] += 0.1;
				b.scales[3].css({
					'-moz-transform': 'rotate('+b.scalesAngle[3] + 'deg)',
					'-ms-transform' : 'rotate('+b.scalesAngle[3] + 'deg)',
					'-webkit-transform': 'rotate('+b.scalesAngle[3] + 'deg)',
					'-o-transform': 'rotate('+b.scalesAngle[3] + 'deg)',
					'transform': 'rotate('+b.scalesAngle[3] + 'deg)'});
				b.scales[2].css({
					'-moz-transform': 'rotate('+b.scalesAngle[2] + 'deg)',
					'-ms-transform' : 'rotate('+b.scalesAngle[2] + 'deg)',
					'-webkit-transform': 'rotate('+b.scalesAngle[2] + 'deg)',
					'-o-transform': 'rotate('+b.scalesAngle[2] + 'deg)',
					'transform': 'rotate('+b.scalesAngle[2] + 'deg)'});}
				if(b.scalesAngle[9] < 360){
					b.scalesAngle[8] +=3;
					b.scalesAngle[9] +=0.1;
					b.scales[8].css({'-moz-transform': 'rotate('+b.scalesAngle[8] + 'deg)',
					'-ms-transform' : 'rotate('+b.scalesAngle[8] + 'deg)',
					'-webkit-transform': 'rotate('+b.scalesAngle[8] + 'deg)',
					'-o-transform': 'rotate('+b.scalesAngle[8] + 'deg)',
					'transform': 'rotate('+b.scalesAngle[8] + 'deg)'});
				b.scales[9].css({'-moz-transform': 'rotate('+b.scalesAngle[9] + 'deg)',
					'-ms-transform' : 'rotate('+b.scalesAngle[9] + 'deg)',
					'-webkit-transform': 'rotate('+b.scalesAngle[9] + 'deg)',
					'-o-transform': 'rotate('+b.scalesAngle[9] + 'deg)',
					'transform': 'rotate('+b.scalesAngle[9] + 'deg)'});}
				if(b.scalesAngle[3] < 180 || b.scalesAngle[9] < 360){
				b.rot3Angle += 1;
				b.rot3.css({
					'-moz-transform': 'rotate('+b.rot3Angle+'deg)',
					'-ms-transform' : 'rotate('+b.rot3Angle+'deg)',
					'-webkit-transform': 'rotate('+b.rot3Angle+'deg)',
					'-o-transform': 'rotate('+b.rot3Angle+'deg)',
					'transform': 'rotate('+b.rot3Angle+'deg)'});
		 	}}
		else{alert('press left or right button');}}, 16);
		document.onmouseup = function(){clearInterval(window.spin3)};
	};
	b.changeRot4Position = function(event){
 		spin4 = setInterval(function(){
		if(event.which === 1) {
			if (b.scalesAngle[5] > 0) {
				b.scalesAngle[4] -=1;
				b.scalesAngle[5] -=0.1;
				b.scales[5].css({'-moz-transform': 'rotate('+b.scalesAngle[5] + 'deg)',
					'-ms-transform' : 'rotate('+b.scalesAngle[5] + 'deg)',
					'-webkit-transform': 'rotate('+b.scalesAngle[5] + 'deg)',
					'-o-transform': 'rotate('+b.scalesAngle[5] + 'deg)',
					'transform': 'rotate('+b.scalesAngle[5] + 'deg)'});
				b.scales[4].css({
					'-moz-transform': 'rotate('+b.scalesAngle[4] + 'deg)',
					'-ms-transform' : 'rotate('+b.scalesAngle[4] + 'deg)',
					'-webkit-transform': 'rotate('+b.scalesAngle[4] + 'deg)',
					'-o-transform': 'rotate('+b.scalesAngle[4] + 'deg)',
					'transform': 'rotate('+b.scalesAngle[4] + 'deg)'});}
			if(b.scalesAngle[11] > 0 ){
				b.scalesAngle[10] -=3;
				b.scalesAngle[11] -=0.1;
				b.scales[10].css({'-moz-transform': 'rotate('+b.scalesAngle[10] + 'deg)',
					'-ms-transform' : 'rotate('+b.scalesAngle[10] + 'deg)',
					'-webkit-transform': 'rotate('+b.scalesAngle[10] + 'deg)',
					'-o-transform': 'rotate('+b.scalesAngle[10] + 'deg)',
					'transform': 'rotate('+b.scalesAngle[10] + 'deg)'});
				b.scales[11].css({
					'-moz-transform': 'rotate('+b.scalesAngle[11] + 'deg)',
					'-ms-transform' : 'rotate('+b.scalesAngle[11] + 'deg)',
					'-webkit-transform': 'rotate('+b.scalesAngle[11] + 'deg)',
					'-o-transform': 'rotate('+b.scalesAngle[11] + 'deg)',
					'transform': 'rotate('+b.scalesAngle[11] + 'deg)'});}
				if(b.scalesAngle[11] > 0 || b.scalesAngle[5] > 0)
				b.rot4Angle -= 1;
				b.rot4.css({
					'-moz-transform': 'rotate('+b.rot4Angle + 'deg)',
					'-ms-transform' : 'rotate('+b.rot4Angle + 'deg)',
					'-webkit-transform': 'rotate('+b.rot4Angle + 'deg)',
					'-o-transform': 'rotate('+b.rot4Angle + 'deg)',
					'transform': 'rotate('+b.rot4Angle + 'deg)'});
			}
		else if(event.which === 3){
			if (b.scalesAngle[5] < 180) {
				b.scalesAngle[4] += 1;
				b.scalesAngle[5] += 0.1;
				b.scales[5].css({
					'-moz-transform': 'rotate('+b.scalesAngle[5] + 'deg)',
					'-ms-transform' : 'rotate('+b.scalesAngle[5] + 'deg)',
					'-webkit-transform': 'rotate('+b.scalesAngle[5] + 'deg)',
					'-o-transform': 'rotate('+b.scalesAngle[5] + 'deg)',
					'transform': 'rotate('+b.scalesAngle[5] + 'deg)'});
				b.scales[4].css({
					'-moz-transform': 'rotate('+b.scalesAngle[4] + 'deg)',
					'-ms-transform' : 'rotate('+b.scalesAngle[4] + 'deg)',
					'-webkit-transform': 'rotate('+b.scalesAngle[4] + 'deg)',
					'-o-transform': 'rotate('+b.scalesAngle[4] + 'deg)',
					'transform': 'rotate('+b.scalesAngle[4] + 'deg)'});}
			if(b.scalesAngle[11] < 360){
					b.scalesAngle[10] +=3;
					b.scalesAngle[11] +=0.1;
				b.scales[10].css({'-moz-transform': 'rotate('+b.scalesAngle[10] + 'deg)',
					'-ms-transform' : 'rotate('+b.scalesAngle[10] + 'deg)',
					'-webkit-transform': 'rotate('+b.scalesAngle[10] + 'deg)',
					'-o-transform': 'rotate('+b.scalesAngle[10] + 'deg)',
					'transform': 'rotate('+b.scalesAngle[10] + 'deg)'});
				b.scales[11].css({
					'-moz-transform': 'rotate('+b.scalesAngle[11] + 'deg)',
					'-ms-transform' : 'rotate('+b.scalesAngle[11] + 'deg)',
					'-webkit-transform': 'rotate('+b.scalesAngle[11] + 'deg)',
					'-o-transform': 'rotate('+b.scalesAngle[11] + 'deg)',
					'transform': 'rotate('+b.scalesAngle[11] + 'deg)'});}
			if (b.scalesAngle[11] < 360 || b.scalesAngle[5] < 180) {
				b.rot4Angle += 1;
				b.rot4.css({
					'-moz-transform': 'rotate('+b.rot4Angle + 'deg)',
					'-ms-transform' : 'rotate('+b.rot4Angle + 'deg)',
					'-webkit-transform': 'rotate('+b.rot4Angle + 'deg)',
					'-o-transform': 'rotate('+b.rot4Angle + 'deg)',
					'transform': 'rotate('+b.rot4Angle + 'deg)'});}
		 	}
		else{alert('press left or right button');}}, 16);
		document.onmouseup = function(){clearInterval(window.spin4)};
	};
	b.changeRot5Position = function(event){
 		spin5 = setInterval(function(){
		if(event.which === 1) {
			if (b.scalesAngle[13] > 0) {
				b.scalesAngle[12] -=1;
				b.scalesAngle[13] -=0.1;
				b.scales[12].css({'-moz-transform': 'rotate('+b.scalesAngle[12] + 'deg)',
					'-ms-transform' : 'rotate('+b.scalesAngle[12] + 'deg)',
					'-webkit-transform': 'rotate('+b.scalesAngle[12] + 'deg)',
					'-o-transform': 'rotate('+b.scalesAngle[12] + 'deg)',
					'transform': 'rotate('+b.scalesAngle[12] + 'deg)'});
				b.scales[13].css({
					'-moz-transform': 'rotate('+b.scalesAngle[13] + 'deg)',
					'-ms-transform' : 'rotate('+b.scalesAngle[13] + 'deg)',
					'-webkit-transform': 'rotate('+b.scalesAngle[13] + 'deg)',
					'-o-transform': 'rotate('+b.scalesAngle[13] + 'deg)',
					'transform': 'rotate('+b.scalesAngle[13] + 'deg)'});}
			if(b.scalesAngle[7] > 0){
				b.scalesAngle[6] -=3;
				b.scalesAngle[7] -=0.1;
				b.scales[6].css({'-moz-transform': 'rotate('+b.scalesAngle[6] + 'deg)',
					'-ms-transform' : 'rotate('+b.scalesAngle[6] + 'deg)',
					'-webkit-transform': 'rotate('+b.scalesAngle[6] + 'deg)',
					'-o-transform': 'rotate('+b.scalesAngle[6] + 'deg)',
					'transform': 'rotate('+b.scalesAngle[6] + 'deg)'});
				b.scales[7].css({
					'-moz-transform': 'rotate('+b.scalesAngle[7] + 'deg)',
					'-ms-transform' : 'rotate('+b.scalesAngle[7] + 'deg)',
					'-webkit-transform': 'rotate('+b.scalesAngle[7] + 'deg)',
					'-o-transform': 'rotate('+b.scalesAngle[7] + 'deg)',
					'transform': 'rotate('+b.scalesAngle[7] + 'deg)'});}
			if(b.scalesAngle[7] > 0 || b.scalesAngle[13] > 0){
				b.rot5Angle -= 1;
				b.rot5.css({
					'-moz-transform': 'rotate('+b.rot5Angle+'deg)',
					'-ms-transform' : 'rotate('+b.rot5Angle+'deg)',
					'-webkit-transform': 'rotate('+b.rot5Angle+'deg)',
					'-o-transform': 'rotate('+b.rot5Angle + 'deg)',
					'transform': 'rotate('+b.rot5Angle + 'deg)'});
			}}
		else if(event.which === 3){
			if (b.scalesAngle[13] < 180) {
				b.scalesAngle[12] += 1;
				b.scalesAngle[13] += 0.1;
				b.scales[13].css({
					'-moz-transform': 'rotate('+b.scalesAngle[13] + 'deg)',
					'-ms-transform' : 'rotate('+b.scalesAngle[13] + 'deg)',
					'-webkit-transform': 'rotate('+b.scalesAngle[13] + 'deg)',
					'-o-transform': 'rotate('+b.scalesAngle[13] + 'deg)',
					'transform': 'rotate('+b.scalesAngle[13] + 'deg)'});
				b.scales[12].css({
					'-moz-transform': 'rotate('+b.scalesAngle[12] + 'deg)',
					'-ms-transform' : 'rotate('+b.scalesAngle[12] + 'deg)',
					'-webkit-transform': 'rotate('+b.scalesAngle[12] + 'deg)',
					'-o-transform': 'rotate('+b.scalesAngle[12] + 'deg)',
					'transform': 'rotate('+b.scalesAngle[12] + 'deg)'});}
			if(b.scalesAngle[7] < 360){	
				b.scalesAngle[6] +=3; //2.9988889;
				b.scalesAngle[7] +=0.1;
				b.scales[6].css({'-moz-transform': 'rotate('+b.scalesAngle[6] + 'deg)',
					'-ms-transform' : 'rotate('+b.scalesAngle[6] + 'deg)',
					'-webkit-transform': 'rotate('+b.scalesAngle[6] + 'deg)',
					'-o-transform': 'rotate('+b.scalesAngle[6] + 'deg)',
					'transform': 'rotate('+b.scalesAngle[6] + 'deg)'});
				b.scales[7].css({
					'-moz-transform': 'rotate('+b.scalesAngle[7] + 'deg)',
					'-ms-transform' : 'rotate('+b.scalesAngle[7] + 'deg)',
					'-webkit-transform': 'rotate('+b.scalesAngle[7] + 'deg)',
					'-o-transform': 'rotate('+b.scalesAngle[7] + 'deg)',
					'transform': 'rotate('+b.scalesAngle[7] + 'deg)'});}
			if(b.scalesAngle[13] < 180 || b.scalesAngle[7] < 360){
				b.rot5Angle += 1;
				b.rot5.css({
					'-moz-transform': 'rotate('+b.rot5Angle+'deg)',
					'-ms-transform' : 'rotate('+b.rot5Angle+'deg)',
					'-webkit-transform': 'rotate('+b.rot5Angle+'deg)',
					'-o-transform': 'rotate('+b.rot5Angle+'deg)',
					'transform': 'rotate('+b.rot5Angle+'deg)'});
		 	}}
		else{alert('press left or right button');}}, 16);
		document.onmouseup = function(){clearInterval(window.spin5)};
	};
	b.changeHW1Position = function(event){
 		spin6 = setInterval(function(){
		if(event.which === 1) {
			if (b.scalesAngle[1] > 0) {
			b.hw1Angle -= 1;
			b.scalesAngle[0] -=1;
			b.scalesAngle[1] -=0.0166667;
			b.scales[1].css({'-moz-transform': 'rotate('+b.scalesAngle[1]+'deg)',
					'-ms-transform' : 'rotate('+b.scalesAngle[1]+'deg)',
					'-webkit-transform': 'rotate('+b.scalesAngle[1]+'deg)',
					'-o-transform': 'rotate('+b.scalesAngle[1] + 'deg)',
					'transform': 'rotate('+b.scalesAngle[1] + 'deg)'});
			b.scales[0].css({
					'-moz-transform': 'rotate('+b.scalesAngle[0]+'deg)',
					'-ms-transform' : 'rotate('+b.scalesAngle[0]+'deg)',
					'-webkit-transform': 'rotate('+b.scalesAngle[0]+'deg)',
					'-o-transform': 'rotate('+b.scalesAngle[0] + 'deg)',
					'transform': 'rotate('+b.scalesAngle[0] + 'deg)'});
			b.hw1.css({
					'-moz-transform': 'rotate('+b.hw1Angle+'deg)',
					'-ms-transform' : 'rotate('+b.hw1Angle+'deg)',
					'-webkit-transform': 'rotate('+b.hw1Angle+'deg)',
					'-o-transform': 'rotate('+b.hw1Angle + 'deg)',
					'transform': 'rotate('+b.hw1Angle + 'deg)'});
			}}
		else if(event.which === 3){
			if (b.scalesAngle[1] < 90) {
			b.hw1Angle += 1;
			b.scalesAngle[0] +=1;
			b.scalesAngle[1] +=0.0166667;
			b.scales[1].css({
					'-moz-transform': 'rotate('+b.scalesAngle[1]+'deg)',
					'-ms-transform' : 'rotate('+b.scalesAngle[1]+'deg)',
					'-webkit-transform': 'rotate('+b.scalesAngle[1]+'deg)',
					'-o-transform': 'rotate('+b.scalesAngle[1]+'deg)',
					'transform': 'rotate('+b.scalesAngle[1]+'deg)'});
			b.scales[0].css({
					'-moz-transform': 'rotate('+b.scalesAngle[0]+'deg)',
					'-ms-transform' : 'rotate('+b.scalesAngle[0]+'deg)',
					'-webkit-transform': 'rotate('+b.scalesAngle[0]+'deg)',
					'-o-transform': 'rotate('+b.scalesAngle[0]+'deg)',
					'transform': 'rotate('+b.scalesAngle[0]+'deg)'});
			b.hw1.css({
					'-moz-transform': 'rotate('+b.hw1Angle+'deg)',
					'-ms-transform' : 'rotate('+b.hw1Angle+'deg)',
					'-webkit-transform': 'rotate('+b.hw1Angle+'deg)',
					'-o-transform': 'rotate('+b.hw1Angle+'deg)',
					'transform': 'rotate('+b.hw1Angle+'deg)'});
		 	}}
		else{alert('press left or right button');}}, 6);
		document.onmouseup = function(){clearInterval(window.spin6)};
	};
	b.changeHW2Position = function(event){
 		spin7 = setInterval(function(){
		if(event.which === 1) {
			if (b.scalesAngle[15] > 0) {
			b.hw2Angle -= 1;
			b.scalesAngle[14] -=1;
			b.scalesAngle[15] -=0.0166667;
			b.scales[15].css({'-moz-transform': 'rotate('+b.scalesAngle[15]+'deg)',
					'-ms-transform' : 'rotate('+b.scalesAngle[15]+'deg)',
					'-webkit-transform': 'rotate('+b.scalesAngle[15]+'deg)',
					'-o-transform': 'rotate('+b.scalesAngle[15] + 'deg)',
					'transform': 'rotate('+b.scalesAngle[15] + 'deg)'});
			b.scales[14].css({
					'-moz-transform': 'rotate('+b.scalesAngle[14]+'deg)',
					'-ms-transform' : 'rotate('+b.scalesAngle[14]+'deg)',
					'-webkit-transform': 'rotate('+b.scalesAngle[14]+'deg)',
					'-o-transform': 'rotate('+b.scalesAngle[14] + 'deg)',
					'transform': 'rotate('+b.scalesAngle[14] + 'deg)'});
			b.hw2.css({
					'-moz-transform': 'rotate('+b.hw2Angle+'deg)',
					'-ms-transform' : 'rotate('+b.hw2Angle+'deg)',
					'-webkit-transform': 'rotate('+b.hw2Angle+'deg)',
					'-o-transform': 'rotate('+b.hw2Angle + 'deg)',
					'transform': 'rotate('+b.hw2Angle + 'deg)'});
			}}
		else if(event.which === 3){
			if (b.scalesAngle[15] < 360) {
			b.hw2Angle += 1;
			b.scalesAngle[14] +=1;
			b.scalesAngle[15] +=0.0166667;
			b.scales[15].css({
					'-moz-transform': 'rotate('+b.scalesAngle[15]+'deg)',
					'-ms-transform' : 'rotate('+b.scalesAngle[15]+'deg)',
					'-webkit-transform': 'rotate('+b.scalesAngle[15]+'deg)',
					'-o-transform': 'rotate('+b.scalesAngle[15]+'deg)',
					'transform': 'rotate('+b.scalesAngle[15]+'deg)'});
			b.scales[14].css({
					'-moz-transform': 'rotate('+b.scalesAngle[14]+'deg)',
					'-ms-transform' : 'rotate('+b.scalesAngle[14]+'deg)',
					'-webkit-transform': 'rotate('+b.scalesAngle[14]+'deg)',
					'-o-transform': 'rotate('+b.scalesAngle[14]+'deg)',
					'transform': 'rotate('+b.scalesAngle[14]+'deg)'});
			b.hw2.css({
					'-moz-transform': 'rotate('+b.hw2Angle+'deg)',
					'-ms-transform' : 'rotate('+b.hw2Angle+'deg)',
					'-webkit-transform': 'rotate('+b.hw2Angle+'deg)',
					'-o-transform': 'rotate('+b.hw2Angle+'deg)',
					'transform': 'rotate('+b.hw2Angle+'deg)'});
		 	}}
		else{alert('press left or right button');}
}, 6);
		document.onmouseup = function(){clearInterval(window.spin7)};
	};

	b.rot1.mousedown(b.changeRot1Position);
	b.rot2.mousedown(b.changeRot2Position);
	b.rot3.mousedown(b.changeRot3Position);
	b.rot4.mousedown(b.changeRot4Position);
	b.rot5.mousedown(b.changeRot5Position);
	b.hw1.mousedown(b.changeHW1Position);
	b.hw2.mousedown(b.changeHW2Position);

	switch_3 = new switchModel(0, 3, 30, 40, b.model.find('#switch3'));
  	switch_4 = new switchModel(0, 4, 30, 40, b.model.find('#switch4'));
  	switch_5 = new switchModel(0, 8, -30, 30, b.model.find('#switch5'));

	b.turn = function() {
		var jqThumbler = $(this);
				b.currentThum = b.thumblers.index(jqThumbler);
				if(jqThumbler.hasClass('thumbler__off_2')){
					jqThumbler.addClass('thumbler__on_2');
					jqThumbler.removeClass('thumbler__off_2');
					b.thumblersValue[b.currentThum] = true;}
				else{jqThumbler.addClass('thumbler__off_2');
					jqThumbler.removeClass('thumbler__on_2');
					b.thumblersValue[b.currentThum] = false;}
		appThumbler = b.thumblersValue[0];
		b.checkAll();
	};

	b.rotateSwitch_3 = function(event){changeSwitchPosition(switch_3, b.checkAll, event)};
	b.rotateSwitch_4 = function(event){changeSwitchPosition(switch_4, b.checkAll, event)};
	b.rotateSwitch_5 = function(event){changeSwitchPosition(switch_5, b.checkAll, event)};

	b.specialThumbler.bind('mousedown', function(event){
			b.model.bind('mouseup',function(event){
				if(event.which === 1) {
					if(b.specialThumbler.offset().top - event.pageY > -0.023*b.clientHeight && b.specialThumbler.offset().left - event.pageX < 0.2*b.clientWidth){
						b.specialThumblerValue = 4;
						b.specialThumbler.css('backgroundImage', 'url(\'images/thum_4.png\')');
						b.model.unbind('mouseup');}
					else if(event.pageY - b.specialThumbler.offset().top >= 0.07*b.clientHeight && b.specialThumbler.offset().left - event.pageX < 0.2*b.clientWidth){
						b.specialThumblerValue = 1;
						b.specialThumbler.css('backgroundImage', 'url(\'images/thum_1.png\')');
						b.model.unbind('mouseup');}
					else if(b.specialThumbler.offset().left - event.pageX >= -0.01*b.clientWidth && event.pageY - b.specialThumbler.offset().top <= b.clientHeight*0.08){b.specialThumblerValue = 2;
						b.specialThumbler.css('backgroundImage', 'url(\'images/thum_2.png\')');
						b.model.unbind('mouseup');}
					else{
						b.specialThumblerValue = 3;
						b.specialThumbler.css('backgroundImage', 'url(\'images/thum_3.png\')');
						b.model.unbind('mouseup');}
				}
		    	});
		b.checkAll();
	})
	b.model.mousemove(b.changeSpecialThumblerValue);
	b.thumblers.click(b.turn);
	b.switch3.mousedown(b.rotateSwitch_3);
	b.switch4.mousedown(b.rotateSwitch_4);
	b.switch5.mousedown(b.rotateSwitch_5);
	var lightKSV = null;
	b.checkAll=function(){
		if (appThumbler && b.thumbler_horValue === 1) {

		}else if(appThumbler && b.thumbler_horValue === 2){

		}else{

		}

		if (appThumbler) {
			if(lightKSV === null){
				lightKSV = setTimeout(function(){b.model.find(".light-indicators__KSV").css({'opacity': '1'});}, 6000)
			}
		}else{
			b.model.find(".light-indicators__KSV").css({'opacity': '0.4'});
			clearTimeout(lightKSV);
			lightKSV = null;
		};

		if(appThumbler && switch_4.switchCurrentValue!==0){
			b.model.find(".roll").html(switch_4.switchCurrentValue).css({'opacity': '1', 'font-size':'2em', 'color': 'red'});
		}else{b.model.find(".roll").html("").css({opacity: 0.4})}
		if(appThumbler && switch_5.switchCurrentValue!==0){
			b.model.find(".lither").html(switch_5.switchCurrentValue).css({'opacity': '1', 'font-size':'2em', 'color': 'red'});
		}else{b.model.find(".lither").html("").css({opacity: 0.4})}
	}
}
/*
 		b.thumbler_hor_2.click(function(){
 			b.thumbler_hor_2.addClass("thumbler_hor_2_off");
 		    b.thumbler_hor_2.removeClass("thumbler_hor_2");
 		    b.model.find('.indicator_3').css({"opacity":"1","color":"black"});
 			setTimeout(function(){b.thumbler_hor_2.addClass("thumbler_hor_2");
 			b.thumbler_hor_2.removeClass("thumbler_hor_2_off");
 		  	b.model.find('.indicator_3').css({"opacity":"0.6","color":"black"});}, 2000)})
*/
/*
 	 	b.changeThumbler_horValue = function(event){
 	 		if(event.which === 1){
			if(b.thumbler_horValue == 2){
				b.thumbler_horValue = 0;
				b.thumbler_hor.removeClass("thumbler_hor_pos2");
				b.thumbler_hor.addClass("thumbler_hor_off");
			}else if(b.thumbler_horValue == 0){
				b.thumbler_horValue = 1;
				b.thumbler_hor.removeClass("thumbler_hor_off");
				b.thumbler_hor.addClass("thumbler_hor_pos1")
			}else{}
			}else if(event.which === 3){
			if(b.thumbler_horValue == 1){
				b.thumbler_horValue = 0;
				b.thumbler_hor.removeClass("thumbler_hor_pos1");
				b.thumbler_hor.addClass("thumbler_hor_off");
			}
			else if(b.thumbler_horValue == 0){
				b.thumbler_horValue = 2;
				b.thumbler_hor.removeClass("thumbler_hor_off");
				b.thumbler_hor.addClass("thumbler_hor_pos2");
			}else{}
			}
			else{alert('press left or right button');}
		b.checkAll();}

 	 	b.thumbler_hor.mousedown(b.changeThumbler_horValue);
*/
/*b.changeSpecialThumblerValue = function(event) {
console.log(b.specialThumbler.offset().top-event.pageY)
		if(event.which === 1) {
			if(b.specialThumbler.offset().top-event.pageY > 0){
				b.specialThumblerValue = 4;
				b.specialThumbler.css('backgroundImage', 'url(\'images/thum_4.png\')');
			}else if(b.specialThumblerValue == 4){
				b.specialThumblerValue = 1;
				b.specialThumbler.css('backgroundImage', 'url(\'images/thum_1.png\')');
			}else{
				b.specialThumblerValue = 3;
				b.specialThumbler.css('backgroundImage', 'url(\'images/thum_3.png\')');
			}
		}

		else if(event.which === 3){
			if (b.specialThumblerValue == 3 || 1 || 4){
				b.specialThumblerValue = 2;
				b.specialThumbler.css('backgroundImage', 'url(\'images/thum_2.png\')');
			}else{b.specialThumblerValue = 3;
				b.specialThumbler.css('backgroundImage', 'url(\'images/thum_3.png\')');
			};
		}
		else{alert('press left or right button');}
		b.checkAll();
	};
*/