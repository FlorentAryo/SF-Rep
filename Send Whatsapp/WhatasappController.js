({
 doInit : function(component, event, helper) {
        var action = component.get("c.fetchContact");
         action.setParams({
            "conId" : component.get("v.recordId").toString()
        });
        action.setCallback(this, function(response) {
            var state = response.getState();
            var data;
            if(state === 'SUCCESS'){
                var result = response.getReturnValue();
                component.set("v.con", result);
            }
        });
        $A.enqueueAction(action);
 },
    sendWhatsApp : function(component, event, helper){
        var lead = component.get("v.con");
        var msg = 'Hello '+lead.Name+' '+component.find("myText").get("v.value");
        var url= "https://wa.me/62"+lead.Phone+"?text="+msg;
        window.open(url, '_blank');
        var aksi = component.get("c.createtask");
        aksi.setParams({
            "conId" : component.get("v.recordId").toString()
        });
        aksi.setCallback(this, function(response) {
            console.log('1');
            var state = response.getState();
            var data;
            if(state === 'SUCCESS'){
                var result = response.getReturnValue();
                component.set("v.con", result);
                console.log('2');
            }
        });
        $A.enqueueAction(aksi);
        console.log('3');
        $A.get("e.force:closeQuickAction").fire();
    }
    
})
