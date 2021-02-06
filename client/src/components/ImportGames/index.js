import { useState } from 'react'

const ImportGames = ({ onImport }) => {
    const [fileName, setFileName] = useState('')

    const onSubmit = (e) => {
        e.preventDefault()

        // do user validation
        if (!fileName) {
            alert('Please select a file to import.')
            return
        }

        console.log(`Importing: ${fileName}`);
        
        onImport(fileName)
    }

return (
    <form className='add-form' onSubmit={onSubmit}>
        <div className='form-control'>
            <div class="text-center">
                Choose a csv file to import.
            </div>
            <div class="text-center">
                <input type='file' accept='csv'onChange={(e) => setFileName(e.target.value)}/>
            </div>
        </div>
        <input type='submit' value='Import' className='btn btn-block' />
    </form>
)
}

export default ImportGames