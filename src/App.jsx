import './App.css';
import React, { useState } from 'react';

const App = () => {
  const [desc, setDesc] = useState('');
  const [display, setDisplay] = useState([]);
  const [editIndex, setEditIndex] = useState(null); 
  const [filter, setFilter] = useState('all'); 

  const duringOnChange = (e) => {
    setDesc(e.target.value);
  };

  const duringClick = () => {
    if (editIndex !== null) {
      display[editIndex] = {...display[editIndex] , description: desc};
      setDisplay([...display]);
      setEditIndex(null);
    } else {
      setDisplay([...display, { description: desc, completed: false }]);
    }
    setDesc('');
  };

  const whenClick = (key) => {
    setDisplay(display.filter((_, ind) => key !== ind));
  };

  const startEditing = (key) => {
    setEditIndex(key);
    setDesc(display[key].description);
  };

  const taskcompleted = (key) => {
    const updatedDisplay = display.map((item, ind) =>
      ind === key ? { ...item, completed: !item.completed } : item
    );
    setDisplay(updatedDisplay);
  };

  const handleFilterChange = (e) => {
    setFilter(e.target.value);
  };

  const filteredDisplay = display.filter((item) => {
    if (filter === 'completed') {
      return item.completed;
    } else if (filter === 'notCompleted') {
      return !item.completed;
    } else {
      return item;
    }
  });

  return (
    <div>
      <div className='background'>
        <div>MY TODO LIST</div>
        <form onSubmit={(e) => { e.preventDefault(); }}>
          <input type="text" placeholder='Enter a Todo' value={desc} onChange={(e) => { duringOnChange(e); }} />
          <button onClick={duringClick}>{editIndex !== null ? 'Update' : 'Add'}</button>
        </form>
        <div>
          Filter: 
          <select value={filter} onChange={handleFilterChange}>
            <option value="all">All</option>
            <option value="completed">Completed</option>
            <option value="notCompleted">Not Completed</option>
          </select>
        </div>
      </div>
      <div className='notescolumn'>
        {filteredDisplay.map((val, ind) => (
          <Add key={ind} val={val} ind={ind} whenClick={whenClick} startEditing={startEditing} taskcompleted={taskcompleted} />
        ))}
      </div>
    </div>
  );
};

const Add = ({ val, ind, whenClick, startEditing, taskcompleted }) => {
  return (
    <div className='notes'>
      Description : {val.description}
      <br />
      <div>
        <span>Status : </span>
        <button className={val.completed ? 'setcompleted' : 'notcompleted' } onClick={() => taskcompleted(ind)}>
          {val.completed ? 'Completed' : 'Not Completed'}
        </button>
      </div>
      <div>
        <button className='editbtn' onClick={() => startEditing(ind)}>Edit</button>
        <button className='deletebtn' onClick={() => whenClick(ind)}>Delete</button>
      </div>
    </div>
  );
};

export default App;
