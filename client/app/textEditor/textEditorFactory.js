/** 
 * textEditorFactory.js
 * 
 * This is a service responsible for appending an Ace text editor to the DOM. 
 * It also assists in editing the editor elements. 
 */

(function() {
  angular
    .module('hackbox')
    .factory('TextEditor', TextEditor);

  TextEditor.$inject = [];

  function TextEditor() {
    var instance = {
      createEditor: createEditor,
      setEditorActive: setEditorActive,
      deactivateAllEditors: deactivateAllEditors
    };

    return instance;

    //// IMPLEMENTATION /////
    /**  
     * Function: TextEditor.createEditor(elementToAppendTo, editorId)
     * This function will append a new Ace editor to the DOM at the specified element in the DOM.
     * It will return the instance of the editor. 
     *
     * @param elementToAppendTo: The DOM element to append an editor to. 
     * @param editorId: The editor ID # for later reference to the editor. 
     * @return: The editor instance. 
     */
    function createEditor(elementToAppendTo, editorId){
      $(elementToAppendTo).append('<div class="editor activeEditor" id="editor'+ editorId + '"></div>');

      var editor = ace.edit('editor' + editorId);
      var defaultText = '// Enter code here.';

      editor.setTheme("ace/theme/monokai");
      editor.getSession().setMode("ace/mode/javascript");
      editor.setShowPrintMargin(false);
      editor.setValue(defaultText,1);
      editor.focus();
      editor.navigateLineEnd();

      return editor;
    }

    /**  
     * Function: TextEditor.setEditorActive(editorId)
     * This function will add the class 'active' to the specified element with "id='editorX'"
     *
     * @param editorId: The ID # of the element to find in the DOM. 
     */
    function setEditorActive(editorId){
      var id = '#editor' + editorId;
      $(id).addClass('activeEditor');
    }

    /**  
     * Function: TextEditor.deactivateAllEditors()
     * This function will find all elements with the class='editor' and remove the class 'active'
     * from them. Essentially, hiding that element. 
     */
    function deactivateAllEditors(){
      $('.editor').removeClass('activeEditor');
    }

  }
})();