import React,{Component} from 'react'
import ResponsiveContainer from '../../components/navbar/BaseLayout';
import Footer from '../../components/footer/Footer';
import { Grid, Dropdown, Form, Header, Icon, Image, Button, Card, Message } from 'semantic-ui-react';
import displayImage from '../../assessts/technology-785742_960_720.jpg'
import {Redirect} from 'react-router-dom'
// import logo from '../../../assessts/download.png'
import * as competitionActions from '../../store/index'
import {connect} from 'react-redux'
import axios from '../../axios-base'

// const options = [
//     { key: 1, text: 'One', value: 1 },
//     { key: 2, text: 'Two', value: 2 },
//     { key: 3, text: 'Three', value: 3 },
//   ]

class Competation extends Component {

    state = {
        value:"",
        competitors:[],
        selectedCompetitor:null,
        textValue:"",
        valError:null
    }

    componentDidMount() {
        this.props.onDepartmentLoad();
    }

    handleChangeCompetitor = (e, { value }) => {
        console.log(value)
        this.setState({selectedCompetitor:value})
    }

    handleChange = (e, { value }) => {
        
        this.setState({ value:value })
        console.log(this.state.value)
        axios.get(`/Competitor/getAllByDepartment/${this.state.value}`)
        .then(response => {
            console.log(response);
            let competitors = [];
            response.data.map(competitor => {
                let skeliton = {
                    key:competitor.competitorId,
                    value:competitor.competitorId,
                    text:competitor.user.name
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

    submitForm = (event) => {
        event.preventDefault();
        let {value,selectedCompetitor} = this.state;
        if(value === "" && selectedCompetitor == null){
            this.setState({
                valError:"department and competitor must not be null"
            })
        } else {
            let vote = {
                userId:1,
                competitorId:this.state.selectedCompetitor,
                reason:this.state.textValue
            } 
            this.props.onSubmitVote(vote,this.props.accessToken);
            console.log(vote)
        }
        
        
    }

    textChange = (event) => {
        this.setState({
            textValue:event.target.value
        })    
    }
    

    render (){

        let setRidirect = null;
        if(!this.props.isAuthenticated){
            setRidirect= <Redirect to="/login" />
        }
        let deptName = null
        if(this.state.value){
            // console.log(Object.keys(this.props.departments))
            for(let val of this.props.departments){
                if(val.value === this.state.value){
                    deptName = val.text
                    console.log(deptName);
                }
            }
        }



        let comp = null
        if(this.state.competitors){
             console.log(this.state.competitors)
            for(let val of this.state.competitors){
                if(val.value === this.state.selectedCompetitor){
                    comp = val.text
                    console.log(comp);
                }
            }
        }

        let saveRidirect = null;
        if(this.props.voteSave){
            saveRidirect = <Redirect to="/success" />
        }
        return(
            <ResponsiveContainer>
                {saveRidirect}
                {setRidirect}
                <Grid container columns={2}  relaxed stackable>
                <Header as='h2' textAlign="center" style={{marginTop:30,display: "block",marginLeft:"auto",marginRight:"auto",marginBottom:50}}>
                                <Icon name='studiovinari' />
                                <Header.Content>
                                    Competation
                                <Header.Subheader>Select your preferences</Header.Subheader>
                                </Header.Content>
                            </Header>
                    <Grid.Row>
                        
                        <Grid.Column>
                        <Form onSubmit={this.submitForm}>
                             {/* <Form.Field inline style={{paddingTop:20}}> */}
                                 {/* <label>Department</label>
                                    <Dropdown
                                        onChange={this.handleChange}
                                        options={this.props.departments}
                                        placeholder='Choose an option'
                                        selection
                                        value={this.state.value}
                                        style={{width:220}}
                                        /> */}
                                <Form.Dropdown style={{marginTop:20}} label='Department' inline search options={this.props.departments} selection placeholder='Select Your Department...' onChange={this.handleChange} value={this.state.value} />

                                {/* </Form.Field> */}

                                {/* <Form.Field inline style={{paddingTop:20}}  >
                                    <label>Nominee &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</label>
                                    <Dropdown
                                        onChange={this.handleChange}
                                        options={this.state.competitors}
                                        placeholder='Choose an option'
                                        selection
                                        value={this.state.selectedCompetitor}
                                        style={{width:220}}
                                        />
                                </Form.Field> */}

                                <Form.Dropdown style={{marginTop:20}} label='Competitor' inline search options={this.state.competitors} selection placeholder='Select Your Department...' onChange={this.handleChangeCompetitor} value={this.state.selectedCompetitor} />

                                <Form.Field style={{paddingLeft:40,paddingTop:20,marginBottom:50}}>
                                    <Form.TextArea style={{marginLeft:170}} label="Reason" value={this.state.textValue} onChange={this.textChange}  width="7" placeholder='Tell us more about you...' />
                                </Form.Field>
                                <Button positive loading={this.props.subLoad} style={{marginBottom:30,marginLeft:100}}>Submit Your Selection</Button>
                        </Form>
                            {this.state.valError? (<Message style={{marginBottom:"4%"}} error><h3>Error</h3>{this.state.valError}</Message>):null}
                        </Grid.Column>
                        <Grid.Column>
                        <Image
                            style={{marginTop:20}}
                            alt='An example alt'
                            size='medium'
                            src={displayImage}
                        />
                        <Card style={{marginLeft:5}}>
                            <Card.Content>
                                <Image floated='right' size='mini' src='https://react.semantic-ui.com/images/avatar/large/daniel.jpg' />
                                <Card.Header>Your Choice</Card.Header>
                                <Card.Meta>choose wisely ...</Card.Meta>
                                <Card.Description>
                                    <strong>Department</strong> : {this.state.value ?deptName:"Please Select A Department" }
                                    <br />
                                    <strong>Competitor</strong> : {this.state.value ?comp:"Please Select A Competitor" }
                                </Card.Description>
                            </Card.Content>
                        </Card>
                        </Grid.Column>
                    </Grid.Row>
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
        voteSave:state.vote.voteSave,
        isAuthenticated:state.auth.accessToken != null
    }
 };

 const mapDispatchToProps = (dispatch) => { 
    return{
        onDepartmentLoad: () => dispatch(competitionActions.initDepartments()),
        onSubmitVote: (voteData,token) => dispatch(competitionActions.initVoteSave(voteData,token))
    }
 };

export default connect(mapStateToProps,mapDispatchToProps)(Competation);