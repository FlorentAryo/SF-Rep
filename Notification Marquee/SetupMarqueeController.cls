public class SetupMarqueeController {
    public Marquee__c marque{get;set;}
    //public List<userrole> Lrole{get;set;}
    public List<rolewrapper> Lrolewrapper {get; set;}
    public List<profilewrapper> Lprofilewrapper {get; set;}
    public List<Groupwrapper> LGroupwrapper {get; set;}
    public List<userrole> selecteduserrole{get;set;}
    public List<profile> selectedprofile{get;set;}
    public List<Group> selectedgroup{get;set;}
    
    public SetupMarqueeController() {
        marque = new Marquee__c();
        List<userrole> LRole = [SELECT Id, Name FROM UserRole];
        List<Profile> LProfile = [SELECT Id, Name FROM Profile];
        List<Group> LPublicGroup = [SELECT Id, Name, DeveloperName, Type FROM Group where type = 'Regular'];
        Lrolewrapper = new List<rolewrapper>();
        for(UserRole usrProfile : LRole){
            Lrolewrapper.add(new rolewrapper(usrProfile));
        }
        Lprofilewrapper = new List<profilewrapper>();
        for(Profile usrrole : LProfile){
            Lprofilewrapper.add(new profilewrapper(usrrole));
        }
        LGroupwrapper = new List<Groupwrapper>();
        for(Group usrGroup : LPublicGroup){
            LGroupwrapper.add(new Groupwrapper(usrGroup));
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
        marque.PublicGroupIds__c = publicgroupids;
        marque.Selected_Role__c = roles;
        marque.Selected_Profile__c = profiles;
        marque.Selected_Group__c = publicgroups;
        insert marque;
        
        return new PageReference('/'+ marque.id);
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
 
        //This is the contructor method. When we create a new wrapAccount object we pass a Account that is set to the acc property. We also set the selected value to false
        public rolewrapper(userrole u) {
            role = u;
            selected = false;
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
 
        //This is the contructor method. When we create a new wrapAccount object we pass a Account that is set to the acc property. We also set the selected value to false
        public Profilewrapper(Profile u) {
            Profile = u;
            selected = false;
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
    
    public class groupwrapper {
        public group grup{get;set;}
        public boolean selected{get;set;}
 
        //This is the contructor method. When we create a new wrapAccount object we pass a Account that is set to the acc property. We also set the selected value to false
        public groupwrapper(group u) {
            grup = u;
            selected = false;
        }
    }
}
