public class New_Account_CTRL2 {
    //public Map<String, String> mapWilayah {get; set;}
    
    @AuraEnabled
    public static Account getAccount(String accId){
        Account acc = [SELECT AccountSource, Agama__pc, Alamat_Apps__pc, Alamat_KTP__pc, Alamat_Kantor__pc, Alamat_Rumah__pc, Alamat_Surat__pc, BillingAddress, BillingCity, BillingCountry, BillingGeocodeAccuracy, BillingLatitude, BillingLongitude, BillingPostalCode, BillingState, BillingStreet, CreatedById, CreatedDate, Current_Address__pc, Customer_Id__c, Customer_Tag__pc, Description, FirstName, ID_No_KTP__pc, Id, Industry, IsDeleted, IsPersonAccount, Jenis_Kelamin__pc, Jigsaw, JigsawCompanyId, Kode_Kecamatan_Apps__pc, Kode_Kecamatan_KTP__pc, Kode_Kecamatan_Kantor__pc, Kode_Kecamatan_Rumah__pc, Kode_Kecamatan_Surat__pc, Kode_Kelurahan_Apps__pc, Kode_Kelurahan_KTP__pc, Kode_Kelurahan_Kantor__pc, Kode_Kelurahan_Rumah__pc, Kode_Kelurahan_Surat__pc, Kode_Kota_Apps__pc, Kode_Kota_KTP__pc, Kode_Kota_Kantor__pc, Kode_Kota_Lahir__pc, Kode_Kota_Rumah__pc, Kode_Kota_Surat__pc, Kode_Pos_Apps__pc, Kode_Pos_KTP__pc, Kode_Pos_Kantor__pc, Kode_Pos_Rumah__pc, Kode_Pos_Surat__pc, Kode_Propinsi_Apps__pc, Kode_Propinsi_KTP__pc, Kode_Propinsi_Kantor__pc, Kode_Propinsi_Rumah__pc, Kode_Propinsi_Surat__pc, Kode_Warga_Negara__pc, Kota_KTP__pc, Kota_Kantor__pc, Kota_Rumah__pc, Kota_Surat__pc, LastActivityDate, LastModifiedById, LastModifiedDate, LastName, LastReferencedDate, LastViewedDate, MasterRecordId, Membership_ID__pc, NPWPFormat__c, NPWP__pc, Name, Nomor_Customer__pc, Nomor_HP__pc, NumberOfEmployees, OwnerId, ParentId, Pekerjaan__pc, Pembayar_Tagihan__pc, Pembeli__pc, Pemilik__pc, Penghuni__pc, PersonContactId, PersonDepartment, PersonEmail, PersonEmailBouncedDate, PersonEmailBouncedReason, PersonLastCURequestDate, PersonLastCUUpdateDate, PersonMailingAddress, PersonMailingCity, PersonMailingCountry, PersonMailingGeocodeAccuracy, PersonMailingLatitude, PersonMailingLongitude, PersonMailingPostalCode, PersonMailingState, PersonMailingStreet, PersonMobilePhone, PersonTitle, Phone, PhotoUrl, RecordTypeId, Salutation, Sama_dengan_alamat_KTP__c, ShippingAddress, ShippingCity, ShippingCountry, ShippingGeocodeAccuracy, ShippingLatitude, ShippingLongitude, ShippingPostalCode, ShippingState, ShippingStreet, SicDesc, Status__pc, SystemModstamp, Tanggal_Lahir__pc, Telepon_Kantor__pc, Telepon_Rumah__pc, Tempat_Lahir__pc, Tipe_Customer__pc, Type, Unstated_Claim__pc, Website FROM Account where id=:accId];
        system.debug(acc);
        Map<String, List<Map<String, String>>> mss = new Map<String, List<Map<String, String>>>();
        
        return acc;
    }
    
    @AuraEnabled
    public static Map<String, String> getProvince(){
        Map<String, String> mapWilayah = new Map<String, String>();
        List<MS_Propinsi__c> LMP = [SELECT Id, Kode_Propinsi__c, Kode_Negara__c, Name FROM MS_Propinsi__c Order by Name];
        for(MS_Propinsi__c mp : LMP){
            mapWilayah.put(mp.id, mp.Name);
        }
        return mapWilayah;
    }
    @AuraEnabled
    public static Map<String, String> getKotaKabupaten(String idProvince){
        Map<String, String> mapWilayah = new Map<String, String>();
        List<MS_Kota__c> LMK = [SELECT Id, MS_Propinsi__c, Tipe__c, Name FROM MS_Kota__c where MS_Propinsi__c = :idProvince Order by Name];
        for(MS_Kota__c mk : LMK){
            mapWilayah.put(mk.id, mk.Name);
        }
        return mapWilayah;
    }
    @AuraEnabled
    public static Map<String, String> getKecamatan(String idKota){
        Map<String, String> mapWilayah = new Map<String, String>();
        List<MS_Kecamatan__c> LMK = [SELECT Id, Name, MS_Kota__c FROM MS_Kecamatan__c where MS_Kota__c = :idKota Order by Name];
        for(MS_Kecamatan__c mk : LMK){
            mapWilayah.put(mk.id, mk.Name);
        }
        return mapWilayah;
    }
    @AuraEnabled
    public static Map<String, String> getKelurahan(String idKecamatan){
        Map<String, String> mapWilayah = new Map<String, String>();
        List<MS_Kelurahan__c> LMK = [SELECT Id, MS_Kecamatan__c, Name FROM MS_Kelurahan__c where MS_Kecamatan__c = :idKecamatan Order by Name];
        for(MS_Kelurahan__c mk : LMK){
            mapWilayah.put(mk.id, mk.Name);
        }
        return mapWilayah;
    }
    @AuraEnabled
    Public static string createAccount(Account objacc){
        String msg = '';
        system.debug(objacc);
        system.debug(objacc.Kode_Propinsi_KTP__pr);
        try{
            //Insert account Record
            /*if(objacc.Tipe_Customer__pc == 'Person Account'){
                RecordType personAccountRecordType =  [SELECT Id FROM RecordType WHERE Name = 'Person Account' and SObjectType = 'Account'];
                objacc.RecordType = personAccountRecordType;
            }*/
            objacc.Kode_Propinsi_Apps__pr = null;
            objacc.Kode_Propinsi_Surat__pr = null;
            objacc.Kode_Propinsi_Rumah__pr = null;
            objacc.Kode_Propinsi_Kantor__pr = null;
            objacc.Kode_Propinsi_KTP__pr = null;
            objacc.Pekerjaan__pr = null;
            objacc.Kode_Kota_Apps__pr = null;
            objacc.Kode_Kota_Surat__pr = null;
            objacc.Kode_Kota_Rumah__pr = null;
            objacc.Kode_Kota_Lahir__pr = null;
            objacc.Kode_Kota_Kantor__pr = null;
            objacc.Kode_Kota_KTP__pr = null;
            objacc.Kode_Kelurahan_Apps__pr = null;
            objacc.Kode_Kelurahan_Kantor__pr = null;
            objacc.Kode_Kelurahan_Surat__pr = null;
            objacc.Kode_Kelurahan_Rumah__pr = null;
            objacc.Kode_Kelurahan_KTP__pr = null;
            objacc.Kode_Kecamatan_Apps__pr = null;
            objacc.Kode_Kecamatan_Surat__pr = null;
            objacc.Kode_Kecamatan_Kantor__pr = null;
            objacc.Kode_Kecamatan_Rumah__pr = null;
            objacc.Kode_Kecamatan_KTP__pr = null;

            upsert objacc; 
            
            return objacc.id;
        }catch(DmlException e){
            //Any type of Validation Rule error message, Required field missing error message, Trigger error message etc..
            //we can get from DmlException
             
            //Get All DML Messages
            for (Integer i = 0; i < e.getNumDml(); i++) {
                //Get Validation Rule & Trigger Error Messages
                msg =+ e.getDmlMessage(i) +  '\n' ;
            }
            //throw DML exception message
            throw new AuraHandledException(msg);
             
        }catch(Exception e){
            //throw all other exception message
            throw new AuraHandledException(e.getMessage());
        }
        finally {
        }
    } 
    
}
