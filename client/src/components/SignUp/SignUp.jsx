import React, { Component } from 'react';
import { Button, Form } from 'semantic-ui-react'
import './SignUp.css';
import { Helmet } from 'react-helmet';

const options = [
    { key: 's', text: 'Student', value: 'student' },
    { key: 't', text: 'Teacher', value: 'teacher' }
  ]

class SignUp extends Component {
    render() {
        return (
            <React.Fragment>
                <div className='div-sign-up'>
                    <Helmet>
                        <title>ITEnglish | Sign-up</title>
                    </Helmet>
                    <div className='sign-up-container'>
                        <Form unstackable>
                            <Form.Group widths={2}>
                                <Form.Input label='First name' placeholder='First name' />
                                <Form.Input label='Last name' placeholder='Last name' />
                            </Form.Group>
                            <Form.Group widths={2}>
                                <Form.Input label='Birthday' placeholder='First name' type='date' />
                                <Form.Input label='Email' placeholder='example@gmail.com' type='mail' />
                            </Form.Group>
                            <Form.Group widths={2}>
                                <Form.Input label='Password' placeholder='Password'/>
                                <Form.Input label='Confirm password' placeholder='Confirm password' />
                            </Form.Group>
                            <Form.Group widths={2}>
                            <Form.Select
                                fluid
                                label='Register as'
                                options={options}
                                placeholder='Gender'
                            />
                            </Form.Group>
                            <Form.Checkbox label='I agree to the Terms and Conditions' />
                            <Button type='submit'>Submit</Button>
                        </Form>
                    </div>
                </div>
            </React.Fragment>
        )
    }
}

export default SignUp
