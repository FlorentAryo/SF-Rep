({
    countDownAction : function(component, event, helper,closeDate) {
        var interval = window.setInterval(
            $A.getCallback(function() {
                var opptyCloseDate = new Date( closeDate);
                console.log('opptyCloseDate = '+opptyCloseDate);
                var now_date = new Date();
                var timeDiff = opptyCloseDate.getTime()- now_date.getTime(); // time difference between opportunity close date and todays date  
                component.set("v.isValid",true);
                if(timeDiff<=0){
                    //component.set("v.isValid",false);
                    //component.set("v.msg",'Close Date Expired');
                    console.log("timeDiff<=0");
                    timeout(component, event, helper, oppCloseDt);                    
                }else{
                    console.log("timeDiff>=0");
                    var seconds=Math.floor(timeDiff/1000); // seconds
                    var minutes=Math.floor(seconds/60); //minute
                    var hours=Math.floor(minutes/60); //hours
                    var days=Math.floor(hours/24); //days
                    hours %=24; 
                    minutes %=60;
                    seconds %=60;
                    component.set("v.day",days);
                    component.set("v.hour",hours);
                    component.set("v.minute",minutes);
                    component.set("v.second",seconds);
                }                
            }), 1000);     
    },
    
    timeout : function(component, event, helper,closeDate) {
        		component.set("v.isValid",true);
                component.set("v.day","0");
                component.set("v.hour","0");
                component.set("v.minute","0");
                component.set("v.second","0");
               
    },
    stopCounting : function(component, event, helper,closeDate,touchpointdeadlinedt) {
                var opptyCloseDate = new Date( closeDate);
        		var touchpointdeadline = new Date(touchpointdeadlinedt)
                console.log('opptyCloseDate = '+opptyCloseDate);
        		console.log('touchpointdeadline = '+touchpointdeadline);
                var now_date = new Date();
                var timeDiff = touchpointdeadline.getTime() - opptyCloseDate.getTime(); //  
                component.set("v.isValid",true);
                var seconds=Math.floor(timeDiff/1000); // seconds
                var minutes=Math.floor(seconds/60); //minute
                var hours=Math.floor(minutes/60); //hours
                var days=Math.floor(hours/24); //days
                hours %=24; 
                minutes %=60;
                seconds %=60;
                component.set("v.day",days);
                component.set("v.hour",hours);
                component.set("v.minute",minutes);
                component.set("v.second",seconds);    
    }
})
