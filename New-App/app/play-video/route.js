import Route from '@ember/routing/route';
import { inject as service } from '@ember/service';
import AjaxUtil from '../utils/ajax-util';
export default Route.extend({
    loggedINDetails: service('login-details'),
    refreshPage: service('play-video-service'),
    queryParams: {
        videoId: { refreshModel: true },
        uploadedBy: { refreshModel: true }
    },


    beforeModel() {
        // if(!this.get('loggedINDetails').loginDetails.isLoggedIN){
        //     this.transitionTo('');
        // }
        console.log(this.get('loggedINDetails').loginDetails.isLoggedIN)
        console.log(this.get('refreshPage').playRefrresh.isRefresh)
        console.log((this.get('refreshPage').playRefrresh.isRefresh && this.get('loggedINDetails').loginDetails.isLoggedIN))
        console.log((this.get('refreshPage').playRefrresh.isRefresh && !(this.get('loggedINDetails').loginDetails.isLoggedIN)))
        if((this.get('loggedINDetails').loginDetails.isLoggedIN)){
            if(!(this.get('refreshPage').playRefrresh.isRefresh)){
                this.transitionTo('home');
            }
        }
        else if(!(this.get('loggedINDetails').loginDetails.isLoggedIN)){
            if(!(this.get('refreshPage').playRefrresh.isRefresh)){
                this.transitionTo('');
            }
        }
        
    },
    model(param) {
        return param;
    },
    setupController(controller, model) {
        this._super(controller, model);
        this.set('uploaded_by', model.uploadedBy)
        this.set('video_id', model.videoId)
        this.getHomePageData(controller);

    },
    getHomePageData: function (controller) {
        // let self = this;
        let url = "http://localhost:8082/App/PlayPageData";
        let data = { "video-id": this.get('video_id'), "uploaded-by": this.get('uploaded_by'), "isLoggedIn": this.get('loggedINDetails').loginDetails.isLoggedIN };
        let type = 'POST'

        AjaxUtil.ajax(url, data, type).then(function (data) {
            if (data.isSuccess == true) {
                controller.set('recommendedVideoDatas', data.recommendedVideoData);
                controller.set('playVideoData', data.playVideoData);
                var video = document.querySelector('#video');
                url = data.playVideoData.url;
                video.setAttribute("src", url);
                video.play();
                let milliSecs = controller.get('playVideoData.uploaded-on');
                let date = new Date(Number(milliSecs))
                let dateOnly = date.getDate() + '-' + date.getMonth() + '-' + date.getFullYear() + ' :: ' + date.getHours() + ':' + date.getMinutes();
                controller.set('date', dateOnly)
            }
            else {
                console.log(data)
            }
        })
    },
    // refreshPageNow: function () {
    //     let self = this;
    //     console.log("dsfuiu")
    //     self.get('refreshPage').setFalse();
    //     // setTimeout("location.refresh(true);",10);
    // },
    // actions: {
    //     refreshRouteFromCont() {
    //         //this.transitionTo('a');
    //         console.log(this.get('queryParams'))
    //         this.set('uploaded_by', this.get('queryParams').uploadedBy)
    //         this.set('video_id', this.get('queryParams').videoId)
    //         this.refresh();
    //         console.log('refresh');
    //     }
    // }

});
