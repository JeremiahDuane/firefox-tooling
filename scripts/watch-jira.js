/**
 *  Adds custom J-Tools dropwdown to jira. Dropwdown contains CreateChild button. 
 */
function WatchJira() {
    var isCreateChild;
    // Dependencies
    const CURRENT_CONTAINER_ID = '#create-menu'
    const CREATE_LINK_ID = '#create_link'
    const ISSUE_KEY_ID = '#key-val'
    const SUMMARY_ID = '#summary-val'
    const ISSUE_LINK_ID = '#issuelinks-issues-textarea'
    const ISSUE_LINK_TYPE_ID = '#issuelinks-linktype'
    const CUSTOM_FIELD_EPIC = 'customfield_11080'
    // Current elements
    const currentContainer = $(CURRENT_CONTAINER_ID)
    const createLink = $(CREATE_LINK_ID)
    // New Elements
    const newContainerID = '#create-dropdown'
    const newContainerContentlID = '#create-dropdown-content'
    const newContainerLabelID = '#create-dropdown-label'

    const newContainer = $(`<div id="${newContainerID}" class="j-dropdown"><strong id="${newContainerLabelID}">&nbsp;{ J-Tools }&nbsp;</strong></div>`)
    const newContainerContent = $(`<div id="${newContainerContentlID}" class="j-dropdown-content"></div>`)
        
    const JiraCreateNavOption = () => {    
        // Style
        $(`<style>
        #create-dropdown-label {
        margin-left: 2em;
        margin-right: 2em;
        }
    
        .j-dropdown, .j-dropdown-content { 
        align-content: center;
        justify-content: center;
        align-items: center;
        justify-items: center;
        height: 45px;
        }
    
        .j-dropdown {
        display: flex;
        flex-direction: column;
        position: relative;
        background-color:rgba(0, 0, 0, 0.3);
        }
    
        .j-dropdown-content {
        display: none;
        position: absolute;
        background-color: #f9f9f9;
        padding-left: 1em;
        padding-right: 1em;
        box-shadow: 0px 8px 16px 0px rgba(0,0,0,0.2);
        z-index: 999;
        }
    
        .j-dropdown:hover .j-dropdown-content {
        display: flex;
        }
    
        </style>`).appendTo('body');
    
        // Append to page -- First line is living in HTML land
        currentContainer[0].replaceChildren()
        newContainer.appendTo(currentContainer)
        newContainerContent.appendTo(newContainer)
        createLink.appendTo(newContainerContent)
        
        createLink.on('click', function() {
            isCreateChild = false
        }) 
    }

    const JiraCreateChildButton = () => {
        const createChildLink = $(CREATE_LINK_ID).clone().prop('id', '#create_child_link').prop('innerHTML', 'Create Child')
        createChildLink.appendTo(newContainerContent)

        // New Button Logic
        createChildLink.on('click', function() {
            isCreateChild = true
        }) 
    }

    const InitWatch = () => {
        // Start observing the target node for configured mutations
        new MutationObserver(function() {
            if (isCreateChild) {
                const issueKey = $(ISSUE_KEY_ID).first().data().issueKey 
                const summary = $(SUMMARY_ID).first().text() + " | Child"
                const epicLink = $(`#rowFor${CUSTOM_FIELD_EPIC}`).find('a').first().attr('href')
                const epicIssueKey = epicLink.split('/')[epicLink.split('/').length-1]

                $('input[name="summary"]').val(summary)
                $(`input[name="${CUSTOM_FIELD_EPIC}-field"]`).val(epicIssueKey)
                $(ISSUE_LINK_TYPE_ID).val("is a child of").change()
                $(ISSUE_LINK_ID).val(issueKey)
            }
        })
        .observe(
            document.getElementsByTagName("body")[0], 
            { attributes: true, childList: false, subtree: false }
        );
    }

    JiraCreateNavOption();
    JiraCreateChildButton();
    InitWatch();
}

WatchJira();
