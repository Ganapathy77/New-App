import Component from '@ember/component';
import { inject } from '@ember/service';
import { inject as service } from '@ember/service';
export default Component.extend({
    router:inject(),
    refreshPage: service('play-video-service'),
    init(){
        this._super(...arguments);
        let milliSecs = this.get('videoSummary.uploaded-on');
        let date = new Date(Number(milliSecs))
        let dateOnly = date.getDate() + '-' + date.getMonth() + '-' + date.getFullYear() + ' : ' + date.getHours() + ':' + date.getMinutes();
        this.set('date',dateOnly)
        console.log(this.get('videoSummary.uploaded-on'))
        console.log(date)
    },
    actions:{
        removeVideo(id){
            const videoCard = document.getElementById(id);
            console.log(videoCard);
            videoCard.classList.remove('active');
            setTimeout(() => {
                videoCard.remove();
            }, 500);
        },
        playVideo(){
            this.get('refreshPage').setTrue();
            this.get('router').transitionTo('play-video' , { queryParams: {  videoId: this.get('videoSummary.id'), uploadedBy: this.get('videoSummary.uploaded-by') }});
        }
    }
});
