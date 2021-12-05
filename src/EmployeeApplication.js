import React, { Component } from 'react'
import axios from 'axios';

export default class EmployeeApp extends Component {

    //all states required for app declared
    constructor(props){
        super(props)

        this.state = {
            employees: [],
            employee: [],
            home: true,
            list: false,
            add: false,
            viewemployee: false,
            update: false,
            firstName: "",
            lastName: "",
            emailid: ""
        }
    }
    
    //here we can retrieve and store from our database
    componentDidMount(){
        axios.get(`http://localhost:8080/api/v1/employees`)
        .then(res => {
            console.log(res.data);
            const employees = res.data.employee;
            this.setState({employees});
        })
    }

    //get and store employee by their respective id
    getEmployee(id){
        axios.get(`http://localhost:8080/api/v1/employees/${id}`)
        .then(res => {console.log(res.data); const employee = res.data.employee; 
          this.setState({employee})
        })
    }

    //add employee and save to database
    addEmployee(){
        axios.post(`http://localhost:8080/api/v1/employees`, {
            firstName: this.state.firstName,
            lastName: this.state.lastName,
            emailid: this.state.emailid
        }).then(res =>{
            console.log(res.data);
        })
    }

    //update employee by their id
    updateEmployee(){
        axios.put(`http://localhost:8080/api/v1/employees/${this.state.employee['_id']}`, {
            firstName: this.state.firstName,
            lastName: this.state.lastName,
            emailid: this.state.emailid
        }).then(res =>{
            console.log(res.data);
        })
    }

    updateState = e =>{
        this.setState({
            ...this.state,
            [e.target.name]:e.target.value
        })
    }

    //delete employee by id
    deleteEmployee(id){
        axios.delete(`http://localhost:8081/api/v1/employees/${id}`)
        .then(res =>
            console.log(res.data));
    }

    render() {
        return (
          <div>
        <div id="nav">
          <button id="nav-title" class="nav-button" onClick={()=>{
            const list = false;
              const home = true;
               const add = false;
                 const viewemployee = true;
                   const update = false;
                      this.setState({list});
                        this.setState({home});
                           this.setState({add});
                             this.setState({viewemployee});
                               this.setState({update});
          }}>Employee Management App</button>
          
            <button class="nav-button" onClick={()=>{
            const list = true;
              const home = false;
                const add = false;
                  const viewemployee = false;
                     const update = false;
                         this.setState({list});
                           this.setState({home});
                             this.setState({add});
                               this.setState({viewemployee});
                                 this.setState({update});
            }}>Employees List</button>
         
              <button class="nav-button" onClick={()=>{
              const list = false;
              const home = false;
              const add = true;
              const viewemployee = false;
              const update = false;
              this.setState({list});
              this.setState({home});
              this.setState({add});
              this.setState({viewemployee});
              this.setState({update});
              }}>Add Employee</button>
        </div>
        <b>Roberto Borges - 101255891 Full Stack Assignment 2</b>


        {this.state.home?
        <div class="content">
          <h1>Employee Organizer Application</h1>
          <p>Welcome to the Employee Management App</p>
        </div>:
        null
        }
        {this.state.list?
        <div class="content">
          <h1>Employee Listing</h1>
          <div>
            <button id="add-employee" onClick={()=>{
            const list = false;
            const home = false;
            const add = true;
            const viewemployee = false;
            const update = false;
            this.setState({list});
            this.setState({home});
            this.setState({add});
            this.setState({viewemployee});
            this.setState({update});
            }}>Add An Employee</button>
          </div>
          <div>
            <table class="employee-list-table">
              <thead>
                <tr>
                    <th>Employee's First Name</th>
                      <th>Employee's Last Name</th>
                        <th>Employee's Email Id</th>
                          <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {
                this.state.employees.map(event => (
                <tr>
                  <td>{event.firstname}</td>
                    <td>{event.lastname}</td>
                      <td>{event.emailid}</td>
                  <td>
                    <button class="update-button action-button" onClick={()=>{
                    this.getEmployee(event._id);
                     const list = false;
                        const home = false;
                          const add = false;
                            const viewemployee = false;
                              const update = true;
                                this.setState({list});
                                  this.setState({home});
                                    this.setState({add});
                                       this.setState({viewemployee});
                    this.setState({update});
                    }}>Update</button>
                    <button class="delete-button action-button" onClick={()=>{
                    this.deleteEmployee(event._id);
                    window.location.reload(false);
                    }}>Delete</button> 
                    <button class="view-button action-button" onClick={()=>{
                    this.getEmployee(event._id);
                      const list = false;
                        const home = false;
                          const add = false;
                             const viewemployee = true;
                                 const update = false;
                                   this.setState({list});
                                       this.setState({home});
                                         this.setState({add});
                                           this.setState({viewemployee});
                     this.setState({update});
                    }}>View</button>
                  </td>
                </tr>
                ))
                }
              </tbody>
            </table>
          </div>
        </div>
        :
        null
        }
        {
        this.state.add?
        <div class="content">
          <h1>Add Employee</h1>
          <form onSubmit={()=>{
            this.addEmployee();
            window.location.reload(false);
            }}>
            
            <label>First Name:</label><br/>
            <input name="firstname" placeholder="Enter your first name..." type="text" onChange={(event)=>{this.updateState(event);}}></input><br/>

            <label>Last Name:</label><br/>
            <input name="lastname" placeholder="Enter your last name..." type="text" onChange={(event)=>{this.updateState(event);}}></input><br/>

            <label>Email Id:</label><br/>
            <input name="emailid" placeholder="Enter your email id..." type="email" onChange={(event)=>{this.updateState(event);}}></input><br/>

            <input type="submit" value="Save" class="save"></input>
            <button class="cancel" onClick={()=>{
            const list = true;
            const home = false;
            const add = false;
            const viewemployee = false;
            const update = false;
            this.setState({list});
            this.setState({home});
            this.setState({add});
            this.setState({viewemployee});
            this.setState({update});
            }}>Cancel</button>
          </form>
        </div>
        :
        null
        }
        {
        this.state.viewemployee?
        <div class="content">
          <h1>View Employee Details</h1>
          <div class="employee-info">
            <p><span class="caption">Employee First Name: </span>{this.state.employee['firstname']}</p>
            <p><span class="caption">Employee Last Name: </span>{this.state.employee['lastname']}</p>
            <p><span class="caption">Employee Email ID: </span>{this.state.employee['emailid']}</p>
          </div>
        </div>
        :
        null
        }
        {
        this.state.update?
        <div class="content">
          <h1>Update Employee</h1>
          <div class="employee-info">
            <h3>Current Employee Information</h3>
            <p><span class="caption">First name: </span>{this.state.employee['firstname']}</p>
            <p><span class="caption">Last name: </span>{this.state.employee['lastname']}</p>
            <p><span class="caption">Email id: </span>{this.state.employee['emailid']}</p>
          </div>
          <form onSubmit={()=>{
            this.updateEmployee();
            window.location.reload(false);
            }}>
3            <label>First Name:</label><br/>
            <input name="firstname" placeholder="Enter first name..." type="text" onChange={(event)=>{this.updateState(event);}}></input><br/>
            <label>Last Name:</label><br/>
            <input name="lastname" placeholder="Enter last name..." type="text" onChange={(event)=>{this.updateState(event);}}></input><br/>
            <label>Email Id:</label><br/>
            <input name="emailid" placeholder="Enter email id..." type="email" onChange={(event)=>{this.updateState(event);}}></input><br/>
            <input type="submit" value="Save" class="save"></input>
            <button class="cancel" onClick={()=>{
            const list = true;
            const home = false;
            const add = false;
            const viewemployee = false;
            const update = false;
            this.setState({list});
            this.setState({home});
            this.setState({add});
            this.setState({viewemployee});
            this.setState({update});
            }}>Cancel</button>
          </form>
        </div>
        :
        null
        }
      </div>
      )
      }
      }