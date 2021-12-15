({
    loadInputTel : function(component, event, helper) {
        window.setTimeout(
            $A.getCallback(function() {
                jQuery(document).ready(function(){
                    console.log('here 2');
                    component.set('v.ShowDialCode', true);
                    $("#phone3").intlTelInput({
                        allowExtensions: true,
                        autoFormat: true,
                        autoHideDialCode: false,
                        autoPlaceholder: false,
                        defaultCountry: "auto",
                        ipinfoToken: "yolo",
                        //nationalMode: false,
                        numberType: "MOBILE",
                        //onlyCountries: ['us', 'gb', 'ch', 'ca', 'do'],
                        preferredCountries: ['id'],
                        preventInvalidNumbers: true,
                        utilsScript: $A.get("$Resource.InputTelV11") + "/intl-tel-input-11.0.0/build/js/utils.js"
                        //utilsScript: "https://cdnjs.cloudflare.com/ajax/libs/intl-tel-input/11.0.0/js/utils.js"
                    });
                    $("#phone4").intlTelInput({
                        allowExtensions: true,
                        autoFormat: true,
                        autoHideDialCode: false,
                        autoPlaceholder: false,
                        defaultCountry: "auto",
                        ipinfoToken: "yolo",
                        //nationalMode: false,
                        numberType: "MOBILE",
                        //onlyCountries: ['us', 'gb', 'ch', 'ca', 'do'],
                        preferredCountries: ['id'],
                        preventInvalidNumbers: true,
                        utilsScript: $A.get("$Resource.InputTelV11") + "/intl-tel-input-11.0.0/build/js/utils.js"
                        //utilsScript: "https://cdnjs.cloudflare.com/ajax/libs/intl-tel-input/11.0.0/js/utils.js"
                    });
                    console.log(component.get('v.ShowDialCode'));
                });
            }), 2000
        );
        
        var action = component.get("c.getUser");
        action.setCallback(this, function(response) {
            var state = response.getState();
            if(state === 'SUCCESS'){
                var result = response.getReturnValue();
                component.set("v.User", result);  
                
                var usr = component.get("v.User");
                //console.log('Project ' + (usr.Project__c).toString());
                            
                if(usr.Project__c){
                    var action = component.get("c.checkProjectLocked");                
                    action.setParams({
                        "Project" : (usr.Project__c).toString()
                    });
                    action.setCallback(this, function(response) {
                        var state = response.getState();
                        if(state === 'SUCCESS'){
                            var result = response.getReturnValue();
                            component.set("v.lockProject", result);  
                        }
                    });
                    $A.enqueueAction(action);
                }   
                
            }
        });
        $A.enqueueAction(action);
    },
    handleSuccess : function(component, event, helper) {
        /*var workspaceAPI = component.find("leadCreation");
        workspaceAPI.getFocusedTabInfo().then(function(response) {
            window.setTimeout(
                $A.getCallback(function() {
                    $A.get('e.force:refreshView').fire();
                }), 3000
            );
            var focusedTabId = response.tabId;
            workspaceAPI.closeTab({tabId: focusedTabId});
            console.log('Close');
            //$A.get('e.force:refreshView').fire();
        })
        .catch(function(error) {
            console.log(error);
        });*/
        var params = event.getParams(); //get event params
        var recordId = params.response.id; //get record id
        var navEvt = $A.get("e.force:navigateToSObject");
        navEvt.setParams({
          "recordId": recordId,
          "slideDevName": "related"
        });
        navEvt.fire();
        
    },
    handleSubmit: function(component, event, helper) {
        event.preventDefault();
        var intlNumber = $("#phone3").intlTelInput("getNumber");
        console.log('intlNumber ' + intlNumber);
        
        var vPhone3 = $("#phone3").val();
        console.log('vPhone3 ' + vPhone3);
        var number2 = $("#phone3").intlTelInput("getSelectedCountryData").dialCode;
        var number3 = $("#phone3").intlTelInput("getNumber");
        
        var vPhone4 = $("#phone4").val();
        console.log('vPhone4 ' + vPhone4);
        var number5 = $("#phone4").intlTelInput("getSelectedCountryData").dialCode;
        var number6 = $("#phone4").intlTelInput("getNumber");
        
        if(vPhone3.length>5){
            if(vPhone3.startsWith('+')){
                component.set('v.PhoneValue', vPhone3);
            }else if(vPhone3.startsWith('62')){
                component.set('v.PhoneValue', '+'+vPhone3);
            }else if(vPhone3.startsWith('0')){
                component.set('v.PhoneValue', '+'+number2+vPhone3.substr(1));
            }else{
                component.set('v.PhoneValue', '+'+number2+vPhone3);
            }
        }
        
        if(vPhone4.length>5){
            if(vPhone4.startsWith('+')){
                component.set('v.Phone2Value', vPhone4);
            }else if(vPhone4.startsWith('62')){
                component.set('v.PhoneValue', '+'+vPhone4);
            }else if(vPhone4.startsWith('0')){
                component.set('v.Phone2Value', '+'+number2+vPhone4.substr(1));
            }else{
                component.set('v.Phone2Value', '+'+number2+vPhone4);
            }            
        }        
              
        
        console.log('vPhone3 ' + number2);
        console.log('vPhone3 ' + number3);
        console.log('vPhone4 ' + number5);
        console.log('vPhone4 ' + number6);
        helper.handleFormSubmit(component, event, helper);
    },
    handleError: function (component, event, helper) {
        component.set('v.loading', false);
        component.find('OppMessage').setError('Undefined error occured');
    },
 
    handleLoad: function(component, event, helper) {
        component.set('v.loading', false);
    },
 
    handleConfirmDialogYes : function(component, event, helper) {
        console.log('Yes');
        //component.set('v.showConfirmDialog', false);
        var action = component.get("c.setDuplicateRequest");
        action.setParams({
            "LeadId" : component.get("v.LeadId").toString()
        });
        action.setCallback(this, function(response) {
            var state = response.getState();
            if(state === 'SUCCESS'){
                var navEvent = $A.get("e.force:navigateToList");
                navEvent.setParams({
                    "listViewId": '00B2800000794prEAA',
                    "listViewName": null,
                    "scope": "Lead"
                });
                navEvent.fire();
            }
        });
        $A.enqueueAction(action);
    },
     
    handleConfirmDialogNo : function(component, event, helper) {
        console.log('No');
        component.set('v.showConfirmDialog', false);        
        component.set('v.showConfirmDialog2', false);
    },    
    handleSourceOnchange : function(component, event, helper) {
        var leadSrc = component.find("leadSrc").get("v.value");
        var action = component.get("c.checkSourceMandatory");
        action.setParams({
            "LeadSource" : leadSrc.toString()
        });
        action.setCallback(this, function(response) {
            var state = response.getState();
            if(state === 'SUCCESS'){
                console.log('success');  
                var result = response.getReturnValue();
                component.set('v.ShowLeadSourceDetail', result);
                
            }
        });
        $A.enqueueAction(action);
    },
    handlePhoneOnchange : function(component, event, helper) {
        var vPhone3 = $("#phone3").val();
        console.log('vPhone3 ' + vPhone3);
        var number2 = $("#phone3").intlTelInput("getSelectedCountryData").dialCode;
        var number3 = $("#phone3").intlTelInput("getNumber");
        if(vPhone3.length>5){
            if(vPhone3.startsWith('+')){
                var valPhone3 = vPhone3.replace(/\s+/g, '');
                valPhone3 = valPhone3.replace(/-/g, '')
                document.getElementById("phone3").value = valPhone3;                
            }else if(vPhone3.startsWith('0')){
                var phoneStr = number2+(vPhone3.substr(1));
                phoneStr = phoneStr.replace(/\s+/g, '');
                phoneStr = phoneStr.replace(/-/g, '');
                document.getElementById("phone3").value = phoneStr;
                //console.log('vPhone3Mod ' + phoneStr.replace(/\s+/g, ''));
            }else if(vPhone3.startsWith('62')){
                var phoneStr = vPhone3;
                phoneStr = phoneStr.replace(/\s+/g, '');
                phoneStr = phoneStr.replace(/-/g, '');
                document.getElementById("phone3").value = phoneStr;
                //console.log('vPhone3Mod ' + phoneStr.replace(/\s+/g, ''));
            }else{
                //var phoneStr1 = number2+vPhone3;
                var phoneStr1 = vPhone3;
                phoneStr1 = phoneStr1.replace(/\s+/g, '');
                phoneStr1 = phoneStr1.replace(/-/g, '');
                document.getElementById("phone3").value = phoneStr1;
                //console.log('vPhone3Mod ' + phoneStr1.replace(/\s+/g, ''));
            }
        }
    },
    handlePhone2Onchange : function(component, event, helper) {
        var vPhone4 = $("#phone4").val();
        console.log('vPhone4 ' + vPhone4);
        var number5 = $("#phone4").intlTelInput("getSelectedCountryData").dialCode;
        var number6 = $("#phone4").intlTelInput("getNumber");
        if(vPhone4.length>5){
            if(vPhone4.startsWith('+')){
                var valPhone4 = vPhone4.replace(/\s+/g, '');
                valPhone4 = valPhone4.replace(/-/g, '')
                document.getElementById("phone4").value = valPhone4;    
            }else if(vPhone4.startsWith('0')){
                var phoneStr3 = number5+(vPhone4.substr(1));
                phoneStr3 = phoneStr3.replace(/\s+/g, '');
                phoneStr3 = phoneStr3.replace(/-/g, '');
                document.getElementById("phone4").value = phoneStr3;
            }else if(vPhone4.startsWith('8')){
                var phoneStr3 = number5+(vPhone4.substr(1));
                phoneStr3 = phoneStr3.replace(/\s+/g, '');
                phoneStr3 = phoneStr3.replace(/-/g, '');
                document.getElementById("phone4").value = phoneStr3;
            }else if(vPhone4.startsWith('62')){
                var phoneStr3 = vPhone4;
                phoneStr3 = phoneStr3.replace(/\s+/g, '');
                phoneStr3 = phoneStr3.replace(/-/g, '');
                document.getElementById("phone4").value = phoneStr3;
            }else{
                var phoneStr4 = number5+vPhone4;
                phoneStr4 = phoneStr4.replace(/\s+/g, '');
                phoneStr4 = phoneStr4.replace(/-/g, '');
                document.getElementById("phone4").value = phoneStr4;
            }
        } 
    }
})
