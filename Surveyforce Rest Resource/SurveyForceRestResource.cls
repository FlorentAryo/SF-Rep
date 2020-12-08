//Survey Custom API. Created by Florentino Aryo
@RestResource(urlMapping='/SurveyForceRestResource/v1/*')
global with sharing class SurveyForceRestResource{
    
	@HttpGet
    global static SurveyQnA getQuestionsAnswer(){
        List<Survey_Question__c> allQuestionsObject = 
                                        [Select s.Type__c, s.Id, s.Survey__c, s.Required__c, s.Question__c, 
                                        s.OrderNumber__c, s.Name, s.Choices__c 
                                        From Survey_Question__c s 
                                        WHERE s.Survey__c =:label.SurveySkipId ORDER BY s.OrderNumber__c];
        //System.debug(allQuestionsObject);
        SurveyQnA QnA = new SurveyQnA(allQuestionsObject);
        return QnA;
    }
    @HttpPost
    global static string SubmitFeedback() {
        RestRequest resultJson = RestContext.request;
        string result;
        SurveyTaken stObj = (SurveyTaken)JSON.deserialize(resultJson.requestBody.toString(), SurveyTaken.class);
        SurveyTaker__c st = new SurveyTaker__c(Survey__c = stObj.SurveyId, Contact__c = stObj.ContactId, Case__c = stObj.CaseId, OwnerId = stObj.OwnerId);
        List<SurveyQuestionResponse__c> LSQR = new List<SurveyQuestionResponse__c>();
        List<SurveyTaken.Survey_Question_Answers> LSQA = stObj.Survey_Question_Answers;
        try{
            insert st;
            for(SurveyTaken.Survey_Question_Answers sqa :LSQA){
                SurveyQuestionResponse__c sqr = new SurveyQuestionResponse__c();
                sqr.SurveyTaker__c = st.id;
                sqr.Survey_Question__c = sqa.Survey_QuestionId;
                sqr.Response__c = sqa.Response;
                LSQR.add(sqr);
            }
            insert LSQR;
            result = 'successs, survey taken id = '+st.id;
        }catch(Exception e){result = 'error, '+e;
        }
                
        return result;
    }
}
