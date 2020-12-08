@isTest(seealldata=true)
private class SurveyForceRestResource_test {

    static testMethod void testGet() {
        List<Survey_Question__c> allQuestionsObject = 
                                        [Select s.Type__c, s.Id, s.Survey__c, s.Required__c, s.Question__c, 
                                        s.OrderNumber__c, s.Name, s.Choices__c 
                                        From Survey_Question__c s 
                                        WHERE s.Survey__c =:label.SurveySkipId ORDER BY s.OrderNumber__c];
        RestRequest req = new RestRequest(); 
        RestResponse res = new RestResponse();             
        req.requestURI = '/services/apexrest/SurveyForceRestResource_test/v1';
        req.httpMethod = 'GET';
        RestContext.request = req;
        RestContext.response= res;
        SurveyQnA QnA = new SurveyQnA(allQuestionsObject);
        SurveyQnA QNA2 = SurveyForceRestResource_test.getQuestionsAnswer();
    }
    static testMethod void testPOST() {
        RestRequest req = new RestRequest(); 
        RestResponse res = new RestResponse();             
        req.requestURI = '/services/apexrest/SurveyForceRestResource_test/v1';
        req.httpMethod = 'POST';
        req.addHeader('Content-Type', 'application/json'); 
        req.requestBody = Blob.valueOf('{"CaseId": "5009D000002pgx4QAA","ContactId": "0039D000008CrBvQAK","SurveyId": "a089D000002P6N3QAK","OwnerId":"0050o00000WaynPAAR","Survey_Question_Answers":[{"Survey_QuestionId":"a079D000001zDPOQA2","Response": "Satisfied"},{"Survey_QuestionId":"a079D000001zDPdQAM","Response": "Knowledge of the Age (2 more) ..."},{"Survey_QuestionId": "a079D000001zDPdQAM","Response": "Quality of response(20 more) ..."},{"Survey_QuestionId": "a079D000001zDPdQAM","Response": "Good attitude"},{"Survey_QuestionId": "a079D000001zDLZQA2"}]}');
        RestContext.request = req;
        RestContext.response= res;
        String QNA2 = SurveyForceRestResource_test.SubmitFeedback();
    }
}
