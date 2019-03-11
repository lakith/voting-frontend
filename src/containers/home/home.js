
import React, { Component } from 'react'
import Footer from '../../components/footer/Footer';
import ResponsiveContainer from '../../components/navbar/BaseLayout';
import{Grid,Segment, Card, Button} from 'semantic-ui-react'

class HomepageLayout extends Component {

gotoVote = () =>{
    this.props.history.push("/competation")
}

render(){   
    let lorum = "There are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration in some form, by injected humour, or randomised words which don't look even slightly believable. If you are going to use a passage of Lorem Ipsum, you need to be sure there isn't anything embarrassing hidden in the middle of text. "
    return (
        <ResponsiveContainer>
            <Grid container columns={3}  relaxed stackable style={{marginTop:10,marginBottom:20}}>
                <Grid.Row>
                    <Grid.Column>
                        <Card
                            link
                            header='Info'
                            meta='Scientist'
                            color='teal'
                            // description={[
                            // 'Rick is a genius scientist whose alcoholism and reckless,',
                            // ' nihilistic behavior are a source of concern for his family.',
                            // ].join('')}
                            description={lorum}
                        />
                    </Grid.Column>
                    <Grid.Column>
                        <Card
                            link
                            header='About'
                            meta='Scientist'
                            color='yellow'
                            description={lorum}
                        />
                    </Grid.Column>
                    <Grid.Column>
                        <Card
                            link
                            header='Competition'
                            meta='Scientist'
                            color='red'
                            description={lorum}
                        />
                    </Grid.Column>
                </Grid.Row>
                <Grid.Row>
                <Button positive onClick={this.gotoVote} style={{display: "block",marginLeft:"auto",marginRight:"auto"}}>Enter To The Competition</Button>
                </Grid.Row>
            </Grid>
            <Footer />
        </ResponsiveContainer>
    )
}
}

export default HomepageLayout