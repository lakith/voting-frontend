import PropTypes from 'prop-types'
import React, { Component } from 'react'
import logo from '../../../assessts/download.png'
import {
  Button,
  Container,
  Image,
  Menu,
  Responsive,
  Segment,
  Visibility,
  Header,
} from 'semantic-ui-react'
import HomepageHeading from '../../../containers/home/homeHeading/HomeHeading';
import getWidth from '../getWidth';
import {Link} from 'react-router-dom';
import {connect} from 'react-redux'




class DesktopContainer extends Component {
    state = {}
  
    hideFixedMenu = () => this.setState({ fixed: false })
    showFixedMenu = () => this.setState({ fixed: true })
  
    render() {
      const { children } = this.props
      const { fixed } = this.state
      
      console.log(this.props.isAuthenticated)
      let user = {...this.props.user}
      console.log(user)

      let jsxvars = (
        <div>
          <Link to="/login">
              <Button as='h4' inverted={!fixed}>
                      Log in 
             </Button>
          </Link>
          <Link to="/register">
              <Button as='h4' inverted={!fixed} primary={fixed} style={{ marginLeft: '0.5em' }}>
                        Sign Up
              </Button> 
          </Link>
        </div>
      )
      if(this.props.isAuthenticated){
        jsxvars = (
          <Header as='h4'>
               <Image circular src='https://cdn3.iconfinder.com/data/icons/business-round-flat-vol-1-1/36/user_account_profile_avatar_person_student_male-512.png' /> Signed in as {user.name}
          </Header>
        )
      }

      let logout = null;
      if(this.props.isAuthenticated){
        logout = (
          <Link to="/logout"><a style={{textDecoration:"none",color:"white"}}>Logout</a></Link>
        )
      }

      return (
        <Responsive getWidth={getWidth} minWidth={Responsive.onlyTablet.minWidth}>
          <Visibility
            once={false}
            onBottomPassed={this.showFixedMenu}
            onBottomPassedReverse={this.hideFixedMenu}
          >
            <Segment
              inverted
              textAlign='center'
              style={{ minHeight: 700, padding: '1em 0em',backgroundColor:"white"}}
              vertical
              
            >
              <Menu
                fixed={fixed ? 'top' : null}
                inverted={!fixed}
                pointing={!fixed}
                secondary={!fixed}
                size='large'
                style={{backgroundColor:"#007bff",marginTop:-14,minHeight:70}}
              >
                <Container style={{paddingBottom:20}}>
                  <Menu.Item>
                          <div>
                              <Image style={{marginTop:15}} verticalAlign="bottom" src={logo} alt="logo" />
                          </div>
                  </Menu.Item>
                  <Menu.Item className="textStyle" style={{marginLeft:40 ,paddingBottom:22}} as='a' >
                  <Link to="/"> Home </Link>
                  </Menu.Item>
                  <Menu.Item className="textStyle"  as='a' text style={{paddingBottom:22}}><Link to="/competation">Add your vote </Link></Menu.Item>
                  <Menu.Item className="textStyle" as='a' style={{paddingBottom:22}}><Link to="/competitors">Competitor analysis</Link></Menu.Item>
                  <Menu.Item className="textStyle" as='a' style={{paddingBottom:22}}><Link to="/department">Department</Link></Menu.Item>
                  <Menu.Item position='right'>
                    {jsxvars}
                  </Menu.Item>
                  <Menu.Item position='right' style={{marginBottom:"1%"}}>
                    {logout}
                  </Menu.Item>
                </Container>
              </Menu>
              <HomepageHeading />
              {children}
            </Segment>
          </Visibility>
        </Responsive>
      )
    }
  }
  
  DesktopContainer.propTypes = {
    children: PropTypes.node,
  }

  const mapStateToProps = state => {
    return{
      isAuthenticated : state.auth.accessToken != null,
      user: state.auth.userData
    }
  };

  export default  connect(mapStateToProps)(DesktopContainer);