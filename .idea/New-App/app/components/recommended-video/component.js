import Component from '@ember/component';
import { inject } from '@ember/service';
import { inject as service } from '@ember/service';
export default Component.extend({
    router:inject(),
    refreshPage: service('play-video-service'),
    init(){
        this._super(...arguments);
        let milliSecs = this.get('recommendedVideoData.uploaded-on');
        let date = new Date(Number(milliSecs))
        let dateOnly = date.getDate() + '-' + date.getMonth() + '-' + date.getFullYear();
        this.set('date',dateOnly)
        console.log(this.get('recommendedVideoData.uploaded-on'))
        console.log(date)
    },
    actions:{
        // removeVideo(id){
        //     const videoCard = document.getElementById(id);
        //     console.log(videoCard);
        //     videoCard.classList.remove('active');
        //     setTimeout(() => {
        //         videoCard.remove();
        //     }, 500);
        // },
        playVideo(){
            // this.sendAction('refreshRoute', { queryParams: {  videoId: this.get('recommendedVideoData.id'), uploadedBy: this.get('recommendedVideoData.uploaded-by') }});
            this.get('refreshPage').setTrue();
            this.get('router').transitionTo('play-video' , { queryParams: {  videoId: this.get('recommendedVideoData.id'), uploadedBy: this.get('recommendedVideoData.uploaded-by') }});
        }
    }
});
