public class editMarqueeMasterController {
    public Marquee__c marque{get;set;}
    //public List<userrole> Lrole{get;set;}
    public List<rolewrapper> Lrolewrapper {get; set;}
    public List<profilewrapper> Lprofilewrapper {get; set;}
    public List<Groupwrapper> LGroupwrapper {get; set;}
    public List<userrole> selecteduserrole{get;set;}
    public List<profile> selectedprofile{get;set;}
    public List<Group> selectedgroup{get;set;}
    
    public editMarqueeMasterController(apexPages.StandardController std) {
        String marqueeId = apexpages.currentPage().getparameters().get('id');
        System.debug('id' + marqueeId);
        marque = [SELECT Id, Name, Category__c, Content__c, Start_Date_Time__c, End_Date_Time__c, Is_Active__c, RoleIds__c, ProfileIds__c, PublicGroupIds__c FROM Marquee__c where id =:marqueeId];
        List<userrole> LRole = [SELECT Id, Name FROM UserRole];
        List<Profile> LProfile = [SELECT Id, Name FROM Profile];
        List<Group> LPublicGroup = [SELECT Id, Name, DeveloperName, Type FROM Group where type = 'Regular'];
        Lrolewrapper = new List<rolewrapper>();
        for(UserRole usrrole : LRole){
            Lrolewrapper.add(new rolewrapper(usrrole, marque.RoleIds__c));
        }
        Lprofilewrapper = new List<profilewrapper>();
        for(Profile usrprofile : LProfile){
            Lprofilewrapper.add(new profilewrapper(usrprofile, marque.ProfileIds__c));           
        }
        LGroupwrapper = new List<Groupwrapper>();
        for(Group usrGroup : LPublicGroup){           
            LGroupwrapper.add(new Groupwrapper(usrGroup, marque.PublicGroupIds__c));
        }
        
        if(marque.PublicGroupIds__c!=null && marque.PublicGroupIds__c!=''){
            list<String> lselectedgroup = (marque.PublicGroupIds__c).split(',');
            if(lselectedgroup.size()>0){
            	selectedgroup = [SELECT Id, Name, DeveloperName, Type FROM Group where id in:lselectedgroup];
        	}
        }
        
        if(string.isNotBlank(marque.RoleIds__c)){
            list<String> lselectedRole = (marque.RoleIds__c).split(',');
            if(lselectedRole.size()>0){
                selecteduserrole = [SELECT Id, Name, DeveloperName FROM UserRole where id in:lselectedrole];
            }
            system.debug('selecteduserrole='+selecteduserrole);
        }
        
        if(marque.ProfileIds__c!=null && marque.ProfileIds__c!=''){
            list<String> lselectedprofile = (marque.ProfileIds__c).split(','); 
            if(lselectedprofile.size()>0){
                selectedprofile = [SELECT Id, Name FROM Profile where id in:lselectedprofile];
            }
        }                                  
       
    }
    
    public PageReference save(){
        string roleids = '';
        string profileids = '';
        string publicgroupids = '';
        string roles = '';
        string profiles = '';
        string publicgroups = '';
		
        if(selecteduserrole!=null){
            if(!selecteduserrole.isEmpty()){
                for(UserRole usrrole : selecteduserrole){
                    roleids+= usrrole.Id +',';
                    roles+= usrrole.Name +',';
                } 
            }            
        }
        
        if(selectedprofile!=null){
            if(!selectedprofile.isEmpty()){
                for(Profile usrProfile : selectedprofile){
                    profileids+= usrProfile.Id +',';
                    profiles+= usrProfile.Name +',';
                }
            }            
        }
        
        if(selectedgroup!=null){
            if(!selectedgroup.isEmpty()){
                for(Group usrGroup : selectedgroup){
                    publicgroupids += usrGroup.id+',';
                    publicgroups += usrGroup.Name+',';
                }
            }            
        }
        
        marque.RoleIds__c = roleids;
        marque.ProfileIds__c = profileids;
        Marque.PublicGroupIds__c = publicgroupids;
        Marque.Selected_Group__c = publicgroups;
        Marque.Selected_Profile__c = profiles;
        Marque.Selected_Role__c = roles;
        update marque;
        
        return new PageReference('/'+marque.id);
        
    }
    
    public PageReference cancel(){
        return new PageReference('/'+marque.id);
    }
    
    public void processSelected() {
    selecteduserrole = new List<userrole>();
 
        for(rolewrapper rolewrapperObj : Lrolewrapper) {
            if(rolewrapperObj.selected == true) {
                selecteduserrole.add(rolewrapperObj.role);
            }
        }
    }
    
    public class rolewrapper {
        public userrole role{get;set;}
        public boolean selected{get;set;}
        public string selectedrole{get;set;}
 
        //This is the contructor method. When we create a new wrapAccount object we pass a Account that is set to the acc property. We also set the selected value to false
        public rolewrapper(userrole u, string s) {
            role = u;
            selected = string.isNotBlank(s)? (s.contains(u.id)? true : false) : false;
        }
    }
    public void profileSelected() {
    selectedProfile = new List<Profile>();
 
        for(Profilewrapper ProfilewrapperObj : LProfilewrapper) {
            if(ProfilewrapperObj.selected == true) {
                selectedProfile.add(ProfilewrapperObj.Profile);
            }
        }
    }
    
    public class Profilewrapper {
        public Profile Profile{get;set;}
        public boolean selected{get;set;}        
        public string selectedrole{get;set;}
 
        //This is the contructor method. When we create a new wrapAccount object we pass a Account that is set to the acc property. We also set the selected value to false
        public Profilewrapper(Profile u, string s) {
            Profile = u;
            selected = string.isNotBlank(s)? (s.contains(u.id)? true : false) : false;            
        }
    }
    public void groupSelected() {
    selectedgroup = new List<group>();
 
        for(groupwrapper groupwrapperObj : Lgroupwrapper) {
            if(groupwrapperObj.selected == true) {
                selectedgroup.add(groupwrapperObj.grup);
            }
        }
    }
    
    public class groupwrapper{
        public group grup{get;set;}
        public boolean selected{get;set;}
        public string selectedrole{get;set;}
 
        //This is the contructor method. When we create a new wrapAccount object we pass a Account that is set to the acc property. We also set the selected value to false
        public groupwrapper(group u, string s) {
            grup = u;
            selected = string.isNotBlank(s)? (s.contains(u.id)? true : false) : false;
        }
    }

}
