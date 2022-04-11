import React, { Component } from 'react';
import { Menu, Dropdown, Image, Input } from 'semantic-ui-react';
import { Link } from 'react-router-dom';
import './MenuDiv.css';
import Cookies from 'universal-cookie';

const cookies = new Cookies();

class MenuDiv extends Component {
    constructor(props) {
        super(props);

        this.handleItemClick   = this.handleItemClick.bind(this);

        this.state = {
            activeItem: 'home',
            user_id: cookies.get('user_id'),
            user_name: cookies.get('user_name')
        };
    }

    handleItemClick = (e, { name }) => this.setState({ activeItem: name })

    render() {
        const { activeItem } = this.state.activeItem

        return (
            <div>
                <Menu pointing secondary inverted className='menu-div' fixed='top'>
                    <Image src='/images/logo.png' size='medium' className='logo-image'/>
                    <Menu.Item
                        name='home'
                        active={activeItem === 'home'}
                        onClick={this.handleItemClick}
                        className='pad-bot-26'
                        as={Link}
                        to='/home'
                    />
                    <Dropdown item text='Learn' className='pad-bot-26'>
                        <Dropdown.Menu>
                            <Dropdown.Item>Vocabulary</Dropdown.Item>
                            <Dropdown.Item>Join a Classroom</Dropdown.Item>
                            <Dropdown.Item>Video with Strangers</Dropdown.Item>
                            <Dropdown.Item>Supporting Documents</Dropdown.Item>
                        </Dropdown.Menu>
                    </Dropdown>
                    <Menu.Item
                        name='exams and tests'
                        active={activeItem === 'exams and tests'}
                        onClick={this.handleItemClick}
                        className='pad-bot-26'
                        as={Link}
                        to='/exam'
                    />
                    <Menu.Item
                        name='help'
                        active={activeItem === 'help'}
                        onClick={this.handleItemClick}
                        className='pad-bot-26'
                    />
                    <Menu.Menu position='right' className='pad-bot-10'>
                        <Menu.Item>
                            <Input className='icon txt_search' icon='search' placeholder='Search...' />
                        </Menu.Item>
                        <Menu.Item>
                            <i class="user circle icon"></i>                        
                        </Menu.Item>
                        <Dropdown item text={this.state.user_name} className='user-name-menu'>
                            <Dropdown.Menu>
                                <Dropdown.Item>
                                    <i class="user icon"></i>My Profile
                                </Dropdown.Item>
                                <Dropdown.Item>
                                    <i class="arrow left icon"></i>Sign Out
                                </Dropdown.Item>
                            </Dropdown.Menu>
                        </Dropdown>
                    </Menu.Menu>
                </Menu>
            </div>
        )
    }
}

export default MenuDiv