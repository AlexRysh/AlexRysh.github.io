function Calc(sSelector) {
    var b = this;
    b.model = $(sSelector);
    b.jqCalc = b.model.find('.calcForm');
    b.jqPm = b.model.find('#P_m');
    b.jqPapst = b.model.find('#P_apst');
    b.jqPe = b.model.find('#P_e');
    b.jqKsi = b.model.find('#Ksi');
    b.jqM = b.model.find('#M');
    b.jqF = b.model.find('#F');
    b.jqV = b.model.find('#V');
    b.R = 8314;
    b.jqT = b.model.find('#T');
    b.jqS = b.model.find('#S');
    b.jqVabs = b.model.find("#V_vassel");
    b.M = 0.61;
    b.model.find("#M").val(b.M);
    b.changeM = function(){
        if(b.model.find("#M").attr('disabled')){
            b.M = 0.61;
            b.model.find("#M").val(b.M);
            b.model.find("#M").removeAttr('disabled');
            b.model.find("#M").attr('type', 'number');
        }
        else{
            b.model.find("#M").attr('disabled',true);
            b.model.find("#M").attr('type', 'text');
        }
    }
    b.model.find("#blowOfLine").change(b.changeM);
    $(window).ready(b.changeM);
    b.setValues = function(){
        b.Pi_eValue = Number(b.model.find(".typeOfGass :selected").attr("data-PiE"));
        b.EiValue = Number(b.model.find(".typeOfGass :selected").attr("data-Ei"));
        b.MiValue = Number(b.model.find(".typeOfGass :selected").attr("data-M"));
        b.model.find('#M_i').val(b.MiValue);
        b.model.find('#E_i').val(b.EiValue);
        b.model.find('#Pi_E').val(b.Pi_eValue);
    }
    b.model.find('.typeOfGass').change(b.setValues);
    $(window).ready(b.setValues);
    b.Start = function () {        
        b.VaValue = b.jqVabs.val();
        b.PmValue = b.jqPm.val();
        b.PapstValue = b.jqPapst.val();
        b.PeValue = b.jqPe.val();
        b.MValue = b.jqM.val();
        b.FValue = b.jqF.val();
        b.VValue = b.jqV.val();
        b.TValue = b.jqT.val();
        b.SValue = b.jqS.val();
           b.P_i = b.PeValue/b.Pi_eValue;
           b.Pi_m = b.PmValue/b.P_i;
           if(b.model.find("#blowOfLine").prop("checked")){
            b.isBlowOfLine = true
            }else{b.isBlowOfLine = false}
           if(b.model.find("#withIrrigationOfExpiringGases").prop("checked")){
            b.withIrrigationOfExpiringGases = true}
           else{ b.withIrrigationOfExpiringGases = false}
           if(b.model.find("#defaultOpen").prop("checked")){
           b.defaultOpen = true}
           else{
            b.defaultOpen =false
           }
           if( b.VaValue  <= 10 && b.FValue/(Math.pow(b.VaValue,0.667)) <= 0.25){
                b.a1 = 0.15;
                b.a2 = 4;
                b.a3 = 1;
                b.a4 = 0;
            }
            else if(b.VaValue  <= 200 && b.Pi_m>1 && b.Pi_m <= 2){
                if(b.defaultOpen) {
                    b.a1 = 0;
                    b.a2 = 0;
                    b.a3 = 2;
                    b.a4 = 0;
                }else{
                    b.a1 = 0;
                    b.a2 = 0;
                    b.a3 = 8;
                    b.a4 = 0;
                }
            }
            else if( b.VaValue  <= 200 && b.Pi_m>2 && b.Pi_m <= b.Pi_eValue ){
                if(b.defaultOpen){
                    b.a1 = 0;
                    b.a2 = 0;
                    b.a3 = 0.8;
                    b.a4 = 1.2;
                }else{
                    b.a1 = 0;
                    b.a2 = 0;
                    b.a3 = 2;
                    b.a4 = 6;
                }
            }
            else if( b.VaValue <= 10 && b.FValue/(Math.pow(b.VaValue,0.667)) <= 0.04 && (1 < b.Pi_m < 2) && b.isBlowOfLine ){
                if(b.withIrrigationOfExpiringGases){
                    b.a1 = 0.15;
                    b.a2 = 4;
                    b.a3 = 1;
                    b.a4 = 0;
                }else{
                    b.a1 = 0;
                    b.a2 = 0;
                    b.a3 = 4;
                    b.a4 = 0;
                }
            }
            else{return alert('Ошибка в исходных значениях (невозможно вычислить χ)');}
                b.KsiValue = (1 + b.a1*b.VaValue)*(1+b.a2 * b.FValue/Math.pow(b.VaValue,0.667))*(b.a3+b.a4*(b.Pi_eValue-b.Pi_m)/(b.Pi_eValue-2));
                b.jqKsi.val(b.KsiValue);
                b.W = (1 / Math.pow(36 * Math.PI, 0.333)) * ((b.MValue * b.FValue) / Math.pow(b.VValue, 0.667)) * Math.pow((b.R * b.TValue / b.MiValue), 0.5) * (1 / b.SValue);
                if(b.Pi_m > 2 && b.Pi_m < b.Pi_eValue){b.RightPart = 0.9*b.KsiValue*(b.Pi_eValue-b.Pi_m)/Math.pow(b.EiValue,0.5)}
                    else if(b.Pi_m > 1 && b.Pi_m <= 2 && b.PmValue > 2*b.PapstValue){b.RightPart = b.KsiValue*(b.EiValue - 1)/Math.pow(b.EiValue,0.5)} 
                            else{b.RightPart = b.KsiValue*(b.EiValue - 1)/Math.pow((b.EiValue*(b.PmValue-1)),0.5)}
            if (b.W >= b.RightPart){alert("Оборудование безопасно")}else{alert("оборудование небезопасно")};
        console.log(b.W);
        console.log(b.RightPart);
        return false
    };
    b.jqCalc.on('submit', b.Start);
}		