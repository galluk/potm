import { Input, FormBtn } from "../Form";

const ImportGames = ({ onImport, onCancel }) => {
    let selectedFile = {};

    function onSubmit(e) {
        e.preventDefault()

        // do user validation
        if (!selectedFile) {
            alert('Please select a file to import.')
            return
        }
        else {
            let fileData = new FileReader();
            fileData.onloadend = onFileLoaded;
            fileData.readAsText(selectedFile);
        }
    }

    // callback function for the FileReader
    function onFileLoaded(e) {
        const content = e.target.result;
        onImport(processFileData(content))
    }

    // attached to onchange of the slect file Input
    function doSelectFileChange(e) {
        selectedFile = e.target.files[0];
    }

    // read the file data and return an array of games. fileData is the string contents of the file returned from Filereader
    function processFileData(fileData) {
        // get each line in an array
        let allTextLines = fileData.split(/\r\n|\n/);

        //initialise array to empty
        let lines = [];

        // assume the first line contains headers so go from i=1 instead of 0
        for (let i = 1; i < allTextLines.length; i++) {

            // values are comma delimited
            let line = allTextLines[i].split(',');

            // should only 4 columns in the file so if there isn't on this line discard
            if (line.length === 4) {

                // cols in order should be round, gameDate, opposition, venue
                lines.push({round: parseInt(line[0]), gameDate: line[1], opposition: line[2], venue: line[3]});
            }
        }
        return lines;
    }

return (
    <form className='add-form' onSubmit={onSubmit}>
        <div className='form-control text-center'>
            Choose a csv file to import.
        </div>
        <Input
            type='file'
            accept='.csv'
            onChange={doSelectFileChange}
            name="fileName"
            placeholder="Select file to import"
        />
        <FormBtn onClick={onCancel}>Cancel</FormBtn>        
        <FormBtn type='submit' disabled={!(selectedFile)}>Submit</FormBtn>
    </form>
)
}

export default ImportGames