"use client"
import Link from 'next/link';
import React, { useEffect, useState } from 'react';
import jwt from 'jsonwebtoken';
import axios from 'axios';


interface Task {
    title: string;
    desc: string;
    assignedTo: string;
}


const Page: React.FC = () => {
    const removeL = (key: string, i: number) => {
        const data = JSON.parse(localStorage.getItem(key)!);
        data.splice(i, 1);
        localStorage.setItem(key, JSON.stringify(data));
    };
    
    

    const [title, setTitle] = useState<string>("");
    const [desc, setDesc] = useState<string>("");
    const [mainTask, setMainTask] = useState<Task[]>([]);
    const [completed, setcompleted] = useState<Task[]>([]);

    const [username, setUsername] = useState<string | null>(null);
    const [tasks, setTasks] = useState<Task[]>([]);

    const [loading, setLoading] = useState(true);


    const logout = () => {
        // Clear user-related data from localStorage or wherever it's stored
        localStorage.removeItem('token');
        setUsername(null); // Clear the username state
        // You might want to perform additional cleanup or redirection here if needed
        setTasks([])
        setcompleted([])
    };

    const formHandler = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        console.log(title);
        console.log(desc);
        const assignedTo = username || ""; // Use empty string if username is null
    setMainTask([...mainTask, { title, desc, assignedTo }]);
        setTitle("");
        setDesc("");
    };

    useEffect(() => {
    
        if (mainTask.length === 0) {
          console.log("Array is empty!")
        } else {
            const sdata = JSON.stringify(mainTask)
            localStorage.setItem("sdata",sdata)
        }
      }, [mainTask]);

      useEffect(() => {
        if (completed.length === 0) {
            console.log("Array is empty!");
        } else {
            const sdata2 = JSON.stringify(completed);
            localStorage.setItem("sdata2", sdata2);
        }
    }, [completed]);


useEffect(() => {
    const rdata = localStorage.getItem("sdata");
    if (rdata) {
        const fdata = JSON.parse(rdata);
        setMainTask(fdata);
    }

    const rdata2 = localStorage.getItem("sdata2");
    if (rdata2) {
        const fdata2 = JSON.parse(rdata2);
        setcompleted(fdata2); // Fixed typo: Changed setMainTask to setcompleted
    }
}, []);
    
    

    const eventHandler = (i: number) => {
        let copyTask = [...mainTask];
        copyTask.splice(i, 1);
        setMainTask(copyTask);
        removeL("sdata",i)
        removeL("sdata2",i)
    };
    const eventHandler2 = (i: number) => {
        let copyMainTask = [...mainTask];
        let completedTask = copyMainTask.splice(i, 1)[0];
        setMainTask(copyMainTask);
        setcompleted(prevCompleted => [...prevCompleted, completedTask]);
        removeL("sdata", i);
        removeL("sdata2", i);
    };
    const eventHandler3 = (i: number) => {
        let copyTask = [...completed];
        copyTask.splice(i, 1);
        setcompleted(copyTask);
        removeL("sdata",i)
        removeL("sdata2",i)
    };
    const eventHandler4 = (i:number)=>{
    const selectedTask = mainTask[i];
    const etitle = selectedTask.title;
    const edesc = selectedTask.desc;
        let copyTask = [...mainTask];
        copyTask.splice(i, 1);
        setMainTask(copyTask);
        setTitle(etitle)
        setDesc(edesc)
    }

    
    useEffect(() => {
        if (username) {
            const userTasks = mainTask.filter(task => task.assignedTo === username);
            setTasks(userTasks);
        }
    }, [mainTask, username]);
    


    let sample: JSX.Element = <h2>No Task Available</h2>;

    if (tasks.length > 0) {
        sample = (
                
            <>
                {tasks.map((t: Task, i: number) => (
                    <div key={i} className='justify-between flex mb-2'>
                        <h2>{t.title}</h2>
                        <h2>{t.desc}</h2>
                       <div>
                       <button className='bg-red-400 border-2 rounded text-white mb-4 p-2 mx-4' onClick={() => eventHandler(i)}>Delete</button>
                        <button className='bg-red-400 border-2 rounded text-white mb-4 p-2 mx-4' onClick={() => eventHandler2(i)}>Completed</button>
                        <button className='bg-red-400 border-2 rounded text-white mb-4 p-2 mx-4' onClick={() => eventHandler4(i)}>Edit</button>
                       </div>
                    </div>
                ))}
            </>
        );
    }
    useEffect(() => {
        // Load token from localStorage or wherever you store it
        const token = localStorage.getItem('token');
        if (token) {
            // Decode the token to get email
            const decodedToken = jwt.decode(token) as { email: string }; // Assuming token contains email
            if (decodedToken) {
                setUsername(decodedToken.email); // Set email as username
            }
        }
    }, []);
  
    

    return (
        <>

            <div className='bg-blue-500 text-white p-1 text-center text-4xl flex justify-between items-center'>
                <h3 className='text-xl ml-4 font-bold'>My Todo List</h3>
                <input type="text" placeholder='' className='text-sm px-20 p-1 m-1'/>
            <div className='text-xl mr-4 font-bold'>
            <div className='text-xl mr-4 font-bold'>
            <ul className='flex'>
                {username ? (
                    <>
                        <li className='mr-9'>{username}</li>
                        <li>
                            <button onClick={logout}>Logout</button>
                        </li>
                    </>
                ) : (
                    <>
                        <li className='mr-9'>
                            <Link href="/signup">Sign up</Link>
                        </li>
                        <li>
                            <Link href="/login">Login</Link>
                        </li>
                    </>
                )}
            </ul>
        </div>

            </div>
            </div>
            
     <div className='flex'>
     <div className='bg-gray-200 h-screen w-52 pt-10'>
            <ul>
                <h1 className='text-center font-bold text-xl'>Task Routes</h1>
                <li className='ml-4 mt-4'>={'>'} My Day</li>
                <li className='ml-4 mt-1'>={'>'} Important</li>
                <li className='ml-4 mt-1'>={'>'} Planned</li>
                <li className='ml-4 mt-1'>={'>'} Assigned to me</li>
                <li className='ml-4 mt-1'>={'>'} Tasks</li>
            </ul>
        </div>

<div className=' w-full'>
    
<form onSubmit={formHandler}>
                <input value={title} onChange={(e) => setTitle(e.target.value)} type="text" placeholder='Enter Title here' className='border-solid border-black border-2 m-4 p-2 pr-24 mt-8' />
                <input value={desc} onChange={(e) => setDesc(e.target.value)} type="text" placeholder='Enter Description here' className='border-solid border-black border-2 m-4 p-2 pr-24 mt-8' />
                <button type="submit" className='border-black border-solid border-2 bg-blue-500 text-white m-4 p-2 rounded'>Add Task</button>
            </form>
            <div className=' text-black p-10 text-center text-2xl'>
                {sample}
            </div>
            <div className='width-full height-full'>            
    <h1 className='mt-10 mb-10 text-center font-bold text-2xl'> COMPLETED</h1>
    {completed && completed.map((t: Task, i: number) => (
    <div key={i} className='justify-around flex mb-2'>
        <h2>{t.title}</h2>
        <h2>{t.desc}</h2>
        <button className='bg-blue-500 border-2 rounded text-white mb-4 p-1 mx-4 text-xl border-black border-solid' onClick={() => eventHandler3(i)}>Delete</button>
    </div>
))}

</div>
</div>

     </div>
        </>
    );
    
};

export default Page;
function setUsername(email: string) {
    throw new Error('Function not implemented.');
}
