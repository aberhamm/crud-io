import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';
import { compose } from 'recompose';
import { connect } from 'react-redux';
import {
  Grid,
  FormControl,
  InputLabel,
  Input,
  FormHelperText,
  Button,
  Typography
} from 'material-ui';

import Form from './Form';

import { registerUser } from '../actions';

const styles = theme => ({
  Root: {
    display: 'flex',
    flexGrow: 1
  },
  FormField__container: {
    marginTop: theme.spacing.unit
  },
  Button__submit: {
    marginTop: theme.spacing.unit * 4,
  }
});

class SignUpForm extends Component {
  state = {
    email: '',
    name: '',
    password: ''
  };

  handleChange = prop => event => {
    this.setState({
      [prop]: event.target.value
    });
  };

  processForm = () => {
    this.props.registerUser(this.state);
  }

  render() {
    const { classes, errors, message } = this.props;
    const { email, name, password } = this.state;

    return (
      <div className={classes.Root}>
        <Grid container spacing={24}>
          <Grid item xs={12}>
            <Form
              title="Sign Up"
              buttonText="Sign Up"
              handleSubmit={this.processForm}
              handleChange={this.handleChange}
              message={message}
              errors={errors}
              fields={[{
                key: 'email',
                type: 'text',
                value: this.state.email,
                title: 'Email'
              }, {
                key: 'password',
                type: 'password',
                value: this.state.password,
                title: 'Password'
              }, {
                key: 'name',
                type: 'text',
                value: this.state.name,
                title: 'Name'
              }]}
            />
          </Grid>
        </Grid>
      </div>
    );
  }
}

SignUpForm.propTypes = {
  classes: PropTypes.object.isRequired,
  message: PropTypes.string,
  errors: PropTypes.object
};

const mapStateToProps = (state) => {
  return {
    message: state.form.register.message,
    errors: state.form.register.errors || {}
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    registerUser: credentials => dispatch(registerUser(credentials)),
  };
};

export default compose(connect(mapStateToProps, mapDispatchToProps), withStyles(styles))(SignUpForm);
