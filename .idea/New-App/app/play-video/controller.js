import Controller from '@ember/controller';

export default Controller.extend({
    queryParams: {
        videoId: "",
        uploadedBy: ""
    },
    actions:{
        // refreshRoute(param){
        //     console.log("from contr" , param)
        //     this.set('queryParams', param)
        //     this.send('refreshRouteFromCont');
        //   }
    }
});
