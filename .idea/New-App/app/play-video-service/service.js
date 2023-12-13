import Service from '@ember/service';

export default Service.extend({
    playRefrresh : {
        isRefresh : false
    },
    init(){
        this._super(...arguments);
        this.set('playRefrresh.isRefresh', false);
    },

    setTrue(){
        this.set('playRefrresh.isRefresh', true);
    },
    setFalse(){
        this.set('playRefrresh.isRefresh', false);
    }
});
