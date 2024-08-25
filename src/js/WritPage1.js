import React from 'react';
import '../css/WritPage.css';

const WritPage1 = () => {

    const file = 'http://111.33.172.61:9094/PDF/web/viewer.html?file=卫生行政执法文书.pdf'

    return(
        <div className='pdf-border'>
                {/* <iframe className='iframe_box' frameborder="0" src='http://111.33.172.61:9094/PDF/web/viewer.html?file=卫生行政执法文书.pdf'/> */}
                <iframe className='iframe_box' frameborder="0" src={file}/>
        </div>

    )
  
}
;
export default WritPage1;
