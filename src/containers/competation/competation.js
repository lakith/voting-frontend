import React,{Component} from 'react'
import ResponsiveContainer from '../../components/navbar/BaseLayout';
import Footer from '../../components/footer/Footer';
import { Grid, Dropdown, Form, Header, Icon, Image, Button } from 'semantic-ui-react';
import displayImage from '../../assessts/technology-785742_960_720.jpg'
// import logo from '../../../assessts/download.png'

const options = [
    { key: 1, text: 'One', value: 1 },
    { key: 2, text: 'Two', value: 2 },
    { key: 3, text: 'Three', value: 3 },
  ]

class Competation extends Component {

    state = {
        value:null
    }

    handleChange = (e, { value }) => this.setState({ value })

    render (){
        return(
            <ResponsiveContainer>
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
                        <Form>
                             <Form.Field inline style={{paddingTop:20}}>
                                 <label>Department</label>
                                    <Dropdown
                                        onChange={this.handleChange}
                                        options={options}
                                        placeholder='Choose an option'
                                        selection
                                        value={this.state.value}
                                        style={{width:220}}
                                        />
                                </Form.Field>

                                <Form.Field inline style={{paddingTop:20}}  >
                                    <label>Nominee &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</label>
                                    <Dropdown
                                        onChange={this.handleChange}
                                        options={options}
                                        placeholder='Choose an option'
                                        selection
                                        value={this.state.value}
                                        style={{width:220}}
                                        />
                                </Form.Field>

                                <Form.Field style={{paddingLeft:30,paddingTop:20,marginBottom:50}}>
                                    <Form.TextArea style={{marginLeft:175}} label="Reason"  width="7" placeholder='Tell us more about you...' />
                                </Form.Field>
                                <Button positive style={{marginBottom:30,marginLeft:100}}>Submit Your Selection</Button>
                        </Form>
                        </Grid.Column>
                        <Grid.Column>
                        <Image
                            style={{marginTop:40}}
                            alt='An example alt'
                            size='medium'
                            src={displayImage}
                        />
                        </Grid.Column>
                    </Grid.Row>
                </Grid>
                <Footer />
            </ResponsiveContainer>
        )
    }
}

export default Competation;