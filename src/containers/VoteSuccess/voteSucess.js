import React from 'react'
import { Header, Icon, Grid, Image } from 'semantic-ui-react'
import ResponsiveContainer from '../../components/navbar/BaseLayout';
import Footer from '../../components/footer/Footer';
import vote from '../../assessts/vote.jpg'

const HeaderExampleSettingsIcon = () => (
<ResponsiveContainer>
    <Grid>
        <Grid.Column width={4}></Grid.Column>
        <Grid.Column width={8}>
        <Header as='h2' icon>
            <Icon size='big' name='checkmark' />
            Thank you !
            <Header.Subheader>Your Vote Saved Successfully.</Header.Subheader>
        </Header>

        <Image src={vote} size='large' style={{marginLeft:"15%",marginBottom:"5%",marginTop:"5%"}} />

        </Grid.Column>
        <Grid.Column width={4}></Grid.Column>
    </Grid>
    <Footer />
    
  </ResponsiveContainer>
)

export default HeaderExampleSettingsIcon