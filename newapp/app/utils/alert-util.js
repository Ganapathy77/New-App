import EmberObject from '@ember/object';
export default EmberObject.create({
  alertbox: (alertTextbox, classAdded, textContent) => {
    if (alertTextbox.classList.contains('success')) {
      alertTextbox.classList.remove('success')
    }
    if (alertTextbox.classList.contains('info')) {
      alertTextbox.classList.remove('info')
    }
    if (alertTextbox.classList.contains('danger')) {
      alertTextbox.classList.remove('danger')
    }
    alertTextbox.classList.add(classAdded)
    alertTextbox.textContent = textContent;
    const login_register_body = document.querySelector('.login-register-body');
    login_register_body.classList.add('blur');
  }
});
