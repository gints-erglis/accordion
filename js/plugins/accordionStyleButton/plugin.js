/**
 * @file
 * esure accordionStyleButton plugin.
 *
 * @ignore
 */

(function ($, Drupal, drupalSettings, CKEDITOR) {

  'use strict';

  CKEDITOR.plugins.add( 'accordionStyleButton',{
    requires: 'widget,dialog',
    icons: 'accordion',
    init : function( editor ) {

      var focusedWidget = null;

      editor.on( 'selectionChange', function() {
        focusedWidget = editor.widgets.focused;
      });

      CKEDITOR.dialog.add( 'detailsDialog', this.path + 'dialogs/details.js' );

      editor.addContentsCss( this.path + 'styles/accordion.css' );
      // Edit accordion
      editor.addCommand( 'dialogAccordion', {
        exec: function (editor) {
          focusedWidget.edit();
        }
      });
      // Delete accordion
      editor.addCommand('removeAccordion', {
        contextSensitive: 1,
        exec: function (editor) {
          // destroy widget instance
          focusedWidget.destroy(false);
          // remove accordion markup
          var details = focusedWidget.element;
          var title = details.findOne( 'summary');
          var content = details.findOne( 'div.details-content');
          details.remove(true);
          title.remove(true);
          content.remove(true);
        },
      });
      // Contextual menu
      if ( editor.contextMenu ) {
        editor.addMenuGroup( 'detailsGroup' );
        editor.addMenuItem( 'detailsItem', {
          label: 'Delete Accordian',
          icon: this.path + 'icons/delete.png',
          command: 'removeAccordion',
          group: 'detailsGroup'
        });
        editor.addMenuItem( 'detailsEditItem', {
          label: 'Edit Accordion',
          icon: this.path + 'icons/edit.png',
          command: 'dialogAccordion',
          group: 'detailsGroup'
        });

        editor.contextMenu.addListener( function( element ) {
          if ( focusedWidget && focusedWidget.name == 'accordion' ) {
            return {
              detailsItem: CKEDITOR.TRISTATE_OFF,
              detailsEditItem: CKEDITOR.TRISTATE_OFF,
            };
          }
        });
      }

      editor.ui.addButton( 'applyAccordion',{
        label: 'Accordion',
        command: 'accordion',
        icon: this.path + 'icons/accordion.png',
        toolbar: 'tools,1'
      });

       // Widget
      editor.widgets.add( 'accordion', {
        allowedContent:
        'details(*)[open,data-*]{*};' +
        'summary(!details-title){*}; details(*){*}',
        requiredContent: 'details',
        editables: {
          content: {
            selector: 'div.details-content',
            allowedContent: 'p br strong em a[href,target](*){*}'
          }
        },
        template:
        '<details open>' +
        '<summary>Title</summary>' +
        '<div class="details-content">...</div>' +
        '</details>',
        button: 'Create accordion',
        dialog: 'detailsDialog',
        upcast: function( element ) {
          return element.name == 'details';
        },
        init: function() {
          var summary = this.element.findOne('summary').getText();
          if (summary)
            this.setData('summary', summary);
        },
        data: function() {
          if (typeof this.data.summary !== 'undefined')
          {
            this.element.findOne('summary').setText(this.data.summary);
          }
        }

      });
    }

  })

})(jQuery, Drupal, drupalSettings, CKEDITOR);
