public without sharing class Lead_Creation_Controller {
    @AuraEnabled
    public static User getUser(){
        User U = [select id, project__c from user where id =:userinfo.getUserId()];
        return u;
    }
    @AuraEnabled
    public static boolean checkProjectLocked(String Project){
        List<Project_Settings__c> ps = [SELECT Id, Name, Locked__c, Project_Name__c FROM Project_Settings__c where Project_Name__c = :Project Limit 1];
        if(ps.size()>0){
            return ps[0].Locked__c;
        }else{
            return true;
        }        
    }
    @AuraEnabled
    public static boolean checkSourceMandatory(String LeadSource){
        List<Lead_Source_Detail_Mandatory__c> lsdm = [SELECT Id, Lead_Source__c FROM Lead_Source_Detail_Mandatory__c where Lead_Source__c includes (:LeadSource) Limit 1];
        if(lsdm.size()>0){
            return true;
        }else{
            return false;
        }        
    }
	@AuraEnabled
    public static Lead getLead(String Phone, String Phone2, String Email, String Project){
        //List<lead> lle = new List<lead>();
        /*if(Phone2 != null && Phone2 != ''){
            lle = [select id from Lead where (phone =:phone OR Phone_2__c =:Phone2) AND Project__c = :Project limit 1];            
        }else{
            lle = [select id from Lead where phone =:phone AND Project__c = :Project limit 1];
        } */
        system.debug('Phone= ' + Phone);
        system.debug('Phone2= ' + Phone2);
        system.debug('Email= ' + Email);
        system.debug('Project= ' + Project);
        List<lead> lle = [select id, ownerid from Lead where ((phone =:Phone AND phone != null) OR (phone =:Phone2 AND phone != null) OR (phone_2__c =:Phone2 AND phone_2__c != null) OR (phone_2__c =:Phone AND phone_2__c != null) OR (Email = :Email AND Email != null)) AND Project__c = :Project limit 1];
        if(lle.size()>0){
            return lle[0];
        }else{
            return null;
        }
        //Map<String, List<Map<String, String>>> mss = new Map<String, List<Map<String, String>>>();    
    }
    @AuraEnabled
    public static void setDuplicateRequest(String LeadId){
        lead le = [select id, firstname, lastname, ownerId from Lead where id =:LeadId];
        List<user> lu = new List<User>();
        lu = [select id, managerId from user where id = :le.OwnerId]; 
        if(lu[0].managerId==null) lu = [select id, managerId from user where id = :userinfo.getUserId()]; 
        Duplicate_Lead__c dl = new Duplicate_Lead__c();
        dl.Lead__c = le.id;
        dl.Current_Owner__c = le.OwnerId;
        dl.External_ID__c = le.id+'-'+lu[0].id+'-'+system.today();
        dl.Requester__c = userinfo.getUserId();
        List<task> lt = [select id from task where status != 'Completed' and whoId = :le.id];
        list<Opportunity> lop = [select id from Opportunity where customer__c = :le.id and isclosed = false];
        dl.On_Going_Activity__c = lt.size();
        dl.On_Going_Opportunity__c = lop.size();
        dl.Name = le.FirstName + ' ' + le.LastName;
        if(le.FirstName == null || le.FirstName == '')dl.Name = le.LastName;
        dl.Approval_Status__c = 'Draft';
        dl.OwnerId = lu[0].ManagerId;
        if(dl.Current_Owner__c != dl.Requester__c)insert dl;        
        //Map<String, List<Map<String, String>>> mss = new Map<String, List<Map<String, String>>>();    
    }
}
