/**
 *  Automatically populates to/from branch fields in BitBucket.
 */
function WatchBranches() {
    //BitBucket
    const REF_POINTER = "ref-name-";
    const BRANCH_POINTER = '.branch-name';
    //Jira
    const FROM_BRANCH_INPUT = 'customfield_14982';
    const TO_BRANCH_INPUT = 'customfield_14983';

    const populateToAndFromInputs = () => {
        
        const getBranchByName = (name) => {
            const elements = document.querySelectorAll("." + REF_POINTER + name);
            for (const element of elements) {
                const branch = element.querySelector(BRANCH_POINTER);
                if (branch) {
                    return branch.textContent || branch.innerText;
                }
            }
            return '';
        };
        
        const setInputByNameAndValue = (name, value) => {
            const inputElement = document.querySelector('input[name="' + name + '"]');
            if (inputElement) {
                inputElement.value = value;
            }
        };
        
        const branchToName = getBranchByName('to');
        const branchFromName = window.location.href;
        
        setInputByNameAndValue(TO_BRANCH_INPUT, branchToName);
        setInputByNameAndValue(FROM_BRANCH_INPUT, branchFromName);
        
        return branchToName + " => " + branchFromName
    }
    
    // Start observing the target node for configured mutations
    new MutationObserver(populateToAndFromInputs)
    .observe(
        document.getElementsByTagName("body")[0], 
        { attributes: true, childList: false, subtree: false }
    );
}

WatchBranches();
