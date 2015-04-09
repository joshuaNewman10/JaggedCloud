/** 
 * textEditorCtrl.js
 * 
 * This is the controller responsible for the text editors in a room.
 */

(function(){

  angular
    .module('hackbox')
    .controller('textEditorCtrl', TextEditorCtrl);

  TextEditorCtrl.$inject = ['$scope' , 'TextEditor', 'Video'];

  function TextEditorCtrl($scope, TextEditor, Video){
    $scope.editors = [];
    $scope.okToSend = true;
    var MAX_EDITORS = 5;

    // The $destroy event is called when we leave this view
    $scope.$on('$destroy', function(){
      $scope.uninit();
    });

    /**  
     * Function: TextEditorCtrl.init()
     * This function will initialize all entities upon switching the the room state.
     */
    $scope.init = function(){
      $scope.addTextEditor();

      // Setup Icecomm listener for incoming data
      Video.getIcecommInstance().on('data', function(peer) {
        $scope.okToSend = false;
        var editorIdx = indexOfEditorWithId(peer.data.editorId);
        if(editorIdx !== -1)
          $scope.editors[editorIdx].editor.setValue(peer.data.data,1);
        $scope.okToSend = true;
      });
    };

    /**
     * Function: TextEditorCtrl.uninit()
     * This function will be called when we leave a room.
     * It will destroy all editors currently in use. 
     */
    $scope.uninit = function(){
      console.log('Destroying text editors');
      // Remove all text editors
      $scope.editors.forEach(function(editor){
        editor.editor.destroy();
      });
    };
    /**
     * Function: TextEditorCtrl.addTextEditor()
     * This function will add a new text editor to the DOM. 
     */
    $scope.addTextEditor = function(){
      if($scope.editors.length < MAX_EDITORS){
        // Get the id to assign
        var editorId = nextSmallestId($scope.editors, MAX_EDITORS);

        // Hide all editors and tabs
        deactivateTabsAndEditors();

        // Add new editor, starts as active.
        var tab = {name: 'New Tab ' + editorId,
                   active: true}; 
        var editor = {id: editorId, 
                      tab: tab, 
                      editor: TextEditor.createEditor('#editors',editorId) };

        // Setup ace editor listener for change in text
        editor.editor.on('change', function(event){
          var text = editor.editor.getSession().getValue();
          var editorId = editor.id;

          if($scope.okToSend)
            Video.getIcecommInstance().send({data: text, editorId: editorId});
        });

        $scope.editors.push(editor);
      }
      else{
        console.log('Cannot have more than 5 editors!');
      }
    };

    /**
     * Function: TextEditorCtrl.removeTextEditor(editorId)
     * This function will remove a text editor from the DOM.
     *
     * @param editorId: An integer representing the ID of an editor object. Range(0 - MAX_EDITORS)
     */
    $scope.removeTextEditor = function(editorId){
      var switchEditorFocus = false;

      if($scope.editors.length > 1){
        // Determine if the currently activeEditor is the one being removed
        if( $('.activeEditor').attr('id') === 'editor' + editorId )
          switchEditorFocus = true;

        // Remove the element from the DOM by element Id
        var id = '#editor' + editorId;
        $(id).remove();

        // Destroy the editor and splice the element with the matching id out of editors
        var idxToRemove = indexOfEditorWithId(editorId);
        $scope.editors[idxToRemove].editor.destroy();
        $scope.editors.splice(idxToRemove,1);

        // Set active editor if needed
        if(switchEditorFocus){
          if(idxToRemove < $scope.editors.length)
            $scope.setActiveEditor($scope.editors[idxToRemove].id);
          else
            $scope.setActiveEditor($scope.editors[idxToRemove-1].id);
        }
      }
    };

    /**
     * Function: TextEditorCtrl.removeTextEditor(editorId)
     * This function will set the editor in the collection with the matching Id as the active editor 
     *
     * @param editorId: An integer representing the ID of an editor object. Range(0 - MAX_EDITORS)
     */
    $scope.setActiveEditor = function(editorId){
      var editorToFocusOn = indexOfEditorWithId(editorId);
      // Hide all tabs and editors.
      deactivateTabsAndEditors();

      // Add 'activeEditor' class to the editor with the correct id. Also set the tab as active.
      TextEditor.setEditorActive(editorId);
      $scope.editors[editorToFocusOn].tab.active = true;

      // Focus on the editor and set cursor to end.
      $scope.editors[editorToFocusOn].editor.focus();
      $scope.editors[editorToFocusOn].editor.navigateLineEnd();
    };

    /**
     * Function: deactivateTabsAndEditors()
     * A helper function to set all editors and tabs as inactive. 
     */
    function deactivateTabsAndEditors(){
      // Remove active class from all editors
      TextEditor.deactivateAllEditors();

      // Remove activeTab class from all tabs
      $scope.editors.forEach(function(editor){
        editor.tab.active = false;
      });
    };

    /**
     * Function: nextSmallestId(arr, limit)
     * A helper function to find the smallest editor.id # from 0 - limit
     * that does not exist currently in the editors collection.
     *
     * @param arr: A collection to iterate over. 
     * @param limit: The maximum value of an ID #
     * @return: The minimum ID # that does not currently exist within the collection. 
     */
    function nextSmallestId(arr, limit){
      var ids = {};
      for(var i = 0; i < arr.length; i++){
        var editor = arr[i];
        ids[editor.id] = true;
      }
      for(var i = 0; i < limit; i++){
        if(ids[i] !== true)
          return i;
      }
      return 0;
    };

    /**
     * Function: indexOfEditorWithId(editorId)
     * A helper function to find the smallest editor.id # from 0 - limit
     * that does not exist currently in the editors collection.
     *
     * @param editorId: An integer representing the ID of the editor to find. Range(0 - MAX_EDITORS)
     * @return: The index in the editors collection which corresponds to the editor with the 
     * matching Id. 
     */
    function indexOfEditorWithId(editorId){
      var idx = $scope.editors.map(function(editor) {
                            return editor.id;
                          }).indexOf(editorId);
      return idx;
    }
    $scope.init();
  }

})();
