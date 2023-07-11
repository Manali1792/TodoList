import React ,{useState,useEffect} from 'react'
import '../App.css';
import logo from '../images/logo.jpg';

const getLocalItems=()=>{
  let list=localStorage.getItem('lists');
  if(list)
  {
    //to convert to object
    return JSON.parse(localStorage.getItem('lists'));
  }
  else
  return [];
}

const Todo = () => {
  const [inputData,setData]=useState("");
  const [items,setItems]=useState(getLocalItems());
  const [toggle,setToggle]=useState(true);
  const [isEditItem,setEditItem]=useState(null);
  const addItem=()=>{
    if(!inputData)
    {
      alert("cannot be empty");
    }
    else if(inputData&&!toggle)
    {
        setItems(
          items.map((e)=>{
            if(e.id===isEditItem)
            {
              return {...e,name:inputData}
            }
            return e;
          })
        )
        setToggle(true);
        setData("");
        setEditItem(null);
    }else
    {
      const allInputData={id: new Date().getTime().toString(),name:inputData};
      setItems([...items,allInputData]);
    setData("");
    setToggle(true);
    }
   
  }
  const deleteItem=(index)=>{
    const updatedItems=items.filter((e)=>{
      return index!=e.id;
    });
    setItems(updatedItems);

  }
  const editItem=(id)=>{
    let newItems=items.find((e)=>{
      return e.id===id
    });
    setToggle(false);
    setData(newItems.name);
    setEditItem(id);

  }
  useEffect(()=>{
    localStorage.setItem('lists',JSON.stringify(items))


  },[items]);
  return (
    <>
    <div className='main-div'>
        <div className='child-div'>
            <figure>
                <img src={logo} alt="image"/>
                <figcaption>Add new task</figcaption>
            </figure>
            <div className='addItems'>
              <input type='text' placeholder="add task" value={inputData} onChange={(e)=>setData(e.target.value)}></input>
              {
                toggle?<i className='fa fa-plus add-btn' onClick={addItem}></i>:<i className='far fa-edit add-btn' title="edit" onClick={addItem}></i>
              } 
            </div>
            <div className='showItems'>
              {
                items.map((e)=>{
                  return(
                  <div className='eachItem' key={e.id}>
                  <h3>{e.name}</h3>
                  <div className='todo-btn'>
                  <i className='far fa-edit add-btn' title="edit" onClick={()=>editItem(e.id)}></i>
                  <i className='far fa-trash-alt add-btn' title="delete" onClick={()=>deleteItem(e.id)}></i>
                </div>
                </div>

                )})
                  }
              
            </div>
            
        </div>
    </div>
    </>
  )
}

export default Todo
