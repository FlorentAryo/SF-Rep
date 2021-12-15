({
    getAccount: function(component, event) {
        var action = component.get("c.getAccount");
        var recId = component.get("v.recordId");
        action.setParams({
            accId : recId
        }); 
        action.setCallback(this, function(response) {
            var state = response.getState();
            if (state === "SUCCESS") {
                var result = response.getReturnValue();
                console.log(result);
                component.set("v.acc", result);
                var acc = component.get("v.acc");
                console.log('account = '+acc);
                var sama = component.get("v.acc.Sama_dengan_alamat_KTP__c");
                
            }
        });
        $A.enqueueAction(action);
    },
    
    getProvincePicklist: function(component, event) {
        var action = component.get("c.getProvince");
        action.setCallback(this, function(response) {
            var state = response.getState();
            if (state === "SUCCESS") {
                var result = response.getReturnValue();
                var Provinsi = [];
                for(var key in result){
                    Provinsi.push({key: key, value: result[key]});
                }
                component.set("v.Propinsi", Provinsi);
            }
        });
        $A.enqueueAction(action);
    },
     
    getKotaPicklist1: function(component, event) {
        var helper = this;
        helper.getKotaPicklist(component, event);
    },
    getKotaPicklist: function(component, event) {
        var TipeWilayah = component.get("v.TipeWilayah");
        //var PropinsiKey = component.get("v.acc.Kode_Propinsi_"+TipeWilayah+"__pc"); 
        var PropinsiKey = $("#piceklisPropinsi"+TipeWilayah).val();
        component.set("v.acc.Kode_Propinsi_"+TipeWilayah+"__pc", PropinsiKey);
        
        console.log('emptying alamat');
        component.set("v.acc.Kode_Kota_"+TipeWilayah+"__pc", '');
        //component.set("v.Kota"+TipeWilayah, []);
        component.set("v.acc.Kode_Kecamatan_"+TipeWilayah+"__pc", '');
        //component.set("v.Kecamatan"+TipeWilayah, []);
        component.set("v.acc.Kode_Kelurahan_"+TipeWilayah+"__pc", '');
        //component.set("v.Kelurahan"+TipeWilayah, []);
        
        //var kodeprop = component.get("v.acc.Kode_Propinsi_"+TipeWilayah+"__pc");
        console.log("idprop "+PropinsiKey);
        var action = component.get("c.getKotaKabupaten");
        action.setParams({
            idProvince : PropinsiKey
        }); 
        
        action.setCallback(this, function(response) {
            var state = response.getState();            
            if (state === "SUCCESS") {
                var result = response.getReturnValue();
                var Kota = [];
                for(var key in result){
                    Kota.push({key: key, value: result[key]});
                }
                if(Kota.length > 0){
                    component.set("v.Kota"+TipeWilayah, Kota);
                    console.log("v.Kota"+TipeWilayah+" " + Kota);
                	component.set("v.toggleKota"+TipeWilayah, 'block');
                }else{
                    console.log('emptying alamat');
                    component.set("v.acc.Kode_Kota_"+TipeWilayah+"__pc", '');
                    component.set("v.Kota"+TipeWilayah, []);
                    component.set("v.acc.Kode_Kecamatan_"+TipeWilayah+"__pc", '');
                    component.set("v.Kecamatan"+TipeWilayah, []);
                    component.set("v.acc.Kode_Kelurahan_"+TipeWilayah+"__pc", '');
                    component.set("v.Kelurahan"+TipeWilayah, []);
                }
                
            }
        });        
        $A.getCallback(function() {
        	$A.enqueueAction(action);
        })();
    },
    getKecamatanPicklist: function(component, event) {
        var TipeWilayah = component.get("v.TipeWilayah");
        //var KotaKey = component.get("v.acc.Kode_Kota_"+TipeWilayah+"__pc");
        var KotaKey = $("#piceklisKota"+TipeWilayah).val();
        component.set("v.acc.Kode_Kota_"+TipeWilayah+"__pc", KotaKey);
        
        console.log('emptying alamat');
        component.set("v.acc.Kode_Kecamatan_"+TipeWilayah+"__pc", '');
        //component.set("v.Kecamatan"+TipeWilayah, []);
        component.set("v.acc.Kode_Kelurahan_"+TipeWilayah+"__pc", '');
        //component.set("v.Kelurahan"+TipeWilayah, []);
        
        var action = component.get("c.getKecamatan");
        action.setParams({
            idKota : KotaKey
        });
        action.setCallback(this, function(response) {
            var state = response.getState();
            if (state === "SUCCESS") {
                var result = response.getReturnValue();
                var Kecamatan = [];
                for(var key in result){
                    Kecamatan.push({key: key, value: result[key]});
                }
                if(Kecamatan.length > 0){
                    component.set("v.Kecamatan"+TipeWilayah, Kecamatan);
                	component.set("v.toggleKecamatan"+TipeWilayah, 'display:block;');
                }else{
                    console.log('emptying alamat');
                    component.set("v.acc.Kode_Kecamatan_"+TipeWilayah+"__pc", '');
                    component.set("v.Kecamatan"+TipeWilayah, []);
                    component.set("v.acc.Kode_Kelurahan_"+TipeWilayah+"__pc", '');
                    component.set("v.Kelurahan"+TipeWilayah, []);
                }
                
            }
        });
        $A.getCallback(function() {
        	$A.enqueueAction(action);
        })();        
    },
    getKelurahanPicklist: function(component, event) {
        var TipeWilayah = component.get("v.TipeWilayah");
        //var KecamatanKey = component.get("v.acc.Kode_Kecamatan_"+TipeWilayah+"__pc");
        var KecamatanKey = $("#piceklisKecamatan"+TipeWilayah).val();
        component.set("v.acc.Kode_Kecamatan_"+TipeWilayah+"__pc", KecamatanKey);
        console.log('idkecamatan '+KecamatanKey);
        
        console.log('emptying alamat');
        component.set("v.acc.Kode_Kelurahan_"+TipeWilayah+"__pc", '');
        //component.set("v.Kelurahan"+TipeWilayah, []);
        
        var action = component.get("c.getKelurahan");
        action.setParams({
            idKecamatan : KecamatanKey
        });
        action.setCallback(this, function(response) {
            var state = response.getState();
            if (state === "SUCCESS") {
                var result = response.getReturnValue();
                var Kelurahan = [];
                for(var key in result){
                    Kelurahan.push({key: key, value: result[key]});
                }
                if(Kelurahan.length > 0){
                    component.set("v.Kelurahan"+TipeWilayah, Kelurahan);
                	component.set("v.toggleKelurahan"+TipeWilayah, 'block');
                }else{
                    console.log('emptying alamat');
                    component.set("v.acc.Kode_Kelurahan_"+TipeWilayah+"__pc", '');
                    component.set("v.Kelurahan"+TipeWilayah, []);
                }
                
            }
        });
        $A.getCallback(function() {
        	$A.enqueueAction(action);
        })();         
    },
    //handle Account Save
    saveAccount : function(component, event) {
        var acc = component.get("v.acc");
        console.log('acc = '+acc);
        var action = component.get("c.createAccount");
        action.setParams({
            objacc : acc
        });
        action.setCallback(this,function(response){
            var state = response.getState();
            if(state === "SUCCESS"){
                //alert('Record is Created Successfully');
                var result = response.getReturnValue();
                if(result){
                    var navEvt = $A.get("e.force:navigateToSObject");
                    navEvt.setParams({
                      "recordId": result,
                      "slideDevName": "detail"
                    });
                    navEvt.fire();
                    var dismissActionPanel = $A.get("e.force:closeQuickAction");
        			dismissActionPanel.fire();
                }
            } else if(state === "ERROR"){
                var errors = action.getError();
                if (errors) {
                    if (errors[0] && errors[0].message) {
                        alert(errors[0].message);
                    }
                }
            }else if (status === "INCOMPLETE") {
                alert('No response from server or client is offline.');
            }
        });       
        $A.enqueueAction(action);
    },
    serverSideCall : function(component,action) {
        return new Promise(function(resolve, reject) { 
            action.setCallback(this, 
                               function(response) {
                                   var state = response.getState();
                                   if (state === "SUCCESS") {
                                       resolve(response.getReturnValue());
                                   } else {
                                       reject(new Error(response.getError()));
                                   }
                               }); 
            $A.enqueueAction(action);
        });
    },
})
