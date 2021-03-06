/**
 * Wrapper component for the ember-modal-dialog component. It augments the base component
 * with te-modal__header, te-modal__body and te-modal__footer. It also allows for
 * a cancelAction and a submitAction
 * @module components/te-modal
 * @property {String} headerText        - text for the header
 * @property {String} cancelButtonText  - text for the cancel button
 * @property {String} submitButtonText  - text for the submit button
 * @property {Boolean} isCancellable    - wether the modal can be exited
 * @property {Boolean} hasFooter        - toggles the footer view
 * @property {Boolean} hasHeader        - toggles the header view
 * @property {Function} submitAction    - closure action that handles the submit button click
 * @property {Function} cancelAction    - closure action that handles the cancel button click
 * @example
  {{#te-modal
    headerText="My Title"
    cancelButtonText="Abort"
    submitButtonText="Yes Please!"
    submitAction=(action "submitAction")
    cancelAction=(action "cancelAction")
  }}
    <h1>Insert the body here</h1>
  {{/te-modal}}
 * @exports te-modal
 * @author yyuen
 */

import Component from '@ember/component';
import { set } from  '@ember/object';

export default Component.extend({
  containerClassNames: 'te-modal',
  overlayClassNames: ['te-modal-overlay'],
  targetAttachment: 'center',
  headerText: 'Title',
  isCancellable: true,
  hasHeader: true,
  hasFooter: true,
  cancelButtonText: 'Cancel',
  submitButtonText: 'Save',
  isShowingModal: true,

  actions: {
    /**
     * Invokes the passed submit closure action
     */
    submitAction() {
      const action = this.attrs.saveAction;
      if (action) {
        return action();
      }
    },
    /**
     * Invokes the passed cancel closure action
     */
    cancelAction() {
      const action = this.attrs.cancelAction;
      if (action) {
        return action();
      }
    },

    /**
     * Performs the cancel action and closes the modal
     */
    async onCancel() {
      await this.send('cancelAction');
      set(this, 'isShowingModal', false);
    },

    /**
     * Performs the submit action and closes the modal
     */
    async onSubmit() {
      await this.send('submitAction');
      set(this, 'isShowingModal', false);
    }
  }
});
