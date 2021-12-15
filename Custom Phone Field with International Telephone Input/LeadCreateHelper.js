({
	handleFormSubmit: function(component, event, helper) {
        /*var showValidationError = false;
        var fields = component.find("newLeadField");
        var vaildationFailReason = '';
        var currentDate = new Date().toJSON().slice(0,10);*/
 
        /*fields.forEach(function (field) {
            if(field.get("v.fieldName") === 'Amount' && $A.util.isEmpty(field.get("v.value"))){
                showValidationError = true;
                vaildationFailReason = "The field 'Amount' cannot be empty!";
            } else if (field.get("v.fieldName") === 'StageName' && field.get("v.value") === 'Prospecting' && component.get("v.closeDate") < currentDate) {
                showValidationError = true;
                vaildationFailReason = "Close Date cannot be earlier  earlier than today if Stage is 'Prospecting'!";
            }
        });*/
        //var param = event.getParams(); //get event params
        //var fields = param.response.fields; //get all field info
        var VPhone = component.find("PhoneField");
        var VPhone2 = component.find("Phone2Field");
        var VEmail = component.find("EmailField");
        var VProject = component.find("ProjectField");
        
        var action = component.get("c.getLead");
        var Phone = VPhone.get("v.value");
        if(Phone.startsWith('+6262')){
            Phone = Phone.mid(0,3) + Phone.mid(5,100);
            console.log('Phone : '+ Phone);
        }
        var Phone2 = VPhone2.get("v.value");
        var Email = VEmail.get("v.value");
        var Project = VProject.get("v.value");
        action.setParams({
            "Phone" : Phone,
            "Phone2" : Phone2,
            "Email" : Email,
            "Project" : Project
        });
        action.setCallback(this, function(response) {
            var state = response.getState();
            if(state === 'SUCCESS'){
                var result = response.getReturnValue();
                component.set("v.con", result);
                try{
                    var lead = component.get("v.con");
                    //console.log('lead '+ lead.Id);
                    if(lead){
                        console.log('lead');
                        component.set("v.LeadId", lead.Id);                        
                        component.set("v.OwnerId", lead.OwnerId);
                        this.handleConfirmDialog(component, event, helper);
                    }else{
                        console.log('no lead');
                        component.find("leadCreateForm").submit();                        
                    }
                    
                }catch(e){
                    
                }
                
            }
        });
        $A.enqueueAction(action);
         
        /*if (!showValidationError) {
            component.set('v.loading', true);
            component.find("recordEditFormForNewOpportunity").submit();  
        } else {
            component.find('OppMessage').setError(vaildationFailReason);
            component.set('v.loading', false); 
        }*/
    },
    handleConfirmDialog : function(component, event, helper) {
        var firstowner = component.get("v.User.Id");
        var secondowner = component.get("v.OwnerId");
        console.log(firstowner + ' '+secondowner);
        if(firstowner != secondowner){
            component.set('v.showConfirmDialog', true);
            component.set('v.showConfirmDialog2', false);
            var target = component.find("topComp");
            var element = target.getElement();
            var rect = element.getBoundingClientRect();
            scrollTo({top: rect.top, behavior: "smooth"});
        }else{
            component.set('v.showConfirmDialog', false);
            component.set('v.showConfirmDialog2', true);
            var target2 = component.find("topComp");
            var element2 = target2.getElement();
            var rect2 = element2.getBoundingClientRect();
            scrollTo({top: rect2.top, behavior: "smooth"});
        }
    }     
    
})
