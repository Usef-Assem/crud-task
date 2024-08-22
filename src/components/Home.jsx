import React from 'react';
import Sidebar from './Sidebar';
import { useState, useEffect } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { Formik, useFormik } from 'formik';
import axios from 'axios';
import { Link } from 'react-router-dom';

function Home() {
  const [show, setShow] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [currentProject, setCurrentProject] = useState(null);
  const [data, setData] = useState([]);

  const handleClose = () => {
    setShow(false);
    setEditMode(false);
    setCurrentProject(null);
  };
  
  const handleShow = () => setShow(true);

  // Function to post data
  async function submit(values, { resetForm }) {
    try {
      if (editMode && currentProject) {
        // Update existing project
        await axios.put(`http://localhost:4000/projects/${currentProject.id}`, values);
        // console.log('Data updated successfully:', values);
      } else {
        // Create new project
        const response = await axios.post('http://localhost:4000/projects', values);
        // console.log('Data posted successfully:', response.data);
      }
      resetForm();
      handleClose();
      fetchData();
    } catch (error) {
      console.error('Error posting/updating data:', error);
    }
  }

  // Function to fetch data
  async function fetchData() {
    try {
      let { data } = await axios.get('http://localhost:4000/projects');
      setData(data);
      // console.log(data);
    } catch (error) {
      console.error('Error getting data:', error);
    }
  }

  useEffect(() => {
    fetchData();
  }, []);

  const formik = useFormik({
    initialValues: {
      ProjectName: currentProject ? currentProject.ProjectName : '',
      ProjectDetails: currentProject ? currentProject.ProjectDetails : ''
    },
    onSubmit: submit
  });

  // Handle delete button click
  async function handleDelete(id) {
    try {
      await axios.delete(`http://localhost:4000/projects/${id}`);
      fetchData();
    } catch (error) {
      console.error('Error deleting data:', error);
    }
  }

  // Handle update button click
  function handleUpdate(project) {
    setCurrentProject(project);
    setEditMode(true);
    formik.setValues({
      ProjectName: project.ProjectName,
      ProjectDetails: project.ProjectDetails
    });
    handleShow();
  }

  const cutText = (text, wordLimit) => {
    const words = text.split(' ');
    if (words.length > wordLimit) {
      return words.slice(0, wordLimit).join(' ') + '...';
    }
    return text;
  };

  return (
    <>
      <div className="overflow-hidden">
        <div className="row">
          {/* <div className="col-2">
            <div className="position-fixed col-lg-2">
              <Sidebar />
            </div>
          </div> */}

          <div className='col-12'>
            <div className='d-flex justify-content-end'>
              <Button variant="primary" onClick={handleShow} className='m-4'>
                Create Project
              </Button>

              <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                  <Modal.Title>{editMode ? 'Update Project' : 'Create Project'}</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                  <form onSubmit={formik.handleSubmit}>
                    <label htmlFor="Project-Name">Project Name:</label>
                    <input
                      name='ProjectName'
                      value={formik.values.ProjectName}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      type="text"
                      id='Project-Name'
                      className='form-control'
                    />
                    <label htmlFor="Project-Details" className='mt-2'>Project Details:</label>
                    <input
                      name='ProjectDetails'
                      value={formik.values.ProjectDetails}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      type="text"
                      id='Project-Details'
                      className='form-control'
                    />
                    <Modal.Footer>
                      <Button variant="secondary" onClick={handleClose}>
                        Close
                      </Button>
                      <Button variant="primary" type="submit">
                        {editMode ? 'Update' : 'Save'}
                      </Button>
                    </Modal.Footer>
                  </form>
                </Modal.Body>
              </Modal>
            </div>

            {/* Display Data in a Bootstrap Table */}

            <div className="mt-4 ms-2">
              <h1 className='h3'>Projects List :</h1>
              <table className="table table-striped table-responsive table-hover mt-2">
                <thead>
                  <tr>
                    <th>Index</th>
                    <th>Project Name</th>
                    <th>Project Details</th>
                    <th>Delete</th>
                    <th>Update</th>
                  </tr>
                </thead>
                <tbody>
                  {data.map((item, index) => (
                    <tr key={item.id}>
                      <td>{index + 1}</td>
                      <td><Link to={`/ProjectDetails/${item.id}`} className = "no-decoration text-black">{item.ProjectName}</Link></td>
                      <td>{cutText(item.ProjectDetails, 4)}</td>
                      <td>
                        <Button className='btn btn-danger' onClick={() => handleDelete(item.id)}>Delete</Button>
                      </td>
                      <td>
                        <Button className='btn btn-warning' onClick={() => handleUpdate(item)}>Update</Button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Home;
