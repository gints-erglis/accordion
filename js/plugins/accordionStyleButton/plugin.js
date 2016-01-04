/**
 * @file
 * esure accordionStyleButton plugin.
 *
 * @ignore
 */

(function ($, Drupal, drupalSettings, CKEDITOR) {

  'use strict';

  CKEDITOR.plugins.add( 'accordionStyleButton',{

    init : function( editor ) {

      editor.addCommand( 'dialogAccordion', new CKEDITOR.dialogCommand( 'detailsDialog' ) );

      editor.addCommand('removeAccordion', {

        contextSensitive: 1,
        //startDisabled: 1,

        exec: function (editor) {
          var selection = editor.getSelection();
          var element = selection.getStartElement();
          if ( element )
                element = element.getAscendant( 'details', true );
          element.remove();
        },
      });

      if ( editor.contextMenu ) {
        editor.addMenuGroup( 'detailsGroup' );
        editor.addMenuItem( 'detailsEditItem', {
          label: 'Edit Accordion',
          icon: this.path + 'accordion.png',
          command: 'dialogAccordion',
          group: 'detailsGroup'
        });
        editor.addMenuItem( 'detailsItem', {
          label: 'Delete Accordian',
          icon: this.path + 'removeAccordion.png',
          command: 'removeAccordion',
          group: 'detailsGroup'
        });

        editor.contextMenu.addListener( function( element ) {
          if ( element.getAscendant( 'details', true ) ) {
            return {
              detailsItem: CKEDITOR.TRISTATE_OFF,
              detailsEditItem: CKEDITOR.TRISTATE_OFF,
            };
          }
        });
      }

      editor.ui.addButton( 'applyAccordion',{
        label: 'Accordion',
        command: 'dialogAccordion',
        icon: this.path + 'accordion.png',
        toolbar: 'tools,1'
      });


       CKEDITOR.dialog.add( 'detailsDialog', this.path + 'dialogs/details.js' );
    }


  })

})(jQuery, Drupal, drupalSettings, CKEDITOR);
