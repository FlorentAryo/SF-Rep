public class Vlog_whatsappCTRL {
    @AuraEnabled 
    public static Lead fetchContact(String conId){
        Lead le = [Select Id, OwnerId, Name,Phone, MobilePhone FROM Lead where Id=:conId ];  
        return le;
    }
    
    @AuraEnabled 
    public static Lead createtask(String conId){
        Lead le = [Select Id, OwnerId, Name,Phone, MobilePhone FROM Lead where Id=:conId ]; 
        task ta = new task();
        ta.WhoId = le.id;
        ta.OwnerId = le.OwnerId;
        ta.Subject = 'Whatsapp message';
        ta.Status = 'Completed';
        insert ta;
        return le;
    }
}
