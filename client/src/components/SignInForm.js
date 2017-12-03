import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';
import { compose } from 'recompose';
import { connect } from 'react-redux';
import {
  Grid
} from 'material-ui';
import Form from './Form';
import { loginUser } from '../actions';

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

class SignInForm extends PureComponent {
  static propTypes = {
    classes: PropTypes.object.isRequired,
    errors: PropTypes.object,
    message: PropTypes.string
  }

  state = {
    email: '',
    password: ''
  }

  handleChange = prop => event => {
    this.setState({
      [prop]: event.target.value
    });
  }

  processForm = () => {
    this.props.loginUser(this.state);
  }

  render() {
    const { classes, errors, message } = this.props;
    const { email, password } = this.state;
    return (
      <div className={classes.Root}>
        <Grid container spacing={24}>
          <Grid item xs={12}>
            <Form
              title="Sign In"
              buttonText="Sign In"
              handleSubmit={this.processForm}
              handleChange={this.handleChange}
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
              }]}
            />
          </Grid>
        </Grid>
      </div>
    );
  }
}

SignInForm.propTypes = {
  classes: PropTypes.object.isRequired,
  message: PropTypes.string,
  errors: PropTypes.object
};

const mapStateToProps = (state) => {
  return {
    message: state.form.login.message,
    errors: state.form.login.errors || {}
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    loginUser: credentials => dispatch(loginUser(credentials)),
  };
};

export default compose(connect(mapStateToProps, mapDispatchToProps), withStyles(styles))(SignInForm);
