import EmberObject from '@ember/object';
import $ from 'jquery'
export default EmberObject.create({
  ajax: (url,data,type) =>{
    return new Promise(function(resolve, reject){
      $.ajax({
        url : url,
        data : data,
        type : type,
        // success : (data) => {
        //   resolve(data);
        // },
        // failure : (data) => {
        //   reject(data);
        // }
    }).done(function (data){
      resolve(data);
    })
    .fail((data) => {
      reject(data);
    })
    });
  }
});
