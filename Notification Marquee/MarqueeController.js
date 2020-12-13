({
    doInit : function(component, event, helper) {
        helper.callApexMethod(component,helper);
        window.setInterval(
            $A.getCallback(function() {
                helper.callApexMethod(component,helper);
            }), 60000
        );
    }
})
