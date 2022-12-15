public with sharing class createWalkInRepair {
    @AuraEnabled
    public static Map<String, String> getPicklist(String param_1, String param_2){
		Map<String, String> MapPL = new Map<String, String>(); 
		List<Sobject> l_Types = [SELECT Id, Name FROM Workbay_for_Booking__c where param1 = :param_1 AND param2 = :param_2];
        if(l_Types.size()>0){
            for(Sobject obj : l_Types){
                MapPL.put(obj.Id, obj.Name);
            }
        }
        return MapPL;
	}
}