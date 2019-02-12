CKEDITOR.dialog.add( 'detailsDialog', function( editor ) {
    return {
        title: 'Accordion Properties',
        minWidth: 400,
        minHeight: 100,
        contents: [
            {
                id: 'tab-basic',
                label: 'Basic Settings',
                elements: [
                    {
                        type: 'text',
                        id: 'summary',
                        label: 'Accordion title',
                        setup: function( widget ) {
                          this.setValue( widget.data.summary );
                        },
                        commit: function( widget ) {
                          widget.setData( 'summary', this.getValue() );
                        }
                    }
                ]
            }
        ],
    };
});
