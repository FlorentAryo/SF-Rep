({
    doInit : function(component, event, helper) {
        let action = component.get("c.fetchLeadDate");
        
        action.setParams({
            "recId" : component.get("v.recordId")
        });
        action.setCallback(this,function(response){
            let state = response.getState();
            if(state == 'SUCCESS'){
                var result = response.getReturnValue();
                var JSONParse = JSON.parse(result);
                console.log('Result : ' +result);                
                var touchpointdate = JSONParse.touchpoint != null ? JSONParse.touchpoint : '';
                var touchpointdeadline = JSONParse.touchpointdeadline != null ? JSONParse.touchpointdeadline : '';
                var fieldName = JSONParse.fieldName != null ? JSONParse.fieldName : '';
                console.log('Result2 : ' +fieldName + touchpointdate);
                var LeadCloseDt = new Date(touchpointdate);
                var touchpointdeadlinedt = new Date(touchpointdeadline);
                /*var months = ["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"];
				var monthName = months[oppCloseDt.getMonth()];
                var dateNumber = oppCloseDt.getDate();
                var yearNumber =  oppCloseDt.getFullYear();
                console.log('Month Name: ' +monthName+' Date: '+dateNumber+' Year: '+yearNumber);
                var closeDateVar = monthName+' '+dateNumber+' '+yearNumber;
                var opptyCloseDate = new Date( closeDateVar);*/
                var now_date = new Date();
                console.log('Todays date: ' +now_date);
                var timeDiff = LeadCloseDt.getTime()- now_date.getTime();
                 
                if(fieldName=='touchpointdeadline'){
                 if(timeDiff<=0){
                    //component.set("v.isValid",false);
                    //component.set("v.msg",'Close Date Expired');
                    console.log('timeout ' );
                    helper.timeout(component, event, helper, LeadCloseDt);
                 }else{
                     console.log('countdown ' );
                    helper.countDownAction(component, event, helper, LeadCloseDt);
                     
                 }
                }else{
                    console.log('stopcounting ' );
                    helper.stopCounting(component, event, helper, LeadCloseDt, touchpointdeadlinedt);
                }
                     
                 //}
            }
        });
        $A.enqueueAction(action);
    }
})
