import Component from '@ember/component';
import { inject as service } from '@ember/service';
import { inject } from '@ember/service';
export default Component.extend({
    router:inject(),
    refreshPage: service('play-video-service'),

    init(){
        this._super(...arguments);
        let milliSecs = this.get('currentUserVideo.uploaded-on');
        let date = new Date(Number(milliSecs))
        let dateOnly = date.getDate() + '-' + date.getMonth() + '-' + date.getFullYear() + ' : ' + date.getHours() + ':' + date.getMinutes();
        this.set('date',dateOnly)
        console.log(this.get('currentUserVideo.uploaded-on'))
        console.log(date)
    },
    actions:{
        removeVideo(id){
            const videoCard = document.getElementById(id); 
            console.log(videoCard);
            videoCard.classList.remove('active');
            setTimeout(() => {
                videoCard.remove();
            }, 1000);
        },
        playVideo(){
            this.get('refreshPage').setTrue();
            this.get('router').transitionTo('play-video' , { queryParams: {  videoId: this.get('currentUserVideo.id'), uploadedBy: this.get('currentUserVideo.uploaded-by') }});
        }
    }
});
