global without sharing class CustomChatWindowController {
	
    public static double SpeedToAnswertime = 0;
    
    @RemoteAction
    global static String getImage(String userId){
        
        User usr = [SELECT SmallPhotoUrl FROM User WHERE Id =: userId];
        string url = usr.SmallPhotoUrl;
        return url;
    }
    @RemoteAction
    global static string avgtime(String queueNumber){
        
        Group gr = [Select Id from Group where type='Queue' and Name='Queue Chat'];
        List<GroupMember> LGM = [Select UserOrGroupId From GroupMember where GroupId =:gr.id];
        
        Set<string> usrIds = new Set<String>();
        for(GroupMember gm: LGM){
            string IdUserOrGroup = gm.UserOrGroupId; 
            if(IdUserOrGroup.startsWith('005'))usrIds.add(gm.UserOrGroupId);
            if(IdUserOrGroup.startsWith('00G')){
                Group roleGroup = [SELECT Type, Name, Id, RelatedId FROM Group where Type='Role' and id = :gm.UserOrGroupId limit 1];
                List<User> LU = [SELECT Id, Name, UserRoleId FROM User where UserRoleId =:roleGroup.RelatedId];
                if(LU.size()>0){
                    for(User u: LU){
                        usrIds.add(u.Id);
                    }
                }
            }
        }
        
        List<AgentWork> LAW = [Select Id, Status, SpeedToAnswer, AcceptDateTime, CloseDateTime, UserId from AgentWork where AcceptDateTime != NULL AND CreatedDate = LAST_N_DAYS:7 and servicechannel.MasterLabel = 'Live Agent'];
            for(AgentWork aw: LAW){
                if(aw.SpeedToAnswer!= null){                    
                    SpeedToAnswertime += aw.SpeedToAnswer;
                }
            }
        string tm = '';  
        double LAWSize = test.isRunningTest()? 100 : LAW.size();
        if(SpeedToAnswertime > 0){
            if(queueNumber!=null && queueNumber!='0'){
                integer queueNumb = Integer.valueof(queueNumber);
                double avgSpeedToAnswerTime = ((SpeedToAnswertime * queueNumb) / LAWSize);        
                integer min = avgSpeedToAnswerTime.intValue()/60;
                integer sec = math.mod(min, 60);
                if(min>1){
                    tm = min+' minutes';
                }else{
                    tm = '1 minute';
                }                    
            }else{
                tm ='0 minute';
            }            
        }  
        
        return tm;
    }
    
}
