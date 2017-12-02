import React, { PureComponent } from 'react';
import { compose } from 'recompose';
import { connect } from 'react-redux';
import { withStyles } from 'material-ui/styles';

import Form from '../components/Form';
import { updateCurrentUser } from '../actions';

class EditUserForm extends PureComponent {
  state = {
    email: this.props.user.email,
    name: this.props.user.name
  };

  handleChange = prop => event => {
    this.setState({
      [prop]: event.target.value
    });
  };

  processForm = () => {
    this.props.updateCurrentUser({...this.props.user, ...this.state});
  };

  render() {
    const { errors, message } = this.props;

    return (
      <Form
        title="Edit Profile"
        buttonText="Save"
        handleSubmit={this.processForm}
        handleChange={this.handleChange}
        message={message}
        errors={errors}
        fields={[{
          key: 'email',
          value: this.state.email,
          title: 'Email'
        }, {
          key: 'name',
          value: this.state.name,
          title: 'Name'
        }]}
      />
    );
  }
}

const mapStateToProps = (state) => {
  return {
    user: state.user,
    message: state.form.updateUser.message,
    errors: state.form.updateUser.errors || {}
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    updateCurrentUser: data => dispatch(updateCurrentUser(data)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(EditUserForm);
