CKEDITOR.dialog.add( 'detailsDialog', function( editor ) {
    return {
        title: 'Accordion Properties',
        minWidth: 400,
        minHeight: 200,
        contents: [
            {
                id: 'tab-basic',
                label: 'Basic Settings',
                elements: [
                    {
                        type: 'text',
                        id: 'summary',
                        label: 'Accordion title',
                        setup: function( element ) {
                            this.setValue( element.findOne('summary').getText() );
                        },
                        commit: function( element ) {
                            element.findOne('summary').setText( this.getValue() );
                        }
                    },
                    {
                        type: 'textarea',
                        id: 'content',
                        label: 'Accordion content',
                        setup: function( element ) {
                            this.setValue( element.findOne('p').getText() );
                        },
                        commit: function( element ) {
                            element.findOne('p').setText( this.getValue() );
                        }
                    }
                ]
            }
        ],

        onShow: function() {
            var selection = editor.getSelection();
            var element = selection.getStartElement();

            if ( element )
                element = element.getAscendant( 'details', true );

            if ( !element || element.getName() != 'details' ) {
                element = editor.document.createElement( 'details' );
                element.setHtml( '<summary>Title</summary><p class="details-wrapper"></p>' );
                this.insertMode = true;
            }
            else
                this.insertMode = false;

            this.element = element;
            if ( !this.insertMode ) {
                this.setupContent( this.element );
            }
        },

        onOk: function() {

            var dialog = this;
            var details = this.element;
            this.commitContent( details );

            if ( this.insertMode ){
              editor.insertElement( details );
            }
        }
    };
});
