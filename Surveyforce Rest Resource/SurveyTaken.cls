public class SurveyTaken {

	public String Id {get;set;} 
	public String Name {get;set;} 
	public String CaseId {get;set;} 
	public String ContactId {get;set;} 
	public String SurveyId {get;set;} 
	public String OwnerId {get;set;} 
	public List<Survey_Question_Answers> Survey_Question_Answers {get;set;} 

	public SurveyTaken(JSONParser parser) {
		while (parser.nextToken() != System.JSONToken.END_OBJECT) {
			if (parser.getCurrentToken() == System.JSONToken.FIELD_NAME) {
				String text = parser.getText();
				if (parser.nextToken() != System.JSONToken.VALUE_NULL) {
					if (text == 'Id') {
						Id = parser.getText();
					} else if (text == 'Name') {
						Name = parser.getText();
					} else if (text == 'CaseId') {
						CaseId = parser.getText();
					} else if (text == 'ContactId') {
						ContactId = parser.getText();
					} else if (text == 'SurveyId') {
						SurveyId = parser.getText();
					} else if (text == 'OwnerId') {
						OwnerId = parser.getText();
					} else if (text == 'Survey_Question_Answers') {
						Survey_Question_Answers = arrayOfSurvey_Question_Answers(parser);
					} else {
						System.debug(LoggingLevel.WARN, 'SurveyTaken consuming unrecognized property: '+text);
						consumeObject(parser);
					}
				}
			}
		}
	}
	
	public class Survey_Question_Answers {
		public String SurveyTakerId {get;set;} 
		public String Id {get;set;} 
		public String Name {get;set;} 
		public String Survey_QuestionId {get;set;} 
		public String Response {get;set;} 

		public Survey_Question_Answers(JSONParser parser) {
			while (parser.nextToken() != System.JSONToken.END_OBJECT) {
				if (parser.getCurrentToken() == System.JSONToken.FIELD_NAME) {
					String text = parser.getText();
					if (parser.nextToken() != System.JSONToken.VALUE_NULL) {
						if (text == 'SurveyTakerId') {
							SurveyTakerId = parser.getText();
						} else if (text == 'Id') {
							Id = parser.getText();
						} else if (text == 'Name') {
							Name = parser.getText();
						} else if (text == 'Survey_QuestionId') {
							Survey_QuestionId = parser.getText();
						} else if (text == 'Response') {
							Response = parser.getText();
						} else {
							System.debug(LoggingLevel.WARN, 'Survey_Question_Answers consuming unrecognized property: '+text);
							consumeObject(parser);
						}
					}
				}
			}
		}
	}
	
	
	public static SurveyTaken parse(String json) {
		System.JSONParser parser = System.JSON.createParser(json);
		return new SurveyTaken(parser);
	}
	
	public static void consumeObject(System.JSONParser parser) {
		Integer depth = 0;
		do {
			System.JSONToken curr = parser.getCurrentToken();
			if (curr == System.JSONToken.START_OBJECT || 
				curr == System.JSONToken.START_ARRAY) {
				depth++;
			} else if (curr == System.JSONToken.END_OBJECT ||
				curr == System.JSONToken.END_ARRAY) {
				depth--;
			}
		} while (depth > 0 && parser.nextToken() != null);
	}
	

    private static List<Survey_Question_Answers> arrayOfSurvey_Question_Answers(System.JSONParser p) {
        List<Survey_Question_Answers> res = new List<Survey_Question_Answers>();
        if (p.getCurrentToken() == null) p.nextToken();
        while (p.nextToken() != System.JSONToken.END_ARRAY) {
            res.add(new Survey_Question_Answers(p));
        }
        return res;
    }
}
