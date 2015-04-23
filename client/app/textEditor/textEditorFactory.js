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

  TextEditor.$inject = ['$rootScope', 'IcecommWrapper'];

  function TextEditor($rootScope, IcecommWrapper) {
    var _editors = [];
    var _okToSend = true;
    var MAX_EDITORS = 5;

    var instance = {
      init: init,
      getEditors: getEditors,
      addTextEditor: addTextEditor,
      setActiveEditor: setActiveEditor,
      resizeAllEditors: resizeAllEditors,
      removeTextEditor: removeTextEditor,
      removeAllEditors: removeAllEditors,
      deactivateTabsAndEditors: deactivateTabsAndEditors,
      assignKBShortcuts: assignKBShortcuts,
      peerAddEditor: peerAddEditor,
      peerRemoveEditor: peerRemoveEditor
    };

    return instance;

    //// IMPLEMENTATION /////

    ////////////////// Text Editor Methods //////////////////
    function init(savedEditors){
      // If there is text saved, set the editors text to that. 
      loadSavedEditors(savedEditors);

      // Initialize the listener for incoming text
      initializeDataListener();
    }

    /**  
     * Function: TextEditor.getEditors()
     * This function will return the list of editors currently in use
     *
     * @return : A list of editor objects. 
     */
    function getEditors(){
      return _editors;
    }

    /**
     * Function: TextEditor.addTextEditor()
     * This function will add a new text editor to the DOM. 
     */
    function addTextEditor(id){
      var editorId = nextSmallestId(_editors, MAX_EDITORS);

      if(_editors.length < MAX_EDITORS){
        // Get the id to assign
        if(id !== undefined && _editors[id] === undefined){
          var editorId = id;
        } else{
          var editorId = nextSmallestId(_editors, MAX_EDITORS);
        }

        // Hide all editors and tabs
        deactivateTabsAndEditors();

        // Add new editor, starts as active.
        var tab = {name: 'Tab ' + editorId,
                   active: true}; 
        var editor = {id: editorId, 
                      tab: tab, 
                      editor: createEditor('#editors',editorId) };

        // Setup ace editor listener for change in text
        setEditorOnChangeListener(editor);

        _editors.push(editor);
      }
      else{
        console.log('Cannot have more than 5 editors!');
      }
    };

    /**
     * Function: TextEditorCtrl.removeTextEditor(editorId)
     * This function will set the editor in the collection with the matching Id as the active editor 
     *
     * @param editorId: An integer representing the ID of an editor object. Range(0 - MAX_EDITORS)
     */
    function setActiveEditor(editorId){
      var editorToFocusOn = indexOfEditorWithId(editorId);
      // Hide all tabs and editors.
      deactivateTabsAndEditors();

      // Add 'activeEditor' class to the editor with the correct id. Also set the tab as active.
      setEditorActive(editorId);
      _editors[editorToFocusOn].tab.active = true;

      // Focus on the editor and set cursor to end.
      _editors[editorToFocusOn].editor.focus();
      _editors[editorToFocusOn].editor.navigateLineEnd();
    };

    /**
     * Function: TextEditorCtrl.removeTextEditor(editorId)
     * This function will remove a text editor from the DOM.
     *
     * @param editorId: An integer representing the ID of an editor object. Range(0 - MAX_EDITORS)
     */
    function removeTextEditor(editorId){
      var switchEditorFocus = false;

      if(_editors.length > 1){
        // Determine if the currently activeEditor is the one being removed
        if( $('.activeEditor').attr('id') === 'editor' + editorId )
          switchEditorFocus = true;

        // Remove the element from the DOM by element Id
        var id = '#editor' + editorId;
        $(id).remove();

        // Destroy the editor and splice the element with the matching id out of _editors
        var idxToRemove = indexOfEditorWithId(editorId);
        _editors[idxToRemove].editor.destroy();
        _editors.splice(idxToRemove,1);

        // Set active editor if needed
        if(switchEditorFocus){
          if(idxToRemove < _editors.length)
            setActiveEditor(_editors[idxToRemove].id);
          else
            setActiveEditor(_editors[idxToRemove-1].id);
        }
      }
    };

    /**
     * Function: TextEditor.removeAllEditors()
     * This function will be called when we leave a room.
     * It will destroy all editors currently in use. 
     */
    function removeAllEditors(){
      // Remove all text editors
      _editors.forEach(function(editor){
        editor.editor.destroy();
      });

      _editors = [];
    };

    /**
     * Function: TextEditor.resizeAllEditors()
     * This function will rerender all the editors. 
     * This helps the user experience when changing visibility
     */
    function resizeAllEditors(){
      // Force a rerender of editors
      _editors.forEach(function(editor){
        editor.editor.resize();
        editor.editor.renderer.updateFull()
      });
    };

    /**
     * Function: assignKBShortcuts()
     * This function will assign the KB shortcut for saving to the editor. 
     */
    function assignKBShortcuts(saveFn){
      // Assign the save keyboard shortcut to each editor
      _editors.forEach(function(editor){
          editor.editor.commands.addCommand({  name: 'saveFile',
                                        bindKey: {
                                        win: 'Ctrl-S',
                                        mac: 'Command-S',
                                        sender: 'editor|cli'
                                     },
                                      exec: saveFn
          });
      });
    }

    function peerAddEditor(){
      console.log('Add editor to peer!')
      IcecommWrapper.getIcecommInstance().send({command: 'addEditor'});
    }

    function peerRemoveEditor(editorId){
      console.log('Remove Editor to peer!')
      IcecommWrapper.getIcecommInstance().send({command: 'removeEditor', editorId: editorId});
    }
    ///////////////////// End Text Editor Methods //////////////////////

    ///////////////////////// Helper Functions /////////////////////////

    /**  
     * Function: createEditor(elementToAppendTo, editorId)
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

      editor.$blockScrolling = Infinity;
      editor.setTheme("ace/theme/monokai");
      editor.getSession().setMode("ace/mode/javascript");
      editor.setShowPrintMargin(false);
      editor.setValue(defaultText,1);
      editor.focus();
      editor.navigateLineEnd();

      return editor;
    }

    /**  
     * Function: TextEditor.initializeDataListener()
     * This function will initialize all entities upon switching the the room state.
     */
    function initializeDataListener(){
      var comm = IcecommWrapper.getIcecommInstance();

      // Sync with peer if first into room
        comm.on('connected', function(peer) {
          if(comm.isHost()){
            console.log('Sending Peer my data')
            _editors.forEach(function(editor){
              if(_okToSend)
                comm.send({command: 'setData', 
                           data: editor.editor.getSession().getValue(), 
                           editorId: editor.id});
            });
          }
        });

      // Start data listener for peer data transfers
      IcecommWrapper.setDataListener(onPeerData);
    };
    
    function setEditorOnChangeListener(editor){
      editor.editor.on('change', function(event){
        var text = editor.editor.getSession().getValue();
        var editorId = editor.id;

        if(_okToSend)
          IcecommWrapper.getIcecommInstance().send({command: 'setData',
                                                    data: text, 
                                                    editorId: editorId});
      });
    }

    /**
     * Function: TextEditor.setEditorText(text, editorId)
     * This function will set the text in an editor with a given id to text
     *
     * @param text: The text to place in the editor
     * @param editorId: The ID of the editor to change 
     */
    function setEditorText(text, editorId){
      var editorIdx = indexOfEditorWithId(editorId);

      if(editorIdx !== -1){
        var cursorPos = _editors[editorIdx].editor.getCursorPosition();
        _editors[editorIdx].editor.getSession().setValue(text,1);
        _editors[editorIdx].editor.moveCursorToPosition(cursorPos);
      }

    };

    /**  
     * Function: setEditorActive(editorId)
     * This function will add the class 'active' to the specified element with "id='editorX'"
     *
     * @param editorId: The ID # of the element to find in the DOM. 
     */
    function setEditorActive(editorId){
      var id = '#editor' + editorId;
      $(id).addClass('activeEditor');
    }

    /**  
     * Function: deactivateAllEditors()
     * This function will find all elements with the class='editor' and remove the class 'active'
     * from them. Essentially, hiding that element. 
     */
    function deactivateAllEditors(){
      $('.editor').removeClass('activeEditor');
    }

    /**
     * Function: deactivateTabsAndEditors()
     * A helper function to set all editors and tabs as inactive. 
     */
    function deactivateTabsAndEditors(){
      // Remove active class from all editors
      deactivateAllEditors();

      // Remove activeTab class from all tabs
      _editors.forEach(function(editor){
        editor.tab.active = false;
      });
    };

    function loadSavedEditors(savedEditors){
      // If there is text saved, set the editors text to that. 
      if(savedEditors && savedEditors.length > 0){
        savedEditors.forEach(function(savedEditor, i){
          addTextEditor(savedEditor.editorId);
          setEditorText(savedEditor.data, savedEditor.editorId);
        });
        setActiveEditor(savedEditors[0].editorId);
      } 
      else{
        addTextEditor();
      }
    }

    function onPeerData(peer){
      // Prevent user from sending data while receiving data
      _okToSend = false;
      switch(peer.data.command){
        case 'addEditor':
          $rootScope.$apply(function(){
            addTextEditor();
          });
          break;

        case 'removeEditor':
          $rootScope.$apply(function(){
            removeTextEditor(peer.data.editorId);
          });
          break;

        case 'setData':
          // Emit an event for use
          $rootScope.$emit('receivingData');
          setEditorText(peer.data.data, peer.data.editorId)
          break;

        default:
          break;
      }
  
      // Editor is now ok to send data again. 
      _okToSend = true;
    }
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
     * that does not exist currently in the _editors collection.
     *
     * @param editorId: An integer representing the ID of the editor to find. Range(0 - MAX_EDITORS)
     * @return: The index in the _editors collection which corresponds to the editor with the 
     * matching Id. 
     */
    function indexOfEditorWithId(editorId){
      var idx = _editors.map(function(editor) {
                            return editor.id;
                          }).indexOf(editorId);
      return idx;
    }
    ///////////////////////// End Helper Functions /////////////////////////
  }
})();