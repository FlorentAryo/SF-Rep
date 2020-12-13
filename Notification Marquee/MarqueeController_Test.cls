@istest
public class MarqueeController_Test {
    
    @isTest static void testCase(){
        Test.startTest();
        UserRole r = new UserRole(DeveloperName = 'MyCustomRole', Name = 'My Role');
        insert r;	
        
        Profile p = [SELECT Id FROM Profile WHERE Name = 'System Administrator'];
        Group g  = new Group();
        g.name = 'Test Group2';
        g.Type = 'Regular'; 
        Insert g;
        
        User u = new User(
            ProfileId = p.Id,
            LastName = 'last',
            Email = 'florentaryo@tampan.com',
            Username = 'florentaryo@tampan.com' + System.currentTimeMillis(),
            CompanyName = 'TEST',
            Title = 'title',
            Alias = 'alias',
            TimeZoneSidKey = 'America/Los_Angeles',
            EmailEncodingKey = 'UTF-8',
            LanguageLocaleKey = 'en_US',
            LocaleSidKey = 'en_US',
            UserRoleId = r.Id
        );
        insert u;
        List<profile> selectedprofile = new List<profile>();
        selectedprofile.add(p);
        List<UserRole> selectedUserRole = new List<UserRole>();
        selectedUserRole.add(r);
        List<Group> selectedgroup = new List<Group>();
        selectedGroup.add(g);
        
        system.runAs(u){
            SetupMarqueeController smc = new SetupMarqueeController();
            
            SetupMarqueeController.groupwrapper gw = new SetupMarqueeController.groupwrapper(g);            
            smc.LGroupwrapper.add(gw);
            smc.LGroupwrapper[0].selected = true;
            SetupMarqueeController.rolewrapper rw = new SetupMarqueeController.rolewrapper(r);            
            smc.Lrolewrapper.add(rw);
            smc.Lrolewrapper[0].selected = true;
            SetupMarqueeController.profilewrapper pw = new SetupMarqueeController.profilewrapper(p);            
            smc.Lprofilewrapper.add(pw);
            smc.Lprofilewrapper[0].selected = true;
            
            smc.selectedprofile = selectedprofile; 
            smc.profileSelected();            
            smc.selectedUserRole = selectedUserRole; 
            smc.processSelected();
            smc.selectedgroup = selectedgroup; 
            smc.groupSelected();
            
            smc.save();
            
            Marquee__c mar = smc.marque;
            
            ApexPages.StandardController stc = new ApexPages.StandardController(mar);
            ApexPages.currentPage().getParameters().put('id',mar.id);
            editMarqueeMasterController emc = new editMarqueeMasterController(stc);
            
            
            emc.selectedprofile = selectedprofile; 
            emc.profileSelected();            
            emc.selectedUserRole = selectedUserRole; 
            emc.processSelected();
            emc.selectedgroup = selectedgroup; 
            emc.groupSelected();
            
            emc.save();
            
            //Insert GroupMember
            GroupMember gm = new GroupMember();
            gm.GroupId = [SELECT Id FROM Group WHERE Name = 'Test Group2'].id;
            gm.UserOrGroupId = [Select Id From User Where Email = 'florentaryo@tampan.com'].id;
            Insert gm;
            String idGroup = [SELECT Id FROM Group WHERE Name = 'Test Group2'].id;
            String idGroupMember = [Select Id From GroupMember Where GroupId =: idGroup].id;
            
            //Insert Marquee All
            Marquee__c insMrq = new Marquee__c();
            insMrq.Name = 'Test Coba';
            insMrq.Category__c = 'SOP';
            insMrq.Content__c = 'For test class hehehe';
            insMrq.Start_Date_Time__c = System.Datetime.now();
            insMrq.End_Date_Time__c = System.Datetime.now().addDays(5);
            insMrq.RoleIds__c = [Select id From UserRole Where Name = 'My Role'].id;
            insMrq.ProfileIds__c = [Select id From Profile Where Name = 'System Administrator'].id;
            insMrq.PublicGroupIds__c = [SELECT Id FROM GroupMember WHERE Id =: idGroupMember].id;
            Insert insMrq;
            
            //Insert Marquee No Group
            Marquee__c insMrq2 = new Marquee__c();
            insMrq2.Name = 'Test Coba2';
            insMrq2.Category__c = 'SOP';
            insMrq2.Content__c = 'For test class hehehe2';
            insMrq2.Start_Date_Time__c = System.Datetime.now();
            insMrq2.End_Date_Time__c = System.Datetime.now().addDays(5);
            insMrq2.RoleIds__c = [Select id From UserRole Where Name = 'My Role'].id;
            insMrq2.ProfileIds__c = [Select id From Profile Where Name = 'System Administrator'].id;
            Insert insMrq2;
            
            Marquee.cobaData();
            Test.stopTest();
        }
    }
}
