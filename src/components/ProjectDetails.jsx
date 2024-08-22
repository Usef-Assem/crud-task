import axios from 'axios';
import React from 'react'
import { useState } from 'react';
import { useEffect } from 'react';
import { useParams } from 'react-router-dom'

function ProjectDetails() {
  const [projectData, setProjectData] = useState(null);
  let {id} = useParams()
  async function getProjectData(id) {
    try {
      const { data } = await axios.get(`http://localhost:4000/projects/${id}`);
      setProjectData(data);
      console.log(data);
    } catch (err) {
      console.error('Error fetching project data:', err);
      // setError('Error fetching project data. Please try again later.');
    }
  }
  

  useEffect(() => {
    getProjectData(id)
  }, [])
  
    

    
  return <>
      <div>
      <h1 className='h2 ms-4'>Project Details :</h1>
      {projectData ? (
        <div className='m-4 p-4 bg-light'>
          <h1 className='h5'>{`Project Name : ${projectData.ProjectName}`}</h1>
          <p className='fs-5'>{`Project Details : ${projectData.ProjectDetails}`}</p>
        </div>
      ) : ''}
      </div>
    </>
}

export default ProjectDetails