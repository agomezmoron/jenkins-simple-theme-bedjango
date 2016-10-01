function onChangeHandler(event) {
  console.log(event);
  console.log(document.getElementsBySelector('img[src="*new-package.png"]'));
  /*
   * <img src="/jenkins/static/875debfc/images/24x24/new-package.png" style="margin: 2px;" alt="" height="24" width="24">
   */
}

document.body
  .addEventListener('DOMSubtreeModified', onChangeHandler);


