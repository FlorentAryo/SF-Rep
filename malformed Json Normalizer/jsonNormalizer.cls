public class json_Normalizer {
	public Static String Normalize(String jsonbody){
        String body = jsonbody;
        while(body.contains('\\')){
            body = body.unescapeEcmaScript();
        }
        if(body.contains(':"",'))body = body.replace(':"",', ':" ",');
        if(body.contains(':""}'))body = body.replace(':""}', ':" "}');
        if(body.contains(':""]'))body = body.replace(':""]', ':" "]');
        if(body.contains('""'))body = body.replace('""', '"');
        if(body.contains('\"'))body = body.replace('\"', '\\"');
        if(body.contains(':\\"'))body = body.replace(':\\"', ':"');
        if(body.contains('\\":'))body = body.replace('\\":', '":');
        if(body.contains(',\\"'))body = body.replace(',\\"', ',"');
        if(body.contains('\\",'))body = body.replace('\\",', '",');
        if(body.contains('{\\"'))body = body.replace('{\\"', '{"');
        if(body.contains('\\"}'))body = body.replace('\\"}', '"}');
        if(body.contains('"{'))body = body.replace('"{', '{');
        if(body.contains('}"'))body = body.replace('}"', '}');
        if(body.contains('\n'))body = body.replace('\n', '\\n');
        return body;
    }
}
