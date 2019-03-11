import React,{Component} from 'react'
import { Grid, Segment, Form, Button, Message, Header, Icon} from 'semantic-ui-react';
import axios from '../../axios-base'
import ResponsiveContainer from '../../components/navbar/BaseLayout';
import Footer from '../../components/footer/Footer';
import {Route} from 'react-router-dom'
import DisplayDepartment from './displayDepartments';
import {connect} from 'react-redux'
import {Redirect} from 'react-router-dom'

class Department extends Component {

    state={
        department:"",
        error:null,
        loading:false,
        display:true
    }

    changeHandle =(event) => {
        this.setState({
            department:event.target.value
        })
    }

    submitHandler = (event) => {
        event.preventDefault();
        console.log("here")
        if(this.checkValidity()){
            this.setState({loading:true,error:null})
            let data = {
                departmentName:this.state.department
            }
            console.log(data);
            axios.post("/department/add",data)
            .then((res)=>{
                console.log("res")
                this.setState({error:null,loading:false,display:false});
            })
            .catch((err)=>{
                console.log("error")
                console.log(err);
                this.setState({error:err.response.data.message})
            })
        }
    }

    checkValidity = () =>{
        if(this.state.department === ""){
            console.log("came for validation")
            this.setState({
                error:"Department must not be null"
            })
            console.log(this.state.error);
            return false
        }
        return true;
    }

    displayDetails =()=>{
        this.setState({
            display:!this.state.display
        })
        if(this.state.display){
            this.props.history.replace('/department/department-display'); 
        } else{
            this.props.history.replace('/department');
        }
           
    }

    

    render(){

        // let error = false;
        // let message = null;
        // let errorClass = null;
        // if(this.state.error){
        //     console.log("came")
        //     error = true;
        //     errorClass="error"
        //     message = this.state.error
        // }

        let setRidirect = null;
        if(!this.props.isAuthenticated){
            setRidirect= <Redirect to="/login" />
        }

        return(
            <ResponsiveContainer>
                {setRidirect}
                <Grid columns={3} container doubling stackable style={{marginTop:"5%",marginBottom:"5%"}}>
                <Grid.Column width={4}></Grid.Column>
                <Grid.Column width={8}>
                <Header as='h2' icon>
                    <Icon name='building' />
                        Add a Department
                    <Header.Subheader>Manage your competitors with department data.</Header.Subheader>
                </Header>
                        <Segment stacked>
                            <Form onSubmit={this.submitHandler}>
                                <Form.Group widths={2}>
                                    <label className="setInline" style={{marginLeft:"10%",marginTop:"1%"}}>Department name</label>
                                    <Form.Input className="errorClass" className="setInline" style={{width:"100%"}}  onChange={this.changeHandle} value={this.state.department} placeholder='Department Name' />
                                </Form.Group>
                                    <Button loading={this.state.loading} type='submit'>Add</Button>
                            </Form>

                        </Segment>
                            {this.state.error? (<Message error><h3>Error</h3>{this.state.error}</Message>):null}
                            <div style={{float:"left"}}>
                                <Button onClick={this.displayDetails} positive>{this.state.display?"View All Departments":"Hide departments"}</Button>
                            </div>
                        <Route path={this.props.match.path + '/department-display'} component={DisplayDepartment} />
                    </Grid.Column>
                    <Grid.Column width={4}></Grid.Column>
                </Grid>
                <Footer />
            </ResponsiveContainer>
        )
    }
}

const mapStateToProps = (state) => { 
    return{
        isAuthenticated:state.auth.accessToken != null
    }
 };

export default connect(mapStateToProps)(Department);