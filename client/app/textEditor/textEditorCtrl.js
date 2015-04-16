/** 
 * textEditorCtrl.js
 * 
 * This is the controller responsible for the text editors in a room.
 */

(function(){

  angular
    .module('hackbox')
    .controller('textEditorCtrl', TextEditorCtrl);

  TextEditorCtrl.$inject = ['$scope' , 'TextEditor'];

  function TextEditorCtrl($scope, TextEditor){
    $scope.editors = TextEditor.getEditors();

    // The $destroy event is called when we leave this view
    $scope.$on('$destroy', function(){
      console.log('Destroying text editors');
      TextEditor.removeAllEditors();
    });

    /**  
     * Function: TextEditorCtrl.init()
     * This function will initialize a single editor and initialize the data listener on icecomm
     */
    $scope.init = function(){
      // TextEditor.addTextEditor();
      // TextEditor.initializeDataListener();
    };


    /**
     * Function: TextEditorCtrl.addTextEditor()
     * This function will add a new text editor to the DOM. 
     */
    $scope.addTextEditor = function(){
      TextEditor.addTextEditor();
    };

    /**
     * Function: TextEditorCtrl.removeTextEditor(editorId)
     * This function will remove a text editor from the DOM.
     *
     * @param editorId: An integer representing the ID of an editor object. Range(0 - MAX_EDITORS)
     */
    $scope.removeTextEditor = function(editorId){
      TextEditor.removeTextEditor(editorId);
    };

    /**
     * Function: TextEditorCtrl.removeTextEditor(editorId)
     * This function will set the editor in the collection with the matching Id as the active editor 
     *
     * @param editorId: An integer representing the ID of an editor object. Range(0 - MAX_EDITORS)
     */
    $scope.setActiveEditor = function(editorId){
      TextEditor.setActiveEditor(editorId);
    };

    /**
     * Function: TextEditorCtrl.removeTextEditor(editorId)
     * This function will set the editor in the collection with the matching Id as the active editor 
     *
     * @param editorId: An integer representing the ID of an editor object. Range(0 - MAX_EDITORS)
     */
    $scope.deactivateTabs = function(){
      TextEditor.deactivateTabsAndEditors();
    };

    $scope.init();
  }

})();
