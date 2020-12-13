({
	callApexMethod : function(component, event, helper) {
		var data = component.get('c.cobaData');
        data.setCallback(this, function(response) {
            var state = response.getState();
            if (state === "SUCCESS" && response.getReturnValue()!=null) {
                component.set('v.txt', response.getReturnValue());
                setTimeout(
                  $A.getCallback(function(response) {
                    var spanSelector = document.querySelectorAll('.marquee p'),
                    i;            
                    var MarqueeSpeed = parseInt($A.get("$Label.c.MarqueeSpeed"));
                        
                    for (i = 0; i < spanSelector.length; i++) {
                        var spanLength = spanSelector[i].offsetWidth,
                          timeTaken = spanLength / MarqueeSpeed;
                        spanSelector[i].style.animationDuration = timeTaken + "s";
                    }
                  }), 1000);             	 
                
            }
        
        });     
        $A.enqueueAction(data);
	},
    
    
})
