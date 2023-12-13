import Service from '@ember/service';

export default Service.extend({
    isPopupClosed : null,
    init(){
        this._super(...arguments);
        this.get('isPopupClosed', false);
    },

    closePopup(){
        this.get('isPopupClosed', true);
    }
});
