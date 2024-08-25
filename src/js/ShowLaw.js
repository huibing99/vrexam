import React from 'react';
import '../css/WritPage.css';
import { useLocation } from 'react-router-dom';

const ShowLaw = () => {

    const location = useLocation();

    const file = 'http://111.33.172.61:9094/PDF/web/viewer.html?file='+'../../law_pdf/'+location.state.filename;

    return(
        <div className='pdf-border'>
                <iframe className='iframe_box' frameborder="0" src={file}/>
        </div>

    )
  
}
;
export default ShowLaw;
