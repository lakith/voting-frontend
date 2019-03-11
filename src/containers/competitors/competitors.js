
import React,{Component} from 'react'
import { Grid, Form, Card, Header, Icon } from 'semantic-ui-react';
import axios from '../../axios-base'
import {connect} from 'react-redux'
import  * as competitionActions from '../../store/index'
import ResponsiveContainer from '../../components/navbar/BaseLayout';
import Footer from '../../components/footer/Footer';
import {Redirect} from 'react-router-dom'

class Competitor extends Component {

    state={
        value:'',
        competitors:[],
    }

    componentDidMount(){
        this.props.onDepartmentLoad();
    }

    handleChange = (e, { value })=>{
        this.setState({value:value});

        axios.get(`/Competitor/getAllByDepartment/${this.state.value}`)
        .then(response => {
            console.log(response);
            let competitors = [];
            response.data.map(competitor => {
                let skeliton = {
                    key:competitor.competitorId,
                    name:competitor.user.name,
                    email:competitor.user.email,
                    votes:competitor.votes
                }
                competitors.push(skeliton)
                return competitor;
            })
            this.setState({competitors:competitors})
        })
        .catch(error => {
            console.log(error.response);
        })
    }

    render(){
        let valueComp = [...this.state.competitors];

        let user = {...this.props.user}
        
        let setRedirect = null;
        if(this.props.isAuthenticated){
            if(user.userRole.roleType !== "ADMIN"){
                setRedirect = <Redirect to="/login" />
            }
        } else {
            setRedirect = <Redirect to="/login" />
        }

        return(
            <ResponsiveContainer>
                {setRedirect}
            <Grid columns={3} container doubling stackable style={{marginTop:"5%",marginBottom:"5%"}}>
                <Grid.Column width={4}></Grid.Column>
                <Grid.Column width={8}>
                <Header as='h2' icon>
                    <Icon name='universal access' />
                        Check Competitor Status
                    <Header.Subheader>Check your competitor details .</Header.Subheader>
                </Header>
                <Form onSubmit={this.submitForm}>
                <Form.Dropdown style={{marginTop:20}} label='Select Department' inline search options={this.props.departments} selection placeholder='Select Department...' onChange={this.handleChange} value={this.state.value}/>
                </Form>
                <div style={{marginLeft:"25%",marginTop:"5%"}} >
                    {valueComp.length !== 0 ? 
                        valueComp.map(one=>(
                            <Card
                            key={one.key}
                            link
                            header= {one.name}
                            meta= {"votes : "+ one.votes}
                            description={one.email}
                            color='orange'
                        />
                        )

                        )
                    :null}
                </div>

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
        departments: state.dept.departments,
        deptLoad:state.dept.loading,
        accessToken:state.auth.accessToken,
        subLoad:state.vote.loading,
        subError:state.vote.voteError,
        isAuthenticated :state.auth.accessToken != null,
        user:state.auth.userData
    }
 };

 const mapDispatchToProps = (dispatch) => { 
    return{
        onDepartmentLoad: () => dispatch(competitionActions.initDepartments()),
        onSubmitVote: (voteData,token) => dispatch(competitionActions.initVoteSave(voteData,token))
    }
 };

export default  connect(mapStateToProps,mapDispatchToProps)(Competitor);