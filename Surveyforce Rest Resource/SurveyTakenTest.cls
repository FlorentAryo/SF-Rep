@IsTest
public class SurveyTakenTest {
	
	// This test method should give 100% coverage
	static testMethod void testParse() {
		String json = '{'+
		'  \"Id\": \"a069D000002V4TIQA0\",'+
		'  \"Name\": \"0190819\",'+
		'  \"CaseId\": \"5009D000002pgx4QAA\",'+
		'  \"ContactId\": \"0039D000008CrBvQAK\",'+
		'  \"SurveyId\": \"a089D000002P6N3QAK\",'+
		'  \"OwnerId\": \"0050o00000WaynPAAR\",'+
		'  \"Survey_Question_Answers\": ['+
		'    {'+
		'      \"SurveyTakerId\": \"a069D000002V4TIQA0\",'+
		'      \"Id\": \"a059D000000tuVbQAI\",'+
		'      \"Name\": \"Response-0580472\",'+
		'      \"Survey_QuestionId\": \"a079D000001zDPOQA2\",'+
		'      \"Response\": \"Satisfied\"'+
		'    },'+
		'    {'+
		'      \"SurveyTakerId\": \"a069D000002V4TIQA0\",'+
		'      \"Id\": \"a059D000000tuVcQAI\",'+
		'      \"Name\": \"Response-0580473\",'+
		'      \"Survey_QuestionId\": \"a079D000001zDPdQAM\",'+
		'      \"Response\": \"Knowledge of the Age (2 more) ...\"'+
		'    },'+
		'    {'+
		'      \"SurveyTakerId\": \"a069D000002V4TIQA0\",'+
		'      \"Id\": \"a059D000000tuVdQAI\",'+
		'      \"Name\": \"Response-0580474\",'+
		'      \"Survey_QuestionId\": \"a079D000001zDPdQAM\",'+
		'      \"Response\": \"Quality of response  (20 more) ...\"'+
		'    },'+
		'    {'+
		'      \"SurveyTakerId\": \"a069D000002V4TIQA0\",'+
		'      \"Id\": \"a059D000000tuVeQAI\",'+
		'      \"Name\": \"Response-0580475\",'+
		'      \"Survey_QuestionId\": \"a079D000001zDPdQAM\",'+
		'      \"Response\": \"Good attitude\"'+
		'    },'+
		'    {'+
		'      \"SurveyTakerId\": \"a069D000002V4TIQA0\",'+
		'      \"Id\": \"a059D000000tuVfQAI\",'+
		'      \"Name\": \"Response-0580476\",'+
		'      \"Survey_QuestionId\": \"a079D000001zDLZQA2\"'+
		'    }'+
		'  ]'+
		'}';
		SurveyTaken r = SurveyTaken.parse(json);
		System.assert(r != null);

		json = '{\"TestAMissingObject\": { \"TestAMissingArray\": [ { \"TestAMissingProperty\": \"Some Value\" } ] } }';
		SurveyTaken objSurveyTaken = new SurveyTaken(System.JSON.createParser(json));
		System.assert(objSurveyTaken != null);
		System.assert(objSurveyTaken.Id == null);
		System.assert(objSurveyTaken.Name == null);
		System.assert(objSurveyTaken.CaseId == null);
		System.assert(objSurveyTaken.ContactId == null);
		System.assert(objSurveyTaken.SurveyId == null);
		System.assert(objSurveyTaken.OwnerId == null);
		System.assert(objSurveyTaken.Survey_Question_Answers == null);

		json = '{\"TestAMissingObject\": { \"TestAMissingArray\": [ { \"TestAMissingProperty\": \"Some Value\" } ] } }';
		SurveyTaken.Survey_Question_Answers objSurvey_Question_Answers = new SurveyTaken.Survey_Question_Answers(System.JSON.createParser(json));
		System.assert(objSurvey_Question_Answers != null);
		System.assert(objSurvey_Question_Answers.SurveyTakerId == null);
		System.assert(objSurvey_Question_Answers.Id == null);
		System.assert(objSurvey_Question_Answers.Name == null);
		System.assert(objSurvey_Question_Answers.Survey_QuestionId == null);
		System.assert(objSurvey_Question_Answers.Response == null);
	}
}
