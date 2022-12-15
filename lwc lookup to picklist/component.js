import { LightningElement, track} from 'lwc';
import getPicklist from "@salesforce/apex/getPicklist.getPicklist";

export default class CreateWalkInRepair extends LightningElement {
	plValue;
	@track Picklist;
	connectedCallback(){
		getPicklist({ 
            param_1 : param1, 
            param_2 : param2,
        })
        .then(result => {
            if (result) {                    
                console.log('result', result);
                var options = [];
                for (var key in result) {
                    console.log('key', key, result[key]);
                    options.push({ label: result[key], value: key });
                }
                console.log('result', JSON.stringify(options));
                this.plValue = options;
                console.log('result', JSON.stringify(this.plValue));
            }
        }).catch(error => {
            this.dispatchEvent(
                new ShowToastEvent({
                    title: 'Error',
                    message: error.body.message,
                    variant: 'error',
                }),
            );
            console.log("error", JSON.stringify(this.error));
        })
	}
	
	handleFieldChange(event){
        console.log("field Id",event.target.dataset.id);
        console.log("field value",event.target.value);
        if(event.target.dataset.id === 'Picklist'){
            this.Picklist = event.target.value;
        }
	}
}