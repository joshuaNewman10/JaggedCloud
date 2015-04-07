(function() {
  angular
    .module('hackbox')
    .factory('TextEditor', TextEditor);

  TextEditor.$inject = [];

  function TextEditor() {
    var instance = {
      createEditor: createEditor
    };

    return instance;

    //// IMPLEMENTATION /////
    function createEditor(editorId){
      var editor = ace.edit(editorId);
      var defaultText = '// Enter code here.';

      editor.setTheme("ace/theme/monokai");
      editor.getSession().setMode("ace/mode/javascript");
      editor.setShowPrintMargin(false);
      editor.setValue(defaultText,1);

      return editor;
    }
  }
})();