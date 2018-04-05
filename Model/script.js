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
$(window).keypress(function(e){
    if(e.which == 50) {
          $('.wrapper_2').css({'display': 'block'});
          $('.wrapper').css({'display': 'none'});}
	else if(e.which == 49){
	      $('.wrapper').css({'display': 'block'});
	      $('.wrapper_2').css({'display': 'none'});}
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
		
		adaptWindow(b.model);
 		setFalse(b.thumblersValue);

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
				if(b.thumblersValue[arrow.moveCondition[i]] == true){}else{condition = false; break;}
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
		b.rotateArrows_3 = function(){b.rotateArrows(b.arrow3)}
 
		b.checkAll = function() {
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

		if(b.thumblersValue[0] && b.thumblersValue[1]){b.model.find('#in8').css('background', 'rgb(247, 255, 165)');}
						else{b.model.find('#in8').css('background','rgb(230,230,230)');}
		if(b.thumblersValue[9] && b.thumblersValue[10]){b.model.find('#in6').css('background', 'rgb(247, 255, 165)');}
						else{b.model.find('#in6').css('background','rgb(230,230,230)');}
		if(b.thumblersValue[4] && b.thumblersValue[5] && b.thumblersValue[6]){b.model.find('#in3').css('background', 'rgb(247, 255, 165)');}
						else{b.model.find('#in3').css('background','rgb(230,230,230)');}
		if(b.thumblersValue[11] && b.thumblersValue[12]){b.model.find('#in7').css('background', 'rgb(247, 255, 165)');}
						else{b.model.find('#in7').css('background','rgb(230,230,230)');}
		if(b.thumblersValue[7] && b.thumblersValue[8]){b.model.find('#in4').css('background', 'rgb(247, 255, 165)');}
						else{b.model.find('#in4	').css('background','rgb(230,230,230)');}
		if(b.thumblersValue[9] && b.thumblersValue[10] && (switch_2.switchCurrentValue !==0 ) && switch_1.switchCurrentValue === 2){
			b.rotatePowerArrow();}
		else if(b.thumblersValue[11] && b.thumblersValue[12] && (switch_2.switchCurrentValue <5 && switch_2.switchCurrentValue !==0) && switch_1.switchCurrentValue  === 4){
			b.rotatePowerArrow();}
		else{b.arrow.css({
					'-moz-transform': 'rotate(-45 deg)', 
					'-ms-transform' : 'rotate(-45 deg)', 
					'-webkit-transform': 'rotate(-45 deg)', 
					'-o-transform': 'rotate(-45deg)', 
					'transform': 'rotate(-45deg)'
				});
		}
	};

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
    	b.thumblers = b.model.find('.thumbler__off_2');
    	b.thumblersValue=[];
		b.thumblersValue.length = b.thumblers.length;
    	b.switch3 = b.model.find('#switch3');
    	b.specialThumblerValue = 3;
    	b.specialThumbler = b.model.find('.thumbler__off_special');
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
    	b.thumbler_hor_2 = b.model.find(".thumbler_hor_2")
    	b.rot1Angle = 0;
 		b.rot2Angle = 0;
 		b.rot3Angle = 0;
 		b.rot4Angle = 0;
 		b.rot5Angle = 0;
 		b.hw1Angle = 0;
 		b.hw2Angle = 0;
		adaptWindow(b.model);
 		setFalse(b.thumblersValue);
 	 	
 		b.thumbler_hor_2.click(function(){
 			b.thumbler_hor_2.addClass("thumbler_hor_2_off");
 		    b.thumbler_hor_2.removeClass("thumbler_hor_2");
 		    b.model.find('.indicator_3').css({"opacity":"1"});
 			setTimeout(function(){b.thumbler_hor_2.addClass("thumbler_hor_2"); 
 			b.thumbler_hor_2.removeClass("thumbler_hor_2_off");
 		  	b.model.find('.indicator_3').css({"opacity":"0.6","color":"black"});}, 2000)})
 	 	b.thumbler_hor.click(function(){b.thumbler_hor.toggleClass("thumbler_hor_off")});
 		b.KButton.click(function(){$(this).toggleClass("k-button_clicked")});
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
			b.rot3Angle -= 1;
				b.rot3.css({
					'-moz-transform': 'rotate('+b.rot3Angle+'deg)', 
					'-ms-transform' : 'rotate('+b.rot3Angle+'deg)', 
					'-webkit-transform': 'rotate('+b.rot3Angle+'deg)', 
					'-o-transform': 'rotate('+b.rot3Angle + 'deg)', 
					'transform': 'rotate('+b.rot3Angle + 'deg)'});
			}
		else if(event.which === 3){
			b.rot3Angle += 1;
				b.rot3.css({
					'-moz-transform': 'rotate('+b.rot3Angle+'deg)', 
					'-ms-transform' : 'rotate('+b.rot3Angle+'deg)', 
					'-webkit-transform': 'rotate('+b.rot3Angle+'deg)', 
					'-o-transform': 'rotate('+b.rot3Angle+'deg)', 
					'transform': 'rotate('+b.rot3Angle+'deg)'});
		 	}
		else{alert('press left or right button');}}, 6);
		document.onmouseup = function(){clearInterval(window.spin3)};
	};
	b.changeRot4Position = function(event){
 		spin4 = setInterval(function(){
		if(event.which === 1) {
			b.rot4Angle -= 1;
				b.rot4.css({
					'-moz-transform': 'rotate('+b.rot4Angle+'deg)', 
					'-ms-transform' : 'rotate('+b.rot4Angle+'deg)', 
					'-webkit-transform': 'rotate('+b.rot4Angle+'deg)', 
					'-o-transform': 'rotate('+b.rot4Angle + 'deg)', 
					'transform': 'rotate('+b.rot4Angle + 'deg)'});
			}
		else if(event.which === 3){
			b.rot4Angle += 1;
				b.rot4.css({
					'-moz-transform': 'rotate('+b.rot4Angle+'deg)', 
					'-ms-transform' : 'rotate('+b.rot4Angle+'deg)', 
					'-webkit-transform': 'rotate('+b.rot4Angle+'deg)', 
					'-o-transform': 'rotate('+b.rot4Angle+'deg)', 
					'transform': 'rotate('+b.rot4Angle+'deg)'});
		 	}
		else{alert('press left or right button');}}, 6);
		document.onmouseup = function(){clearInterval(window.spin4)};
	};
	b.changeRot5Position = function(event){
 		spin5 = setInterval(function(){
		if(event.which === 1) {
			b.rot5Angle -= 1;
				b.rot5.css({
					'-moz-transform': 'rotate('+b.rot5Angle+'deg)', 
					'-ms-transform' : 'rotate('+b.rot5Angle+'deg)', 
					'-webkit-transform': 'rotate('+b.rot5Angle+'deg)', 
					'-o-transform': 'rotate('+b.rot5Angle + 'deg)', 
					'transform': 'rotate('+b.rot5Angle + 'deg)'});
			}
		else if(event.which === 3){
			b.rot5Angle += 1;
				b.rot5.css({
					'-moz-transform': 'rotate('+b.rot5Angle+'deg)', 
					'-ms-transform' : 'rotate('+b.rot5Angle+'deg)', 
					'-webkit-transform': 'rotate('+b.rot5Angle+'deg)', 
					'-o-transform': 'rotate('+b.rot5Angle+'deg)', 
					'transform': 'rotate('+b.rot5Angle+'deg)'});
		 	}
		else{alert('press left or right button');}}, 6);
		document.onmouseup = function(){clearInterval(window.spin5)};
	};
	b.changeHW1Position = function(event){
 		spin6 = setInterval(function(){
		if(event.which === 1) {
			b.hw1Angle -= 1;
				b.hw1.css({
					'-moz-transform': 'rotate('+b.hw1Angle+'deg)', 
					'-ms-transform' : 'rotate('+b.hw1Angle+'deg)', 
					'-webkit-transform': 'rotate('+b.hw1Angle+'deg)', 
					'-o-transform': 'rotate('+b.hw1Angle + 'deg)', 
					'transform': 'rotate('+b.hw1Angle + 'deg)'});
			}
		else if(event.which === 3){
			b.hw1Angle += 1;
				b.hw1.css({
					'-moz-transform': 'rotate('+b.hw1Angle+'deg)', 
					'-ms-transform' : 'rotate('+b.hw1Angle+'deg)', 
					'-webkit-transform': 'rotate('+b.hw1Angle+'deg)', 
					'-o-transform': 'rotate('+b.hw1Angle+'deg)', 
					'transform': 'rotate('+b.hw1Angle+'deg)'});
		 	}
		else{alert('press left or right button');}}, 6);
		document.onmouseup = function(){clearInterval(window.spin6)};
	};
	b.changeHW2Position = function(event){
 		spin7 = setInterval(function(){
		if(event.which === 1) {
			b.hw2Angle -= 1;
				b.hw2.css({
					'-moz-transform': 'rotate('+b.hw2Angle+'deg)', 
					'-ms-transform' : 'rotate('+b.hw2Angle+'deg)', 
					'-webkit-transform': 'rotate('+b.hw2Angle+'deg)', 
					'-o-transform': 'rotate('+b.hw2Angle + 'deg)', 
					'transform': 'rotate('+b.hw2Angle + 'deg)'});
			}
		else if(event.which === 3){
			b.hw2Angle += 1;
				b.hw2.css({
					'-moz-transform': 'rotate('+b.hw2Angle+'deg)', 
					'-ms-transform' : 'rotate('+b.hw2Angle+'deg)', 
					'-webkit-transform': 'rotate('+b.hw2Angle+'deg)', 
					'-o-transform': 'rotate('+b.hw2Angle+'deg)', 
					'transform': 'rotate('+b.hw2Angle+'deg)'});
		 	}
		else{alert('press left or right button');}}, 6);
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
  	switch_4 = new switchModel(0, 3, 30, 40, b.model.find('#switch4'));
  	switch_5 = new switchModel(0, 7, -30, 30, b.model.find('#switch5'));
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

		b.checkAll();
	};

	b.rotateSwitch_3 = function(event){changeSwitchPosition(switch_3, b.checkAll, event)};
	b.rotateSwitch_4 = function(event){changeSwitchPosition(switch_4, b.checkAll, event)};
	b.rotateSwitch_5 = function(event){changeSwitchPosition(switch_5, b.checkAll, event)};


	b.changeSpecialThumblerValue = function(event) {
		if(event.which === 1) {
			if(b.specialThumblerValue == 3){
				b.specialThumblerValue = 4;
				b.specialThumbler.css('backgroundImage', 'url(\'thum_4.png\')');
			}else if(b.specialThumblerValue == 4){
				b.specialThumblerValue = 1;	
				b.specialThumbler.css('backgroundImage', 'url(\'thum_1.png\')');
			}else{
				b.specialThumblerValue = 3;
				b.specialThumbler.css('backgroundImage', 'url(\'thum_3.png\')');
			}
		}
		else if(event.which === 3){
			if (b.specialThumblerValue == 3 || 1 || 4){
				b.specialThumblerValue = 2;	
				b.specialThumbler.css('backgroundImage', 'url(\'thum_2.png\')');
			}else{b.specialThumblerValue = 3
				b.specialThumbler.css('backgroundImage', 'url(\'thum_3.png\')');
			};
		}
		else{alert('press left or right button');}
					
		b.checkAll();
	};					
	b.specialThumbler.mousedown(b.changeSpecialThumblerValue);		
	b.thumblers.click(b.turn);
	b.switch3.mousedown(b.rotateSwitch_3);
	b.switch4.mousedown(b.rotateSwitch_4);
	b.switch5.mousedown(b.rotateSwitch_5);
	b.checkAll=function(){}
}
