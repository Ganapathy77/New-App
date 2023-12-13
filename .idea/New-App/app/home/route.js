import Route from '@ember/routing/route';
import { inject as service } from '@ember/service';
import AjaxUtil from '../utils/ajax-util';
// import AlertUtil from '../utils/alert-util';
export default Route.extend({
    loggedINDetails: service('login-details'),
     
    beforeModel(){
        if(!this.get('loggedINDetails').loginDetails.isLoggedIN){
            this.transitionTo('');
        }
    },
    setupController(controller, model){
        this._super(controller,model);
        this.getHomePageData(controller);
    },
    afterModel(){
        console.log(this.get('videoDetails'));
        console.log("bye")
    },
    getHomePageData: function(controller){
        let self = this;
        let url = "http://localhost:8082/App/HomePageData";
        let data = {};
        let type = 'POST'

        AjaxUtil.ajax(url,data,type).then(function(data){
            if(data.isSuccess == true){
                controller.set('videoDetails', data.resultData);
                console.log(data.resultData)
                console.log(data)
                // return data.resultData;
            }
            else{
                console.log(data)
            }
        })
    }
});
