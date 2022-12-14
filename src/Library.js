import { useState } from 'react';
import ToggleButton from '@mui/material/ToggleButton';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';
import AutoStoriesIcon from '@mui/icons-material/AutoStories';
import SupervisorAccountIcon from '@mui/icons-material/SupervisorAccount';
import { BookTable } from './BookTable';
import { MembersTable } from './MembersTable';

export function Library() {

  let [show, setshow] = useState("book");

  const [alignment, setAlignment] = useState(show);

  const handleChange = (event, newAlignment) => {
    setAlignment(newAlignment);
  };




  return (
    <div className="library-page">

      <div className='library-page-management'>


        <div className="library-btns">
          <ToggleButtonGroup
            color="primary"
            value={alignment}
            exclusive
            onChange={handleChange}
            aria-label="Platform"
          >
            <ToggleButton onClick={() => setshow("book")} value="book"><AutoStoriesIcon /></ToggleButton>
            <ToggleButton onClick={() => setshow("members")} value="members"><SupervisorAccountIcon /></ToggleButton>

          </ToggleButtonGroup>
        </div>
        {show == "book" ? <BookTable /> : null}
        {show == "members" ? <MembersTable /> : null}

      </div>

    </div>
  );
}
