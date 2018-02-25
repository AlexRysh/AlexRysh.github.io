function Calc(sSelector) {
    var b = this;
    b.model = $(sSelector);
    b.jqCalc = b.model.find('.calcForm');
    b.jqPm = b.model.find('#P_m');
    b.jqPapst = b.model.find('#P_apst');
    b.jqPe = b.model.find('#P_e');
    b.jqEi = b.model.find('#E_i');
    b.jqKsi = b.model.find('#Ksi');
    b.jqM = b.model.find('#M');
    b.jqF = b.model.find('#F');
    b.jqV = b.model.find('#V');
    b.R = 8314;
    b.jqT = b.model.find('#T');
    b.jqMi = b.model.find('#M_i');
    b.jqS = b.model.find('#S');
    b.changeText = function(){
  		    if (b.model.find(".chooseWhatToInput :selected").val() == 2) {
  		    	b.model.find(".changingText").text('Абсолютное начальное давление горючей смеси в аппарате, при котором происходит инициирование горения. Па');
  		    }else{
  		    	b.model.find(".changingText").text('Площадь разгерметизации (сбросного сечения).');
  		    }
    }
    
    $(window).ready(b.changeText);
  	b.model.find('.chooseWhatToInput').change(b.changeText);
    b.Start = function() {
        b.PmValue = b.jqPm.val();
        b.PapstValue = b.jqPapst.val();
        b.PeValue = b.jqPe.val();
        b.EiValue = b.jqEi.val();
        b.KsiValue = b.jqKsi.val();
        b.MValue = b.jqM.val();
        b.ForPiValue = b.jqF.val();
        b.VValue = b.jqV.val();
        b.TValue = b.jqT.val();
        b.MiValue = b.jqMi.val();
    	b.SValue = b.jqS.val();
    	if (b.model.find(".chooseWhatToInput :selected").val() == 2){
    		b.Pi_m = b.PmValue/b.ForPiValue;	
        	b.Pi_e = b.PeValue/b.ForPiValue;

        	if (b.Pi_m>1 && b.Pi_m < b.Pi_e){
         		b.F = (0.9*b.KsiValue*(b.Pi_e - b.Pi_m)/Math.pow(b.EiValue, 0.5))/((1/Math.pow(36*Math.PI, 0.333))*(b.MValue/Math.pow(b.VValue, 0.667))*Math.pow((b.R*b.TValue/b.MiValue), 0.5)*(1/b.SValue));
        	}
        		else if(b.Pi_m > 1 && b.Pi_m <= 2 && b.PmValue > 2*b.PapstValue){
        			b.F = (b.KsiValue*(b.EiValue-1)/Math.pow(b.EiValue, 0.5))/((1/Math.pow(36*Math.PI, 0.333))*(b.MValue/Math.pow(b.VValue, 0.667))*Math.pow((b.R*b.TValue/b.MiValue), 0.5)*(1/b.SValue));
        		}
        			else{
        				b.F = (b.KsiValue*(b.EiValue-1)/Math.pow(b.EiValue*(b.Pi_m-1), 0.5))/((1/Math.pow(36*Math.PI, 0.333))*(b.MValue/Math.pow(b.VValue, 0.667))*Math.pow((b.R*b.TValue/b.MiValue), 0.5)*(1/b.SValue));
        			}
        alert("Площадь сбросного сечения (разгерметизации) не должна быть меньше чем " + b.F.toFixed(4) + "м2");
    	}
    	else{
    		b.W = (1/Math.pow(36*Math.PI, 0.333))*((b.MValue*b.ForPiValue)/Math.pow(b.VValue, 0.667))*Math.pow((b.R*b.TValue/b.MiValue), 0.5)*(1/b.SValue);
    		b.Pi = (0.9*b.KsiValue*(b.PeValue-b.PmValue))/(b.W*Math.pow(b.EiValue,0.5));
    		b.Pi_m = b.PmValue/b.Pi;	
        	b.Pi_e = b.PeValue/b.Pi;
    		if(b.Pi_m > 1 && b.Pi_m < b.Pi_e){alert("Абсолютное начальное давление горючей смеси в аппарате не должно быть меньше чем "+b.Pi.toFixed(4)+"Па")}
    		else{
				b.Pi = b.PmValue/(Math.pow((b.KsiValue*(b.EiValue-1)/b.W),2)/b.EiValue+1);
				alert("Абсолютное начальное давление горючей смеси в аппарате не должно быть больше чем "+b.Pi.toFixed(4)+"Па")
    		}
    	} 
    }
    b.jqCalc.on('submit', b.Start);
}		