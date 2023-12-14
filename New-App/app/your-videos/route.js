import Route from '@ember/routing/route';
import { inject as service } from '@ember/service';
import AjaxUtil from '../utils/ajax-util';
import AlertUtil from '../utils/alert-util';

export default Route.extend({
    loggedINDetails: service('login-details'),
    beforeModel(){
        if(!this.get('loggedINDetails').loginDetails.isLoggedIN){
            this.transitionTo('');
        }
    },
    setupController(controller, model){
        this._super(controller,model);
        this.getYourVideoDetails(controller);
    },
    getYourVideoDetails: function(controller){
        let self = this;
        let url = "http://localhost:8082/App/CurrentUserVideos";
        let uploaded_by = this.get('loggedINDetails').loginDetails.username;
        let data = {"uploaded-by" : uploaded_by};
        let type = 'POST'

        AjaxUtil.ajax(url,data,type).then(function(data){
            if(data.isSuccess == true){
                controller.set('currentUserVideos', data.resultData);
                controller.set('isSuccess' , true);
                console.log(data.resultData)
                console.log(data)
                // return data.resultData;
            }
            else{
                controller.set('isSuccess' , false);
                console.log(data)
            }
        })
    },
});
