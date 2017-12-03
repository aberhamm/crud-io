import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';
import { compose } from 'recompose';
import { connect } from 'react-redux';
import {
  Grid
} from 'material-ui';

import Form from './Form';

import { registerUser, formFieldChange } from '../actions';

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

class SignUpForm extends PureComponent {
  static propTypes = {
    classes: PropTypes.object.isRequired,
    success: PropTypes.bool,
    message: PropTypes.string,
    errors: PropTypes.object
  }

  state = {
    email: '',
    name: '',
    password: ''
  }

  componentWillReceiveProps = (nextProps) => {
    if (!this.props.success && nextProps.success) {
      this.setState({
        email: '',
        name: '',
        password: ''
      });
    }
  }

  handleChange = prop => event => {
    this.setState({
      [prop]: event.target.value
    });
  }

  processForm = () => {
    this.props.registerUser(this.state);
  }

  render() {
    const { classes, errors, message, success} = this.props;
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
              success={success}
              message={message}
              errors={errors}
              fields={[{
                key: 'email',
                type: 'text',
                value: email,
                title: 'Email'
              }, {
                key: 'password',
                type: 'password',
                value: password,
                title: 'Password'
              }, {
                key: 'name',
                type: 'text',
                value: name,
                title: 'Name'
              }]}
            />
          </Grid>
        </Grid>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return state.form.register;
};

const mapDispatchToProps = (dispatch) => {
  return {
    registerUser: credentials => dispatch(registerUser(credentials)),
    formFieldChange: data => dispatch(formFieldChange(data))
  };
};

export default compose(connect(mapStateToProps, mapDispatchToProps), withStyles(styles))(SignUpForm);
