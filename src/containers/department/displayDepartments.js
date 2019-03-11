
import React,{Component} from 'react'
import { Card,Button, Icon, Grid, Header } from 'semantic-ui-react';
import axios from '../../axios-base';

class DisplayDepartment extends Component {

    state={
        departments : []
    }

    componentDidMount(){
        let departments =[];
        axios.get("/department/getAll")
        .then(res=>{
            res.data.map(department=>{
                departments.push(department);
            })

            this.setState({
                departments:departments
            })
        })
        .catch((err)=>{
            console.log(err);
        })


    }

    render(){
        let departments = [...this.state.departments]
        return(
            <div>
                <Grid columns={3} container doubling stackable style={{marginTop:"5%",marginBottom:"5%"}}>
                <Grid.Column width={4}></Grid.Column>
                <Grid.Column width={8}>
                <Header as='h2' icon>
                    <Icon name='building' />
                       All department details
                </Header>

                {departments.map(department => (
                    <Card key={department.departmentId}>
                    <Card.Content>
                        <Icon style={{float:"right"}} size='large' name='building' />
                        <Card.Header>{department.departmentName}</Card.Header>
                    </Card.Content>
                    <Card.Content extra>
                        <div className='ui two buttons'>
                        <Button basic color='red'>
                            Delete
                        </Button>
                        </div>
                    </Card.Content>
                </Card>
                ))}
                </Grid.Column>
                <Grid.Column width={4}></Grid.Column>
                </Grid> 
            </div>
        )
    }
} 

export default DisplayDepartment;