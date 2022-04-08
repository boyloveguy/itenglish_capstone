import React, { Component} from 'react';
import { Button, Form, Input, Select, Modal, Loader} from 'semantic-ui-react';
import './SignUp.css';
import { Helmet } from 'react-helmet';
import 'react-datepicker/dist/react-datepicker.css';
import SemanticDatepicker from 'react-semantic-ui-datepickers';
import 'react-semantic-ui-datepickers/dist/react-semantic-ui-datepickers.css';
import axios from 'axios';
import FormData from 'form-data';
import { Link } from 'react-router-dom';
import Cookies from 'universal-cookie';

const cookies = new Cookies();

class SignUp extends Component {   
    constructor(props) {
        super(props);

        this.handleChange       = this.handleChange.bind(this);
        this.handleSignUp       = this.handleSignUp.bind(this);
        this.onActionClick      = this.onActionClick.bind(this);
        this.handleButtonModal  = this.handleButtonModal.bind(this);
        // this.validate           = this.validate.bind(this);

        this.state = {
            username    : '',
            f_name      : '',
            l_name      : '',
            b_day       : '',
            email       : '',
            password    : '',
            conf_pass   : '',
            role        : '',
            message     : '',
            showMsg     : false,
            isLoading   : false,
            modal_btn   : 'Go to Home page',
            modal_btn_succes: '',
            role_options: []
        };        
    }   

    fetchData() {
        fetch('http://localhost/itenglish_capstone/server/public/api/get_roles')
        .then((data) => data.json())
        .then((data) => {
            this.setState({
                role_options: data.list_roles
            });
        })
        .catch(error => {console.log(error)});
    }

    componentDidMount() {
        this.fetchData();
    }

    handleChange(event) {
        const target    = event.target;
        const name      = target.name;
        const value     = target.value;
        this.setState({
            [name]: value
        });
    }

    handleChangeDate = (e, data) => {
        this.state.role = data.value;
    };

    handleChangeSelect = (e, data) => {
        this.state.role = data.value;
    }

    onActionClick = (e, data) => {
        this.setState({
          showMsg: false
        });
    };

    handleButtonModal(){
        if(this.state.modal_btn == "Cancel"){
            this.setState({
                showMsg: false
            });  
        }else{
            this.setState({
                modal_btn_success: "/home"
            }); 
        } 
    }

    handleSignUp(e) {   
        // e.preventDefault();
        let parent_date     = document.getElementsByClassName('b_day');
        this.state.b_day    = parent_date[0].firstChild.value;
        let { username, f_name, l_name, b_day, email, password, conf_pass, role } = this.state;

        // const errs = this.validate(data);

        if (username    !== "" &&
            email       !== "" &&
            password    !== "" &&
            conf_pass   !== "" && 
            role        !== ""
        ) {
            this.setState({
                isLoading   : true
            });
            let formData = new FormData();
            formData.append('username', this.state.username);
            formData.append('f_name', this.state.f_name);
            formData.append('l_name', this.state.l_name);
            formData.append('b_day', this.state.b_day);
            formData.append('email', this.state.email);
            formData.append('password', this.state.password);
            formData.append('role', this.state.role);

            const url = 'http://localhost/itenglish_capstone/server/public/api/sign_up';
            axios({
                method  : 'POST',
                url     : url,
                dataType: 'jsonp',
                data    : formData,
                config  : {
                    headers: {
                        'Content-Type': 'multipart/form-data',
                        'Access-Control-Allow-Origin': 'http://localhost:3000',
                        'Access-Control-Allow-Credentials': 'true',
                        'Access-Control-Allow-Methods': 'GET, POST, OPTIONS'
                    }
                }
            })
            .then(response => {
                var result = response.data.success;
                this.setState({
                    message     : response.data.message,
                    showMsg     : true,
                    isLoading   : false
                });
                if(result){
                    let user_id     = response.data.user_id;
                    let user_name   = response.data.user_name;
                    let user_role   = response.data.user_role;
                    cookies.set('user_id', user_id, { path: '' });
                    cookies.set('user_name', user_name, { path: '' });
                    cookies.set('user_role', user_role, { path: '' });
                    this.setState({
                        modal_btn   : 'Go to Home page'
                    });
                }else{
                    this.setState({
                        modal_btn   : 'Cancel'
                    });
                }
            })
            .catch(error => {
                this.setState({
                    message     : error.data.message,
                    showMsg     : true,
                    isLoading   : false,
                    modal_btn   : 'Cancel'
                });
            });
        }
    }

    render() {
        return (
            <React.Fragment>
                <div className='div-sign-up'>
                    <Helmet>
                        <title>ITEnglish | Sign-up</title>
                    </Helmet>
                    <Loader active={this.state.isLoading} size='big'/>
                    <Modal
                        size='mini'
                        open={this.state.showMsg}
                        onActionClick={this.onActionClick}
                        id = 'modal-sign-up'
                    >
                        <Modal.Header>Notification</Modal.Header>
                        <Modal.Content>
                        <p>{this.state.message}</p>
                        </Modal.Content>
                        <Modal.Actions>
                        <Button positive onClick={() => this.handleButtonModal()}>
                            <Link to={this.state.modal_btn_success}>
                                {this.state.modal_btn}
                            </Link>
                        </Button>
                        </Modal.Actions>
                    </Modal>
                    <div className='sign-up-container'>
                        <Form>
                            <Form.Field
                                required
                                name='username'
                                label='User Name'
                                control={Input}
                                placeholder='User Name'
                                onChange={this.handleChange}
                                maxLength="50"
                            />
                            <Form.Group widths={2}>
                                <Form.Field
                                    name='f_name'
                                    label='First name'
                                    control={Input}
                                    placeholder='First name'
                                    onChange={this.handleChange}
                                    maxLength="50"
                                />
                                <Form.Field
                                    name='l_name'
                                    label='Last name'
                                    control={Input}
                                    placeholder='Last name'
                                    onChange={this.handleChange}
                                    maxLength="50"
                                />
                            </Form.Group>
                            <Form.Group widths={2}>
                                <SemanticDatepicker
                                    label="Birth Day"
                                    format="YYYY/MM/DD"
                                    onChange={this.handleChangeDate.bind(this)}
                                    showToday={true}
                                    allowOnlyNumbers={true}
                                    datePickerOnly={true}
                                    className="b_day"
                                    placeholder="YYYY/MM/DD"
                                    maxLength="10"
                                />
                                <Form.Field
                                    required
                                    label='Email'
                                    control={Input}
                                    name='email'
                                    placeholder='example@gmail.com'
                                    onChange={this.handleChange}
                                    maxLength="100"
                                />
                            </Form.Group>
                            <Form.Group widths={2}>
                                <Form.Field
                                    required
                                    label='Password'
                                    control={Input}
                                    name='password'
                                    placeholder='Password'
                                    onChange={this.handleChange}
                                    type='password'
                                    maxLength="10"
                                />
                                <Form.Field
                                    required
                                    label='Confirm password'
                                    control={Input}
                                    name='conf_pass'
                                    placeholder='Confirm password'
                                    onChange={this.handleChange}
                                    type='password'
                                    maxLength="10"
                                />
                            </Form.Group>
                            <Form.Field
                                required
                                label='Register as'
                                control={Select}
                                name='role'
                                defaultValue={'2'}
                                onChange={this.handleChangeSelect.bind(this)}
                                options={this.state.role_options}
                                className='role'
                            />
                            <div>
                                {/* <Form.Checkbox label='I agree to the Terms and Conditions' required/> */}
                                <Button onClick={this.handleSignUp} type='submit' className='btn-register'>Sign Up</Button>
                            </div>
                        </Form>
                    </div>
                </div>
            </React.Fragment>
        )
    }
}

export default SignUp
