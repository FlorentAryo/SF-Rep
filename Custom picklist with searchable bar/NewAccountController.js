({
    //Load Account Industry Picklist
    doInit: function(component, event, helper) {   
		var recId = component.get("v.recordId");        
        if(recId){
            helper.getAccount(component, event);
        }
    },
    
    SamaChange : function(component, event, helper) {
        var componentTarget = component.find('AlamatRumah');
        $A.util.toggleClass(componentTarget, 'toggle');
        var componentTarget2 = component.find('AlamatRumahDetail');
        $A.util.toggleClass(componentTarget2, 'toggle');
        var componentTarget2 = component.find('KodePosRumah');
        $A.util.toggleClass(componentTarget2, 'toggle');
        /*var PropinsiKTP = component.get("v.acc.Kode_Propinsi_KTP__pc");
        console.log('prop '+PropinsiKTP);
        var KotaKTP = component.get("v.acc.Kode_Kota_KTP__pc");
        console.log('kota '+KotaKTP);
        var KecamatanKTP = component.get("v.acc.Kode_Kecamatan_KTP__pc");
        console.log('kecamatan '+KecamatanKTP);
        var KelurahanKTP = component.get("v.acc.Kode_Kelurahan_KTP__pc");
        console.log('kelurahan '+KelurahanKTP);
        component.set("v.acc.Kode_Propinsi_Rumah__pc", PropinsiKTP);
        component.set("v.acc.Kode_Kota_Rumah__pc", KotaKTP);
        component.set("v.acc.Kode_Kecamatan_Rumah__pc", KecamatanKTP);
        component.set("v.acc.Kode_Kelurahan_Rumah__pc", KelurahanKTP);*/
    },

    
    handleAccountSave : function(component, event, helper) {
        if(component.find("LastName").get("v.value")) {
            helper.saveAccount(component, event);
        } else {
            alert('Last Name is required');
            component.find("LastName").set("v.errors", [{message:"A value is required"}]);
            component.find("LastNameDiv").getElement().focus();
        }        
    },
    
    loadJquery : function(component, event, helper) {
        
        jQuery(document).ready(function(){
            $(".select2Class").select2({
           		placeholder: "Select here"
       		}); 
            console.log('loaded');   

            //var myCmp = component.find("24:0");
            //$A.util.removeClass(myCmp, "slds-select");
        	//$A.util.addClass(myCmp, "select2Class");
            //console.log('class added');
            helper.getProvincePicklist(component, event);
            console.log('getProvincePicklist');            
            
            $('#piceklisPropinsiKTP').on('change', function (e) {
                component.set("v.TipeWilayah", "KTP");
                console.log('getKotaPicklist');
                helper.getKotaPicklist(component, event);
            });
            
            $('#piceklisKotaKTP').on('change', function (e) {
                component.set("v.TipeWilayah", "KTP");
                helper.getKecamatanPicklist(component, event);
            });
            
            $('#piceklisKecamatanKTP').on('change', function (e) {
                component.set("v.TipeWilayah", "KTP");
                helper.getKelurahanPicklist(component, event);
            });
            
            $('#piceklisKelurahanKTP').on('change', function (e) {
                component.set("v.TipeWilayah", "KTP");
                var TipeWilayah = component.get("v.TipeWilayah");
                var KelurahanKey = $("#piceklisKelurahan"+TipeWilayah).val();
                component.set("v.acc.Kode_Kelurahan_"+TipeWilayah+"__pc", KelurahanKey);
                console.log(KelurahanKey);
            });
            
            $('#piceklisPropinsiRumah').on('change', function (e) {
                component.set("v.TipeWilayah", "Rumah");
                helper.getKotaPicklist(component, event);
            });
            
            $('#piceklisKotaRumah').on('change', function (e) {
                component.set("v.TipeWilayah", "Rumah");
                helper.getKecamatanPicklist(component, event);
            });
            
            $('#piceklisKecamatanRumah').on('change', function (e) {
                component.set("v.TipeWilayah", "Rumah");
                helper.getKelurahanPicklist(component, event);
            });
            
            $('#piceklisKelurahanRumah').on('change', function (e) {
                component.set("v.TipeWilayah", "Rumah");
                var TipeWilayah = component.get("v.TipeWilayah");
                var KelurahanKey = $("#piceklisKelurahan"+TipeWilayah).val();
                component.set("v.acc.Kode_Kelurahan_"+TipeWilayah+"__pc", KelurahanKey);
            });
            
            $('#piceklisPropinsiKantor').on('change', function (e) {
                component.set("v.TipeWilayah", "Kantor");
                helper.getKotaPicklist(component, event);
            });
            
            $('#piceklisKotaKantor').on('change', function (e) {
                component.set("v.TipeWilayah", "Kantor");
                helper.getKecamatanPicklist(component, event);
            });
            
            $('#piceklisKecamatanKantor').on('change', function (e) {
                component.set("v.TipeWilayah", "Kantor");
                helper.getKelurahanPicklist(component, event);
            });
            
            $('#piceklisKelurahanKantor').on('change', function (e) {
                component.set("v.TipeWilayah", "Kantor");
                var TipeWilayah = component.get("v.TipeWilayah");
                var KelurahanKey = $("#piceklisKelurahan"+TipeWilayah).val();
                component.set("v.acc.Kode_Kelurahan_"+TipeWilayah+"__pc", KelurahanKey);
            });
            
            $('#piceklisPropinsiSurat').on('change', function (e) {
                component.set("v.TipeWilayah", "Surat");
                helper.getKotaPicklist(component, event);
            });
            
            $('#piceklisKotaSurat').on('change', function (e) {
                component.set("v.TipeWilayah", "Surat");
                helper.getKecamatanPicklist(component, event);
            });
            
            $('#piceklisKecamatanSurat').on('change', function (e) {
                component.set("v.TipeWilayah", "Surat");
                helper.getKelurahanPicklist(component, event);
            });
            
            $('#piceklisKelurahanSurat').on('change', function (e) {
                component.set("v.TipeWilayah", "Surat");
                var TipeWilayah = component.get("v.TipeWilayah");
                var KelurahanKey = $("#piceklisKelurahan"+TipeWilayah).val();
                component.set("v.acc.Kode_Kelurahan_"+TipeWilayah+"__pc", KelurahanKey);
            });
            
            $('#piceklisPropinsiApps').on('change', function (e) {
                component.set("v.TipeWilayah", "Apps");
                helper.getKotaPicklist(component, event);
            });
            
            $('#piceklisKotaApps').on('change', function (e) {
                component.set("v.TipeWilayah", "Apps");
                helper.getKecamatanPicklist(component, event);
            });
            
            $('#piceklisKecamatanApps').on('change', function (e) {
                component.set("v.TipeWilayah", "Apps");
                helper.getKelurahanPicklist(component, event);
            });
            
            $('#piceklisKelurahanApps').on('change', function (e) {
                component.set("v.TipeWilayah", "Apps");
                var TipeWilayah = component.get("v.TipeWilayah");
                var KelurahanKey = $("#piceklisKelurahan"+TipeWilayah).val();
                component.set("v.acc.Kode_Kelurahan_"+TipeWilayah+"__pc", KelurahanKey);
            });
            $('#piceklisKelurahanKantor').on('change', function (e) {
                component.set("v.TipeWilayah", "Kantor");
                var TipeWilayah = component.get("v.TipeWilayah");
                var KelurahanKey = $("#piceklisKelurahan"+TipeWilayah).val();
                component.set("v.acc.Kode_Kelurahan_"+TipeWilayah+"__pc", KelurahanKey);
            });
            $('#piceklisKelurahanRumah').on('change', function (e) {
                component.set("v.TipeWilayah", "Rumah");
                var TipeWilayah = component.get("v.TipeWilayah");
                var KelurahanKey = $("#piceklisKelurahan"+TipeWilayah).val();
                component.set("v.acc.Kode_Kelurahan_"+TipeWilayah+"__pc", KelurahanKey);
            });
            $('#piceklisKelurahanSurat').on('change', function (e) {
                component.set("v.TipeWilayah", "Surat");
                var TipeWilayah = component.get("v.TipeWilayah");
                var KelurahanKey = $("#piceklisKelurahan"+TipeWilayah).val();
                component.set("v.acc.Kode_Kelurahan_"+TipeWilayah+"__pc", KelurahanKey);
            });
            $('#piceklisKelurahanKTP').on('change', function (e) {
                component.set("v.TipeWilayah", "KTP");
                var TipeWilayah = component.get("v.TipeWilayah");
                var KelurahanKey = $("#piceklisKelurahan"+TipeWilayah).val();
                component.set("v.acc.Kode_Kelurahan_"+TipeWilayah+"__pc", KelurahanKey);
            });
            
        });
        
    }
})
