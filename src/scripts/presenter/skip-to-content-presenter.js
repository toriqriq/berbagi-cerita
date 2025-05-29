class SkipToContentPresenter {
  constructor(view) {
    this.view = view;
    this._init();
  }

  _init() {
    this.view.bindSkipEvent(() => {
      this.view.focusMainContent();
    });
  }
}

export default SkipToContentPresenter;
