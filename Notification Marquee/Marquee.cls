public class Marquee {
    @AuraEnabled
    public static string cobaData(){
        Integer counter = 0;
        id id1 = UserInfo.getUserId();
        id profileid = UserInfo.getProfileId();
        
        id roleCheck = UserInfo.getUserRoleId();
        String roleid = 'no role';
        if(roleCheck != null){
            roleid = roleCheck;
        }
        
        Datetime thisday = System.Datetime.now();
        String text;
        String Subject, allSubject = ' ';
        String groupId = 'no group';
        String checkRole, checkProfil, checkGroup;
        
        List<GroupMember> check_group = [Select groupId From GroupMember Where UserOrGroupId =: id1];
        if(check_group != null){
            for(GroupMember check : check_group){
                groupId = check_group.isEmpty() ? 'no group' : check.groupId;
            }
        }
        
        List<Marquee__c> marquee = [SELECT Id, Name, Category__c, Content__c, Start_Date_Time__c, End_Date_Time__c, Is_Active__c, RoleIds__c, ProfileIds__c, PublicGroupIds__c FROM Marquee__c Where Start_Date_Time__c <= :thisday AND End_Date_Time__c >= :thisday order by CreatedDate desc];
        
        if(marquee != null){
            if(!marquee.isEmpty()){
                for(Marquee__c acc : marquee){
                    checkRole = acc.RoleIds__c == null ? 'no filter' : acc.RoleIds__c == '' ? 'no filter' : acc.RoleIds__c;
                    checkProfil = acc.ProfileIds__c == null ? 'no filter' : acc.ProfileIds__c == '' ? 'no filter' : acc.ProfileIds__c;
                    checkGroup = acc.PublicGroupIds__c == null ? 'no filter' : acc.PublicGroupIds__c == '' ? 'no filter' : acc.PublicGroupIds__c;
                    
                    if(checkRole.contains(roleid) || checkProfil.contains(profileid) || checkGroup.contains(groupId)){
                        counter++;
                        Subject = ' ' +system.label.NotificationsSeparator + ' ' +counter +'. ' +acc.Content__c;
                        allSubject = allSubject + Subject;
                    }
                }
            }
        } else{
            text = (system.label.MarqueeGreetings).replace('user_name',UserInfo.getName());
        }
        
        if(counter == 0){
            text = (system.label.MarqueeGreetings).replace('user_name',UserInfo.getName());
        }else if(counter == 1){
            String notif = system.label.MarqueeGreetings1;
            notif = notif.replaceall('user_name',UserInfo.getName());            
            notif = notif.replaceall('_notifications_',allSubject);            
            text = notif;
        }else{
            String Multinotif = system.label.MarqueeGreetings2;
            Multinotif = Multinotif.replace('notification_number',string.valueOf(counter));    
            Multinotif = Multinotif.replaceall('user_name',UserInfo.getName());
            Multinotif = Multinotif.replaceall('_notifications_',allSubject);            
            text = Multinotif;
        }
        
        return text;
    }
    
}
